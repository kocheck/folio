# Kyle Kochanek's Portfolio

A personal portfolio website built with Hugo, showcasing work and thoughts on design and development.

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/kocheck/folio.git
cd folio
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
folio/
├── src/                         # Source code and content
│   ├── content/                 # Hugo content (Markdown files)
│   │   ├── work/               # Portfolio projects
│   │   ├── now/                # Blog/thoughts
│   │   └── about/              # About page
│   ├── layouts/                # Hugo templates (HTML)
│   ├── assets/                 # Source assets (SCSS, JS, images)
│   ├── static/                 # Static files (favicon, robots.txt)
│   └── data/                   # Data files (YAML, JSON)
├── scripts/                    # Build and utility scripts
├── docs/                       # Project documentation
└── .hugorc/                    # Hugo-specific configurations
```

### Key Directories Explained

- **`src/content/`**: All website content in Markdown format
- **`src/layouts/`**: Hugo templates that define page structure
- **`src/assets/`**: Source files that get processed (SCSS → CSS, etc.)
- **`src/static/`**: Files copied directly to output (no processing)
- **`scripts/`**: Development and build utilities
- **`docs/`**: Project documentation and guides

## 🛠 Development

### Prerequisites

- Node.js (v16 or higher)
- Hugo (extended version)

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production
- `npm run test` - Run tests and linting

### Project Architecture

This is a static site built with:

- **Hugo**: Static site generator
- **Sass/SCSS**: CSS preprocessing
- **JavaScript**: ES6+ with Hugo's asset pipeline
- **Netlify**: Hosting and continuous deployment

## 📝 Content Management

### Adding Work Projects

1. Create a new directory in `src/content/work/`
2. Add `index.md` with project details
3. Include hero image and project assets
4. Use the work archetype for consistent formatting

### Writing Blog Posts

1. Create `.md` files in `src/content/now/`
2. Use front matter for metadata
3. Follow the established content structure

See [docs/content-management.md](docs/content-management.md) for detailed instructions.

## 🚢 Deployment

This site is automatically deployed to Netlify when changes are pushed to the main branch.

### Build Process

1. Hugo processes content and templates
2. Sass compiles to CSS
3. JavaScript is bundled and minified
4. Images are optimized (WebP conversion)
5. Static files are copied to output

See [docs/deployment.md](docs/deployment.md) for deployment details.

## 🎨 Design System

The site uses a custom design system with:

- CSS custom properties for theming
- Responsive typography scale
- Consistent spacing system
- Accessible color palette
- Component-based architecture

## 📚 Documentation

- [Development Guide](docs/development.md) - Setup and development workflow
- [Deployment Guide](docs/deployment.md) - Deployment and hosting
- [Content Management](docs/content-management.md) - Adding and editing content

---

Built with ❤️ by Kyle Kochanek
