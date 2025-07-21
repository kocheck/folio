# Folio Refactor: Hugo to TypeScript

This file tracks the game plan, decisions, and progress for refactoring the personal website from Hugo to a custom TypeScript static site generator.

## Game Plan Overview

1.  **Initialize Project and Analyze Current Site**: Analyze the existing Hugo site, inventory components, and create this tracking file.
2.  **Design Minimal Site Structure**: Plan the new file structure, rendering pipeline, and feature set.
3.  **Set Up TypeScript Build Script**: Initialize a TypeScript project and write the core build script.
4.  **Migrate Content and Assets**: Copy over Markdown content and essential assets, creating a minimal stylesheet.
5.  **Optimize and Test**: Add build optimizations, test rendering, and prepare for deployment.
6.  **Deploy and Iterate**: Deploy to Netlify and finalize the project.

## Completed Steps

*   **Step 1: Initialize Project and Analyze Current Site**
    *   Created a new `refactor/typescript` branch to work on.
    *   Analyzed the existing Hugo project structure.
    *   Inventoried content, assets, templates, and configuration.
    *   Created this `context.md` file.
*   **Step 2: Design Minimal Site Structure**
    *   Removed unnecessary files and directories from the Hugo project.
    *   Updated the `.gitignore` file.
    *   Defined the new directory structure.
*   **Step 3: Set Up TypeScript Build Script**
    *   Initialized a new `package.json` file and removed old dependencies/scripts.
    *   Installed `typescript`, `marked`, `glob`, `fs-extra` and corresponding type definitions.
    *   Created a `tsconfig.json` file for the project.
    *   Created the initial `src/build.ts` script and successfully ran it.
    *   The build script now generates HTML files from Markdown content.
*   **Step 4: Migrate Content and Assets**
    *   Implemented custom shortcode handling for `avatar`.
    *   Copied static assets (images, CSS) to the `dist` directory.
    *   Created and linked a minimal stylesheet.
    *   Started a local development server for preview.

## Pending Steps

*   **Step 5: Optimize and Test**
    *   Create a main index page that lists all posts.
    *   Create a reusable base template (`baseof.html`) to keep the code DRY.
    *   Refine the build script to handle different page types (index vs. post).
    *   Compiled SCSS to CSS and integrated into the build process.
    *   Integrated existing JavaScript files for features like theme switching, lightbox, etc.
    *   Thoroughly test the site rendering and functionality.
    *   Documented `src/build.ts` for clarity and maintainability.
    *   Documenting SCSS files for clarity and maintainability.
        *   Documented `assets/scss/main.scss`.
*   **Step 6: Deploy and Iterate**
    *   Update Netlify configuration (`netlify.toml`) for TypeScript build.
*   **Step 7: Create Project Documentation**
*   **Step 7: Create Project Documentation**
    *   Created a comprehensive `README.md` file.

## Key Decisions

*   **Branching:** Using the `refactor/typescript` branch to preserve the original Hugo site.
*   **Directory Structure:**
    *   `content/`: Markdown source files.
    *   `assets/`: Static assets (images, CSS, etc.).
    *   `templates/`: HTML templates for page layouts.
    *   `src/`: TypeScript build scripts.
    *   `dist/`: Compiled static site output.
*   **Dependencies:** Using `marked` for Markdown parsing and `fs-extra` for file system operations.

## Notes

*   The local development server is running in the background. I will need to stop it before running the build again.
