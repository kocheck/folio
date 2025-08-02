# Kyle Kochanek's Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/20dddce5-0124-4b16-a83f-976ef6d10b7c/deploy-status)](https://app.netlify.com/sites/kochanek-portfolio/deploys)

A personal portfolio website showcasing work and thoughts on design and development.

## Features
- Responsive design
- Fast loading and optimized performance
- Project showcase with filtering capabilities
- Blog/thoughts section
- Contact form integration
- Dark/light mode support
- **Web Components**: Modern, encapsulated components for enhanced interactivity

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
1. Place images in the page bundle directory alongside your content
2. Reference in markdown using the image shortcode: `{{< image src="filename.jpg" alt="Alt text" >}}`
3. Images will be automatically converted to WebP with JPEG fallback
4. Original images should be high quality (they will be automatically optimized)

### Image Guidelines
#### Thumbnails
- Width: 600px
- Aspect Ratio: 16:9
- File Format: WebP (with JPEG fallback)
- Quality: 80%
- File Size: Aim for under 50KB after optimization

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

The portfolio now uses a systematic approach to custom styling:

1. **Modify Radix color variables** in `assets/scss/abstracts/_radix-colors.scss`
2. **Adjust semantic mappings** in `assets/scss/abstracts/_variables.scss`
3. **Add custom component styles** using the Radix color system methodology

**Example custom component:**
```scss
.my-custom-component {
  background: var(--gray-3);      // UI element background
  border: 1px solid var(--gray-6); // Subtle border
  color: var(--gray-12);          // High contrast text

  &:hover {
    background: var(--gray-4);    // Hovered UI element
    border-color: var(--accent-8); // Colored hover border
  }
}
```

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

## Radix Color System

This portfolio uses a sophisticated color system based on [Radix Colors](https://www.radix-ui.com/colors) methodology, providing systematic color relationships and built-in accessibility compliance.

### Color Scale Overview

Each color has 12 steps with specific semantic purposes:

- **Steps 1-2**: App backgrounds and subtle backgrounds
- **Steps 3-5**: UI element backgrounds (cards, forms, buttons)
- **Steps 6-8**: Borders and separators
- **Steps 9-11**: Solid colors and text
- **Step 12**: High contrast text

### Available Color Scales

#### Gray Scale (Base Colors)
```scss
// Usage examples
background: var(--gray-1);     // App background
background: var(--gray-3);     // Card background
border: var(--gray-6);         // Subtle borders
color: var(--gray-12);         // High contrast text
```

#### Semantic Color Scales
- **Accent (Purple)**: `--accent-1` through `--accent-12` - Primary brand color
- **Creative (Cyan)**: `--creative-1` through `--creative-12` - Work/portfolio section
- **Personality (Amber)**: `--personality-1` through `--personality-12` - About section
- **Logical (Green)**: `--logical-1` through `--logical-12` - Contact/logical section

### Design Guidelines

#### Using the Color System

**For Backgrounds:**
```scss
// App/page backgrounds
background: var(--gray-1);

// Card/component backgrounds
background: var(--gray-3);

// Subtle/secondary backgrounds
background: var(--gray-2);
```

**For Borders:**
```scss
// Subtle borders
border: 1px solid var(--gray-6);

// Interactive element borders
border: 1px solid var(--gray-7);

// Hovered borders
border: 1px solid var(--gray-8);
```

**For Text:**
```scss
// Primary text (high contrast)
color: var(--gray-12);

// Secondary text (medium contrast)
color: var(--gray-11);

// Muted text
color: var(--gray-10);
```

**For Interactive Elements:**
```scss
// Button backgrounds
background: var(--accent-9);     // Normal state
background: var(--accent-10);    // Hover state
background: var(--accent-8);     // Active state

// Focus indicators
box-shadow: 0 0 0 3px var(--accent-5);
```

#### Component Examples

**Card Component:**
```scss
.card {
  background: var(--gray-3);        // UI element background
  border: 1px solid var(--gray-6); // Subtle border

  &:hover {
    background: var(--gray-4);      // Hovered UI element
    border-color: var(--gray-7);    // UI element border
  }

  h3 {
    color: var(--gray-12);          // High contrast text
  }

  p {
    color: var(--gray-11);          // Low contrast text
  }
}
```

**Form Input:**
```scss
.input {
  background: var(--gray-1);       // App background
  border: 1px solid var(--gray-7); // UI element border
  color: var(--gray-12);           // High contrast text

  &:focus {
    border-color: var(--accent-8);  // Hovered border
    box-shadow: 0 0 0 3px var(--accent-5); // Active/selected
  }

  &::placeholder {
    color: var(--gray-11);          // Low contrast text
  }
}
```

#### Theme Support

The color system automatically adapts to light and dark themes:

```scss
// Colors automatically switch based on data-theme attribute
:root {
  /* Dark theme colors (default) */
}

:root[data-theme="light"] {
  /* Light theme colors */
}
```

#### Helper Functions

Use helper functions for programmatic color access:

```scss
// Available functions
@function radix-gray($step, $theme: 'dark')
@function radix-accent($step, $theme: 'dark')
@function radix-creative($step, $theme: 'dark')
@function radix-personality($step, $theme: 'dark')
@function radix-logical($step, $theme: 'dark')

// Usage examples
.my-component {
  background: radix-gray(3);
  color: radix-accent(9);
}
```

#### Accessibility Best Practices

The Radix color system ensures WCAG AA compliance when used correctly:

- **Always use step 12 for primary text** on steps 1-3 backgrounds
- **Use steps 9-11 for colored text** with proper contrast testing
- **Avoid using steps 1-8 for text** unless specifically tested
- **Use step 9 for solid interactive elements** (buttons, links)

#### Color Testing

Test your color combinations using the built-in contrast checker:

```bash
npm run test:contrast
```

View the color system showcase at `/color-test.html` during development.

### Custom Color Variables (Backward Compatible)

For backward compatibility, these semantic variables are still available:

```scss
// These map to appropriate Radix steps
--text-accent      // Maps to --accent-9
--text-creative    // Maps to --creative-9
--text-personality // Maps to --personality-9
--text-logical     // Maps to --logical-9

// Muted variants now use proper Radix steps
--text-accent-muted      // Maps to --accent-11
--text-creative-muted    // Maps to --creative-11
--text-personality-muted // Maps to --personality-11
--text-logical-muted     // Maps to --logical-11
```

#### Color System Files

The Radix color system is implemented across these files:

- `assets/scss/abstracts/_radix-colors.scss` - Complete 12-step color scales
- `assets/scss/abstracts/_variables.scss` - CSS custom properties and semantic mappings
- `assets/scss/components/_nav.scss` - Navigation with systematic colors
- `assets/scss/pages/_work.scss` - Work cards and search with Radix colors
- `assets/scss/pages/_contact.scss` - Contact form with comprehensive styling
- `assets/scss/base/_global.scss` - Global form focus states

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

## Web Components

This site uses vanilla web components for enhanced interactivity while maintaining the performance benefits of static site generation.

### Components Available

#### Portfolio Lightbox (`<portfolio-lightbox>`)
An enhanced image lightbox with touch gestures and keyboard navigation.

**Features:**
- Touch gestures (swipe to navigate, swipe up/down to close)
- Keyboard navigation (arrow keys, escape)
- Loading states with smooth animations
- Auto-discovery of images with `lightbox-trigger` class
- Mobile responsive design

**Usage:**
```html
<!-- Images with this class automatically open in lightbox -->
<img src="thumbnail.jpg"
     data-full="full-size.jpg"
     class="lightbox-trigger"
     alt="Project screenshot">
```

#### Work Card (`<work-card>`)
Reusable card component for displaying portfolio projects.

**Attributes:**
- `title` - Project title (required)
- `description` - Brief description
- `image` - Thumbnail image URL
- `url` - Link to project details
- `company` - Company or client name
- `tags` - Comma-separated list of tags

**Usage:**
```html
<work-card
    title="Amazing Project"
    description="A brief description"
    image="/images/project.jpg"
    url="/work/project/"
    company="Cool Company"
    tags="React,Design,UX">
</work-card>
```

**Hugo Integration:**
```hugo
{{/* Use in templates */}}
{{ partial "work-card-wc.html" . }}
```

### JavaScript API

Global utilities are available at `window.PortfolioComponents`:

```javascript
// Create work cards dynamically
const card = window.PortfolioComponents.createWorkCard({
    title: 'Dynamic Project',
    description: 'Created with JavaScript',
    tags: 'JavaScript,Dynamic'
});

// Refresh lightbox after adding images
window.PortfolioComponents.refreshLightbox();

// Add lightbox trigger to existing image
window.PortfolioComponents.addLightboxTrigger(imageElement, 'full-size.jpg');

// Update theme colors
window.PortfolioComponents.updateTheme({
    'text-primary': '#333',
    'card-bg': '#fff'
});
```

### Theming

Components use CSS custom properties for theming:

```css
:root {
    /* Work card colors */
    --card-bg: #ffffff;
    --card-border: #e5e7eb;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;

    /* Focus states */
    --focus-color: #3b82f6;
}
```

### Development

Component files are located in `assets/js/components/`:
- `portfolio-lightbox.js` - Lightbox component
- `work-card.js` - Work card component
- `index.js` - Component initialization
- `README.md` - Detailed component documentation

### Testing

Test the web components:
```bash
# Run component tests
./test-components.sh

# Visit test page
open http://localhost:1313/work-components-test/
```

### Performance

- **Bundle Size**: ~8KB minified
- **Loading**: Components initialize on `DOMContentLoaded`
- **Compatibility**: All modern browsers (Chrome 54+, Firefox 63+, Safari 10.1+)
- **Progressive Enhancement**: Graceful fallback for older browsers

## Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)
