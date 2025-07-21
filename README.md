# Folio: A Personal Portfolio Website

Folio is a personal portfolio website designed to showcase my work and thoughts on design and development. This repository represents a refactor of an existing Hugo-based site to a custom static site generator built with TypeScript.

## Features

- **Markdown-driven Content**: All content is written in Markdown, making it easy to manage and update.
- **Custom Static Site Generation**: A custom TypeScript build script processes Markdown, compiles Sass, and copies assets to generate a highly optimized static site.
- **Themed Design**: Supports both dark and light themes with a focus on accessibility and visual appeal.
- **Responsive Layout**: Designed to look great on various devices, from mobile to desktop.
- **Dynamic Post Listing**: The homepage dynamically lists all blog posts, generated from Markdown files.
- **Custom Shortcode Handling**: Supports custom shortcodes within Markdown for enhanced content (e.g., avatar images).
- **Integrated Assets**: SCSS is compiled to CSS, and JavaScript files are integrated for interactive features.

## Technologies Used

- **TypeScript**: For the custom static site generator logic.
- **Node.js**: Runtime environment for the build script.
- **Sass (SCSS)**: For powerful and organized CSS pre-processing.
- **Marked.js**: A Markdown parser for converting `.md` files to HTML.
- **fs-extra**: For extended file system operations.
- **glob**: For finding files matching specific patterns.

## Setup and Installation

To get this project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/folio.git
    cd folio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Build the site:**
    This command compiles the TypeScript, processes Markdown, compiles Sass, and copies assets to the `dist` directory.
    ```bash
    npm run build
    ```

4.  **Start a local development server (optional):**
    To preview your site, you can use a simple static file server. If you don't have one, `serve` is a good option:
    ```bash
    npm install -g serve
    serve dist
    ```
    Then, open your browser to `http://localhost:3000` (or the port indicated by `serve`).

## Usage

- **Adding New Content**: Create new Markdown files (`.md`) in the `content/` directory. Ensure they have front matter (YAML) at the top for metadata like the title.
- **Updating Styles**: Modify SCSS files in `assets/scss/`. The build script will recompile them.
- **Adding JavaScript**: Place JavaScript files in `assets/js/`. They will be copied to the `dist` directory and linked in the HTML.

## Project Structure

- `content/`: Contains all Markdown source files for posts and pages.
- `assets/`: Stores static assets like images (`assets/images/`), JavaScript files (`assets/js/`), and SCSS source files (`assets/scss/`).
- `templates/`: Houses HTML templates (`.html`) for different page layouts (e.g., `baseof.html`, `index.html`, `post.html`).
- `src/`: Contains the TypeScript source code for the custom build script (`build.ts`).
- `dist/`: The output directory where the compiled static site is generated.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
