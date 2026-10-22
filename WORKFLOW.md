# Agentic Coding Workflow (OMP × GLM × Jev)

品質第一。手戻り(設計ミス・バグ・レビュー漏れ)を継続的に減らすための仕組み。
コストと速度は品質の次に最適化する。

## 1. 環境実態(2026-10-20 検証)

| 項目 | 実測値 |
|---|---|
| Coding Agent | **omp 18.12.3**(`omp --version`)— 本ワークフローの実行基盤 |
| OpenCode | v2.0.32 が別途インストール済み。omp とは独立( orchestration 関係なし)。本ワークフローでは触らない |
| LLM Provider | Z.AI(**plan: lite** = GLM Coding Lite。5h 2K / 週 10K クレジット) |
| Frontier 実動作確認 | `zai/glm-5.3` / `zai/glm-5.3-flashx` とも Lite プランで応答 OK(`omp -p` で実測) |
| Decision Model (Jev) | **TypeSafe System One Model「Jev」に接続済み**(2026-10-20)。`typesafe/jev-latest`(実体 jev-1.13.0)を judge ロールに割当て。credential は omp auth store に登録済み、APIキーは `~/.omp/agent/.env` の `TYPESAFE_API_KEY`。judge/judge_batch が Jev で動作(4件0.2秒、チャットモデル比 ~600倍速)。エラー時は `retry.fallbackChains.judge`(deepseek-v4-flash:low)へフォールバック |

## 2. モデル割り当て(global config: `~/.omp/agent/config.yml`)

| 責務 | omp の実体 | モデル |
|---|---|---|
| Orchestration / Complex Implementation | `default` ロール(メインエージェント) | **zai/glm-5.3:auto**(Frontier) |
| Requirements / Planning | `plan` ロール(plan モード) | zai/glm-5.3:auto |
| 深掘り分析 | `slow` ロール | zai/glm-5.3-flashx:high |
| Architecture Review(常駐レビュー) | `advisor` ロール(無効・有効化時) | zai/glm-5.3:high |
| Code Exploration | `scout` サブエージェント / `smol` ロール | zai/glm-4.7-flash:low(Flash) |
| Documentation Research | `web` ロール | zai/glm-4.7-flash:low |
| 機械的軽量実装 | `sonic` サブエージェント | zai/glm-4.7-flash:low |
| Independent Code Review | `reviewer` / `security-reviewer` サブエージェント | **zai/glm-5.3-flashx:max**(Frontier) |
| Risk Classification(Jev) | `judge` ロール / `judge_batch` | **typesafe/jev-latest**(Jev 1.13.0)※FB: deepseek-v4-flash:low |
| 画像QA | `vision` ロール | zai/glm-5.3-flash:auto |
| Fallback(全ロール) | `retry.fallbackChains` | DeepSeek(v4-pro:high=重い / v4-flash:low=軽量 / flash:low=画像対応)+ `zai/*` 保険 |

設計原則: 実装とレビューは必ず別エージェントコンテキスト(`reviewer` サブエージェント)。軽量タスクは Flash、検証失敗・難易度上昇時は Frontier への再委譲(ユーザー or メインエージェントがステアリング)。

## 3. 5フェーズワークフロー

### Phase 1: Specification
要件明確化 / Acceptance Criteria 定義 / 非機能要件と制約 / 影響範囲予測。
成果物: `docs/spec/<slug>.md`(plan モード = `plan` ロールで作成)

### Phase 2: Planning
コードベース調査(`scout` + grep/glob)/ 変更計画 / 代替案とトレードオフ / リスク分析 /
**独立 Agent による計画レビュー**(`reviewer` サブエージェント)。
成果物: `docs/plan/<slug>.md`

### Phase 3: Implementation
タスクを小さく分割 / 必要なテストを実装 / 不必要な変更を禁止 / 各タスクの完了条件を検証。

### Phase 4: Verification — `bash scripts/quality-gate.sh`
1. Typecheck(`astro check`)✅ 実装済
2. Build(`astro build`)✅ 実装済
3. Security scan(`pnpm audit --prod`)✅ 実装済
4. Unit / Integration Test — **未整備**(テストランナー未導入。導入候補: vitest)
5. Git Diff Review — `reviewer` サブエージェントへ差分を渡す

失敗時は原因分析 → 修正 → 再実行。**実行できなかった項目を成功として報告しない。**

### Phase 5: Independent Review
実装を担当していないコンテキスト(`reviewer` / `security-reviewer`)でレビュー。
確認項目: 要件整合性 / ロジック / バグ / Error Handling / Security / Performance / Maintainability / Test Coverage。
指摘は `{file, title, description, category, testStatus, staticAnalysis, scope}` の構造化データで出力。

## 4. Jev Decision Gate

レビュー指摘を `judge_batch` でリスク分類する。`scripts/jev-risk-gate.ts`。

```
(omp の eval セルで)
%load "scripts/jev-risk-gate.ts"
const report = await riskGate(findings);  // findings = Phase 5 の構造化指摘
```

出力(指摘ごと): `risk`(critical/high/medium/low)/ `priority`(P1–P4)/
`humanApproval`(マージ前に人間決定が必要)/ `escalation`(Frontier 再レビューが必要)/ `confidence`。

- 実測(2026-10-20): 4件のサンプル指摘を 4/4 分類、**typesafe/jev-1.13.0、0.2秒**(チャットモデル時は 128.7秒)。
  データ消失マイグレーション → critical/P1/humanApproval、タイミング攻撃 → critical/P1、N+1 → medium/P2、リネーム → low/P4。
- **Jev 応答形状への適合済み**: Jev は bool を確率(0..1)で返す(≥0.5 を yes 解釈)、score も連続値(四捨五入で P1–P4化)。
  choice は probabilities 付きのため uncertainty 計算はそのまま動作。
- 判定が Jev で失敗した場合は `retry.fallbackChains.judge` 経由で deepseek-v4-flash に自動フォールバック。
- **テスト結果を上書きさせない**: `testStatus: "fail"` の指摘はゲート出力に関係なく critical/P1 + human 扱い(運用規約)。
- **難易度ベース・エスカレーション**: `escalationPlan(report, findings)` が判定を独立コンテキストへ振り分ける。
  top probability < 0.7(未決定)/ judgeエラー / `escalation: true` / risk=high → `reviewer`(Frontier再レビュー)、
  security系 high以上 → `security-reviewer`、critical / `humanApproval: true` → 人間、それ以外は続行。
  実測: 5分岐すべて synthetic verdict で確認済み(2026-10-20)。
- 大量データのトリアージ(ログ・grep結果・issue一覧)は `jevify` キーワードで bulk 分類モードを利用。

## 5. ベンチマーク計画(A/B/C 比較)

| 構成 | 内容 |
|---|---|
| A | Frontier のみ(default=glm-5.3 で設計・実装・レビュー) |
| B | Frontier + Flash(現構成。探索/軽量を 4.7-flash に委譲) |
| C | B + Jev Decision Gate(riskGate + jevify) |

タスク(本リポジトリの代表作業): T1 Astro コンポーネント追加 / T2 TS ユーティリティリファクタ / T3 wrangler 設定変更。
手順: 各構成 × 各タスクを `omp --no-session -p` で同一プロンプト・同一初期状態から実行、可能なら3回反復。
指標: Acceptance Test Pass Rate / Defect Detection Rate / False Positive Rate / Rework Count /
Time to Completion / Token消費 / API Cost(クレジット) / Human Intervention Count。
Go / EKS タスクは本リポジトリに該当コードが存在しないため対象外(将来別リポジトリで)。

## 6. 導入・運用・Rollback

- 設定本体: `~/.omp/agent/config.yml`(modelRoles / task.agentModelOverrides / retry.fallbackChains)
- バックアップ: `~/.omp/agent/backup-20261020-workflow/config.yml.bak`
- **Rollback**: `cp ~/.omp/agent/backup-20261020-workflow/config.yml.bak ~/.omp/agent/config.yml` → omp 再起動
- 依存追加(`@astrojs/check`, `typescript@6`)の Rollback: `pnpm remove @astrojs/check typescript` + `package.json` の `check` スクリプト削除
- Node 注意: Astro 7 は Node >=22.22.0 必須。システム既定が 22.16.0 のため quality-gate.sh は nvm の最新 v22(v22.23.3)を自動選択する。`nvm alias default 22.23.3` を推奨

## 7. 未解決事項

1. Unit / Integration Test 未整備(vitest 導入が候補)
2. ~~TypeSafe(Jev 本来の判定基盤)への接続~~ **解決済み(2026-10-20)**。接続に必要だったのは3点:
   ① `~/.omp/agent/.env` の `TYPESAFE_API_KEY`(プロセス起動時に読まれる — 設定後は omp 再起動が必要)、
   ② credential store への登録(`omp auth import`、provider `typesafe` / `type: api_key`)、
   ③ **`modelRoles.judge: typesafe/jev-latest` の明示割当て**(キーと credential だけでは自動切替されないことを実証)。
   モデル実体は jev-1.13.0(`https://api.typesafe.ai/v1/models` で `jev-latest` / `jev-preview` を確認)。
3. ベンチマーク A/B/C は計画のみ(実施には反復実行の仕組み化が必要)
4. 難易度ベース・エスカレーション — **実装済み**(§4)。`escalationPlan` が uncertainty(top prob < 0.7)/judgeエラー/escalationフラグ/risk を根拠に reviewer・security-reviewer・human へ振り分け。`task.enableEffort: true` により難易度に応じた per-spawn effort 指定も可能。組込みの「難易度自動判定でのモデル切替」は存在しないため、判定シグナル駆動のこの構成が現環境での正解
5. OpenCode(v2.0.32)側は未設定 — 同じモデル構成を使う場合は opencode 側の設定が別途必要
6. `omp -p` 実行時に cloudflare MCP の 401(未認可)が出る — ヘッドラン実行と MCP 認可の問題で本ワークフローとは非依存
