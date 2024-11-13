class Lightbox {
    constructor() {
        this.lightbox = document.getElementById("imageLightbox");
        this.images = document.querySelectorAll(".lightbox-trigger");
        this.currentIndex = 0;
        this.contentWrapper = this.lightbox.querySelector(".lightbox__content");

        // Touch handling properties
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50; // Minimum distance for a swipe

        this.init();
    }

    init() {
        // Open lightbox
        this.images.forEach((img, index) => {
            img.dataset.index = index;
            img.addEventListener("click", (e) => {
                this.currentIndex = parseInt(e.target.dataset.index);
                this.open(e.target.dataset.full);
            });
        });

        // Close button
        this.lightbox
            .querySelector(".lightbox__close")
            .addEventListener("click", () => this.close());

        // Navigation
        this.lightbox
            .querySelector(".lightbox__prev")
            .addEventListener("click", () => this.prev());
        this.lightbox
            .querySelector(".lightbox__next")
            .addEventListener("click", () => this.next());

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (!this.lightbox.classList.contains("active")) return;

            if (e.key === "Escape") this.close();
            if (e.key === "ArrowLeft") this.prev();
            if (e.key === "ArrowRight") this.next();
        });

        // Add touch event listeners
        this.lightbox.addEventListener(
            "touchstart",
            (e) => this.handleTouchStart(e),
            { passive: true }
        );
        this.lightbox.addEventListener(
            "touchmove",
            (e) => this.handleTouchMove(e),
            { passive: false }
        );
        this.lightbox.addEventListener("touchend", (e) =>
            this.handleTouchEnd(e)
        );
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.touchStartX || !this.touchStartY) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        // Calculate the difference in X and Y positions
        const diffX = this.touchStartX - currentX;
        const diffY = this.touchStartY - currentY;

        // If horizontal swipe is greater than vertical, prevent scrolling
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.touchEndY = e.changedTouches[0].clientY;

        const diffX = this.touchStartX - this.touchEndX;
        const diffY = this.touchStartY - this.touchEndY;

        // Check if it's a horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > this.minSwipeDistance) {
                if (diffX > 0) {
                    // Swipe left - next image
                    this.next();
                } else {
                    // Swipe right - previous image
                    this.prev();
                }
            }
        } else {
            // Check for vertical swipe to dismiss
            if (Math.abs(diffY) > this.minSwipeDistance) {
                this.close();
            }
        }

        // Reset values
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
    }

    open(src) {
        const img = this.lightbox.querySelector(".lightbox__content img");

        // Add loading state
        this.contentWrapper.classList.add("loading");

        // Create new image to preload
        const tempImage = new Image();
        tempImage.onload = () => {
            img.src = src;
            this.contentWrapper.classList.remove("loading");
        };
        tempImage.src = src;

        this.lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    close() {
        this.lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    prev() {
        this.currentIndex =
            (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.open(this.images[this.currentIndex].dataset.full);
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.open(this.images[this.currentIndex].dataset.full);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelectorAll(".lightbox-trigger").length > 0) {
        new Lightbox();
    }
});
