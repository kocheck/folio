class Search {
    constructor() {
        this.searchInput = document.getElementById("projectSearch");
        this.clearButton = document.querySelector(".search-clear");
        this.resultsCount = document.querySelector(".results-count");
        this.workCards = document.querySelectorAll(".work-card");

        if (!this.searchInput) return; // Exit if we're not on a page with search

        this.bindEvents();
    }

    bindEvents() {
        // Debounced search handler
        this.searchInput.addEventListener(
            "input",
            debounce(() => {
                const query = this.searchInput.value.toLowerCase().trim();

                // Track search if analytics exists
                if (query && window.Analytics) {
                    window.Analytics.trackSearch(query);
                }

                // Toggle clear button
                this.clearButton.hidden = !query;

                // Update ARIA
                this.searchInput.setAttribute(
                    "aria-expanded",
                    query ? "true" : "false"
                );

                let matchCount = 0;

                // Filter cards
                this.workCards.forEach((card) => {
                    const title =
                        card.querySelector("h3")?.textContent.toLowerCase() ||
                        "";
                    const company =
                        card
                            .querySelector(".company")
                            ?.textContent.toLowerCase() || "";
                    const tags = Array.from(card.querySelectorAll(".tag")).map(
                        (tag) => tag.textContent.toLowerCase()
                    );
                    const description =
                        card
                            .querySelector(".work-card__description")
                            ?.textContent.toLowerCase() || "";

                    const isMatch =
                        !query ||
                        title.includes(query) ||
                        company.includes(query) ||
                        tags.some((tag) => tag.includes(query)) ||
                        description.includes(query);

                    card.style.display = isMatch ? "block" : "none";
                    if (isMatch) matchCount++;
                });

                // Update results count
                if (this.resultsCount) {
                    this.resultsCount.textContent = `${matchCount} project${
                        matchCount !== 1 ? "s" : ""
                    } found`;
                }
            }, 250)
        );

        // Clear button handler
        if (this.clearButton) {
            this.clearButton.addEventListener("click", () => {
                this.searchInput.value = "";
                this.searchInput.focus();
                this.workCards.forEach(
                    (card) => (card.style.display = "block")
                );
                this.clearButton.hidden = true;
                if (this.resultsCount) {
                    this.resultsCount.textContent = `${this.workCards.length} projects found`;
                }
            });
        }
    }
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize search when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new Search();
});
