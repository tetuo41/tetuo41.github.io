---
target: src/pages/index.astro
total_score: 27
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/hiroki-wsl/dev/pf/src/pages/index.astro"
target_fingerprint: "sha256:79c480ee159e8435048b7c2d4dd4f1207c4bd237f0f4f61bab1b78fed15a2e07"
target_path: /home/hiroki-wsl/dev/pf/src/pages/index.astro
timestamp: 2026-10-19T05-42-32Z
slug: src-pages-index-astro
---
# Design Critique — src/pages/index.astro (tetuo41.com)
Method: dual-agent (A: CritiqueA · B: CritiqueB)

## Design Health Score: 27/32 (n/a: 7, 10)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | 検証済みが主張のみ。ページ内証明がなく確認はサイト外 |
| 2 | Match with real world | 4 | fingerprint に mono、日本語第一のタイポグラフィ |
| 3 | User control & freedom | 4 | 純外向リンク面、行き止なし |
| 4 | Consistency & standards | 3 | 9 行中 2 行が http:// で信頼 thesis と不整合 |
| 5 | Error prevention | 3 | 停止ラベルは✓。Blog「Stay Rad」が生存前提の注記で硬失敗 |
| 6 | Recognition over recall | 4 | アイコン+ラベル+注記で即時解析可能 |
| 7 | Flexibility/efficiency | n/a | 単一アクション面 |
| 8 | Aesthetic & minimalist | 4 | 影なし・アクセント1色・抑制がデザイン |
| 9 | Error recovery | 2 | 破損パスへのページ内ガイドゼロ |
| 10 | Help/documentation | n/a | Experience 面で自己明証 |

## Design Specificity
このプロダクトのために書かれている。Mono-as-Proof 規則、検証ピル、事実のみの注記列が thesis を体現。

## Deterministic scan (Assessment B)
- warning 2: overused-font (Geist Sans/Mono) — ユーザー選択の Vercel 基準により意図的維持
- advisory 4: design-system-font-size — 0.95rem×2 は DESIGN.md 記載ランプ値(誤検出)、0.9/0.72rem は実在
- ブラウザ注入で pulsing-dot を検出(方向契約の SIGNATURE 要素、意図的)

## Priority Issues
1. [P1] 法名がハンドル以下に格下げ — mono eyebrow を H1 上に復権(Geist Mono 0.85rem/uppercase/--muted)
2. [P1] OG/twitter カードなし+favicon 削除済み — 1200×630 カードとドット favicon を復活
3. [P2] http:// リンク ×2 が信頼 thesis を毀損 — https 化、非対応は行格下げ
4. [P2] 12 宛先のうち 4 が死 [/重複] — 分组(Writing/Audio/Identity)+Blog 注記を「(準備中)」へ
5. [P3] 検証の浅い証明経路 — CTA 下に「このドメインの証明: keybase.txt」を mono で追加

## Persona Red Flags
- 採用担当・スマホ: 法名 muted、note 非表示で文脈消失、unfurl 裸テキスト
- 懐疑的開発者: 省略付き fingerprint は照合不能、コピー手段なし
- 非日本語訪問者: 検証主張含む全説明が日本語のみ

## Minor
- rel="noopener noreferrer" なし / スクロールフェード未実装(契約逸脱・抑制的に妥当) / Blog「Stay Rad」のカーニング / touch で矢印不表示 / © 2026 ハードコード / 0.95rem advisory ×2 は誤検出
