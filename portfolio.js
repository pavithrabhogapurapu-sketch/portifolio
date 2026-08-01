// =========================
// PROJECT POPUP
// =========================

const popup = document.getElementById("popup");

const closePopup = document.getElementById("closePopup");

const projectButtons = document.querySelectorAll(".project-btn");

projectButtons.forEach(function(button){

    button.addEventListener("click", function(event){

        event.preventDefault();

        popup.style.display = "flex";

    });

});

closePopup.addEventListener("click", function(){

    popup.style.display = "none";

});
// Close popup when clicking outside

popup.addEventListener("click", function(event){

    if(event.target === popup){

        popup.style.display = "none";

    }

});
// =========================
// TYPING ANIMATION
// =========================

// =========================
// TYPING ANIMATION
// =========================

const typingText = document.getElementById("typing-text");

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

            wordIndex++;

            if (wordIndex === words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);

}

typeEffect();

// =========================
// DARK MODE
// =========================

// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

}

themeToggle.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        themeToggle.textContent = "☀️";

    }

    else{

        localStorage.setItem("theme","light");

        themeToggle.textContent = "🌙";

    }

});
// =========================
// BACK TO TOP BUTTON
// =========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function(){

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }

    else{

        topBtn.style.display = "none";

    }

});
topBtn.addEventListener("click", function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// =========================
// SCROLL REVEAL
// =========================

const hiddenElements = document.querySelectorAll(".hidden");

window.addEventListener("scroll", revealSections);

revealSections();

function revealSections(){

    hiddenElements.forEach(function(element){

        const elementTop = element.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if(elementTop < windowHeight - 100){

            element.classList.add("show");

        }

    });

}