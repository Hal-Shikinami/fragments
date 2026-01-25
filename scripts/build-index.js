/**
 * 記事一覧ビルドスクリプト
 *
 * articles/ フォルダ内のHTMLファイルをスキャンし、
 * index.html の記事一覧を自動生成します。
 *
 * 使い方: node scripts/build-index.js
 */

const fs = require('fs');
const path = require('path');

// パス設定
const ROOT_DIR = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT_DIR, 'articles');
const INDEX_PATH = path.join(ROOT_DIR, 'index.html');

/**
 * 記事HTMLからメタ情報を抽出
 */
function extractArticleInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);

  // <title>タグからタイトルを抽出
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : fileName;

  // <span class="date">から日付を抽出
  const dateMatch = content.match(/<span class="date">([^<]+)<\/span>/);
  const dateStr = dateMatch ? dateMatch[1].trim() : '';

  // ソート用の日付（YYYY.MM.DD → YYYYMMDD）
  const sortKey = dateStr.replace(/\./g, '');

  return {
    fileName,
    title,
    date: dateStr,
    sortKey
  };
}

/**
 * 記事一覧のHTML生成
 */
function generateArticleListHTML(articles) {
  return articles.map(article => `        <li>
          <a href="articles/${article.fileName}">
            <span class="date">${article.date}</span>
            <span class="title">${article.title}</span>
          </a>
        </li>`).join('\n');
}

/**
 * index.htmlを更新
 */
function updateIndex(articleListHTML) {
  let indexContent = fs.readFileSync(INDEX_PATH, 'utf-8');

  // <ul class="article-list">...</ul> の中身を置換
  const listRegex = /(<ul class="article-list">)([\s\S]*?)(<\/ul>)/;
  const newContent = indexContent.replace(listRegex, `$1\n${articleListHTML}\n      $3`);

  fs.writeFileSync(INDEX_PATH, newContent, 'utf-8');
}

/**
 * メイン処理
 */
function main() {
  console.log('Building article index...');

  // articlesフォルダ内のHTMLファイルを取得
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(file => file.endsWith('.html'));

  if (files.length === 0) {
    console.log('No articles found.');
    return;
  }

  // 各記事の情報を抽出
  const articles = files.map(file => {
    const filePath = path.join(ARTICLES_DIR, file);
    return extractArticleInfo(filePath);
  });

  // 日付の降順でソート（新しい記事が上）
  articles.sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  // 記事一覧HTMLを生成
  const articleListHTML = generateArticleListHTML(articles);

  // index.htmlを更新
  updateIndex(articleListHTML);

  console.log(`Updated index.html with ${articles.length} articles:`);
  articles.forEach(article => {
    console.log(`  - ${article.date} ${article.title}`);
  });
}

main();
