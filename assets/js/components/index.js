/**
 * Web Components Index
 *
 * Main entry point for all portfolio web components.
 * This file imports all components and provides initialization logic
 * for integrating with Hugo's existing templating system.
 *
 * Features:
 * - Automatic component registration
 * - Backward compatibility with existing Hugo partials
 * - Progressive enhancement
 * - Utility functions for dynamic component creation
 *
 * @author Kyle Kocheck
 */

// Import all web components
import "./portfolio-lightbox.js";
import "./work-card.js";

/**
 * Component initialization when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Initializing Portfolio Web Components...");

    initializeLightbox();
    initializeWorkCards();
    initializeUtilities();

    console.log("✅ Web Components initialized successfully");
});

/**
 * Initialize the portfolio lightbox component
 * Creates and appends lightbox if lightbox triggers exist
 */
function initializeLightbox() {
    const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

    if (lightboxTriggers.length > 0) {
        console.log(
            `📸 Found ${lightboxTriggers.length} lightbox triggers, initializing lightbox...`
        );

        // Check if lightbox already exists
        let lightbox = document.querySelector("portfolio-lightbox");

        if (!lightbox) {
            lightbox = document.createElement("portfolio-lightbox");
            document.body.appendChild(lightbox);
        }

        // Listen for lightbox events for analytics
        lightbox.addEventListener("lightbox:open", (e) => {
            const customEvent = /** @type {CustomEvent} */ (e);
            console.log("📸 Lightbox opened:", customEvent.detail);
            // Add your analytics tracking here
            // gtag('event', 'lightbox_open', { image_src: customEvent.detail.src });
        });

        lightbox.addEventListener("lightbox:close", () => {
            console.log("📸 Lightbox closed");
            // Add your analytics tracking here
            // gtag('event', 'lightbox_close');
        });
    }
}

/**
 * Initialize work card components
 * Provides backward compatibility by converting existing cards
 */
function initializeWorkCards() {
    // Auto-discover and convert existing work cards for backward compatibility
    const existingWorkCards = document.querySelectorAll(
        ".work-card:not(work-card)"
    );

    if (existingWorkCards.length > 0) {
        console.log(
            `🃏 Found ${existingWorkCards.length} legacy work cards, converting to web components...`
        );

        existingWorkCards.forEach((card, index) => {
            // Only convert if it's not already a web component
            if (card.tagName.toLowerCase() !== "work-card") {
                try {
                    convertToWebComponent(/** @type {HTMLElement} */ (card));
                    console.log(
                        `✅ Converted legacy card ${index + 1}/${
                            existingWorkCards.length
                        }`
                    );
                } catch (error) {
                    console.warn(
                        `⚠️ Failed to convert card ${index + 1}:`,
                        error
                    );
                }
            }
        });
    }

    // Set up click tracking for all work cards (new and converted)
    document.addEventListener("work-card:click", (e) => {
        const customEvent = /** @type {CustomEvent} */ (e);
        console.log("🃏 Work card clicked:", customEvent.detail);
        // Add your analytics tracking here
        // gtag('event', 'work_card_click', {
        //     project_title: customEvent.detail.title,
        //     project_url: customEvent.detail.url
        // });
    });
}

/**
 * Initialize utility functions and global helpers
 */
function initializeUtilities() {
    // Make utility functions available globally
    /** @type {any} */ (window).PortfolioComponents = {
        /**
         * Creates a new work card web component
         * @param {Object} data - Card data
         * @returns {HTMLElement} Work card element
         */
        createWorkCard: (data) => {
            const card = document.createElement("work-card");
            Object.entries(data).forEach(([key, value]) => {
                if (value) card.setAttribute(key, String(value));
            });
            return card;
        },

        /**
         * Refreshes the lightbox to pick up new images
         */
        refreshLightbox: () => {
            const lightbox = document.querySelector("portfolio-lightbox");
            if (
                lightbox &&
                typeof (/** @type {any} */ (lightbox).refresh) === "function"
            ) {
                /** @type {any} */ (lightbox).refresh();
                console.log("📸 Lightbox refreshed");
            }
        },

        /**
         * Dynamically adds a new lightbox trigger
         * @param {HTMLImageElement} img - Image element
         * @param {string} fullSizeUrl - Optional full-size image URL
         */
        addLightboxTrigger: (img, fullSizeUrl = "") => {
            if (!img || img.tagName !== "IMG") {
                console.warn("⚠️ addLightboxTrigger: Invalid image element");
                return;
            }

            img.classList.add("lightbox-trigger");
            img.style.cursor = "pointer";

            if (fullSizeUrl) {
                img.dataset.full = fullSizeUrl;
            }

            // Refresh lightbox to pick up the new trigger
            /** @type {any} */ (window).PortfolioComponents.refreshLightbox();
        },

        /**
         * Updates theme colors for all components
         * @param {Object} colors - Color theme object
         */
        updateTheme: (colors) => {
            const root = document.documentElement;
            Object.entries(colors).forEach(([property, value]) => {
                root.style.setProperty(`--${property}`, value);
            });
            console.log("🎨 Theme updated for web components");
        },
    };

    console.log(
        "🛠️ Utility functions registered to window.PortfolioComponents"
    );
}

/**
 * Helper function to convert existing work cards to web components
 * Extracts data from existing HTML structure and creates web component
 * @param {HTMLElement} element - Existing card element to convert
 */
function convertToWebComponent(element) {
    // Extract data from existing card structure
    const titleElement = element.querySelector("h3, .work-card__title");
    const descriptionElement = element.querySelector(
        ".work-card__description, p"
    );
    const companyElement = element.querySelector(".company");
    const imageElement = element.querySelector("img");
    const tagElements = element.querySelectorAll(".tag");

    // Build data object
    const cardData = {
        title: titleElement?.textContent?.trim() || "",
        description: descriptionElement?.textContent?.trim() || "",
        company: companyElement?.textContent?.trim() || "",
        image: imageElement?.src || "",
        url:
            /** @type {HTMLAnchorElement} */ (element).href ||
            element.querySelector("a")?.href ||
            "#",
        tags: Array.from(tagElements)
            .map((tag) => tag.textContent?.trim())
            .filter(Boolean)
            .join(","),
    };

    // Validate that we have at least a title
    if (!cardData.title) {
        throw new Error("Cannot convert card: no title found");
    }

    // Create new web component
    const webComponent = document.createElement("work-card");
    Object.entries(cardData).forEach(([key, value]) => {
        if (value) webComponent.setAttribute(key, value);
    });

    // Copy any additional classes or data attributes
    if (element.className) {
        webComponent.className = element.className;
    }

    // Copy data attributes
    Object.keys(element.dataset).forEach((key) => {
        webComponent.dataset[key] = element.dataset[key];
    });

    // Replace the original element
    if (element.parentNode) {
        element.parentNode.replaceChild(webComponent, element);
    }

    return webComponent;
}

/**
 * Performance monitoring
 */
if (window.performance && window.performance.mark) {
    window.performance.mark("web-components-loaded");
}

// Export for module systems if needed
export { initializeLightbox, initializeWorkCards, convertToWebComponent };
