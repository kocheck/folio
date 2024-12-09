document.addEventListener("DOMContentLoaded", () => {
    const contentWrapper = document.querySelector(".content-wrapper");
    const fixedElements = document.querySelectorAll(
        ".hamburger, nav, .nav-logo"
    );
    const transitionDuration = 400; // Match your CSS duration

    const handleTransition = (url, isBack = false) => {
        contentWrapper.classList.add("transitioning");
        fixedElements.forEach((el) => el.classList.add("transitioning"));

        return new Promise((resolve) => {
            setTimeout(() => {
                if (!isBack) {
                    window.location.href = url;
                }
                resolve();
            }, transitionDuration);
        });
    };

    // Handle link clicks
    document.addEventListener("click", async (e) => {
        const link = e.target.closest("a");

        if (
            link?.href &&
            link.href.startsWith(window.location.origin) &&
            !link.href.endsWith(".pdf")
        ) {
            e.preventDefault();
            await handleTransition(link.href);
        }
    });

    // Handle browser back/forward
    window.addEventListener("popstate", async () => {
        await handleTransition(null, true);
    });
});
