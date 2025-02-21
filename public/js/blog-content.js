const CONTENT_STORAGE_KEY = "blogContents";

function renderBlogList() {
  const blogList = document.getElementById("blogList");
  const posts = JSON.parse(localStorage.getItem(CONTENT_STORAGE_KEY) || "[]");

  if (posts.length === 0) {
    blogList.innerHTML = `
            <div style="text-align: center; grid-column: 1/-1; padding: 2rem;">
                <h2>No blog posts yet!</h2>
                <p>Be the first to create a post.</p>
            </div>
        `;
    return;
  }

  blogList.innerHTML = posts
    .map(
      (post) => `
        <div class="blog-card">
            <img src="${post.image}" alt="${post.title}" class="blog-image">
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <button class="share-button" onclick="shareBlog(${post.id})">
                    Share Post
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

function shareBlog(id) {
  const posts = JSON.parse(localStorage.getItem(CONTENT_STORAGE_KEY) || "[]");
  const post = posts.find((p) => p.id === id);

  if (post) {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .catch((err) => console.log("Error sharing:", err));
    } else {
      const shareText = `${post.title}\n\n${post.excerpt}\n\n${window.location.href}`;
      navigator.clipboard
        .writeText(shareText)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Unable to copy link"));
    }
  }
}

document.addEventListener("DOMContentLoaded", renderBlogList);

document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollBtn");

  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
