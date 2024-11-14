// Track events with consistent properties
function trackEvent(eventName, properties = {}) {
    if (!window.mixpanel) {
        console.warn("Mixpanel not available");
        return;
    }

    const baseProperties = {
        environment: window.hugo.environment,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        theme: document.documentElement.getAttribute("data-theme"),
    };

    if (window.hugo.environment === "development") {
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
    // Track initial page view
    Analytics.trackPageView();

    // Track external link clicks
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        // Track resume downloads
        if (link.href.includes("Resume.pdf")) {
            Analytics.trackResumeDownload();
            return;
        }

        // Track external links
        if (link.hostname !== window.location.hostname) {
            Analytics.trackExternalLink(link.href, link.textContent);
        }

        // Track contact clicks
        if (link.href.startsWith("mailto:")) {
            Analytics.trackContactClick("email");
        }
    });

    // Track image lightbox views
    document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const img = trigger.querySelector("img");
            const caption = trigger.nextElementSibling?.classList.contains(
                "caption"
            )
                ? trigger.nextElementSibling.textContent
                : null;
            Analytics.trackImageView(img.src, caption);
        });
    });
});

// Export for use in other modules
window.Analytics = Analytics;
