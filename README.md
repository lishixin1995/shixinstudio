# SX Architecture

Portfolio website of Shixin Doris Li — architectural designer, New York.

Built with React and Vite, deployed on Cloudflare Pages (build command `npm run build`, output folder `dist`). `public/_redirects` sends every path to the single page app.

## Pages

The theme is still water: images surface like a ripple spreading from where a drop lands, clicks leave a ring, and the cover is a slow field of rings (`src/components/Ripple.jsx`). Layouts stay minimal, with plenty of white space.

- **Home** — the SX Architecture cover, then the featured projects (The Pixel Cloud, S.I LINC, Render Exploration) and a short statement.
- **About** — statement, profile, experience, education, skills and languages.
- **Projects** — every project on one screen. On a computer: a quiet list of names beside one preview; the project under the pointer ripples into the preview from the side of its name. On a phone: one strip per project (tap to open it up, tap again to go in). Arrow keys browse, Enter opens.
- **Project pages** — title, the cover, a short text with the facts beside it, then the drawings laid out with plenty of air (`src/components/Story.jsx`): two halves become a staggered pair, a run of thirds a stepped series, wide images shift left or right in turn. Images fade in as they scroll into view. Text passages and per-image notes can be added between the drawings (see the top of `src/data/projects.js`).
- **Gallery** — staggered pairs, like the project pages; each image opens full screen.
- **AI Lab** — on a computer, the same quiet list and rippling preview as Projects; entries marked `soon` show as "Soon".
- **Contact**

## Changing content

All text and image lists live in `src/data/`:

- `site.js` — name, email, statement, profile, experience, education, skills.
- `projects.js` — the projects, their text and their images.
- `aiLab.js` — AI Lab entries.
- `gallery.js` — gallery images.

The accent red (`#922224`, from the printed portfolio) is the `--accent` token in `src/styles/base.css`.

Every size in the stylesheets is in `rem`, and on a computer the root size follows the window width (16px at 1440px wide, smaller on a laptop, larger on a big screen), so the whole design scales instead of crowding or leaving wide empty margins. Phones keep 16px. The rule is at the top of `src/styles/base.css`.

## Images

Upload images to `public/images/` at the paths listed in [`public/images/README.md`](public/images/README.md). Until an image is uploaded the site shows a plain, very light grey block in its place. Run `npm run images` to refresh that list and see which images are still missing.

## Develop

```sh
npm install
npm run dev
```
