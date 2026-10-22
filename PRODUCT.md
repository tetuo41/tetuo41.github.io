# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro(静的出力)+ Cloudflare Workers 静的アセット。デプロイは `pnpm build && pnpm run deploy`(wrangler)。構成・認証・ロールバックは `INFRASTRUCTURE.md` を参照。

## Users

- tetuo41(Hiroki Hatsushika)本人のweb上の身元を確認したい人:開発者・共同作業者・採用側。Keybase 証明や SNS リンクから辿り着く。
- 本人自身:名刺・SNS プロフィールの reference として貼る自分の恒常的な URL。

## Product Purpose

tetuo41.com は本人の身元・活動・実績への入口である。成功の定義:訪問者が 1 画面で「誰で、何をしている人か」を掴み、信頼できる一次リンク(Keybase・GitHub)に到達できる。Keybase の web 証明が `/keybase.txt` を配信することを恒常要件とする。

## Positioning

個人ポートフォリオではなく「身元証明つきの名刺ページ」。Keybase の暗号署名による web 証明がドメイン直下で検証可能であること自体が、他のポートフォリオにはない仕組み。

## Operating Context

- リポジトリ: github.com/tetuo41/tetuo41.github.io(master で運用)
- 配信: Cloudflare Workers(カスタムドメイン tetuo41.com / www)
- 記事・発信: Blog「Stay Rad」(blog.tetuo41.com、DNS 復旧待ち)、Podcast(Yarukinai.fm)、Medium
- 過去の実績: Study Today(勉強会 scraping イベントサイト、運営終了)

## Capabilities and Constraints

- `/keybase.txt` を常に配信すること(内容の改変・削除禁止、Keybase 証明の恒常要件)
- コンテンツの確定分はリンク一覧のみ。自己紹介文・記事リストは未確定(本人が追記する)
- 静的サイト。ビルド時に動的処理なし

## Evidence on Hand

- 実在リンク一覧:GitHub / Keybase / Twitter(X) / SoundCloud / Medium / Blog「Stay Rad」/ はてなブログ(更新停止)/ Podcast / Study Today(過去)
- 本人名:Hiroki Hatsushika、Tokyo 在住(Keybase プロフィールより)

## Product Principles

1. 一次情報への近道:クリック 1 つで信頼できるリンクへ
2. 正確さ:確定していない実績を創作しない
3. 恒常性:ドメインと `/keybase.txt` は長期で変わらない
