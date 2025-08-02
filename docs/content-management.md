# Content Management Guide

## Creating New Work Projects

### Structure
Each work project should be in its own directory under `src/content/work/`:

```
src/content/work/project-name/
├── index.md          # Main project content
├── hero.jpg          # Hero image
└── images/           # Project images
    ├── image1.jpg
    └── image2.jpg
```

### Front Matter
Use this template for project pages:

```yaml
---
title: "Project Title"
date: 2024-01-01
draft: false
weight: 1
description: "Brief project description"
hero: "hero.jpg"
technologies: ["HTML", "CSS", "JavaScript"]
role: "Designer & Developer"
timeline: "3 months"
---
```

## Writing Blog Posts (Now Section)

### Creating a Post
1. Create a new `.md` file in `src/content/now/`
2. Use the `now` archetype: `hugo new now/post-title.md`
3. Update the front matter and write your content

### Front Matter Template
```yaml
---
title: "Post Title"
date: 2024-01-01
draft: false
description: "Brief description"
tags: ["design", "development"]
---
```

## Image Management

### Optimization
- Use WebP format when possible
- Keep source images in `src/assets/images/`
- Hugo will automatically optimize images

### Responsive Images
Use the `image` shortcode for responsive images:

```markdown
{{< image src="image.jpg" alt="Description" >}}
```

## Content Organization Tips

1. **Consistent naming**: Use kebab-case for file and folder names
2. **Clear descriptions**: Always include meaningful descriptions
3. **Proper tagging**: Use consistent tags across posts
4. **Image alt text**: Always provide descriptive alt text
5. **Draft workflow**: Use `draft: true` for work-in-progress content
