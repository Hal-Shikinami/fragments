/**
 * サイト共通スクリプト
 * ヘッダー、フッター、タイトルタグを自動生成します
 */
document.addEventListener("DOMContentLoaded", function() {

  // ============================================
  // パス判定
  // ============================================
  // サブフォルダ内のページは親ディレクトリへのリンクが必要
  const isInSubfolder = location.pathname.includes("/archive/") || location.pathname.includes("/daily/");
  const pathPrefix = isInSubfolder ? "../" : "";

  // 現在のページのファイル名を取得（例: "about.html"）
  const currentPage = location.pathname.split("/").pop() || "index.html";

  // 現在のページがナビゲーションに含まれているか確認
  const currentNavItem = SITE_CONFIG.nav.find(item => item.href === currentPage);

  // ============================================
  // ヘッダー生成
  // ============================================
  // サブフォルダと親ページの対応
  const folderToPage = {
    "archive": "archive.html",
    "daily": "daily.html"
  };

  // 現在のフォルダ名を取得
  const pathParts = location.pathname.split("/");
  const currentFolder = pathParts[pathParts.length - 2];
  const parentPage = folderToPage[currentFolder];

  const header = document.querySelector("header");
  if (header) {
    // ナビゲーションリンクを生成
    // 現在のページまたは親ページには class="current" を付与
    const navLinks = SITE_CONFIG.nav.map(item => {
      const isCurrent = currentPage === item.href || parentPage === item.href;
      const currentClass = isCurrent ? ' class="current"' : '';
      return `<a href="${pathPrefix}${item.href}"${currentClass}>${item.label}</a>`;
    }).join("\n      ");

    // ヘッダーのHTMLを挿入
    header.innerHTML = `
    <h1><a href="${pathPrefix}index.html">${SITE_CONFIG.blogTitle}</a></h1>
    <nav>
      ${navLinks}
    </nav>`;
  }

  // ============================================
  // フッター生成
  // ============================================
  const footer = document.querySelector("footer > p");
  if (footer) {
    footer.innerHTML = `&copy; ${SITE_CONFIG.year} ${SITE_CONFIG.blogTitle}`;
  }

  // ============================================
  // 戻りリンク生成
  // ============================================
  // フォルダごとの戻り先設定
  const backLinkConfig = {
    "archive": { href: "archive.html", label: "書庫" },
    "daily": { href: "daily.html", label: "日々" }
  };

  const backLink = document.querySelector(".back-link");
  if (backLink) {
    const config = backLinkConfig[currentFolder];

    if (config) {
      backLink.innerHTML = `<a href="../${config.href}">← ${config.label}に戻る</a>`;
    }
  }

  // ============================================
  // タイトルタグ生成
  // ============================================
  // 優先順位:
  // 1. ナビゲーションページ → config.jsのlabelを使用
  // 2. 記事ページなど → HTMLの<title>タグの値を使用
  // 3. 上記がない場合 → サイト名のみ
  let pageTitle = "";

  if (currentNavItem) {
    // ナビゲーションページの場合はconfig.jsのlabelを使用
    pageTitle = currentNavItem.label;
  } else {
    // それ以外はHTMLで設定されたタイトルを使用
    pageTitle = document.title.trim();
  }

  // タイトルを設定（ページ名がある場合は「ページ名 - サイト名」形式）
  if (pageTitle) {
    document.title = `${pageTitle} - ${SITE_CONFIG.blogTitle}`;
  } else {
    document.title = SITE_CONFIG.blogTitle;
  }
});
