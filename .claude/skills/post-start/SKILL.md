---
name: post-start
description: 投稿作業を開始する。「投稿します」「投稿開始」「投稿作業を始めます」などと言われたときに使う。
disable-model-invocation: true
---

投稿作業の準備を行う。以下の手順を順番に実行すること。

## 手順

1. **ブランチ切り替え**: `post/article` ブランチにチェックアウトする
2. **最新のmainを取得**: `origin/main` をfetchしてmergeする
   - ローカルに未コミットの変更がある場合は `git stash` で退避し、merge後に `git stash pop` で復元する
3. **状態確認**: 現在のブランチと状態を表示する

## 実行コマンド例

```bash
git checkout post/article
git fetch origin main
git merge origin/main
```

ローカル変更がある場合:
```bash
git stash
git checkout post/article
git fetch origin main
git merge origin/main
git stash pop
```

## 完了報告

準備が完了したら、現在のブランチ名と状態をユーザーに伝える。
