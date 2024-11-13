# Kyle Kochanek's Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/20dddce5-0124-4b16-a83f-976ef6d10b7c/deploy-status)](https://app.netlify.com/sites/kochanek-portfolio/deploys) [![Accessibility Check](https://github.com/kocheck/folio/actions/workflows/accessibility.yml/badge.svg)](https://github.com/kocheck/folio/actions/workflows/accessibility.yml)

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

### Image Guidelines
#### Thumbnails
- Width: 600px
- Aspect Ratio: 16:9
- File Format: WebP (with JPEG fallback)
- Quality: 90%
- File Size: Aim for under 100KB after optimization

#### Hero Images
For work/project pages, use these specifications for hero images:
- Width: 3840px (minimum 2400px)
- Height: 1920px (minimum 1200px)
- Aspect Ratio: 2:1 or 16:9
- File Format: WebP (with JPEG fallback)
- Quality: 85%
- File Size: Aim for under 1MB after optimization

The hero images will be automatically resized to:
- 3840px (4K displays)
- 2880px (Retina 5K)
- 1920px (Full HD)
- 1200px (Mobile/Tablet)

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

## Advanced Configuration

### Theme Configuration
The portfolio supports both light and dark themes with CSS custom properties. Theme colors are defined in:
```css:assets/css/main.css
startLine: 1
endLine: 13
```

### Performance Optimizations
1. **Service Worker**
- Implements offline functionality
- Caches critical assets
- Handles failed network requests
Reference implementation in:
```javascript:static/sw.js
startLine: 1
endLine: 50
```

2. **Image Optimization**
- Automatic WebP conversion
- Responsive image sizing
- Lazy loading implementation
- Image optimization settings defined in `hugo.toml`:
```toml:hugo.toml
startLine: 37
endLine: 41
```

### Typography System
The portfolio uses a sophisticated typography system with:
- Responsive font scaling
- Optimized line lengths
- Dark mode adjustments
- Proper heading hierarchy

Reference implementation in:
```scss:assets/scss/base/_typography.scss
startLine: 134
endLine: 265
```

### Page Transitions
Smooth page transitions are implemented using:
- CSS transitions
- History API
- Fixed element handling
Reference implementation in:
```javascript:assets/js/transition.js
startLine: 1
endLine: 37
```

### Accessibility Features
1. **Color Contrast Testing**
- Automated contrast ratio checking
- WCAG 2.1 compliance testing
Reference implementation in:
```javascript:scripts/test-contrast.js
startLine: 1
endLine: 71
```

2. **Keyboard Navigation**
- Skip links
- Focus management
- ARIA attributes

### Development Scripts
Additional npm scripts available:
```json:package.json
startLine: 5
endLine: 11
```

### Security Headers
Security headers are configured in the Netlify configuration:
```toml:netlify.toml
startLine: 16
endLine: 23
```

## Component Guidelines

### Image Components
The portfolio includes several image-related components:
1. **Basic Images**
- Standard image with lightbox support
- Caption support
- Lazy loading

2. **Image Grids**
- 2-column grid
- 4-column grid
- Responsive breakpoints

Reference implementation in:
```scss:assets/scss/components/_image.scss
startLine: 1
endLine: 22
```

### Content Layout
Content follows a structured layout system:
- Maximum width constraints
- Responsive padding
- Proper content hierarchy

Reference implementation in:
```scss:assets/scss/layout/_content.scss
startLine: 1
endLine: 12
```

## Contributing
[Previous contributing section remains]

## Testing
1. Run contrast tests:
```bash
npm run test:contrast
```

2. Validate HTML:
```bash
npm run test:html
```

3. Check performance:
```bash
npm run lighthouse
```

## Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)
