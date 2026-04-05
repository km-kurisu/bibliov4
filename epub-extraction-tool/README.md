# EPUB Extraction Tool

This tool allows you to extract metadata and cover images from EPUB files into separate folders.

## Folder Structure
- `extracted_info/`: Contains extracted metadata as JSON files.
- `extracted_covers/`: Contains extracted covers as PNG/JPEG files.

---

## Python Version

### Prerequisites
- Python 3.x installed.
- Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```

### Usage
To extract info and covers from a single EPUB:
```bash
python extract.py path/to/your/book.epub
```

To extract from all EPUBs in a directory:
```bash
python extract.py path/to/your/epubs_folder/
```

---

## Node.js version

### Prerequisites
- Node.js installed.
- Install dependencies:
  ```bash
  npm install
  ```

### Usage
To extract info and covers from a single EPUB:
```bash
node extract.js path/to/your/book.epub
```

To extract from all EPUBs in a directory:
```bash
node extract.js path/to/your/epubs_folder/
```
