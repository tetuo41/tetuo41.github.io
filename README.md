# tetuo41.com

tetuo41(Hiroki Hatsushika)の身元・活動・一次リンクへの入口。Keybase の署名で検証された名刺ページ。

- 本番: [https://tetuo41.com](https://tetuo41.com) / [https://www.tetuo41.com](https://www.tetuo41.com)
- スタック: Astro 7(静的出力)+ Cloudflare Workers(Static Assets)
- 恒常要件: `https://tetuo41.com/keybase.txt` を常に配信すること(改変・削除禁止)

## コマンド

| コマンド | 動作 |
| :-- | :-- |
| `pnpm install` | 依存関係の導入 |
| `pnpm dev` | 開発サーバ(`astro dev`)。エージェント実行時は `astro dev --background` |
| `pnpm build` | 本番ビルド → `dist/` |
| `pnpm preview` | `dist/` をローカル配信(4321) |
| `pnpm run deploy` | 本番デプロイ(`wrangler deploy`)。詳細は [INFRASTRUCTURE.md](./INFRASTRUCTURE.md) |
| `bash scripts/quality-gate.sh` | デプロイ前ゲート(typecheck + build + audit) |

> `pnpm deploy` は pnpm 組み込みコマンドと衝突する。必ず `pnpm run deploy` を使う。

## ドキュメント

| ファイル | 内容 |
|---|---|
| [PRODUCT.md](./PRODUCT.md) | プロダクトの目的・ユーザー・制約(不変の product truth) |
| [DESIGN.md](./DESIGN.md) | デザインシステム(トークン・タイポグラフィ・コンポーネント) |
| [INFRASTRUCTURE.md](./INFRASTRUCTURE.md) | インフラ構成・デプロイ・認証・ロールバック・障害切り分け |
| [WORKFLOW.md](./WORKFLOW.md) | エージェント開発ワークフロー・モデル割り当て・品質ゲート運営 |

## 構成

```text
.
├── public/              # 静的ファイル(keybase.txt, og.png, favicon.svg)
├── scripts/             # quality-gate.sh / jev-risk-gate.ts
├── src/pages/index.astro  # 唯一のページ
├── PRODUCT.md / DESIGN.md / INFRASTRUCTURE.md / WORKFLOW.md
├── astro.config.mjs
└── wrangler.jsonc       # Worker 名・アセット・カスタムドメイン
```
