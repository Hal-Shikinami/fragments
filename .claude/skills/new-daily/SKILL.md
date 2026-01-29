---
name: new-daily
description: 新しい日記記事を作成する。「日記を書きたい」「新しい日記」「今日の日記を作って」などと言われたときに使う。
argument-hint: [タイトル]
---

新しい日記記事を作成する。

## 手順

1. **日付の決定**: 引数やユーザーの指示から日付を決定する。指定がなければ今日の日付を使う
2. **テンプレートのコピー**: `templates/daily.html` をベースに `daily/YYYYMMDD.html` を作成する
3. **プレースホルダーの置換**:
   - `【タイトル】` → 引数 `$ARGUMENTS` またはユーザーに確認したタイトル
   - `YYYY.MM.DD` → 実際の日付（ドット区切り）
   - 本文の「ここに本文を書きます。」は残す（ユーザーが後で編集する）
4. **ファイル作成の報告**: 作成したファイルパスを伝える

## テンプレート構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>【タイトル】</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <header></header>
  <main>
    <article>
      <header class="article-header">
        <span class="date">YYYY.MM.DD</span>
        <h1>【タイトル】</h1>
      </header>
      <div class="content">
        <p>ここに本文を書きます。</p>
      </div>
      <div class="back-link"></div>
    </article>
  </main>
  <footer><p></p></footer>
  <script src="../js/config.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
```

## ファイル名の規則

- 形式: `daily/YYYYMMDD.html`（ハイフンやドットなし）
- 例: `daily/20260130.html`

## 注意事項

- 同じ日付のファイルが既に存在する場合はユーザーに確認する
- タイトルが指定されていない場合はユーザーに聞く
