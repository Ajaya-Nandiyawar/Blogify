const CONTENT_STORAGE_KEY = "blogContents";

document
  .getElementById("blogForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = "Publishing...";

    try {
      const title = document.getElementById("title").value.trim();
      const excerpt = document.getElementById("excerpt").value.trim();
      const content = document.getElementById("content").value.trim();
      const imageFile = document.getElementById("image").files[0];

      if (!title || !excerpt || !content || !imageFile) {
        throw new Error("Please fill all fields");
      }

      const reader = new FileReader();

      const imageData = await new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      const post = {
        id: Date.now(),
        title,
        excerpt,
        content,
        image: imageData,
        createdAt: new Date().toISOString(),
      };

      let posts = JSON.parse(localStorage.getItem(CONTENT_STORAGE_KEY) || "[]");

      posts.unshift(post);

      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(posts));

      document.getElementById("blogForm").reset();
      renderExistingPosts();

      alert("Post published successfully!");
    } catch (error) {
      alert(error.message || "Failed to publish post. Please try again.");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = "Publish Post";
    }
  });

function renderExistingPosts() {
  const postList = document.getElementById("postList");
  const posts = JSON.parse(localStorage.getItem(CONTENT_STORAGE_KEY) || "[]");

  if (posts.length === 0) {
    postList.innerHTML = "<p>No posts yet. Create your first post!</p>";
    return;
  }

  postList.innerHTML = `
            <h3>Existing Posts</h3>
            ${posts
              .map(
                (post) => `
                <div class="post-item">
                    <div>
                        <strong>${post.title}</strong>
                        <small>${new Date(
                          post.createdAt
                        ).toLocaleDateString()}</small>
                    </div>
                    <button onclick="deletePost(${
                      post.id
                    })" class="delete-btn">Delete</button>
                </div>
            `
              )
              .join("")}
        `;
}

function deletePost(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    let posts = JSON.parse(localStorage.getItem(CONTENT_STORAGE_KEY) || "[]");
    posts = posts.filter((post) => post.id !== id);
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(posts));
    renderExistingPosts();
  }
}

renderExistingPosts();

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
