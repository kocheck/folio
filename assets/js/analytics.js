function trackEvent(eventName, properties = {}) {
    if (!window.mixpanel) {
        console.warn("Mixpanel not available");
        return;
    }

    const baseProperties = {
        environment: window.hugo.environment,
        url: window.location.href,
        timestamp: new Date().toISOString(),
    };

    if (window.hugo.environment === "development") {
        console.log("Development Mode - Track Event:", eventName, {
            ...baseProperties,
            ...properties,
        });
    } else {
        try {
            mixpanel.track(eventName, {
                ...baseProperties,
                ...properties,
            });
        } catch (error) {
            console.error("Error tracking event:", error);
        }
    }
}

// Initialize analytics after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Ensure mixpanel is available
    const initInterval = setInterval(() => {
        if (window.mixpanelLoaded) {
            clearInterval(initInterval);
            initializeAnalytics();
        }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(() => {
        clearInterval(initInterval);
        console.warn("Mixpanel initialization timed out");
    }, 5000);
});

function initializeAnalytics() {
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
}
