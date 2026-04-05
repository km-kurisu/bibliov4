import os
import json
import argparse
from ebookmeta import get_metadata
from pathlib import Path

def extract_epub_info(epub_path, output_info_dir, output_covers_dir):
    try:
        epub_path = Path(epub_path)
        if not epub_path.is_file():
            print(f"Error: {epub_path} is not a valid file.")
            return

        print(f"Processing: {epub_path.name}")
        metadata = get_metadata(str(epub_path))

        # 1. Prepare metadata
        authors = []
        if hasattr(metadata, 'authors') and metadata.authors:
            authors = [a.author for a in metadata.authors] if hasattr(metadata.authors, '__iter__') else [metadata.author_list]
        else:
            authors = [metadata.author_list] if metadata.author_list else []

        book_info = {
            "title": metadata.title,
            "authors": authors,
            "language": metadata.lang,
            "description": metadata.description or "",
            "publish_date": metadata.publish_date or "",
            "publisher": metadata.publisher or "",
            "tags": str(metadata.tag_list).split(';') if metadata.tag_list else [],
            "series": metadata.series or "",
            "series_index": metadata.series_index or "",
        }

        # 2. Save book info to JSON
        os.makedirs(output_info_dir, exist_ok=True)
        json_filename = f"{epub_path.stem}.json"
        json_path = os.path.join(output_info_dir, json_filename)
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(book_info, f, indent=4, ensure_ascii=False)
        print(f"  - Book info saved to: {json_path}")

        # 3. Save book cover
        os.makedirs(output_covers_dir, exist_ok=True)
        if metadata.cover_image_data:
            # Determine extension
            ext = 'jpg' if 'jpeg' in (metadata.cover_media_type or 'jpeg').lower() else 'png'
            cover_filename = f"{epub_path.stem}.{ext}"
            cover_path = os.path.join(output_covers_dir, cover_filename)
            
            with open(cover_path, 'wb') as f:
                f.write(metadata.cover_image_data)
            print(f"  - Cover saved to: {cover_path}")
        else:
            print("  - Warning: No cover image found in this EPUB.")

    except Exception as e:
        print(f"  - Error processing {epub_path.name}: {e}")

def main():
    parser = argparse.ArgumentParser(description="Extract EPUB metadata and covers into separate folders.")
    parser.add_argument("input", help="Path to a single EPUB file or a directory containing EPUB files.")
    parser.add_argument("--info-dir", default="extracted_info", help="Directory where book info JSONs will be saved.")
    parser.add_argument("--covers-dir", default="extracted_covers", help="Directory where book covers will be saved.")

    args = parser.parse_args()

    input_path = Path(args.input)

    if input_path.is_file():
        extract_epub_info(input_path, args.info_dir, args.covers_dir)
    elif input_path.is_dir():
        epub_files = list(input_path.glob("*.epub"))
        if not epub_files:
            print(f"No EPUB files found in directory: {input_path}")
            return
        
        print(f"Found {len(epub_files)} EPUB files. Starting extraction...")
        for epub in epub_files:
            extract_epub_info(epub, args.info_dir, args.covers_dir)
    else:
        print(f"Error: {input_path} is not a valid file or directory.")

if __name__ == "__main__":
    main()
