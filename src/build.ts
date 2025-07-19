import fs from 'fs-extra';
import path from 'path';
import { marked } from 'marked';
import * as glob from 'glob';

const contentDir = path.join(__dirname, '../content');
const assetsDir = path.join(__dirname, '../assets');
const distDir = path.join(__dirname, '../dist');
const templatesDir = path.join(__dirname, '../templates');

interface Post {
  title: string;
  path: string;
}

const renderTemplate = async (templateName: string, data: { [key: string]: string }): Promise<string> => {
  const templatePath = path.join(templatesDir, templateName);
  const template = await fs.readFile(templatePath, 'utf-8');
  return Object.entries(data).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }, template);
};

const parseShortcodes = (content: string): string => {
  const avatarRegex = /{{<\s*avatar\s*src="([^"]*)"\s*alt="([^"]*)"\s*>}}/g;
  return content.replace(avatarRegex, '<img src="/assets/images/$1" alt="$2">');
};

const build = async () => {
  await fs.emptyDir(distDir);
  await fs.copy(assetsDir, path.join(distDir, 'assets'));

  const files = glob.sync('**/*.md', { cwd: contentDir });
  const posts: Post[] = [];

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/);
    const frontmatter = match ? match[1] : '';
    let content = match ? match[2] : fileContent;

    content = parseShortcodes(content);

    const titleMatch = frontmatter.match(/^title: (.*)/m);
    const title = titleMatch ? titleMatch[1] : 'Untitled';

    const htmlContent = await marked.parse(content);

    const html = await renderTemplate('post.html', {
      title,
      content: htmlContent,
    });

    const outputDir = path.join(distDir, path.dirname(file));
    await fs.ensureDir(outputDir);

    const outputFile = path.join(outputDir, path.basename(file, '.md') + '.html');
    await fs.writeFile(outputFile, html);

    posts.push({ title, path: `/${path.join(path.dirname(file), path.basename(file, '.md') + '.html')}` });
  }

  // Generate index page
  const postLinks = posts.map(post => `<li><a href="${post.path}">${post.title}</a></li>`).join('\n');
  const indexHtml = await renderTemplate('index.html', { posts: postLinks });
  await fs.writeFile(path.join(distDir, 'index.html'), indexHtml);

  console.log('Build complete!');
};

build();