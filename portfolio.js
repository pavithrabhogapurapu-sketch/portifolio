document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // HAMBURGER MENU
    // =========================

    (function initMobileMenu() {
        const menuToggle = document.getElementById("menu-toggle");
        const navLinks = document.getElementById("nav-links");

        if (!menuToggle || !navLinks) return;

        function openMenu() {
            navLinks.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
        }

        function closeMenu() {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

        function toggleMenu() {
            const isOpen = navLinks.classList.contains("active");
            isOpen ? closeMenu() : openMenu();
        }

        menuToggle.addEventListener("click", toggleMenu);

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when clicking outside of it
        document.addEventListener("click", function (event) {
            const clickedInsideNav =
                navLinks.contains(event.target) || menuToggle.contains(event.target);

            if (!clickedInsideNav && navLinks.classList.contains("active")) {
                closeMenu();
            }
        });

        // Close menu with the Escape key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && navLinks.classList.contains("active")) {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Reset menu state if the viewport grows back to desktop size
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    })();

    // =========================
    // PROJECT POPUP
    // =========================

    (function initProjectPopup() {
        const popup = document.getElementById("popup");
        const closePopupBtn = document.getElementById("closePopup");
        const projectButtons = document.querySelectorAll(".project-btn");

        if (!popup || !closePopupBtn) return;

        function openPopup(event) {
            event.preventDefault();
            popup.style.display = "flex";
            closePopupBtn.focus();
        }

        function closePopup() {
            popup.style.display = "none";
        }

        projectButtons.forEach(function (button) {
            button.addEventListener("click", openPopup);
        });

        closePopupBtn.addEventListener("click", closePopup);

        // Close popup when clicking the overlay (outside the content box)
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                closePopup();
            }
        });

        // Close popup with the Escape key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && popup.style.display === "flex") {
                closePopup();
            }
        });
    })();

    // =========================
    // TYPING ANIMATION
    // =========================

    (function initTypingEffect() {
        const typingText = document.getElementById("typing-text");
        if (!typingText) return;

        const words = [
            "Aspiring Frontend Developer",
            "Web Developer",
            "JavaScript Learner"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (!isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }
            } else {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(typeEffect, isDeleting ? 60 : 100);
        }

        typeEffect();
    })();

    // =========================
    // DARK MODE
    // =========================

    (function initThemeToggle() {
        const themeToggle = document.getElementById("theme-toggle");
        if (!themeToggle) return;

        function applyTheme(theme) {
            const isDark = theme === "dark";
            document.body.classList.toggle("dark-mode", isDark);
            themeToggle.textContent = isDark ? "☀️" : "🌙";
            themeToggle.setAttribute("aria-pressed", String(isDark));
        }

        // Load saved theme (defaults to light)
        const savedTheme = localStorage.getItem("theme") || "light";
        applyTheme(savedTheme);

        themeToggle.addEventListener("click", function () {
            const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
            applyTheme(nextTheme);
            localStorage.setItem("theme", nextTheme);
        });
    })();

    // =========================
    // BACK TO TOP BUTTON
    // =========================

    (function initBackToTop() {
        const topBtn = document.getElementById("topBtn");
        if (!topBtn) return;

        function toggleVisibility() {
            topBtn.style.display = window.scrollY > 300 ? "block" : "none";
        }

        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility();

        topBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    })();

    // =========================
    // SCROLL REVEAL
    // =========================

    (function initScrollReveal() {
        const hiddenElements = document.querySelectorAll(".hidden");
        if (!hiddenElements.length) return;

        function revealSections() {
            const windowHeight = window.innerHeight;

            hiddenElements.forEach(function (element) {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < windowHeight - 100) {
                    element.classList.add("show");
                }
            });
        }

        window.addEventListener("scroll", revealSections);
        revealSections();
    })();

    // =========================
    // CONTACT FORM
    // =========================

    (function initContactForm() {
        const form = document.getElementById("contact-form");
        const status = document.getElementById("form-status");
        if (!form) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                if (status) {
                    status.textContent = "Please fill in all fields with a valid email address.";
                }
                return;
            }

            // No backend is connected yet, so we confirm receipt locally.
            if (status) {
                status.textContent = "Thanks for reaching out! I'll get back to you soon.";
            }

            form.reset();
        });
    })();

});
