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

document.addEventListener("DOMContentLoaded", () => {
  loadHTML(".sidebar", "/sidebar.html");
});

let lastScrollTop = window.scrollY;
const sidebar = document.getElementsByClassName('sidebar');

window.addEventListener("scroll", function () {
  if (window.innerWidth <= 768 && sidebar) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < lastScrollTop) {
      sidebar.classList.add('hidden'); // hide on scroll down
    } else {
      sidebar.classList.remove('hidden'); // show on scroll up
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
});