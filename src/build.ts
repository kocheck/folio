/**
 * This script serves as the static site generator for the Folio website.
 * It automates the process of compiling Sass, copying assets, parsing Markdown content,
 * and rendering HTML pages using a custom templating system.
 *
 * The build process involves:
 * 1. Cleaning the distribution directory.
 * 2. Compiling SCSS files into a single CSS file.
 * 3. Copying static assets (images, JavaScript) to the distribution directory.
 * 4. Iterating through Markdown content files:
 *    - Parsing front matter and content.
 *    - Handling custom shortcodes (e.g., for avatars).
 *    - Converting Markdown to HTML.
 *    - Rendering content into HTML templates (post.html).
 *    - Writing the generated HTML to the distribution directory.
 *    - Collecting post metadata for the index page.
 * 5. Generating the main index page (index.html) with a list of all posts.
 */

import fs from 'fs-extra';
import path from 'path';
import { marked } from 'marked';
import * as glob from 'glob';
import sass from 'sass';

// Define key directory paths relative to the project root.
const contentDir = path.join(__dirname, '../content');
const assetsDir = path.join(__dirname, '../assets');
const distDir = path.join(__dirname, '../dist');
const templatesDir = path.join(__dirname, '../templates');

/**
 * Interface for a Post object, defining its structure.
 * @property {string} title - The title of the post.
 * @property {string} path - The URL path to the rendered post.
 */
interface Post {
  title: string;
  path: string;
}

/**
 * Compiles the main SCSS file into CSS and saves it to the distribution directory.
 * Ensures the output directory exists before writing the file.
 */
const compileSass = async () => {
  const result = sass.compile(path.join(assetsDir, 'scss', 'main.scss'));
  const cssPath = path.join(distDir, 'assets', 'css', 'main.css');
  await fs.ensureDir(path.dirname(cssPath));
  await fs.writeFile(cssPath, result.css);
};

/**
 * Copies static assets (images and JavaScript files) from the assets directory
 * to their respective locations within the distribution directory.
 */
const copyAssets = async () => {
  await fs.copy(path.join(assetsDir, 'images'), path.join(distDir, 'assets', 'images'));
  await fs.copy(path.join(assetsDir, 'js'), path.join(distDir, 'assets', 'js'));
};

/**
 * Renders an HTML template with provided data.
 * Supports simple variable replacements (e.g., {{title}}, {{content}})
 * and basic looping constructs ({{#each arrayName}}{{this.property}}{{/each}}).
 * The rendered content is then inserted into the baseof.html layout.
 *
 * @param {string} templateName - The name of the template file (e.g., 'post.html', 'index.html').
 * @param {object} data - An object containing data to populate the template.
 * @returns {Promise<string>} A promise that resolves to the fully rendered HTML string.
 */
const render = async (templateName: string, data: { [key: string]: any }): Promise<string> => {
  const templatePath = path.join(templatesDir, templateName);
  let template = await fs.readFile(templatePath, 'utf-8');

  // Handle loops (e.g., {{#each posts}}{{this.title}}{{/each}})
  const loopRegex = /{{#each (.*?)}}([\s\S]*?){{\/each}}/g;
  template = template.replace(loopRegex, (match, arrayName, content) => {
    const items = data[arrayName];
    if (!items) return '';
    return items.map((item: any) => {
      // Replace {{this.property}} within the loop content
      return content.replace(/{{this\.(.*?)}}/g, (match: any, prop: string) => item[prop]);
    }).join('');
  });

  // Handle simple variable replacements (e.g., {{title}}, {{content}})
  const pageContent = Object.entries(data).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      return acc.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return acc; // Skip non-string values for simple replacement
  }, template);

  // Load and apply the base layout (baseof.html)
  const baseTemplate = await fs.readFile(path.join(templatesDir, 'baseof.html'), 'utf-8');
  return baseTemplate
    .replace('{{title}}', data.title || 'Folio') // Default title if not provided
    .replace('{{content}}', pageContent);
};

/**
 * Parses custom shortcodes within Markdown content and replaces them with appropriate HTML.
 * Currently handles the 'avatar' shortcode.
 * @param {string} content - The Markdown content string.
 * @returns {string} The content string with shortcodes replaced by HTML.
 */
const parseShortcodes = (content: string): string => {
  // Regex to find {{< avatar src="path/to/image.png" alt="Description" >}}
  const avatarRegex = /{{<\s*avatar\s*src="([^"]*)"\s*alt="([^"]*)"\s*>}}/g;
  return content.replace(avatarRegex, '<img src="/assets/images/$1" alt="$2">');
};

/**
 * The main build function that orchestrates the static site generation process.
 * It cleans the output directory, compiles Sass, copies assets, processes Markdown files,
 * and generates the index page.
 */
const build = async () => {
  console.log('Starting build...');

  // 1. Clean the distribution directory
  await fs.emptyDir(distDir);

  // 2. Compile Sass and copy static assets
  await compileSass();
  await copyAssets();

  const files = glob.sync('**/*.md', { cwd: contentDir });
  const posts: Post[] = [];

  // 3. Process each Markdown content file
  for (const file of files) {
    // Skip _index.md files during individual post processing as they are handled separately for the index page.
    if (file.endsWith('_index.md')) continue;

    const filePath = path.join(contentDir, file);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Extract front matter and main content
    const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/);
    const frontmatter = match ? match[1] : '';
    let content = match ? match[2] : fileContent;

    // Parse custom shortcodes within the content
    content = parseShortcodes(content);

    // Extract title from front matter
    const titleMatch = frontmatter.match(/^title: (.*)/m);
    const title = titleMatch ? titleMatch[1] : 'Untitled';

    // Convert Markdown content to HTML
    const htmlContent = await marked.parse(content);

    // Render the post using the 'post.html' template
    const html = await render('post.html', {
      title,
      content: htmlContent,
    });

    // Determine output path and ensure directory exists
    const outputDir = path.join(distDir, path.dirname(file));
    await fs.ensureDir(outputDir);

    // Write the rendered HTML to the output file
    const outputFile = path.join(outputDir, path.basename(file, '.md') + '.html');
    await fs.writeFile(outputFile, html);

    // Collect post metadata for the index page
    posts.push({ title, path: `/${path.join(path.dirname(file), path.basename(file, '.md') + '.html')}` });
  }

  // 4. Generate the main index page (index.html)
  // This uses the collected post metadata and the 'index.html' template.
  const indexHtml = await render('index.html', { title: 'Home', posts: posts });
  await fs.writeFile(path.join(distDir, 'index.html'), indexHtml);

  console.log('Build complete!');
};

// Execute the build process
build();