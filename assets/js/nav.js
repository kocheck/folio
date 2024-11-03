document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");

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

    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggle.setAttribute("data-theme", savedTheme);
});
