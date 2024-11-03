const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Define paths
const WORK_DIR = path.join(__dirname, "../content/work");
const OUTPUT_FILE = path.join(__dirname, "../data/work.json");

function generateWorkData() {
    // Read all markdown files from the work directory
    const workFiles = fs
        .readdirSync(WORK_DIR)
        .filter((file) => file.endsWith(".md"));

    // Process each file
    const workProjects = workFiles.map((filename) => {
        const filePath = path.join(WORK_DIR, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        // Generate slug from filename
        const slug = filename.replace(".md", "");

        return {
            title: data.title,
            company: data.company,
            date: data.date,
            slug: slug,
            thumbnail: data.thumbnail,
            tags: data.tags || [],
            featured: data.featured || false,
        };
    });

    // Sort by date (newest first)
    workProjects.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Separate featured projects
    const featuredProjects = workProjects.filter((project) => project.featured);

    // Write to JSON file
    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(
            {
                workProjects,
                featuredProjects,
            },
            null,
            2
        )
    );
}

// Run the generator
generateWorkData();
