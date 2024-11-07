// Initialize Fuse.js with project data
function initializeSearch() {
    const projects = Array.from(document.querySelectorAll(".work-card")).map(
        (card) => ({
            element: card,
            title: card.querySelector("h3").textContent,
            company: card.querySelector(".company")?.textContent || "",
            tags: Array.from(card.querySelectorAll(".tag")).map(
                (tag) => tag.textContent
            ),
            description:
                card.querySelector(".work-card__description")?.textContent ||
                "",
        })
    );

    const fuseOptions = {
        keys: [
            { name: "title", weight: 0.4 },
            { name: "tags", weight: 0.3 },
            { name: "company", weight: 0.2 },
            { name: "description", weight: 0.1 },
        ],
        threshold: 0.3,
        distance: 100,
    };

    const fuse = new Fuse(projects, fuseOptions);
    const searchInput = document.getElementById("projectSearch");

    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value;

        if (!searchTerm) {
            // Show all projects when search is empty
            projects.forEach((project) => {
                project.element.style.display = "";
            });
            return;
        }

        const results = fuse.search(searchTerm);

        // Hide all projects first
        projects.forEach((project) => {
            project.element.style.display = "none";
        });

        // Show matching projects
        results.forEach((result) => {
            result.item.element.style.display = "";
        });
    });
}

document.addEventListener("DOMContentLoaded", initializeSearch);
