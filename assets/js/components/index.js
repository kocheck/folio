/**
 * Portfolio Web Components Bundle
 *
 * This file contains all web components bundled together for Hugo.
 *
 * @author Kyle Kocheck
 */

// Register web components when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Initializing Portfolio Web Components...");

    // Register components
    if (!customElements.get("portfolio-lightbox")) {
        customElements.define("portfolio-lightbox", PortfolioLightbox);
    }
    if (!customElements.get("work-card")) {
        customElements.define("work-card", WorkCard);
    }

    initializeLightbox();
    initializeWorkCards();
    initializeUtilities();

    console.log("✅ Web Components initialized successfully");
});

// Portfolio Lightbox Component (simplified)
class PortfolioLightbox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.images = [];
        this.currentIndex = 0;
        this.isOpen = false;
    }

    connectedCallback() {
        this.render();
        this.initEventListeners();
        this.registerImages();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: none;
                    font-family: var(--font-body, sans-serif);
                }
                :host(.open) { display: flex; }
                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .lightbox-image {
                    max-width: 90vw;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 4px;
                }
                .lightbox-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    font-size: 24px;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    cursor: pointer;
                }
            </style>
            <div class="lightbox-overlay">
                <img class="lightbox-image" alt="Lightbox image" />
                <button class="lightbox-close" aria-label="Close lightbox">×</button>
            </div>
        `;
    }

    initEventListeners() {
        const overlay = this.shadowRoot.querySelector(".lightbox-overlay");
        const closeBtn = this.shadowRoot.querySelector(".lightbox-close");

        overlay.addEventListener(
            "click",
            function (e) {
                if (e.target === overlay) this.close();
            }.bind(this)
        );

        closeBtn.addEventListener(
            "click",
            function () {
                this.close();
            }.bind(this)
        );

        document.addEventListener(
            "keydown",
            function (e) {
                if (this.isOpen && e.key === "Escape") this.close();
            }.bind(this)
        );
    }

    registerImages() {
        this.images = Array.from(
            document.querySelectorAll("img.lightbox-trigger")
        );
        const self = this;
        this.images.forEach(function (img, index) {
            img.style.cursor = "pointer";
            img.addEventListener("click", function () {
                self.open(index);
            });
        });
    }

    open(index) {
        if (this.images.length === 0) return;

        this.currentIndex = index || 0;
        this.isOpen = true;
        this.classList.add("open");

        const img = this.shadowRoot.querySelector(".lightbox-image");
        const currentImg = this.images[this.currentIndex];
        img.src = currentImg.dataset.full || currentImg.src;
        img.alt = currentImg.alt || "Lightbox image";

        document.body.style.overflow = "hidden";
    }

    close() {
        this.isOpen = false;
        this.classList.remove("open");
        document.body.style.overflow = "";
    }

    refresh() {
        this.registerImages();
    }
}

// Work Card Component
class WorkCard extends HTMLElement {
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

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute("title") || "";
        const description = this.getAttribute("description") || "";
        const image = this.getAttribute("image") || "";
        const url = this.getAttribute("url") || "#";
        const company = this.getAttribute("company") || "";
        const tags = this.getAttribute("tags") || "";

        const tagArray = tags
            .split(",")
            .map(function (tag) {
                return tag.trim();
            })
            .filter(Boolean);

        const imageHtml = image
            ? '<img class="work-card__image" src="' +
              image +
              '" alt="' +
              title +
              '" loading="lazy" />'
            : '<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: var(--text-medium, rgba(239, 239, 239, 0.6)); font-size: 14px;">No image available</div>';

        const tagsHtml =
            tagArray.length > 0
                ? '<div class="work-card__tags">' +
                  tagArray
                      .map(function (tag) {
                          return (
                              '<span class="work-card__tag">' + tag + "</span>"
                          );
                      })
                      .join("") +
                  "</div>"
                : "";

        this.shadowRoot.innerHTML =
            `
            <style>
                :host {
                    display: block;
                    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    font-weight: 225;
                    line-height: 1.5;
                }
                .work-card {
                    display: block;
                    text-decoration: none;
                    color: inherit;
                    background: var(--gray-3, #1c1c1c);
                    border: 1px solid var(--gray-6, rgba(239, 239, 239, 0.12));
                    border-radius: var(--border-radius, 8px);
                    overflow: hidden;
                    will-change: transform;
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                                border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                                background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .work-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--gray-7, rgba(239, 239, 239, 0.2));
                    background: var(--gray-4, #212121);
                }
                .work-card:hover .work-card__title {
                    color: var(--creative-9, #00d9ff);
                    text-decoration-color: var(--creative-9, #00d9ff);
                }
                .work-card__media {
                    aspect-ratio: 16/9;
                    overflow: hidden;
                }
                .work-card__image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .work-card__content {
                    padding: 1rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .work-card__title {
                    margin: 0 0 0.5rem 0;
                    color: var(--gray-12, #efefef);
                    transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                                text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    text-decoration: underline;
                    text-decoration-color: transparent;
                    text-underline-offset: 4px;
                    font-family: 'Epicene Display', Georgia, 'Times New Roman', serif;
                    font-weight: 300;
                    font-size: clamp(1.5rem, calc(1.5rem + 0.5vw), 1.75rem);
                    line-height: 1.2;
                    letter-spacing: 0.015em;
                }
                .work-card__company {
                    color: var(--personality-9, #ff6b6b);
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    font-size: inherit;
                }
                .work-card__description {
                    margin-bottom: 0.5rem;
                    color: var(--gray-11, rgba(239, 239, 239, 0.8));
                    line-height: 1.5;
                    flex: 1;
                    font-size: inherit;
                }
                .work-card__tags {
                    display: flex;
                    gap: 0.25rem;
                    flex-wrap: wrap;
                }
                .work-card__tag {
                    background: var(--gray-5, rgba(149, 156, 157, 0.1));
                    border: 1px solid var(--gray-6, rgba(239, 239, 239, 0.12));
                    color: var(--gray-11, rgba(239, 239, 239, 0.8));
                    padding: 0.25rem 0.5rem;
                    border-radius: var(--border-radius-sm, 4px);
                    font-size: 0.875rem;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .work-card__tag:hover {
                    background: var(--gray-6, rgba(149, 156, 157, 0.2));
                    color: var(--gray-12, #efefef);
                    border-color: var(--gray-7, rgba(239, 239, 239, 0.2));
                }
            </style>

            <a href="` +
            url +
            `" class="work-card" role="article">
                <div class="work-card__media">
                    ` +
            imageHtml +
            `
                </div>

                <div class="work-card__content">
                    <div class="work-card__header">
                        <h3 class="work-card__title">` +
            (title || "Untitled Project") +
            `</h3>
                        ` +
            (company
                ? '<p class="work-card__company">' + company + "</p>"
                : "") +
            `
                    </div>

                    ` +
            (description
                ? '<p class="work-card__description">' + description + "</p>"
                : "") +
            `

                    ` +
            tagsHtml +
            `
                </div>
            </a>
        `;
    }

    initEventListeners() {
        const card = this.shadowRoot.querySelector(".work-card");
        if (!card) return;

        const self = this;
        card.addEventListener("click", function (e) {
            self.dispatchEvent(
                new CustomEvent("work-card:click", {
                    detail: {
                        title: self.getAttribute("title"),
                        url: self.getAttribute("url"),
                        company: self.getAttribute("company"),
                    },
                    bubbles: true,
                })
            );
        });
    }
}

function initializeLightbox() {
    const triggers = document.querySelectorAll(".lightbox-trigger");

    if (triggers.length > 0) {
        console.log(
            "📸 Found " +
                triggers.length +
                " lightbox triggers, initializing lightbox..."
        );

        let lightbox = document.querySelector("portfolio-lightbox");
        if (!lightbox) {
            lightbox = document.createElement("portfolio-lightbox");
            document.body.appendChild(lightbox);
        }
    }
}

function initializeWorkCards() {
    console.log("🃏 Work cards initialized");

    document.addEventListener("work-card:click", function (e) {
        console.log("🃏 Work card clicked:", e.detail);
    });
}

function initializeUtilities() {
    window.PortfolioComponents = {
        createWorkCard: function (data) {
            const card = document.createElement("work-card");
            Object.entries(data).forEach(function ([key, value]) {
                if (value) {
                    card.setAttribute(key, String(value));
                }
            });
            return card;
        },
        refreshLightbox: function () {
            const lightbox = document.querySelector("portfolio-lightbox");
            if (lightbox && typeof lightbox.refresh === "function") {
                lightbox.refresh();
                console.log("📸 Lightbox refreshed");
            }
        },
    };

    console.log("🛠️ Utility functions registered");
}
