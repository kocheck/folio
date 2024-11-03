# Kyle Kochanek's Portfolio

A personal portfolio website showcasing work and thoughts on design and development.

## Development Setup

### Prerequisites
- [Hugo Extended](https://gohugo.io/installation/) (v0.110.0 or later)
- Node.js (v16 or later)
- npm (v8 or later)

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/folio.git
   cd folio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. View the site at `http://localhost:1313`

### Building for Production

```bash
npm run build
```

### Project Structure
folio/
├── archetypes/ # Content templates
├── assets/ # Source files (SCSS, JS)
├── content/ # Markdown content
├── data/ # Site data files
├── layouts/ # Hugo templates
├── static/ # Static files
└── config.toml # Site configuration

## Content Management

### Adding a New Project
```bash
hugo new work/project-name.md
```
### Adding Images
1. Place images in `static/assets/images/`
2. Reference in markdown: `![Alt text](/assets/images/filename.jpg)`
