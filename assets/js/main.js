// Import all modules
import "./nav.js";
import "./transition.js";
import "./lightbox.js";
import "./quick-view.js";
import "./search.js";

// Initialize features only when needed
document.addEventListener("DOMContentLoaded", () => {
    // Initialize lightbox only if triggers exist
    if (document.querySelectorAll(".lightbox-trigger").length > 0) {
        initializeLightbox();
    }

    // Initialize search only if search container exists
    if (document.querySelector(".search-container")) {
        initializeSearch();
    }
});
