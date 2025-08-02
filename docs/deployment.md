# Deployment Guide

## Netlify Deployment

This site is configured for automatic deployment on Netlify.

### Configuration
- Build command: `hugo --minify`
- Publish directory: `public`
- Environment: Production

### Environment Variables
Set these in your Netlify dashboard:
- `HUGO_VERSION`: Latest extended version
- `NODE_VERSION`: 16 or higher

### Build Process
1. Netlify pulls from the main branch
2. Installs dependencies via `npm install`
3. Runs Hugo build with minification
4. Publishes to CDN

### Manual Deployment
For manual deployment to other platforms:

```bash
# Build for production
hugo --minify

# Deploy the public/ directory to your hosting provider
```

### Domain Configuration
- Configure DNS settings in your domain registrar
- Add custom domain in Netlify settings
- Enable HTTPS (automatic with Netlify)

## Local Testing
Always test the production build locally:

```bash
hugo --minify
hugo server --source public --bind 0.0.0.0 --port 8080
```
