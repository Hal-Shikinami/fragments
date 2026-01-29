---
name: build
description: 記事一覧ページを再生成する。「ビルドして」「一覧を更新して」「インデックスを更新して」などと言われたときに使う。
disable-model-invocation: true
---

記事一覧ページ（daily.html, archive.html）を再生成する。

## 手順

1. **ビルド実行**: `node scripts/build-index.js` を実行する
2. **結果確認**: `git diff daily.html archive.html` で変更内容を確認する
3. **報告**: 更新された記事一覧の内容をユーザーに伝える

## 仕組み

build-index.js は以下を行う:
- `archive/` と `daily/` フォルダのHTMLファイルをスキャン
- 各ファイルから `<title>` と `<span class="date">` を抽出
- 日付の降順（新しい順）でソート
- `archive.html` と `daily.html` の `<ul class="article-list">` 内を更新
