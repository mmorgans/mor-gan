# Quick Start: Editing Your Website

## Three Simple Steps

### 1. Edit Content
Open the file you want to change:
- **Bio sections** → `/src/content/bio.json`
- **Work items** → `/src/content/work.json`
- **Photo gallery** → `/src/content/gallery.json`

### 2. Make Changes
Edit text, links, or add new items. The files are simple JSON - like a structured text file.

### 3. Deploy
```bash
git add .
git commit -m "Update content"
git push
```

Your site rebuilds automatically.

---

## Common Tasks

### Change bio text
```
/src/content/bio.json → find section → edit "text" field
```

### Add a photo
```
1. Add image to /public/images/gallery/
2. Open /src/content/gallery.json
3. Add new photo entry
```

### Add work item
```
1. Open /src/content/work.json
2. Pick category (journalism/technology/advocacy)
3. Add new item to that array
```

---

## Need Help?

📖 **Full guide:** `CONTENT_GUIDE.md`
🔧 **Technical details:** `IMPLEMENTATION_SUMMARY.md`
✅ **Validate JSON:** [JSONLint.com](https://jsonlint.com)

---

## Preview Changes Locally

```bash
npm run dev
```

Visit `http://localhost:4321`

---

## New Features

✅ Edit content without touching code
✅ Photo gallery at `/gallery`
✅ Click photos to flip and see captions
✅ All content in organized JSON files
✅ Git-trackable changes
