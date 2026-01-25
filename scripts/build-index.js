/**
 * 記事一覧ビルドスクリプト
 *
 * archive/ と daily/ フォルダ内のHTMLファイルをスキャンし、
 * それぞれの一覧ページを自動生成します。
 *
 * 使い方: node scripts/build-index.js
 */

const fs = require('fs');
const path = require('path');

// パス設定
const ROOT_DIR = path.join(__dirname, '..');

// ビルド対象の設定
const BUILD_TARGETS = [
  {
    sourceDir: path.join(ROOT_DIR, 'archive'),
    indexPath: path.join(ROOT_DIR, 'archive.html'),
    linkPrefix: 'archive/'
  },
  {
    sourceDir: path.join(ROOT_DIR, 'daily'),
    indexPath: path.join(ROOT_DIR, 'daily.html'),
    linkPrefix: 'daily/'
  }
];

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
function generateArticleListHTML(articles, linkPrefix) {
  return articles.map(article => `        <li>
          <a href="${linkPrefix}${article.fileName}">
            <span class="date">${article.date}</span>
            <span class="title">${article.title}</span>
          </a>
        </li>`).join('\n');
}

/**
 * 一覧ページを更新
 */
function updateIndex(indexPath, articleListHTML) {
  let indexContent = fs.readFileSync(indexPath, 'utf-8');

  // <ul class="article-list">...</ul> の中身を置換
  const listRegex = /(<ul class="article-list">)([\s\S]*?)(<\/ul>)/;
  const newContent = indexContent.replace(listRegex, `$1\n${articleListHTML}\n      $3`);

  fs.writeFileSync(indexPath, newContent, 'utf-8');
}

/**
 * 単一ターゲットのビルド処理
 */
function buildTarget(target) {
  const targetName = path.basename(target.sourceDir);
  console.log(`\nBuilding ${targetName} index...`);

  // ディレクトリが存在しない場合はスキップ
  if (!fs.existsSync(target.sourceDir)) {
    console.log(`  Directory not found: ${target.sourceDir}`);
    return;
  }

  // HTMLファイルを取得
  const files = fs.readdirSync(target.sourceDir)
    .filter(file => file.endsWith('.html'));

  if (files.length === 0) {
    console.log(`  No articles found in ${targetName}/`);
    // 空の一覧で更新
    updateIndex(target.indexPath, '');
    return;
  }

  // 各記事の情報を抽出
  const articles = files.map(file => {
    const filePath = path.join(target.sourceDir, file);
    return extractArticleInfo(filePath);
  });

  // 日付の降順でソート（新しい記事が上）
  articles.sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  // 記事一覧HTMLを生成
  const articleListHTML = generateArticleListHTML(articles, target.linkPrefix);

  // 一覧ページを更新
  updateIndex(target.indexPath, articleListHTML);

  console.log(`  Updated ${path.basename(target.indexPath)} with ${articles.length} articles:`);
  articles.forEach(article => {
    console.log(`    - ${article.date} ${article.title}`);
  });
}

/**
 * メイン処理
 */
function main() {
  console.log('Building article indexes...');

  BUILD_TARGETS.forEach(target => {
    buildTarget(target);
  });

  console.log('\nDone!');
}

main();
