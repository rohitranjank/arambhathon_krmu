document.getElementById("enterBtn").addEventListener("click", () => {
  const splash = document.querySelector(".splash");
  splash.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "index2.html"; 
  }, 600);
});
