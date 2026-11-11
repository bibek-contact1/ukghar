# UKGhar — student accommodation website

A fast, mobile-friendly frontend website for UKGhar. Plain HTML, CSS and JavaScript: no build step, no frameworks, nothing to install.

## Run it locally

**Option 1: double-click `start.bat`** (Windows). It starts the server and opens your browser.

**Option 2: terminal**

```bash
npm start
```

Then open <http://localhost:3000>. Press `Ctrl + C` to stop.

(You can also just double-click `index.html`. Everything works except the Google map, which needs the server.)

## Pages

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | Search, rooms, who we are, services, universities, facilities, video stories, events, how it works, FAQs |
| About us | `about.html` | Our story, mission & vision, values, services, timeline, team |
| Universities | `locations.html` | Searchable, filterable list of universities and properties |
| Rooms & facilities | `facilities.html` | Room types and prices, what's included in rent, all facilities |
| Student life | `community.html` | Video testimonials, reviews, upcoming and past events |
| Contact | `contact.html` | Enquiry / book-a-viewing form, contact details, office hours, map |
| Room details | `room.html?type=…` | One page per room type: photos, key facts, what's included, where it's available |
| Privacy notice | `privacy.html` | How enquiry details and cookies are used |

## Updating the content

**Almost everything is in one file: [`js/data.js`](js/data.js).** Open it in any text editor and change the text. Each section has comments explaining what it does.

- **Phone, email, address, social links:** `company`
- **Add a university:** copy one block inside `universities`, change its `id`, name, city and properties
- **Prices / room types:** `roomTypes` and each property's `priceFrom` (prices are per month; set `perPerson: true` to show "per person / month")
- **Room photos & videos:** each room type's `photos` and `videos` lists. Clicking a room opens its own details page (`room.html?type=twin-studio`), filled from that room's `description`, `sleeps`, `bed`, `bathroom`, `kitchen`, `features`, photos and the properties that list it.
- **Facilities:** `facilities`, grouped into sections
- **Events:** `events`. An event moves from "Upcoming" to "Recent highlights" by itself the day after its date (set `status: "past"` to move it early)
- **FAQs, reviews, team, timeline:** their own sections

### Photos

Put your photos in `assets/images/` and reference them like `"assets/images/royal-docks-room.jpg"`.
The demo uses online stock photos as placeholders. Swap them for real photos of your rooms before going live.
If an image fails to load, a branded colour block shows instead, so the layout never breaks.

### Videos

For each item in `videoTestimonials`, either:

- put an `.mp4` file in `assets/videos/` and set `video: "assets/videos/your-file.mp4"`, **or**
- upload it to YouTube and set `youtube: "VIDEO_ID"` (the part after `v=` in the link). Recommended for large videos.

Until a video is added, clicking it shows a friendly "Video coming soon" message.

Room videos work the same way: add `{ src: "assets/videos/premium-tour.mp4", caption: "Room tour" }` or `{ youtube: "VIDEO_ID", caption: "Room tour" }` to that room's `videos` list in `js/data.js`.

### Colours and fonts

Change the colour variables at the top of [`css/styles.css`](css/styles.css) (`--brand`, `--navy`, etc.) and the whole site updates.

## Going live

The site is fully static, so it can be hosted almost anywhere, often for free:

- **Netlify:** drag and drop this folder at <https://app.netlify.com/drop>
- **Vercel / Cloudflare Pages / GitHub Pages:** connect a Git repo, no build command, output directory = `/`
- **cPanel / any shared hosting:** upload everything to `public_html` (you don't need `server.js`, `package.json` or `start.bat` there)

### Enquiry emails and room alerts

The enquiry form and the footer "room alerts & event news" box both send to the Google Apps Script
in `formEndpoint` (`js/data.js`). Setup and updates: [email-setup/SETUP.md](email-setup/SETUP.md).
Leave `formEndpoint` empty (`""`) to run the forms in demo mode, which only shows a success message.

### Search engines and sharing

- `sitemap.xml` and `robots.txt` list the pages for Google. Both contain the full site address, so if the
  site moves to its own domain, update the address in those two files.
- Every page has Open Graph tags, so links shared on WhatsApp, Facebook and X show a title, description and photo.
- `404.html` is shown for broken links (GitHub Pages picks it up automatically).
- `privacy.html` is the privacy notice linked from the footer and cookie banner. Read it and change anything
  that doesn't match how you actually handle enquiries.

## Project structure

```
├── index.html, about.html, locations.html, facilities.html, community.html, contact.html
├── room.html, privacy.html, 404.html
├── sitemap.xml, robots.txt  ← for search engines (contain the site address)
├── css/styles.css        ← design (colours, layout)
├── js/data.js            ← ALL content (edit this)
├── js/main.js            ← site logic (header, footer, filters, video player, forms)
├── assets/images/        ← your photos
├── assets/videos/        ← your videos
├── assets/favicon.svg
├── server.js             ← local dev server (not needed when hosting)
└── start.bat             ← double-click to run on Windows
```

## Enquiry emails

To get contact-form enquiries in Gmail for free, follow [email-setup/SETUP.md](email-setup/SETUP.md).
