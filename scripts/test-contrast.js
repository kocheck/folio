const fs = require("fs");
const path = require("path");

// Function to calculate relative luminance
function getLuminance(r, g, b) {
    let [rs, gs, bs] = [r, g, b].map((c) => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Function to calculate contrast ratio
function getContrastRatio(l1, l2) {
    let lighter = Math.max(l1, l2);
    let darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

// Your color combinations to test
const colorPairs = [
    {
        name: "Dark theme text",
        background: { r: 22, g: 16, b: 26 },
        foreground: { r: 255, g: 255, b: 255 },
        required: 4.5,
    },
    {
        name: "Link text",
        background: { r: 22, g: 16, b: 26 },
        foreground: { r: 82, g: 156, b: 255 },
        required: 4.5,
    },
    {
        name: "Button text",
        background: { r: 82, g: 156, b: 255 },
        foreground: { r: 255, g: 255, b: 255 },
        required: 4.5,
    },
    // Add more color pairs as needed
];

// Test all pairs
let hasFailures = false;

colorPairs.forEach((pair) => {
    const bgLuminance = getLuminance(
        pair.background.r,
        pair.background.g,
        pair.background.b
    );
    const fgLuminance = getLuminance(
        pair.foreground.r,
        pair.foreground.g,
        pair.foreground.b
    );
    const ratio = getContrastRatio(bgLuminance, fgLuminance);

    if (ratio < pair.required) {
        console.error(
            `❌ ${pair.name}: Contrast ratio ${ratio.toFixed(
                2
            )} is below required ${pair.required}`
        );
        hasFailures = true;
    } else {
        console.log(
            `✅ ${pair.name}: Contrast ratio ${ratio.toFixed(2)} passes`
        );
    }
});

process.exit(hasFailures ? 1 : 0);
