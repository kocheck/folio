function trackEvent(eventName, properties = {}) {
    mixpanel.track(eventName, {
        ...properties,
        environment: window.hugo.environment,
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Track page views with additional data
    trackEvent("Page View", {
        page: window.location.pathname,
        title: document.title,
        referrer: document.referrer,
    });

    // Track work card clicks
    document.querySelectorAll(".work-card").forEach((card) => {
        card.addEventListener("click", function () {
            trackEvent("Work Card Click", {
                project_title: this.querySelector("h3").textContent,
                company: this.querySelector(".company")?.textContent || "",
                tags: Array.from(this.querySelectorAll(".tag")).map(
                    (tag) => tag.textContent
                ),
            });
        });
    });

    // Track theme toggle
    document
        .querySelector(".theme-toggle")
        ?.addEventListener("click", function () {
            const newTheme =
                document.documentElement.getAttribute("data-theme") === "dark"
                    ? "light"
                    : "dark";
            trackEvent("Theme Toggle", {
                new_theme: newTheme,
            });
        });

    // Track contact form submissions
    document
        .querySelector(".contact-form")
        ?.addEventListener("submit", function (e) {
            trackEvent("Contact Form Submit");
        });

    // Track search usage
    const searchInput = document.getElementById("projectSearch");
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener("input", function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.value) {
                    trackEvent("Search Projects", {
                        search_term: this.value,
                    });
                }
            }, 1000);
        });
    }
});
