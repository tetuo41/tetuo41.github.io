// Jev Decision Gate — risk classification of code-review findings via omp judge_batch().
//
// Usage (omp eval, JS cell):
//   %load "scripts/jev-risk-gate.ts"
//   const report = await riskGate([
//     { file: "src/api/auth.ts", title: "JWT not verified", description: "signature check skipped",
//       category: "security", testStatus: "fail", staticAnalysis: "clean", scope: "auth middleware" },
//   ]);
//   const plan = escalationPlan(report, findings); // difficulty-based escalation routing
//
// The judge role model (zai/glm-4.7-flash:low, fallback deepseek/deepseek-v4-flash:low) classifies
// each finding independently. This gate never overrides test results: findings whose testStatus is
// "fail" must be reviewed as critical/P1/human-approval by convention (see WORKFLOW.md).
//
// Escalation policy (difficulty-based, mirrors the omp judge guidance): a verdict is escalated to a
// stronger independent context when the judge's top probability < ESCALATION_TOP_PROB, when it
// flagged escalation itself, when the verdict is an error, or when severity alone demands it.
//
// judgeBatch is an omp eval-kernel global (available inside omp JS eval cells), not an npm package.
// The interfaces below document the kernel boundary contract this script relies on.
type JudgeAnswer = {
  choice?: unknown;
  score?: unknown;
  bool?: unknown;
  confidence?: unknown;
  probabilities?: unknown;
};
type JudgeItem = { error?: unknown; answers?: Record<string, JudgeAnswer> };
interface JudgmentBatch {
  drain(timeoutMs?: number): Promise<[string, JudgeItem][]>;
  status(): Promise<{ running?: boolean }>;
}
declare function judgeBatch(
  states: Record<string, unknown>,
  questions: Record<string, unknown>,
  opts?: { concurrency?: number; intent?: string },
): Promise<JudgmentBatch>;

type Finding = {
  id?: string;
  file: string;
  title: string;
  description: string;
  category?: string; // bug | security | performance | maintainability | ...
  testStatus?: string; // pass | fail | n/a
  staticAnalysis?: string; // linter/typecheck/scanner summary for the touched code
  scope?: string; // predicted blast radius, e.g. "auth middleware"
};

type RiskEntry = {
  risk: "critical" | "high" | "medium" | "low";
  priority: 1 | 2 | 3 | 4;
  humanApproval: boolean;
  escalation: boolean;
  confidence: number;
  uncertainty: number; // 1 - top probability of the risk verdict (0 = decided, 1 = coin flip)
  error?: string;
};

type EscalationRoute = "human" | "securityReviewer" | "reviewer" | "proceed";
type EscalationPlan = Record<EscalationRoute, { id: string; reason: string }[]>;

// Verdicts whose top probability falls below this are treated as undecided (omp judge guidance).
const ESCALATION_TOP_PROB = 0.7;
// Jev returns bool verdicts as probabilities (0..1); chat models return 0/1. >= 0.5 counts as yes.
const BOOL_YES_THRESHOLD = 0.5;
const RISK_LEVELS = ["critical", "high", "medium", "low"] as const;

// Degraded verdict for unreadable judge items: never silently dropped, always escalated.
function failedEntry(reason: unknown): RiskEntry {
  return {
    risk: "low",
    priority: 4,
    humanApproval: false,
    escalation: true,
    confidence: 0,
    uncertainty: 1,
    error: reason == null ? "no answers" : String(reason),
  };
}

function riskGateQuestions() {
  return {
    risk: {
      type: "choice",
      instructions:
        "You are the risk gate of a coding workflow. Classify the severity of this code-review finding " +
        "for a production web service. Consider correctness, security, data integrity and blast radius. " +
        "Judge the finding as described; do not assume mitigations that are not stated.",
      criteria: {
        critical: "data loss/corruption, auth bypass, RCE, or breaks a documented requirement outright",
        high: "likely user-visible bug, security weakness, or unhandled failure path in core flows",
        medium: "edge-case bug, degraded performance, or maintainability hazard with a clear workaround",
        low: "style, naming, minor cleanup, or speculative concern",
      },
    },
    priority: {
      type: "score",
      instructions: "Rank the fix urgency of this finding. 3 = most urgent (block merge), 0 = least.",
      criteria: ["P4 fix eventually", "P3 next regular work", "P2 fix before release", "P1 block merge now"],
    },
    humanApproval: {
      type: "bool",
      instructions:
        "Does applying this fix require an explicit human decision before merge " +
        "(schema/data migration, public API/contract change, security tradeoff, cost/infra change, destructive operation)?",
      criteria: {
        true: "one of the listed decision categories applies",
        false: "purely internal fix a senior engineer may approve on their own",
      },
    },
    escalation: {
      type: "bool",
      instructions:
        "Should this finding be re-reviewed by a second, stronger model context (escalation) " +
        "because the fix is non-obvious, cross-cutting, or the evidence in this record is insufficient to decide?",
      criteria: {
        true: "needs deeper frontier re-review or cross-module impact analysis",
        false: "finding and fix path are locally verifiable",
      },
    },
  };
}

// Top probability across a judge answer's label distribution; 0 when unusable.
function topProbability(answer: JudgeAnswer | undefined): number {
  if (answer == null || typeof answer.probabilities !== "object" || answer.probabilities === null) return 0;
  let top = 0;
  for (const p of Object.values(answer.probabilities)) {
    if (typeof p === "number" && p > top) top = p;
  }
  return top;
}

function mapItem(item: JudgeItem): RiskEntry {
  if (item.error != null) return failedEntry(item.error);
  if (item.answers == null) return failedEntry("no answers");
  const a = item.answers;

  const choice = a.risk?.choice;
  const risk = RISK_LEVELS.find((level) => level === choice) ?? "low";
  const score = typeof a.priority?.score === "number" ? a.priority.score : 0;
  // Jev scores are continuous (e.g. 2.95); round to the P1..P4 index before the clamp keeps the union honest.
  const priority = Math.min(4, Math.max(1, Math.round(4 - score))) as RiskEntry["priority"];
  const confidence = typeof a.risk?.confidence === "number" ? a.risk.confidence : 0;
  const uncertainty = 1 - topProbability(a.risk);
  const rawHuman = a.humanApproval?.bool;
  const rawEscalation = a.escalation?.bool;

  return {
    risk,
    priority,
    humanApproval: typeof rawHuman === "number" ? rawHuman >= BOOL_YES_THRESHOLD : rawHuman === true,
    escalation: typeof rawEscalation === "number" ? rawEscalation >= BOOL_YES_THRESHOLD : rawEscalation === true,
    confidence,
    uncertainty,
  };
}

async function riskGate(
  findings: Finding[],
  opts: { concurrency?: number; intent?: string } = {},
): Promise<Record<string, RiskEntry>> {
  if (!Array.isArray(findings) || findings.length === 0) return {};
  const states: Record<string, Finding> = {};
  findings.forEach((f, i) => {
    states[f.id ?? String(i)] = f;
  });
  const b = await judgeBatch(states, riskGateQuestions(), {
    concurrency: opts.concurrency ?? 16,
    intent: opts.intent ?? "jevify risk-gate",
  });
  const out: Record<string, RiskEntry> = {};
  const expected = Object.keys(states).length;
  while (Object.keys(out).length < expected) {
    for (const [k, item] of await b.drain(60)) out[k] = mapItem(item);
    const s = await b.status();
    if (s.running !== true) {
      for (const [k, item] of await b.drain(5)) out[k] = mapItem(item);
      break;
    }
  }
  const missing = Object.keys(states).filter((k) => !(k in out));
  if (missing.length) throw new Error(`riskGate: no verdict for ${missing.join(", ")} — judge run failed wholesale`);
  return out;
}

// Difficulty-based escalation routing (deliverable for unresolved item #4 in WORKFLOW.md).
// Maps gate verdicts to the independent context that must handle each finding:
//   human            — approval-gated or critical; a person decides
//   securityReviewer — security findings at high/critical severity
//   reviewer         — hard/uncertain verdicts: flagged, uncertain, high risk, or gate error
//   proceed          — locally verifiable; implement without another model pass
function escalationPlan(report: Record<string, RiskEntry>, findings: Finding[] = []): EscalationPlan {
  const categories: Record<string, string | undefined> = {};
  findings.forEach((f, i) => {
    categories[f.id ?? String(i)] = f.category;
  });
  const plan: EscalationPlan = { human: [], securityReviewer: [], reviewer: [], proceed: [] };
  for (const [id, e] of Object.entries(report)) {
    if (e.error != null) {
      plan.reviewer.push({ id, reason: `gate error: ${e.error}` });
      continue;
    }
    if (e.humanApproval || e.risk === "critical") {
      plan.human.push({ id, reason: e.humanApproval ? "requires human decision" : `critical risk` });
      continue;
    }
    if (categories[id] === "security" && e.risk === "high") {
      plan.securityReviewer.push({ id, reason: `security finding, risk=${e.risk}` });
      continue;
    }
    if (e.uncertainty > 1 - ESCALATION_TOP_PROB) {
      plan.reviewer.push({ id, reason: `undecided verdict (top probability < ${ESCALATION_TOP_PROB})` });
      continue;
    }
    if (e.escalation || e.risk === "high") {
      plan.reviewer.push({ id, reason: e.escalation ? "judge flagged escalation" : `risk=${e.risk}` });
      continue;
    }
    plan.proceed.push({ id, reason: `risk=${e.risk}, decided (uncertainty=${e.uncertainty.toFixed(2)})` });
  }
  return plan;
}
