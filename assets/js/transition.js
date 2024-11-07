document.addEventListener("DOMContentLoaded", () => {
    const contentWrapper = document.querySelector(".content-wrapper");
    const fixedElements = document.querySelectorAll(
        ".hamburger, nav, .nav-logo"
    );

    // Handle all internal link clicks
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");

        // Skip transition for PDF files
        if (link && link.href.endsWith(".pdf")) {
            return;
        }

        if (link && link.href && link.href.startsWith(window.location.origin)) {
            e.preventDefault();

            // Start transition
            contentWrapper.classList.add("transitioning");
            fixedElements.forEach((el) => el.classList.add("transitioning"));

            // Wait for transition to complete
            setTimeout(() => {
                window.location.href = link.href;
            }, 300); // Match this with your $transition-duration
        }
    });

    // Handle page load
    window.addEventListener("pageshow", () => {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            contentWrapper.classList.remove("transitioning");
            fixedElements.forEach((el) => el.classList.remove("transitioning"));
        }, 50);
    });

    // Handle initial page load
    if (document.readyState === "complete") {
        contentWrapper.classList.remove("transitioning");
        fixedElements.forEach((el) => el.classList.remove("transitioning"));
    } else {
        window.addEventListener("load", () => {
            contentWrapper.classList.remove("transitioning");
            fixedElements.forEach((el) => el.classList.remove("transitioning"));
        });
    }
});
