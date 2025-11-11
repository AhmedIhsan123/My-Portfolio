const hamburger = document.getElementById("hamburgerBtn");
const navList = document.getElementById("nav-list");

hamburger.addEventListener("click", () => {
	navList.classList.toggle("show");
});
