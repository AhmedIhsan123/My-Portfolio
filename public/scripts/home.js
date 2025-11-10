// Inititalize Typed.js
new Typed("#typed", {
	strings: ["Ahmed Ihsan.", "a game developer.", "a software engineer."],
	typeSpeed: 80, // typing speed (ms per character)
	backSpeed: 60, // backspacing speed
	loop: true, // loop through all strings
	backDelay: 5000,
});

/* ------ Event Listners ------ */
// Navigation buttons
document.querySelectorAll('#nav-list a[href^="#"]').forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		const target = link.getAttribute("href");
		if (target === "#") {
			// scroll to top
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			document.querySelector(target).scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	});
});

const hamburger = document.getElementById("hamburgerBtn");
const navList = document.getElementById("nav-list");

hamburger.addEventListener("click", () => {
	navList.classList.toggle("show");
});

/* ------ Slideshow code ------ */
// Change slide function
function changeSlide(slideshowName, n) {
	let slideshow = slideShows[slideshowName];
	slideshow.slideIndex += n;
	slideshow.showSlide(slideshow.slideIndex);
}

// Constant to store slideshows
const slideShows = {
	oxygenRushSlideshow: {
		slideIndex: 1,
		showSlide: function (n) {
			let slides = document.getElementsByClassName("OR-slide");

			if (n > slides.length) this.slideIndex = 1;
			if (n < 1) this.slideIndex = slides.length;

			for (let i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
			}

			slides[this.slideIndex - 1].style.display = "block";
		},
	},

	escapeRoomSlideshow: {
		slideIndex: 1,
		showSlide: function (n) {
			let slides = document.getElementsByClassName("ER-slide");

			if (n > slides.length) this.slideIndex = 1;
			if (n < 1) this.slideIndex = slides.length;

			for (let i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
			}

			slides[this.slideIndex - 1].style.display = "block";
		},
	},
};

// Show starting images for project cards
slideShows.oxygenRushSlideshow.showSlide(
	slideShows.oxygenRushSlideshow.slideIndex
);
slideShows.escapeRoomSlideshow.showSlide(
	slideShows.escapeRoomSlideshow.slideIndex
);
