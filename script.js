
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

/* STEP 6.2: BACK TO TOP BUTTON */

const backToTopButton = document.getElementById("backToTop");

// Show button after scrolling down
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

// Scroll smoothly to the top when clicked
backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* STEP 6.3: PROJECT FILTERING */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Get the selected category
        const selectedFilter = button.dataset.filter;

        // Update the active filter button
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Show or hide project cards
        projectCards.forEach(function (card) {
            const category = card
                .querySelector(".project-category")
                .textContent.trim()
                .toLowerCase();

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});


/* STEP 6.4: TYPING ANIMATION */

const typingText = document.getElementById("typingText");

const phrases = [
    "Network Computing Student",
    "Networking Enthusiast",
    "FTTx Explorer",
    "IoT Learner"
];

let phraseIndex = 0;
let characterIndex = phrases[0].length;
let isDeleting = true;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent =
        currentPhrase.substring(0, characterIndex);

    let delay = isDeleting ? 45 : 85;

    if (!isDeleting && characterIndex === currentPhrase.length) {
        isDeleting = true;
        delay = 1500;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

setTimeout(typeEffect, 1500);


/* STEP 6.5: PROJECT DETAILS POPUP */


/* STEP 6.5: PROJECT DETAILS POPUP */

// Store the details of all five projects
const projectDetails = [
    {
        description:
            "A personal website developed using HTML, CSS and JavaScript to showcase my background, education, skills and academic projects.",
        technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
        description:
            "A proposed testbed for monitoring optical signal levels in an FTTx connection using optical sensing, an ESP32 and a monitoring dashboard.",
        technologies: ["ESP32", "Optical Sensing", "IoT", "FTTx"]
    },
    {
        description:
            "An academic group project involving the design of a mobile app prototype for Kuching's Autonomous Rapid Transit (ART) system. The prototype explores journey planning, ticket booking and travel information.",
        technologies: ["Wireframing", "Prototyping", "Usability Testing"]
    },
    {
        description:
            "Practical training at CENTEXS focused on 5G wireless infrastructure, telecommunications hardware and hands-on installation activities.",
        technologies: ["5G", "Telecom Hardware", "Wireless Infrastructure"]
    },
    {
        description:
            "Practical training at CENTEXS covering FTTx outside plant infrastructure and fibre-optic installation activities.",
        technologies: ["FTTx", "ODN"]
    }
];

// Select popup elements
const projectDetailsButtons = document.querySelectorAll(
    ".project-details-btn"
);

const projectModal = document.getElementById("projectModal");
const closeModalButton = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");

// Open the popup for the selected project
projectDetailsButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
        const card = button.closest(".project-card");
        const details = projectDetails[index];

        modalTitle.textContent =
            card.querySelector("h3").textContent.trim();

        modalDescription.textContent = details.description;

        // Clear the previous project's technology tags
        modalTech.replaceChildren();

        // Display the selected project's technology tags
        details.technologies.forEach(function (technology) {
            const tag = document.createElement("span");
            tag.textContent = technology;
            modalTech.appendChild(tag);
        });

        projectModal.classList.add("show");
        projectModal.setAttribute("aria-hidden", "false");
        closeModalButton.focus();
    });
});

// Close the popup
function closeProjectModal() {
    projectModal.classList.remove("show");
    projectModal.setAttribute("aria-hidden", "true");
}

// Close using the X button
closeModalButton.addEventListener("click", closeProjectModal);

// Close by clicking outside the popup content
projectModal.addEventListener("click", function (event) {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

// Close using the Escape key
document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        projectModal.classList.contains("show")
    ) {
        closeProjectModal();
    }
});
