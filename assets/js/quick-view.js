document.addEventListener("DOMContentLoaded", () => {
    const quickViewButton = document.querySelector(".quick-view-button");
    if (!quickViewButton) return;

    quickViewButton.addEventListener("click", () => {
        const firstImage = document.querySelector(".lightbox-trigger");
        if (firstImage) {
            firstImage.click();
        }
    });
});
