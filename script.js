
/* STEP 6.1: ACTIVE NAVIGATION LINK */

// Select all navigation links
const navLinks = document.querySelectorAll(".nav-links a");

// Select all main sections
const sections = document.querySelectorAll("main section");

// Detect scrolling
window.addEventListener("scroll", function () {

    let currentSection = "";

    // Check each section's position
    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }

    });

    // Update the navigation links
    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});
