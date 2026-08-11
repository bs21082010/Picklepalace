# ✏️ EDIT GUIDE — How to update your website

**Easiest way (recommended): use the visual editor**
1. Double-click **`editor.html`** — it opens in your browser (no internet needed)
2. Tab **"Store Details"**: change WhatsApp number, phone, email, social links, brand name, address
3. Tab **"Products"**: change names, prices, sizes, ratings, add or remove pickles
4. Click **"Save & Download"** — 3 files download to your Downloads folder
5. Double-click **`deploy-update.ps1`** — it publishes the website, rebuilds the app, and backs up to GitHub. Done in about 1 minute.

**Files you may ever need to touch (only if you like editing text files):**
| File | What it controls |
|---|---|
| `site-config.js` | Your phone/WhatsApp/email numbers, social links |
| `products.js` | The pickle list, prices, sizes, seasonal items |
| `languages.js` | All the words on the site (9 languages) |
| `index.html` | Page structure (rarely needed) |

**To open a file for editing:** right-click the file → **Open with** → **Notepad** (or VS Code if you have it). Type your changes, **Ctrl+S** to save, then run `deploy-update.ps1` to publish again.

---

## 1. WhatsApp / phone / email (most important!)

Open `site-config.js` with Notepad (or use editor.html → Store Details). Near the top you'll see:

```
const SITE_CONFIG = {
  whatsapp: "91XXXXXXXXXX",
  phone: "+91XXXXXXXXXX",
  email: "your@email.com",
```

Replace the `XXXX...` with your real numbers:
- Example WhatsApp: `whatsapp: "919876543210",` (country code 91 + your 10-digit number, NO + or spaces)
- Example phone: `phone: "+919876543210",`
- Example email: `email: "maakehatonkaacchar@gmail.com",`

Save. Done — every WhatsApp button on the site now goes to you.

## 2. Change a price / size

Open `products.js`. Find your pickle, e.g.:

```
    price: "₹150",
    size: "500g",
```

Change `₹150` to `₹180`, or `500g` to `1kg`. Save.

## 3. Add a new pickle

Open `products.js`. Find a product block that looks like `{ ... },` (copy one, like the Mango one). Paste it right after (inside the outer `[ ... ]` list), then change its `id`, `price`, `size`, `name`, `desc`.
- For a **seasonal** pickle, write `cat: "seasonal",` — it appears in the Seasonal section with a green "Seasonal" tag.
- For a **normal** pickle, write `cat: "regular",`.
- The `name` block can have 9 languages; for languages you don't fill, the site shows the English name — that's fine.

## 4. Remove a pickle

Delete its whole block `{ ... },`. Make sure the remaining blocks still start and end with `[` and `]`.

## 5. Add your photos (Gallery)

1. Take photos with your phone (bright, close-up photos of jars)
2. Send them to your computer
3. Create a folder named `photos` inside your website folder, put the photos there
4. Replace the placeholders — for each photo:
   - Add the photo in `index.html` inside the gallery: replace a placeholder block with `<img src="photos/yourphoto.jpg" alt="...">`
   - Or ask me to add a simple "how to add photos" feature first — easiest is to just ask me to set up the gallery once you have photos.

## 6. Add real customer reviews

Open `languages.js` in Notepad. Press **Ctrl+F** and search for `review_1_text` (English section).
Replace the sample text with a real review. Same for `review_2_text` and `review_3_text`, and change the author names (`review_1_author`, etc.).
You can also add a 4th review by copying a block, but simplest: ask me — it's a 1-minute job.

## 7. Fix a translation

Open `languages.js`. Press **Ctrl+F** and search for the English word you want to fix (e.g. `faq_1_a`). Each language has its own line. Edit the text, save.
Note: translations are good but not professional — if a Hindi/Bengali/... sentence sounds off, get a native speaker to check. Every sentence is in one place in `languages.js`.

## 8. Add a new language (9 → 10+)

Open `languages.js`:
1. Add your language code to the `LANGUAGES` list at the top (e.g. `ml: "മലയാളം"`)
2. Copy an existing language block (e.g. the whole `hi: { ... }` block) and paste it inside `TRANSLATIONS`
3. Change `hi` to your code and translate every line
4. Save. The new language automatically appears in the dropdown.

## 9. Change opening hours or address

Open `languages.js`, search for `contact_hours` or `contact_address` (English section). Edit. Save.

---

**Remember:** after any edit, run `deploy-update.ps1` to publish. The website link stays the same: https://maa-achaar.vercel.app
