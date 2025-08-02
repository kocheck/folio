# Portfolio Web Components

This directory contains vanilla web components for the portfolio site, providing enhanced functionality with better encapsulation and reusability.

## 🚀 Getting Started

### Installation

The components are automatically loaded when you include the main component bundle:

```html
<!-- In your Hugo base template -->
{{ $components := resources.Get "js/components/index.js" | resources.Minify | resources.Fingerprint }}
<script defer src="{{ $components.RelPermalink }}"></script>
```

### Browser Support

- ✅ All modern browsers (Chrome 54+, Firefox 63+, Safari 10.1+, Edge 79+)
- ✅ Progressive enhancement - graceful fallback for older browsers
- ✅ No build tools required (vanilla web components)

## 📦 Components

### 1. Portfolio Lightbox (`<portfolio-lightbox>`)

A fully-featured image lightbox with touch gestures and keyboard navigation.

**Features:**
- 👆 Touch gestures (swipe to navigate, swipe up/down to close)
- ⌨️ Keyboard navigation (arrow keys, escape)
- 📱 Mobile responsive
- 🔄 Loading states
- 🎯 Auto-discovery of trigger images

**Usage:**

```html
<!-- The lightbox component (auto-created) -->
<portfolio-lightbox></portfolio-lightbox>

<!-- Any image with this class becomes a trigger -->
<img src="thumbnail.jpg"
     data-full="full-size.jpg"
     class="lightbox-trigger"
     alt="Project screenshot">
```

**Events:**
- `lightbox:open` - Fired when lightbox opens
- `lightbox:close` - Fired when lightbox closes

**Methods:**
```javascript
const lightbox = document.querySelector('portfolio-lightbox');
lightbox.openImage('image.jpg', 0);  // Open specific image
lightbox.refresh();                  // Refresh image collection
```

### 2. Work Card (`<work-card>`)

A reusable card component for displaying portfolio projects.

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
    description="A brief description of the project"
    image="/images/project-thumb.jpg"
    url="/work/amazing-project/"
    company="Cool Company"
    tags="React,TypeScript,Design">
</work-card>
```

**Hugo Partial:**
```hugo
{{/* Use the web component partial */}}
{{ partial "work-card-wc.html" . }}
```

**Events:**
- `work-card:click` - Fired when card is clicked

**Methods:**
```javascript
const card = document.querySelector('work-card');
card.updateCard({
    title: 'New Title',
    description: 'New description'
});
```

## 🛠️ Utility Functions

Global utilities are available at `window.PortfolioComponents`:

```javascript
// Create a new work card programmatically
const card = window.PortfolioComponents.createWorkCard({
    title: 'Dynamic Project',
    description: 'Created with JavaScript',
    tags: 'JavaScript,Dynamic'
});
document.querySelector('.work-grid').appendChild(card);

// Refresh lightbox after adding new images
window.PortfolioComponents.refreshLightbox();

// Add lightbox trigger to existing image
const img = document.querySelector('.my-image');
window.PortfolioComponents.addLightboxTrigger(img, 'full-size.jpg');

// Update theme colors
window.PortfolioComponents.updateTheme({
    'text-primary': '#333',
    'card-bg': '#fff'
});
```

## 🔄 Migration Guide

### From Hugo Partials to Web Components

1. **Gradual Migration**: Components work alongside existing Hugo partials
2. **Automatic Conversion**: Legacy cards are automatically converted on page load
3. **Drop-in Replacement**: Use `work-card-wc.html` instead of `work-card.html`

### Example Migration

**Before (Hugo partial):**
```hugo
{{ range .Pages }}
    {{ partial "work-card.html" . }}
{{ end }}
```

**After (Web component):**
```hugo
{{ range .Pages }}
    {{ partial "work-card-wc.html" . }}
{{ end }}
```

## 🎨 Theming

Components respect CSS custom properties for theming:

```css
:root {
    /* Work card theming */
    --card-bg: #ffffff;
    --card-border: #e5e7eb;
    --card-hover-bg: #f9fafb;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;

    /* Focus states */
    --focus-color: #3b82f6;
}
```

## 📊 Performance

- **Bundle Size**: ~8KB minified
- **First Load**: Components initialize on `DOMContentLoaded`
- **Lazy Loading**: Images use `loading="lazy"` by default
- **Memory Efficient**: Proper cleanup on component removal

## 🧪 Testing

### Manual Testing

1. **Lightbox Testing**:
   - Click any `.lightbox-trigger` image
   - Test keyboard navigation (arrow keys, escape)
   - Test touch gestures on mobile
   - Verify loading states

2. **Work Card Testing**:
   - Verify hover effects
   - Test click tracking
   - Check responsive behavior
   - Validate with missing attributes

### Browser Console

Components log their initialization:
```
🚀 Initializing Portfolio Web Components...
📸 Found 12 lightbox triggers, initializing lightbox...
🃏 Found 8 legacy work cards, converting to web components...
✅ Web Components initialized successfully
```

## 🐛 Troubleshooting

### Common Issues

**Lightbox not working:**
- Ensure images have `lightbox-trigger` class
- Check for JavaScript errors in console
- Verify component is loaded: `document.querySelector('portfolio-lightbox')`

**Work cards not displaying:**
- Verify `title` attribute is present
- Check CSS custom properties are defined
- Ensure component is properly registered

**Performance issues:**
- Use `loading="lazy"` on images
- Minimize large image sizes
- Check for memory leaks with multiple component instances

### Debug Mode

Enable debug logging:
```javascript
// In browser console
window.PortfolioComponents.debug = true;
```

## 🤝 Development

### Adding New Components

1. Create component file: `assets/js/components/my-component.js`
2. Import in `index.js`
3. Add initialization logic
4. Create Hugo partial if needed
5. Update this README

### Component Structure

```javascript
class MyComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.initEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `...`;
    }

    // Add methods...
}

customElements.define('my-component', MyComponent);
```

## 📝 Changelog

### v1.0.0 (Current)
- ✅ Portfolio Lightbox component
- ✅ Work Card component
- ✅ Automatic Hugo integration
- ✅ Touch gesture support
- ✅ Accessibility features
- ✅ Utility functions

---

**Questions or Issues?** Check the browser console for debug information or create an issue in the repository.
