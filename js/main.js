(function () {
    "use strict";

    const spinner = document.getElementById("spinner");
    const backToTop = document.querySelector(".back-to-top");
    const navLinks = Array.from(document.querySelectorAll(".navbar .nav-link[href^='#']"));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);
    const revealItems = Array.from(document.querySelectorAll(".js-reveal"));

    const setActiveNav = (id) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    window.addEventListener("load", () => {
        window.setTimeout(() => spinner && spinner.classList.remove("show"), 150);
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        revealItems.forEach((item) => revealObserver.observe(item));

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        }, { rootMargin: "-45% 0px -45% 0px", threshold: 0.02 });

        sections.forEach((section) => sectionObserver.observe(section));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const updateBackToTop = () => {
        if (!backToTop) {
            return;
        }

        backToTop.classList.toggle("is-visible", window.scrollY > 500);
    };

    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const navbar = document.getElementById("mainNavbar");

            if (!navbar || !navbar.classList.contains("show")) {
                return;
            }

            const collapse = bootstrap.Collapse.getOrCreateInstance(navbar, { toggle: false });
            collapse.hide();
        });
    });
})();