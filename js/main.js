document.addEventListener("DOMContentLoaded", function() {
  // ヘッダーのブログタイトル
  const headerTitle = document.querySelector("header > h1 > a");
  if (headerTitle) {
    headerTitle.textContent = SITE_CONFIG.blogTitle;
  }

  // フッターのコピーライト
  const footer = document.querySelector("footer > p");
  if (footer) {
    footer.innerHTML = `&copy; ${SITE_CONFIG.year} ${SITE_CONFIG.blogTitle}`;
  }

  // タイトルタグ（ページ固有の部分があれば「ページ名 - サイト名」形式に）
  const pageTitle = document.title.trim();
  if (pageTitle) {
    document.title = `${pageTitle} - ${SITE_CONFIG.blogTitle}`;
  } else {
    document.title = SITE_CONFIG.blogTitle;
  }
});
