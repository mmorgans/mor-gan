# Content Editing Guide

This guide shows you how to edit your website content without touching any code. All content lives in simple JSON files that you can edit in any text editor.

## Quick Start

All content files are in `/src/content/`:
- `bio.json` - Your bio sections (journalist, advocate, student, photos, contact)
- `work.json` - Work items (journalism, technology, advocacy)
- `gallery.json` - Photo gallery metadata

After making changes:
1. Save the file
2. Preview with `npm run dev`
3. Push to deploy (if you have automatic deployment set up)

---

## Editing Bio Content

**File:** `/src/content/bio.json`

This file controls all the bio sections that appear when someone clicks on different identities on your homepage.

### Structure

```json
{
  "journalist": {
    "text": "Your bio text here...",
    "links": []
  },
  "advocate": {
    "text": "Your bio text here...",
    "linksTitle": "Featured In",
    "links": [
      {
        "label": "Link text",
        "url": "https://example.com",
        "external": true
      }
    ]
  }
}
```

### Editing Text

Simply change the `"text"` value:

```json
{
  "journalist": {
    "text": "I'm a multimedia journalism student at KU studying Political Science.",
    "links": []
  }
}
```

### Adding or Removing Links

Each link has three properties:
- `label` - The text that appears
- `url` - Where it links to
- `external` - Set to `true` for external links, `false` for internal links

**Example: Adding a new link**

```json
{
  "advocate": {
    "text": "Your text here",
    "linksTitle": "Featured In",
    "links": [
      {
        "label": "The New York Times",
        "url": "https://nytimes.com/article",
        "external": true
      },
      {
        "label": "Add your new link here",
        "url": "https://example.com",
        "external": true
      }
    ]
  }
}
```

**Example: Removing all links**

```json
{
  "student": {
    "text": "Your text here",
    "links": []
  }
}
```

---

## Adding Work Items

**File:** `/src/content/work.json`

This file controls what appears on your `/work` page.

### Structure

There are three categories: `journalism`, `technology`, and `advocacy`. Each contains an array of work items.

```json
{
  "journalism": [
    {
      "title": "Article Title",
      "description": "Brief description",
      "publication": "Publication Name",
      "date": "2024",
      "href": "/work/article-slug",
      "type": "article"
    }
  ],
  "technology": [...],
  "advocacy": [...]
}
```

### Adding a New Work Item

1. Decide which category (journalism, technology, or advocacy)
2. Add a new object to that array
3. Fill in the fields

**Example: Adding a journalism piece**

```json
{
  "journalism": [
    {
      "title": "Investigation: School Surveillance Systems",
      "description": "An in-depth look at algorithmic monitoring in K-12 education",
      "publication": "Student Press",
      "date": "2024",
      "href": "/work/school-surveillance",
      "type": "article"
    },
    {
      "title": "Your New Article Title",
      "description": "What your article is about",
      "publication": "Where it was published",
      "date": "2026",
      "href": "https://example.com/article",
      "external": true,
      "type": "article"
    }
  ]
}
```

### Work Item Fields

**Required:**
- `title` - The headline
- `description` - A brief summary
- `href` - Link to the work

**Optional:**
- `date` - Publication date
- `publication` - Where it was published
- `external` - Set to `true` for external links
- `type` - "article", "project", "presentation", or "photo"
- `featured` - Set to `true` to highlight important work
- `image` - Path to an image (e.g., `/images/work/project.jpg`)

### Link Types

**Internal link** (page on your site):
```json
{
  "href": "/work/article-name"
}
```

**External link** (another website):
```json
{
  "href": "https://example.com/article",
  "external": true
}
```

---

## Managing the Photo Gallery

**File:** `/src/content/gallery.json`

This file controls what photos appear in your photo gallery at `/gallery`.

### Structure

```json
{
  "photos": [
    {
      "image": "/images/gallery/photo-name.jpg",
      "alt": "Description for screen readers",
      "caption": "Caption that appears on the back of the card",
      "date": "2026",
      "location": "Clinton Lake, Kansas"
    }
  ]
}
```

### Adding a Photo

**Step 1: Add the image file**

Place your photo in `/public/images/gallery/` with a descriptive filename:
- Good: `sailing-clinton-lake-2026.jpg`
- Avoid: `IMG_1234.jpg`

**Step 2: Add metadata to gallery.json**

```json
{
  "photos": [
    {
      "image": "/images/gallery/sailing-clinton-lake-2026.jpg",
      "alt": "Sailing on Clinton Lake at sunset",
      "caption": "Perfect sailing conditions on Clinton Lake. The wind was steady at 15 knots.",
      "date": "February 2026",
      "location": "Clinton Lake, Kansas"
    }
  ]
}
```

### Photo Fields

**Required:**
- `image` - Path to the image file (always starts with `/images/gallery/`)
- `alt` - Description for accessibility (what's in the photo?)
- `caption` - Text that appears when you flip the card

**Optional:**
- `date` - When the photo was taken
- `location` - Where the photo was taken

### Image Requirements

**Recommended:**
- **Format:** JPG or PNG
- **Dimensions:** 1200-1600px wide (aspect ratio around 4:3 or 3:2)
- **File size:** Under 2MB each (compress large images)

**Compress images before uploading:**
- Mac: Preview > Export > adjust quality slider
- Online: [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)

### Removing a Photo

1. Delete the entry from `gallery.json`
2. Optionally delete the image file from `/public/images/gallery/`

---

## JSON Syntax Tips

JSON is picky about syntax. Here are common mistakes to avoid:

### ✅ Correct

```json
{
  "title": "My Article",
  "date": "2026",
  "external": true
}
```

### ❌ Common Mistakes

**Missing comma between items:**
```json
{
  "title": "My Article"
  "date": "2026"  ← Missing comma above
}
```

**Trailing comma at the end:**
```json
{
  "title": "My Article",
  "date": "2026",  ← Remove this comma
}
```

**Using single quotes instead of double quotes:**
```json
{
  'title': 'My Article'  ← Must use "double quotes"
}
```

**Forgetting to close brackets:**
```json
{
  "photos": [
    {"title": "Photo 1"}
    ← Missing closing ]
}
```

### Validating Your JSON

Before deploying, check if your JSON is valid:
1. Copy your JSON
2. Paste into [JSONLint](https://jsonlint.com)
3. Click "Validate JSON"
4. Fix any errors it finds

Or use your code editor:
- VS Code: JSON is validated automatically
- Look for red squiggly underlines

---

## Common Tasks

### Updating Your Bio

1. Open `/src/content/bio.json`
2. Find the section you want to update (journalist, advocate, student, contact)
3. Change the `"text"` value
4. Save the file

### Adding a Press Mention

1. Open `/src/content/bio.json`
2. Find the `"advocate"` section
3. Add a new link to the `"links"` array:

```json
{
  "label": "Publication Name",
  "url": "https://example.com/article",
  "external": true
}
```

### Adding Recent Work

1. Open `/src/content/work.json`
2. Pick the right category (journalism, technology, advocacy)
3. Add a new object at the start of that array (so it appears first)
4. Save the file

### Changing Photo Order

Photos appear in the order they're listed in `gallery.json`. To reorder:
1. Open `/src/content/gallery.json`
2. Cut and paste entries to rearrange them
3. Save the file

---

## Testing Changes Locally

Before deploying, test your changes:

```bash
npm run dev
```

Visit `http://localhost:4321` and verify:
- Text displays correctly
- Links work
- Photos load and flip correctly
- No console errors (press F12 to check)

---

## Deployment

If your site has automatic deployment (via Vercel, Netlify, etc.):

1. Commit your changes: `git add . && git commit -m "Update content"`
2. Push to GitHub: `git push`
3. Your site will rebuild automatically

---

## Troubleshooting

### Site won't build

**Most common cause:** Invalid JSON syntax

1. Copy your JSON from the file that's causing errors
2. Paste into [JSONLint](https://jsonlint.com)
3. Fix the errors it finds
4. Try building again

### Photo not appearing

1. Check the file path matches exactly (case-sensitive)
2. Verify the image exists at `/public/images/gallery/filename.jpg`
3. Check the file extension matches (`.jpg` vs `.jpeg`)
4. Try a different browser or hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Link not working

1. For external links, include `"external": true`
2. For external links, include the full URL with `https://`
3. For internal links, start with `/` like `/work/article-name`

---

## Getting Help

If you run into issues:

1. Check this guide again
2. Validate your JSON at [JSONLint](https://jsonlint.com)
3. Check the browser console for errors (F12 > Console tab)
4. Look at the existing examples in the JSON files

---

## Examples

### Complete journalism work item
```json
{
  "title": "Investigation: School Surveillance",
  "description": "How AI monitoring affects student privacy",
  "publication": "Student Press",
  "date": "2024",
  "href": "https://example.com/article",
  "external": true,
  "type": "article",
  "featured": true
}
```

### Complete photo entry
```json
{
  "image": "/images/gallery/sailing-2026.jpg",
  "alt": "Sailing on Clinton Lake",
  "caption": "Perfect conditions for sailing. Wind at 15 knots, clear skies.",
  "date": "February 2026",
  "location": "Clinton Lake, Kansas"
}
```

### Complete bio section with links
```json
{
  "text": "Your bio text goes here. This can be as long as you need.",
  "linksTitle": "Related Links",
  "links": [
    {
      "label": "External Link",
      "url": "https://example.com",
      "external": true
    },
    {
      "label": "Internal Page",
      "url": "/work/project",
      "external": false
    }
  ]
}
```
