# Development Guide

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Hugo (extended version)

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Development Workflow

### Content Creation
- Add new work projects in `src/content/work/`
- Add blog posts in `src/content/now/`
- Use archetypes in `.hugorc/archetypes/` for consistent formatting

### Styling
- Main SCSS files are in `src/assets/scss/`
- Follow the existing component structure
- Use CSS custom properties for theming

### JavaScript
- Source files in `src/assets/js/`
- Follow ES6+ standards
- Use Hugo's asset pipeline for bundling

### Images
- Add source images to `src/assets/images/`
- Use Hugo's image processing for optimization
- Follow responsive image practices

## Testing
- Run contrast tests: `node scripts/test-contrast.js`
- Test in multiple browsers and devices
- Validate accessibility with screen readers

## Build Process
- Development: `hugo server`
- Production: `hugo --minify`
- Assets are processed through Hugo's pipeline
