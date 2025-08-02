document.addEventListener("DOMContentLoaded", () => {
    const quickViewButton = document.querySelector(".quick-view-button");
    if (!quickViewButton) return;

    // Get labels and select random one
    const labels = quickViewButton.dataset.labels
        .split("|")
        .map((label) => label.trim());
    const labelText = quickViewButton.querySelector(".quick-view-button__text");

    function setRandomLabel() {
        const randomIndex = Math.floor(Math.random() * labels.length);
        labelText.textContent = labels[randomIndex];
    }

    // Set initial random label
    setRandomLabel();

    // Handle click event
    quickViewButton.addEventListener("click", () => {
        const firstImage = document.querySelector(".lightbox-trigger");
        if (firstImage) {
            firstImage.click();
        }
    });
});
