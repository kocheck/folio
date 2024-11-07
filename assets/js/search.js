class ProjectSearch {
    constructor() {
        this.searchInput = document.getElementById("projectSearch");
        this.clearButton = document.querySelector(".search-clear");
        this.resultsCount = document.querySelector(".results-count");
        this.searchResults = document.getElementById("searchResults");
        this.projects = this.initializeProjects();
        this.fuse = this.initializeFuse();

        this.bindEvents();
    }

    initializeProjects() {
        return Array.from(document.querySelectorAll(".work-card")).map(
            (card) => ({
                element: card,
                title: card.querySelector("h3").textContent,
                company: card.querySelector(".company")?.textContent || "",
                tags: Array.from(card.querySelectorAll(".tag")).map(
                    (tag) => tag.textContent
                ),
                description:
                    card.querySelector(".work-card__description")
                        ?.textContent || "",
                caseStudy: card.getAttribute("data-case-study") || "",
            })
        );
    }

    initializeFuse() {
        const fuseOptions = {
            keys: [
                { name: "title", weight: 0.4 },
                { name: "tags", weight: 0.3 },
                { name: "company", weight: 0.2 },
                { name: "description", weight: 0.1 },
                { name: "caseStudy", weight: 0.1 },
            ],
            threshold: 0.3,
            distance: 100,
        };
        return new Fuse(this.projects, fuseOptions);
    }

    bindEvents() {
        this.searchInput.addEventListener("input", () => this.handleSearch());
        this.clearButton.addEventListener("click", () => this.clearSearch());

        // Handle keyboard navigation
        this.searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.clearSearch();
            }
        });
    }

    handleSearch() {
        const searchTerm = this.searchInput.value;

        // Toggle clear button visibility
        this.clearButton.hidden = !searchTerm;

        // Update ARIA attributes
        this.searchInput.setAttribute(
            "aria-expanded",
            searchTerm ? "true" : "false"
        );

        if (!searchTerm) {
            this.showAllProjects();
            return;
        }

        const results = this.fuse.search(searchTerm);
        this.updateResults(results);
    }

    updateResults(results) {
        // Hide all projects first
        this.projects.forEach((project) => {
            project.element.style.display = "none";
        });

        // Show matching projects
        results.forEach((result) => {
            result.item.element.style.display = "";
        });

        // Update results count for screen readers
        const count = results.length;
        this.resultsCount.textContent = `${count} project${
            count !== 1 ? "s" : ""
        } found`;
    }

    showAllProjects() {
        this.projects.forEach((project) => {
            project.element.style.display = "";
        });
        this.resultsCount.textContent = "";
    }

    clearSearch() {
        this.searchInput.value = "";
        this.searchInput.focus();
        this.clearButton.hidden = true;
        this.searchInput.setAttribute("aria-expanded", "false");
        this.showAllProjects();
    }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".search-container")) {
        new ProjectSearch();
    }
});
