/**
 * Portfolio Lightbox Web Component
 *
 * A vanilla web component that provides an image lightbox with:
 * - Touch gestures (swipe left/right for navigation, swipe up/down to close)
 * - Keyboard navigation (arrow keys, escape)
 * - Loading states
 * - Auto-discovery of lightbox trigger images
 * - Shadow DOM encapsulation for style isolation
 *
 * Usage:
 * 1. Add this component to your page: <portfolio-lightbox></portfolio-lightbox>
 * 2. Add class "lightbox-trigger" to any image you want to open in lightbox
 * 3. Optionally add data-full attribute with high-res image URL
 *
 * Events:
 * - lightbox:open - Fired when lightbox opens
 * - lightbox:close - Fired when lightbox closes
 *
 * @author Kyle Kocheck
 */
class PortfolioLightbox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Component state
        this.images = []; // Array of all lightbox trigger images
        this.currentIndex = 0; // Current image index
        this.isOpen = false; // Whether lightbox is currently open

        // Touch handling properties for swipe gestures
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50; // Minimum distance for a swipe to register
    }

    connectedCallback() {
        this.render();
        this.initEventListeners();
        this.registerImages();
    }

    disconnectedCallback() {
        // Clean up event listeners to prevent memory leaks
        if (this.handleKeydown) {
            document.removeEventListener("keydown", this.handleKeydown);
        }
        document.body.style.overflow = "";
    }

    /**
     * Renders the lightbox HTML structure with embedded styles
     * Uses Shadow DOM for complete style encapsulation
     */
    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: none;
                    z-index: 1000;
                    align-items: center;
                    justify-content: center;
                }

                /* Active state shows the lightbox */
                :host(.active) {
                    display: flex;
                }

                .lightbox__content {
                    max-width: 90%;
                    max-height: 90vh;
                    position: relative;
                    transition: transform 0.3s ease-out;
                }

                .lightbox__content img {
                    max-width: 100%;
                    max-height: 90vh;
                    object-fit: contain;
                    user-select: none;
                    -webkit-user-select: none;
                }

                /* Touch gesture visual feedback */
                .lightbox__content.swiping-left {
                    transform: translateX(-10%);
                }

                .lightbox__content.swiping-right {
                    transform: translateX(10%);
                }

                .lightbox__content.swiping-dismiss {
                    transform: translateY(10%);
                    opacity: 0.7;
                }

                /* Button styles with glassmorphism effect */
                .lightbox__close,
                .lightbox__prev,
                .lightbox__next {
                    position: absolute;
                    background: rgba(0, 0, 0, 0.4);
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 1rem 1.5rem;
                    border-radius: 50%;
                    backdrop-filter: blur(4px);
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                    transition: all 0.2s ease;
                }

                .lightbox__close:hover,
                .lightbox__prev:hover,
                .lightbox__next:hover {
                    background: rgba(0, 0, 0, 0.6);
                    transform: scale(1.1);
                }

                .lightbox__close:active,
                .lightbox__prev:active,
                .lightbox__next:active {
                    transform: scale(0.95);
                }

                /* Button positioning */
                .lightbox__close {
                    top: 1rem;
                    right: 1rem;
                }

                .lightbox__prev,
                .lightbox__next {
                    top: 50%;
                    transform: translateY(-50%);
                    width: 3rem;
                    height: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .lightbox__prev {
                    left: 1rem;
                }

                .lightbox__next {
                    right: 1rem;
                }

                /* Loading spinner */
                .lightbox__content::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 2rem;
                    height: 2rem;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                }

                .lightbox__content.loading::before {
                    opacity: 1;
                }

                @keyframes spin {
                    to {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }

                /* Mobile responsive adjustments */
                @media (max-width: 768px) {
                    .lightbox__prev,
                    .lightbox__next {
                        width: 2.5rem;
                        height: 2.5rem;
                        font-size: 1.5rem;
                    }

                    .lightbox__close {
                        font-size: 1.5rem;
                        padding: 0.75rem 1rem;
                    }
                }
            </style>

            <div class="lightbox__content">
                <button class="lightbox__close" aria-label="Close lightbox">×</button>
                <button class="lightbox__prev" aria-label="Previous image">‹</button>
                <button class="lightbox__next" aria-label="Next image">›</button>
                <img src="" alt="" />
            </div>
        `;
    }

    /**
     * Initializes all event listeners for the lightbox
     * Includes keyboard, touch, and click events
     */
    initEventListeners() {
        if (!this.shadowRoot) return;

        const closeBtn = this.shadowRoot.querySelector(".lightbox__close");
        const prevBtn = this.shadowRoot.querySelector(".lightbox__prev");
        const nextBtn = this.shadowRoot.querySelector(".lightbox__next");

        // Button click handlers
        if (closeBtn) closeBtn.addEventListener("click", () => this.close());
        if (prevBtn) prevBtn.addEventListener("click", () => this.prev());
        if (nextBtn) nextBtn.addEventListener("click", () => this.next());

        // Keyboard navigation (bound to document for global access)
        this.handleKeydown = (e) => {
            if (!this.isOpen) return;

            if (e.key === "Escape") this.close();
            if (e.key === "ArrowLeft") this.prev();
            if (e.key === "ArrowRight") this.next();
        };
        document.addEventListener("keydown", this.handleKeydown);

        // Touch events for swipe gestures
        this.addEventListener("touchstart", (e) => this.handleTouchStart(e), {
            passive: true,
        });
        this.addEventListener("touchmove", (e) => this.handleTouchMove(e), {
            passive: false,
        });
        this.addEventListener("touchend", (e) => this.handleTouchEnd(e));

        // Close on backdrop click
        this.addEventListener("click", (e) => {
            if (e.target === this) {
                this.close();
            }
        });
    }

    /**
     * Discovers and registers all images with 'lightbox-trigger' class
     * Sets up click handlers for each image
     */
    registerImages() {
        this.images = Array.from(
            document.querySelectorAll(".lightbox-trigger")
        );

        this.images.forEach((img, index) => {
            img.dataset.index = index;
            img.style.cursor = "pointer"; // Visual indicator

            img.addEventListener("click", (e) => {
                e.preventDefault();
                this.currentIndex = parseInt(e.currentTarget.dataset.index);
                // Use data-full attribute for high-res version, fallback to src
                const imageSrc = e.currentTarget.dataset.full || e.currentTarget.src;
                this.open(imageSrc);
            });
        });
    }

    /**
     * Touch event handlers for swipe gestures
     */
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.touchStartX || !this.touchStartY) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = this.touchStartX - currentX;
        const diffY = this.touchStartY - currentY;

        // Prevent default scrolling for horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.touchEndY = e.changedTouches[0].clientY;

        const diffX = this.touchStartX - this.touchEndX;
        const diffY = this.touchStartY - this.touchEndY;

        // Horizontal swipe for navigation
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > this.minSwipeDistance) {
                if (diffX > 0) {
                    this.next(); // Swipe left = next image
                } else {
                    this.prev(); // Swipe right = previous image
                }
            }
        } else {
            // Vertical swipe to dismiss
            if (Math.abs(diffY) > this.minSwipeDistance) {
                this.close();
            }
        }

        // Reset touch values
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
    }

    /**
     * Opens the lightbox with the specified image
     * @param {string} src - Image source URL
     */
    open(src) {
        if (!this.shadowRoot) return;

        const img = this.shadowRoot.querySelector(".lightbox__content img");
        const contentWrapper =
            this.shadowRoot.querySelector(".lightbox__content");

        if (!img || !contentWrapper) return;

        // Show loading spinner
        contentWrapper.classList.add("loading");

        // Preload image to avoid layout shifts
        const tempImage = new Image();
        tempImage.onload = () => {
            /** @type {HTMLImageElement} */ (img).src = src;
            /** @type {HTMLImageElement} */ (img).alt =
                this.images[this.currentIndex]?.alt || "Lightbox image";
            contentWrapper.classList.remove("loading");
        };
        tempImage.onerror = () => {
            contentWrapper.classList.remove("loading");
            console.error("Failed to load image:", src);
        };
        tempImage.src = src;

        // Show lightbox
        this.classList.add("active");
        this.isOpen = true;
        document.body.style.overflow = "hidden"; // Prevent background scrolling

        // Dispatch custom event for analytics or other integrations
        this.dispatchEvent(
            new CustomEvent("lightbox:open", {
                detail: { src, index: this.currentIndex },
                bubbles: true,
            })
        );
    }

    /**
     * Closes the lightbox
     */
    close() {
        this.classList.remove("active");
        this.isOpen = false;
        document.body.style.overflow = ""; // Restore scrolling

        this.dispatchEvent(
            new CustomEvent("lightbox:close", {
                bubbles: true,
            })
        );
    }

    /**
     * Navigate to previous image
     */
    prev() {
        if (this.images.length === 0) return;

        this.currentIndex =
            (this.currentIndex - 1 + this.images.length) % this.images.length;
        const src =
            this.images[this.currentIndex].dataset.full ||
            this.images[this.currentIndex].src;
        this.open(src);
    }

    /**
     * Navigate to next image
     */
    next() {
        if (this.images.length === 0) return;

        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        const src =
            this.images[this.currentIndex].dataset.full ||
            this.images[this.currentIndex].src;
        this.open(src);
    }

    /**
     * Public API Methods
     */

    /**
     * Manually open an image at a specific index
     * @param {string} src - Image source URL
     * @param {number} index - Image index in the collection
     */
    openImage(src, index = 0) {
        this.currentIndex = index;
        this.open(src);
    }

    /**
     * Refresh the image collection (useful for dynamically added content)
     */
    refresh() {
        this.registerImages();
    }
}

// Register the custom element
customElements.define("portfolio-lightbox", PortfolioLightbox);
