/* =========================================================
   HABARANA LAKE BREEZE CABANA
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const backToTop = document.getElementById("backToTop");
const currentYear = document.getElementById("currentYear");


/* =========================================================
   YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function closeMenu() {

    if (!menuToggle || !mainNav) {
        return;
    }

    menuToggle.classList.remove("active");
    mainNav.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    document.body.classList.remove("menu-open");
}


function openMenu() {

    if (!menuToggle || !mainNav) {
        return;
    }

    menuToggle.classList.add("active");
    mainNav.classList.add("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    document.body.classList.add("menu-open");
}


if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });
}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);


/* =========================================================
   BACK TO TOP
========================================================= */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
}

window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);

updateBackToTop();


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    revealElements.length &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => revealObserver.observe(element)
    );

} else {

    revealElements.forEach(
        element => element.classList.add("visible")
    );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   PREVENT EMPTY LINKS
========================================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => event.preventDefault()
        );

    });


/* =========================================================
   IMAGE FALLBACK
========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


/* =========================================================
   EXTERNAL LINKS
========================================================= */

document
    .querySelectorAll('a[href^="http"]')
    .forEach(link => {

        const currentHost =
            window.location.hostname;

        try {

            const target =
                new URL(link.href);

            if (
                target.hostname !==
                currentHost
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        } catch (error) {

            console.warn(
                "Invalid external link:",
                link.href
            );

        }

    });


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.info(
    "Habarana Lake Breeze Cabana website loaded successfully."
);
