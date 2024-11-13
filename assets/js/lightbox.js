class Lightbox {
    constructor() {
        this.lightbox = document.getElementById("imageLightbox");
        this.images = document.querySelectorAll(".lightbox-trigger");
        this.currentIndex = 0;
        this.contentWrapper = this.lightbox.querySelector(".lightbox__content");
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
