const { EPub } = require('epub2');
const fs = require('fs-extra');
const path = require('path');

async function extractEpubInfo(epub_path, output_info_dir, output_covers_dir) {
    try {
        // Use createAsync for modern epub2 library
        const epub = await EPub.createAsync(epub_path);
        
        const basename = path.basename(epub_path, path.extname(epub_path));
        console.log(`Processing: ${basename}`);

        // 1. Prepare metadata
        const bookInfo = {
            title: epub.metadata.title,
            authors: Array.isArray(epub.metadata.creator) ? epub.metadata.creator : [epub.metadata.creator],
            language: epub.metadata.language,
            description: epub.metadata.description || "",
            publishDate: epub.metadata.date || "",
            publisher: epub.metadata.publisher || "",
            tags: epub.metadata.subject || [],
        };

        // 2. Save book info to JSON
        await fs.ensureDir(output_info_dir);
        const jsonPath = path.join(output_info_dir, `${basename}.json`);
        await fs.writeJson(jsonPath, bookInfo, { spaces: 4 });
        console.log(`  - Book info saved to: ${jsonPath}`);

        // 3. Save book cover
        await fs.ensureDir(output_covers_dir);
        if (epub.metadata.cover) {
            const data = await new Promise((resolve, reject) => {
                epub.getImage(epub.metadata.cover, (err, data) => {
                    if (err) return reject(err);
                    resolve(data);
                });
            });

            // Try to find the original extension in manifest
            const coverManifestItem = epub.manifest[epub.metadata.cover];
            const ext = coverManifestItem && coverManifestItem['media-type'] ? (coverManifestItem['media-type'].split('/')[1] || 'jpg') : 'jpg';
            const coverPath = path.join(output_covers_dir, `${basename}.${ext}`);
            
            await fs.writeFile(coverPath, data);
            console.log(`  - Cover saved to: ${coverPath}`);
        } else {
            console.warn(`  - Warning: No cover image found in ${basename}.`);
        }

    } catch (err) {
        console.error(`  - Error processing ${epub_path}:`, err);
    }
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("Usage: node extract.js <input_path> [--info-dir=extracted_info] [--covers-dir=extracted_covers]");
        process.exit(1);
    }

    const input_path = args[0];
    const infoDir = args.find(arg => arg.startsWith('--info-dir='))?.split('=')[1] || 'extracted_info';
    const coversDir = args.find(arg => arg.startsWith('--covers-dir='))?.split('=')[1] || 'extracted_covers';

    if (fs.statSync(input_path).isFile() && input_path.endsWith('.epub')) {
        await extractEpubInfo(input_path, infoDir, coversDir);
    } else if (fs.statSync(input_path).isDirectory()) {
        const files = await fs.readdir(input_path);
        const epubs = files.filter(f => f.endsWith('.epub'));
        if (epubs.length === 0) {
            console.log(`No EPUB files found in ${input_path}.`);
            return;
        }
        console.log(`Found ${epubs.length} EPUB files. Starting extraction...`);
        for (const epub of epubs) {
            await extractEpubInfo(path.join(input_path, epub), infoDir, coversDir);
        }
    } else {
        console.error(`Error: ${input_path} is not a valid file or directory.`);
    }
}

main();
