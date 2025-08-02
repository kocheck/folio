/**
 * Work Card Web Component
 *
 * A reusable card component for displaying portfolio work items with:
 * - Responsive design with hover effects
 * - Support for tags, company info, and descriptions
 * - Proper image handling with fallbacks
 * - Custom events for analytics tracking
 * - Shadow DOM encapsulation
 *
 * Usage:
 * <work-card
 *   title="Project Title"
 *   description="Brief project description"
 *   image="/path/to/image.jpg"
 *   url="/project-url"
 *   company="Company Name"
 *   tags="React,TypeScript,Design">
 * </work-card>
 *
 * Attributes:
 * - title: Project title (required)
 * - description: Brief description
 * - image: Thumbnail image URL
 * - url: Link to project details
 * - company: Company or client name
 * - tags: Comma-separated list of tags
 *
 * Events:
 * - work-card:click - Fired when card is clicked
 *
 * @author Kyle Kocheck
 */
class WorkCard extends HTMLElement {
    // Define which attributes trigger re-renders when changed
    static get observedAttributes() {
        return ["title", "description", "image", "url", "tags", "company"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.initEventListeners();
    }

    /**
     * Called when observed attributes change
     * Triggers a re-render to reflect the new values
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
            // Re-initialize event listeners after re-render
            this.initEventListeners();
        }
    }

    /**
     * Renders the work card HTML structure with embedded styles
     * Uses CSS custom properties for theming integration
     */
    render() {
        if (!this.shadowRoot) return;

        // Extract attribute values with fallbacks
        const title = this.getAttribute("title") || "";
        const description = this.getAttribute("description") || "";
        const image = this.getAttribute("image") || "";
        const url = this.getAttribute("url") || "#";
        const company = this.getAttribute("company") || "";
        const tags =
            this.getAttribute("tags")
                ?.split(",")
                .map((tag) => tag.trim()) || [];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    /* Inherit CSS custom properties from parent document */
                    --card-bg: var(--gray-3, #f8f9fa);
                    --card-border: var(--gray-6, #e9ecef);
                    --card-hover-bg: var(--gray-4, #f1f3f4);
                    --card-hover-border: var(--gray-7, #dee2e6);
                    --text-primary: var(--text-primary, #1a1a1a);
                    --text-secondary: var(--text-secondary, #666);
                    --text-tertiary: var(--text-tertiary, #888);
                }

                .work-card {
                    display: block;
                    text-decoration: none;
                    color: inherit;
                    background: var(--card-bg);
                    border: 1px solid var(--card-border);
                    border-radius: 8px;
                    overflow: hidden;
                    will-change: transform;
                    transition: transform 0.2s ease,
                                border-color 0.2s ease,
                                background-color 0.2s ease;
                }

                .work-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--card-hover-border);
                    background: var(--card-hover-bg);
                }

                /* Image container with fixed aspect ratio */
                .work-card__media {
                    aspect-ratio: 16/9;
                    overflow: hidden;
                    background: var(--gray-2, #f8f9fa);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .work-card__media img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .work-card:hover .work-card__media img {
                    transform: scale(1.05);
                }

                /* Content area styling */
                .work-card__content {
                    padding: 1.5rem;
                }

                .work-card__content h3 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.25rem;
                    font-weight: 600;
                    line-height: 1.3;
                    color: var(--text-primary);
                }

                .company {
                    display: block;
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin-bottom: 0.75rem;
                    font-weight: 500;
                }

                .work-card__description {
                    margin: 0 0 1rem 0;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    color: var(--text-secondary);
                }

                /* Tag styling */
                .tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .tag {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background: var(--gray-4, #f1f3f4);
                    color: var(--text-tertiary);
                    border-radius: 1rem;
                    font-size: 0.8125rem;
                    font-weight: 500;
                    border: 1px solid var(--gray-5, #e5e7eb);
                    transition: all 0.2s ease;
                }

                .work-card:hover .tag {
                    background: var(--gray-5, #e5e7eb);
                    border-color: var(--gray-6, #d1d5db);
                }

                /* Placeholder for missing images */
                .placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-tertiary);
                    font-size: 0.875rem;
                    background: var(--gray-2, #f8f9fa);
                }

                /* Mobile responsive adjustments */
                @media (max-width: 768px) {
                    .work-card__content {
                        padding: 1rem;
                    }

                    .work-card__content h3 {
                        font-size: 1.125rem;
                    }
                }

                /* Focus styles for accessibility */
                .work-card:focus {
                    outline: 2px solid var(--focus-color, #0066cc);
                    outline-offset: 2px;
                }

                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                    .work-card,
                    .work-card__media img,
                    .tag {
                        transition: none;
                    }

                    .work-card:hover {
                        transform: none;
                    }

                    .work-card:hover .work-card__media img {
                        transform: none;
                    }
                }
            </style>

            <a href="${url}" class="work-card">
                <div class="work-card__media">
                    ${
                        image
                            ? `<img src="${image}" alt="${title}" loading="lazy">`
                            : `<div class="placeholder">No image available</div>`
                    }
                </div>
                <div class="work-card__content">
                    <h3>${title}</h3>
                    ${company ? `<span class="company">${company}</span>` : ""}
                    ${
                        description
                            ? `<p class="work-card__description">${description}</p>`
                            : ""
                    }
                    ${
                        tags.length > 0
                            ? `
                        <div class="tags">
                            ${tags
                                .map((tag) => `<span class="tag">${tag}</span>`)
                                .join("")}
                        </div>
                    `
                            : ""
                    }
                </div>
            </a>
        `;
    }

    /**
     * Initializes event listeners for the work card
     * Sets up click tracking and image error handling
     */
    initEventListeners() {
        if (!this.shadowRoot) return;

        const card = this.shadowRoot.querySelector(".work-card");
        const img = this.shadowRoot.querySelector("img");

        // Add click tracking for analytics
        if (card) {
            // Remove existing listener to prevent duplicates
            card.removeEventListener("click", this.handleCardClick);
            card.addEventListener("click", this.handleCardClick.bind(this));
        }

        // Handle image loading errors
        if (img) {
            img.removeEventListener("error", this.handleImageError);
            img.addEventListener("error", this.handleImageError.bind(this));
        }
    }

    /**
     * Handles card click events
     * Dispatches custom event for analytics tracking
     */
    handleCardClick(e) {
        // Dispatch custom event for analytics or tracking
        this.dispatchEvent(
            new CustomEvent("work-card:click", {
                detail: {
                    title: this.getAttribute("title"),
                    url: this.getAttribute("url"),
                    company: this.getAttribute("company"),
                    timestamp: new Date().toISOString(),
                },
                bubbles: true,
            })
        );
    }

    /**
     * Handles image loading errors
     * Replaces failed images with placeholder
     */
    handleImageError() {
        if (!this.shadowRoot) return;

        const media = this.shadowRoot.querySelector(".work-card__media");
        if (media) {
            media.innerHTML =
                '<div class="placeholder">Image failed to load</div>';
        }
    }

    /**
     * Public API Methods
     */

    /**
     * Updates multiple card attributes at once
     * @param {Object} data - Object containing attribute key-value pairs
     * @example
     * workCard.updateCard({
     *   title: 'New Title',
     *   description: 'New description',
     *   tags: 'React,Vue,Angular'
     * });
     */
    updateCard(data) {
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                this.setAttribute(key, String(value));
            }
        });
    }

    /**
     * Gets all current card data as an object
     * @returns {Object} Current card attributes
     */
    getCardData() {
        return {
            title: this.getAttribute("title") || "",
            description: this.getAttribute("description") || "",
            image: this.getAttribute("image") || "",
            url: this.getAttribute("url") || "",
            company: this.getAttribute("company") || "",
            tags: this.getAttribute("tags") || "",
        };
    }

    /**
     * Validates that the card has required attributes
     * @returns {boolean} Whether the card is valid
     */
    isValid() {
        const title = this.getAttribute("title");
        return Boolean(title && title.trim());
    }
}

// Register the custom element
customElements.define("work-card", WorkCard);
