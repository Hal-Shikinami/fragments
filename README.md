# ブログタイトル

シンプルな静的ブログサイトです。

## ディレクトリ構成

```
essay_test/
├── index.html          # トップページ（記事一覧・自動生成）
├── about.html          # 知るページ（プロフィール）
├── style.css           # スタイルシート
├── js/                 # JavaScriptフォルダ
│   ├── config.js       # サイト共通設定
│   └── main.js         # 共通設定の適用スクリプト
├── scripts/            # ビルドスクリプト
│   └── build-index.js  # 記事一覧の自動生成
├── articles/           # 記事フォルダ
│   ├── YYYYMMDD-slug.html
│   └── ...
├── .github/workflows/  # GitHub Actions
│   └── build.yml       # 自動ビルド設定
└── templates/          # ローカル専用（※Gitに含まれない）
    ├── article.html    # 記事テンプレート
    └── styleguide.html # スタイルガイド（部品一覧）
```

> **Note:** `templates/` フォルダはローカル専用です。新しい環境では手動で作成してください。

## 記事の作成方法

### 1. 記事ファイルを作成

`templates/article.html` をコピーして `articles/` フォルダに配置します。

**ファイル名の形式:** `YYYYMMDD-slug.html`

例: `20260126-my-new-post.html`

### 2. 記事の内容を編集

テンプレート内の以下を変更してください：

| 項目 | 場所 | 例 |
|------|------|-----|
| タイトル | `<title>` と `<h1>` | 記事のタイトルのみ（サイト名は自動追加） |
| 日付 | `<span class="date">` | 2026.01.26 |
| 本文 | `<div class="content">` 内 | 自由に記述 |

### 3. 記事一覧の更新

**自動更新（推奨）:**

mainブランチへのマージ時にGitHub Actionsが自動実行されます。手動での更新は不要です。

**手動更新（ローカル確認用）:**

```bash
npm run build
```

> **Note:** Node.js が必要です。

## 使用できるHTML要素

実際の見た目は `templates/styleguide.html` をブラウザで開いて確認できます。

記事本文 (`<div class="content">` 内) で使用できる要素：

```html
<p>段落テキスト</p>

<h2>大見出し</h2>
<h3>小見出し</h3>

<ul>
  <li>リスト項目</li>
</ul>

<ol>
  <li>番号付きリスト</li>
</ol>

<blockquote>引用文</blockquote>

<code>インラインコード</code>

<pre><code>コードブロック</code></pre>

<img src="画像パス" alt="説明">
```

## サイト共通設定

`js/config.js` でサイト全体の共通情報を管理しています：

```javascript
const SITE_CONFIG = {
  blogTitle: "ブログタイトル",  // サイト名
  year: 2026,                   // コピーライト年
  nav: [                        // ナビゲーション
    { href: "index.html", label: "読む" },
    { href: "about.html", label: "知る" }
  ]
};
```

この設定は以下の箇所に自動的に反映されます：
- ヘッダー（サイトタイトル、ナビゲーション）
- ページの `<title>` タグ（ナビページはconfig.jsのlabelを使用）
- フッターのコピーライト表記

### ナビゲーションの追加

`nav` 配列に項目を追加すると、全ページのヘッダーに反映されます：

```javascript
nav: [
  { href: "index.html", label: "読む" },
  { href: "about.html", label: "知る" },
  { href: "works.html", label: "作品" }  // 追加例
]
```

> **Note:** 各HTMLファイルの `<header></header>` は空のままでOKです。JSが自動生成します。

## スタイルのカスタマイズ

`style.css` 冒頭の変数を変更することでサイト全体の見た目を変更できます：

```css
:root {
  --color-bg: #fefefc;          /* 背景色 */
  --color-text: #888;           /* 本文色 */
  --color-text-light: #aaa;     /* 薄い文字色 */
  --color-link: #888;           /* リンク色 */
  --color-link-external: #a8d4e6; /* 外部リンク色（薄い水色） */
  --color-heading: #888;        /* 見出し色 */
  --max-width: 600px;           /* コンテンツ最大幅 */
}
```

## リンクの書き方

### 内部リンク（サイト内）

```html
<a href="articles/example.html">記事タイトル</a>
```

### 外部リンク（他サイト）

外部リンクには `target="_blank"` を付けると薄い水色で表示されます。

```html
<a href="https://example.com" target="_blank" rel="noopener">リンクテキスト</a>
```

- `target="_blank"` - 新しいタブで開く（水色スタイルが適用される）
- `rel="noopener"` - セキュリティ対策として推奨

## ブランチ運用ルール

### ブランチの種類

| プレフィックス | 用途 | 例 |
|---------------|------|-----|
| `main` | 本番環境。直接コミットしない | - |
| `feat/` | 新機能・機能改善 | `feat/dark-mode` |
| `fix/` | バグ修正 | `fix/broken-link` |
| `docs/` | ドキュメント更新 | `docs/readme` |
| `style/` | スタイル調整 | `style/font-size` |
| `post/` | 記事追加 | `post/20250126-new-article` |

### ワークフロー

1. `main` から新しいブランチを作成
   ```bash
   git checkout main
   git pull origin main
   git checkout -b <prefix>/<branch-name>
   ```

2. 変更をコミット
   ```bash
   git add <files>
   git commit -m "変更内容の説明"
   ```

3. リモートにプッシュ
   ```bash
   git push -u origin <branch-name>
   ```

4. Pull Request を作成してマージ

### コミットメッセージ

```
<種類>: <変更内容の要約>

例:
feat: ダークモード対応を追加
fix: ナビゲーションリンクの修正
docs: READMEにブランチ運用ルールを追加
post: 新規記事「タイトル」を追加
style: フォントサイズを調整
```
