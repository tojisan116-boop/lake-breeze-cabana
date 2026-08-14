"use strict";

/* =========================================================
   Habarana Lake Breeze Cabana
   Shared Website JavaScript
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        }
    );


    /* Close menu after selecting a page */

    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "open"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }
            );

        });


    /* Close when tapping outside */

    document.addEventListener(
        "click",
        event => {

            if (
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mainNav.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const siteHeader =
    document.getElementById("siteHeader");


function updateHeader() {

    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 30) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    function updateBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateBackToTop();

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


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
   PREVENT EMPTY HASH LINKS FROM JUMPING
========================================================= */

document
    .querySelectorAll(
        'a[href="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });


/* =========================================================
   IMAGE ERROR HANDLING
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

                image.setAttribute(
                    "aria-label",
                    "Image unavailable"
                );

            }
        );

    });


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        /* Close mobile navigation */

        if (
            mainNav &&
            menuToggle
        ) {

            mainNav.classList.remove(
                "open"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* Close gallery lightbox */

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        if (
            lightbox &&
            lightbox.classList.contains("open")
        ) {

            lightbox.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);


/* =========================================================
   DATE VALIDATION HELPER
========================================================= */

function setMinimumDate(
    input
) {

    if (!input) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    input.min =
        `${year}-${month}-${day}`;

}


document
    .querySelectorAll(
        'input[type="date"]'
    )
    .forEach(
        setMinimumDate
    );


/* =========================================================
   EXTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[target="_blank"]'
    )
    .forEach(link => {

        const existing =
            link.getAttribute(
                "rel"
            ) || "";


        const values =
            new Set(
                existing
                    .split(" ")
                    .filter(Boolean)
            );


        values.add("noopener");
        values.add("noreferrer");


        link.setAttribute(
            "rel",
            Array.from(values).join(" ")
        );

    });


/* =========================================================
   PAGE READY
========================================================= */

document.documentElement.classList.add(
    "js-ready"
);
