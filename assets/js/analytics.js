// Track events with consistent properties
function trackEvent(eventName, properties = {}) {
    if (!window.mixpanel || !window.mixpanelLoaded) {
        console.warn("Mixpanel not available");
        return;
    }

    const baseProperties = {
        environment: window.hugo?.environment || "production",
        url: window.location.href,
        timestamp: new Date().toISOString(),
        theme: document.documentElement.getAttribute("data-theme"),
    };

    if (window.hugo?.environment === "development") {
        console.log("Development Mode - Track Event:", eventName, {
            ...baseProperties,
            ...properties,
        });
        return;
    }

    try {
        mixpanel.track(eventName, {
            ...baseProperties,
            ...properties,
        });
    } catch (error) {
        console.error("Error tracking event:", error);
    }
}

// Enhanced Analytics object with more tracking functions
const Analytics = {
    // Page view tracking
    trackPageView: () => {
        const properties = {
            title: document.title,
            path: window.location.pathname,
            referrer: document.referrer,
        };

        // Add section-specific properties
        if (window.location.pathname.startsWith("/work/")) {
            properties.content_type = "project";
            properties.project_title =
                document.querySelector("h1")?.textContent;
        }

        trackEvent("page_viewed", properties);
    },

    // Project interactions
    trackProjectView: (projectTitle) => {
        trackEvent("project_viewed", {
            project_title: projectTitle,
            section: "work",
        });
    },

    // External link tracking
    trackExternalLink: (url, linkText) => {
        trackEvent("external_link_clicked", {
            destination: url,
            link_text: linkText,
        });
    },

    // Theme changes
    trackThemeChange: (theme) => {
        trackEvent("theme_changed", {
            new_theme: theme,
            previous_theme: document.documentElement.getAttribute("data-theme"),
        });
    },

    // Search interactions
    trackSearch: (query, resultCount) => {
        trackEvent("search_performed", {
            query: query,
            result_count: resultCount,
            search_section: "projects",
        });
    },

    // Resume download
    trackResumeDownload: () => {
        trackEvent("resume_downloaded", {
            source_page: window.location.pathname,
        });
    },

    // Contact interactions
    trackContactClick: (method) => {
        trackEvent("contact_initiated", {
            contact_method: method,
        });
    },

    // Image interactions
    trackImageView: (imageUrl, caption) => {
        trackEvent("image_viewed", {
            image_url: imageUrl,
            image_caption: caption,
        });
    },
};

// Initialize analytics after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Wait for Mixpanel to be ready
    const initInterval = setInterval(() => {
        if (window.mixpanelLoaded) {
            clearInterval(initInterval);
            Analytics.trackPageView();
        }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(() => {
        clearInterval(initInterval);
        console.warn("Mixpanel initialization timed out");
    }, 5000);
});

// Export for use in other modules
window.Analytics = Analytics;
