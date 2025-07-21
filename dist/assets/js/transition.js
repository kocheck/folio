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

            // Wait slightly longer for the transition
            setTimeout(() => {
                window.location.href = link.href;
            }, 400);
        }
    });

    // Handle page show events (includes bfcache restoration)
    window.addEventListener("pageshow", (event) => {
        // Check if the page is being restored from bfcache
        if (event.persisted) {
            // Reset any state that might have been preserved
            contentWrapper.classList.remove("transitioning");
            fixedElements.forEach((el) => el.classList.remove("transitioning"));
        }

        // Small delay to ensure DOM is ready
        setTimeout(() => {
            contentWrapper.classList.remove("transitioning");
            fixedElements.forEach((el) => el.classList.remove("transitioning"));
        }, 50);
    });
});
