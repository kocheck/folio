document.addEventListener("DOMContentLoaded", () => {
    const messages = [
        "Looks like you found the dead pixel.",
        "This page is taking a coffee break.",
        "404: Page not found, but your curiosity is admirable.",
        "Oops! You've wandered into the digital void.",
        "This page is playing hide and seek (and winning).",
        "Plot twist: This page doesn't exist.",
        "You've reached the edge of the internet.",
        "This page is in stealth mode.",
        "404: Page has gone fishing.",
        "This pixel paradise is under construction.",
        "Congratulations! You've found our secret 404 page.",
        "This page is currently in another dimension.",
        "Error 404: Page got lost in the cloud.",
        "You've discovered our digital Bermuda Triangle.",
        "This page is experiencing an existential crisis.",
    ];

    const messageElement = document.querySelector(".error-message");
    if (messageElement) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        messageElement.textContent = messages[randomIndex];
    }
});
