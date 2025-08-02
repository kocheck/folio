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
        updateFavicons(newTheme);
        themeToggle.setAttribute("data-theme", newTheme);
        themeToggle.setAttribute(
            "aria-label",
            `Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`
        );
        themeToggle.setAttribute("role", "switch");
        themeToggle.setAttribute(
            "aria-checked",
            currentTheme === "dark" ? "true" : "false"
        );

        if (window.Analytics) {
            Analytics.trackThemeChange(newTheme);
        }
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
    updateFavicons(savedTheme);

    // Listen for system theme changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
                const newTheme = e.matches ? "dark" : "light";
                document.documentElement.setAttribute("data-theme", newTheme);
                themeToggle.setAttribute("data-theme", newTheme);
                updateFavicons(newTheme);
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

// Add this function to handle favicon updates
function updateFavicons(theme) {
    const sizes = ["16", "32", "48"];
    sizes.forEach((size) => {
        const favicon = document.querySelector(`link[sizes="${size}x${size}"]`);
        if (favicon) {
            favicon.href = `/favicon/favicon-${size}-${theme}.png`;
        }
    });

    // Update ICO favicon
    const icoFavicon = document.querySelector('link[type="image/x-icon"]');
    if (icoFavicon) {
        icoFavicon.href = `/favicon/favicon-${theme}.ico`;
    }
}
