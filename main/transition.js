document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page-transition");

  
  setTimeout(() => {
    page.classList.add("active");
  }, 10);

  document.querySelectorAll("a[href$='.html']").forEach(link => {
    link.addEventListener("click", e => {
      const target = link.getAttribute("href");

      
      if (!target || target.startsWith("http")) return;

      e.preventDefault();
      page.classList.add("exit");

      setTimeout(() => {
        window.location.href = target;
      }, 500); 
    });
  });
});

