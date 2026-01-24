# ブログタイトル

シンプルな静的ブログサイトです。

## ディレクトリ構成

```
essay_test/
├── index.html          # トップページ（記事一覧）
├── about.html          # 知るページ（プロフィール）
├── style.css           # スタイルシート
├── articles/           # 記事フォルダ
│   ├── YYYYMMDD-slug.html
│   └── ...
└── templates/          # テンプレート
    └── article.html    # 記事テンプレート
```

## 記事の作成方法

### 1. 記事ファイルを作成

`templates/article.html` をコピーして `articles/` フォルダに配置します。

**ファイル名の形式:** `YYYYMMDD-slug.html`

例: `20250126-my-new-post.html`

### 2. 記事の内容を編集

テンプレート内の以下を変更してください：

| 項目 | 場所 | 例 |
|------|------|-----|
| タイトル | `<title>` と `<h1>` | 記事のタイトル |
| 日付 | `<span class="date">` | 2025.01.26 |
| 本文 | `<div class="content">` 内 | 自由に記述 |

### 3. index.html に記事を追加

`index.html` の `.article-list` 内に新しい記事へのリンクを追加します：

```html
<li>
  <a href="articles/YYYYMMDD-slug.html">
    <span class="date">YYYY.MM.DD</span>
    <span class="title">記事タイトル</span>
  </a>
</li>
```

**注意:** 新しい記事はリストの一番上に追加してください。

## 使用できるHTML要素

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

## スタイルのカスタマイズ

`style.css` 冒頭の変数を変更することでサイト全体の見た目を変更できます：

```css
:root {
  --color-bg: #fefefc;          /* 背景色 */
  --color-text: #888;           /* 本文色 */
  --color-text-light: #aaa;     /* 薄い文字色 */
  --color-link: #707070;        /* リンク色 */
  --color-heading: #888;        /* 見出し色 */
  --max-width: 600px;           /* コンテンツ最大幅 */
}
```

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
