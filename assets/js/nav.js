document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
    const navGradient = document.querySelector(".nav-gradient");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        nav.classList.toggle("active");
    });

    const themeToggle = document.querySelector(".theme-toggle");

    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeToggle.setAttribute("data-theme", newTheme);
    });

    // Check for saved theme preference, otherwise use system preference
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };

    // Initialize theme
    const savedTheme = getPreferredTheme();
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggle.setAttribute("data-theme", savedTheme);

    // Listen for system theme changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
                const newTheme = e.matches ? "dark" : "light";
                document.documentElement.setAttribute("data-theme", newTheme);
                themeToggle.setAttribute("data-theme", newTheme);
            }
        });

    // Add scroll handler
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navGradient.classList.add("visible");
        } else {
            navGradient.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", handleScroll);
});
