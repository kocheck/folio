document.addEventListener("DOMContentLoaded", () => {
    const skipLink = document.querySelector(".skip-link");

    skipLink.addEventListener("click", (e) => {
        e.preventDefault();
        const mainContent = document.getElementById("main-content");
        mainContent.setAttribute("tabindex", "-1");
        mainContent.focus();

        // Remove tabindex after focus (cleanup)
        mainContent.addEventListener(
            "blur",
            () => {
                mainContent.removeAttribute("tabindex");
            },
            { once: true }
        );
    });
});
