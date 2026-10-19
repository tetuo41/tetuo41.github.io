# Surface brief — index (tetuo41.com)

Scope: 単一ページ。Mode: Experience(訪問者は「このドメインの主が誰か」を体験する)。
Audience: Keybase/GitHub/SNS から辿る開発者・採用側。Job: 1 画面で誰かを掴み、一次リンクへ。Action: リンククリック。Proof: Keybase 検証済み状態と実在リンクのみ。Constraints: /keybase.txt 恒常配信、未確定の自己紹介文を創作しない。

## Direction contract

THESIS: 「署名で裏打ちされた静けさ」— 騒がしい自己主張の代わりに、1 つの検証状態と 1 つのアクセント色が身元を担保する。カテゴリ既定の「カードを並べた自己紹介ヒーロー」の賑やかさを拒否し、精密な静的タイポグラフィが主役。

OWN-WORLD: 純ニュートラルの2テーマ(OS追従)に、単一アクセント(インディゴ系 #6366f1 派生)のみ。面ではなく線と余白で構成。タイプはシステムスタック(日本語は Hiragino/Noto)で、表示は 800 weight 極狭トラッキング。補助に ui-monospace。署名要素 = 検証ピル(パルスするアクセントドット+「Keybase で検証済み」)。

STORY: 訪問者は「この人は実在し、暗号で検証され、一次リンクが全部ここにある」と理解し、GitHub/Keybase へ 1 クリックで進む。

FIRST VIEWPORT: 上端 64px ナビ(左: tetuo41 ワードマーク+アクセントドット、右: 検証ピル)。中央に eyebrow(mono 小キャップ "HIROKI HATSUSHIKA — TOKYO")、巨大 H1 "tetuo41"(clamp 4.5-8rem, -0.045em)、1 行説明、CTA 行([GitHub] 塗り + [Keybase 証明] アウトライン)。背景にアクセントの極薄ラディアル。

FORM: 単一縦積。セクションは Links(9 枚のカードを 2 列グリッド)、Article(Blog への 1 枚)、Footer(mono で fingerprint 接頭辞+©+keybase.txt リンク)。見出しの上が下より広い 1 つの余白リズム。

SIGNATURE: 検証ピルのパルス(控えめ、2.4s 周期、reduced-motion で停止)。スクロール時に各セクションが 12px フェードアップ、ホバーは 150ms のボーダー/矢印トランジション。
