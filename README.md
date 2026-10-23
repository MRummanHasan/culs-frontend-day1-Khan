<!--
@authors;
SALAMA Mohamad Ezzat Tolba
Muhammad RUMMAN Hasan KHAN
Bader
Muhammad Tauseef
-->

# The Little Herb Garden
A small, responsive herb guide built for the Contemporary Frontend Development course.

## Run locally

From this folder, run one of these:

```bash
python3 -m http.server 800
```
Then open <http://localhost:8000>.

Alternatively, if Node.js is installed:
```bash
npx serve
```

## Explore

- Select an herb card or use a navigation link. The URL hash identifies the herb, for example `index.html#basil`.
- Search by herb name or description.
- Filter by culinary or aromatic category.
- Use Tab, Shift+Tab, Enter, and Space to navigate controls.

## Data format

Every herb is stored as `data/<id>.json` using the same fields:

```json
{
  "id": "basil",
  "name": "Basil",
  "scientificName": "Ocimum basilicum",
  "category": "culinary",
  "emoji": "🌿",
  "description": "A short introduction.",
  "light": "Bright light",
  "water": "Keep lightly moist",
  "difficulty": "Easy"
}
```

To add an herb:
1. Create a JSON file under `data/` following this format.
2. Add its ID to `HERB_IDS` in `app.js`.
3. Test its card, detail view, and URL hash.

## Error handling and limitations

- Unknown herb IDs show a not-found message.
- A missing or invalid JSON file is reported; available herbs can still appear.
- If the page is opened directly as a `file://` URL, fetch may fail. Use a local server.
- This is a frontend learning project. Search and filters work in the browser; there is no account, mailing list, or backend.

## Accessibility
- Semantic landmarks, labeled search and filter controls, visible focus styles, skip link, and live search status.
- Navigation and cards use links/buttons with keyboard access.
- Reduced-motion preference is respected.

## Course extension
The optional feature is the live search and category filter, including the visible result count.
