// Fixing the sidebar
function loadHTML(selector, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Could not load ${file}`);
      return response.text();
    })
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch(error => {
      console.error(error);
    });
}

// Loading blog post list
function loadBlogPosts(containerId = "blog-list", indexFile = "posts/index.json") {
  fetch(indexFile)
    .then(res => res.json())
    .then(postFiles => {
      const blogList = document.getElementsByClassName(containerId);

      postFiles.forEach(file => {
        const url = `posts/${file}`;

        fetch(url)
          .then(res => res.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const title = doc.querySelector('h1.post-title')?.textContent || file;
            const timeElem = doc.querySelector('time');
            const date = timeElem?.getAttribute('datetime') || 'Unknown';
            const readableDate = timeElem?.textContent || date;
            const topic = doc.querySelector('.label')?.textContent || 'Uncategorized';

            blogList.innerHTML += `
            <p>ciao</p>
            //   <div class="post-meta">
            //     <a href="${url}">${title}</a> ·
            //     <time datetime="${date}">${readableDate}</time> ·
            //     <span class="label" data-topic="${topic.toLowerCase()}">${topic}</span>
            //   </div>
            `;
          })
          .catch(err => {
            console.error(`Failed to fetch post: ${url}`, err);
          });
      });
    })
    .catch(err => {
      console.error('Failed to load post index:', err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML(".sidebar", "/sidebar.html");
});

loadBlogPosts();