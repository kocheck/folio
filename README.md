# Kyle Kochanek's Portfolio

A personal portfolio website showcasing work and thoughts on design and development.

## Features
- Responsive design
- Fast loading and optimized performance
- Project showcase with filtering capabilities
- Blog/thoughts section
- Contact form integration
- Dark/light mode support

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

The built files will be in the `public/` directory.

### Project Structure
```
folio/
├── archetypes/     # Content templates
├── assets/         # Source files (SCSS, JS)
│   ├── scss/      # Styling files
│   └── js/        # JavaScript files
├── content/        # Markdown content
│   ├── work/      # Project posts
│   └── blog/      # Blog posts
├── data/          # Site data files
├── layouts/       # Hugo templates
├── static/        # Static files
│   ├── assets/    # Images and other assets
│   └── admin/     # CMS admin panel
└── config.toml    # Site configuration
```

## Content Management

### Adding a New Project
```bash
hugo new work/your-project-name/index.md
```

Project front matter template:
```yaml
---
title: "Project Title"
date: 2024-03-21
draft: false
description: "Brief project description"
tags: ["web", "design", "development"]
technologies: ["React", "Node.js"]
thumbnail: "/assets/images/projects/thumbnail.jpg"
---
```

### Adding a Blog Post
```bash
hugo new blog/post-name.md
```

### Adding Images
1. Place images in `static/assets/images/`
2. Reference in markdown: `![Alt text](/assets/images/filename.jpg)`
3. Recommended image formats: WebP, JPEG, PNG
4. Optimize images before adding them to the repository

## Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
HUGO_ENVIRONMENT="development"
CONTACT_FORM_ENDPOINT="your-endpoint"
GA_TRACKING_ID="UA-XXXXXXXXX-X"
```

### Custom Styling
1. Modify variables in `assets/scss/_variables.scss`
2. Add custom styles in `assets/scss/custom.scss`

## Deployment

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `public`
4. Set environment variables in Netlify dashboard

### GitHub Pages
1. Update `config.toml` baseURL
2. Enable GitHub Actions workflow
3. Configure GitHub Pages settings

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Support
For support, email [your@email.com](mailto:your@email.com) or create an issue in the GitHub repository.
