---
name: post-publish
description: 記事を本投稿（公開）する。「本投稿してください」「公開してください」「デプロイしてください」などと言われたときに使う。
disable-model-invocation: true
---

記事の本投稿を行う。コミット、プッシュ、PR作成、マージまで一連の作業を実行する。

## 手順

1. **変更確認**: `git status` と `git diff` で変更内容を確認し、ユーザーに概要を伝える
2. **ビルド**: `node scripts/build-index.js` を実行して記事一覧を更新する
3. **コミット**: 変更をステージングしてコミットする
   - コミットメッセージの形式: `post: YYYY.MM.DDの日記を追加` または `post: 記事を追加`（内容に応じて適切に）
   - 複数記事や更新の場合は本文に箇条書きで詳細を記載する
   - Co-Authored-Byを付ける
4. **プッシュ**: `git push -u origin post/article` でリモートにプッシュ
5. **PR作成**: `gh pr create` でmainへのPRを作成する
   - タイトル: コミットメッセージと同様
   - 本文: 変更の概要
6. **マージ**: `gh pr merge --merge` でPRをマージする
7. **完了報告**: マージ完了をユーザーに伝える

## コミットメッセージの形式

```
post: YYYY.MM.DDの日記を追加

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

複数の変更がある場合:
```
post: 記事内容を更新

- 日記を追加
- aboutページを更新

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

## 注意事項

- コミット前に必ず `git status` で変更内容を確認する
- templates/ フォルダはgitignoreされているのでコミット対象外
- .claude/ フォルダは必要に応じてコミットに含める
- ビルドで生成される daily.html, archive.html の変更もコミットに含める
