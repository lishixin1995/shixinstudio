# Shixin Li

Portfolio website of Shixin Li — architectural designer and creative technologist, New York. The menu bar carries the SX. mark (`src/components/Logo.jsx`, also `public/favicon.svg`): S and X from Michroma, the cover typeface, all in the accent red.

Built with React and Vite, deployed on Cloudflare Pages (build command `npm run build`, output folder `dist`). `public/_redirects` sends every path to the single page app.

## Pages

The theme is still water: images surface like a ripple spreading from where a drop lands, clicks leave a ring, and the cover is a slow field of rings (`src/components/Ripple.jsx`). Layouts stay minimal, with plenty of white space.

- **Home** — the cover (the name, her titles and fields, New York), then the featured projects (The Pixel Cloud, S.I LINC, Render Exploration) and a short statement.
- **About** — statement, profile, experience, education, skills and languages.
- **Projects** — every project on one screen: a quiet list of names and one preview. On a computer the list sits beside the preview and the project under the pointer ripples into it from the side of its name; on a phone the preview sits under the list, a first tap shows a project and a second tap opens it. Arrow keys browse, Enter opens.
- **Project pages** — title, the cover, a short text with the facts beside it, then the drawings laid out with plenty of air (`src/components/Story.jsx`): two halves become a staggered pair, a run of thirds a stepped series, wide images shift left or right in turn. Images fade in as they scroll into view. Text passages and per-image notes can be added between the drawings (see the top of `src/data/projects.js`).
- **Gallery** — staggered pairs, like the project pages; each image opens full screen.
- **AI Lab** — the same list and rippling preview as Projects, on computers and phones; entries marked `soon` show as "Soon".
- **Contact**

## Changing content

All text and image lists live in `src/data/`:

- `site.js` — name, email, statement, profile, experience, education, skills.
- `projects.js` — the projects, their text and their images.
- `aiLab.js` — AI Lab entries.
- `gallery.js` — gallery images.

The accent red (`#922224`, from the printed portfolio) is the `--accent` token in `src/styles/base.css`.

Body text is set flush on both edges with even word spaces (`src/components/Justified.jsx`): since the type is monospaced, each paragraph is broken into lines for the whole paragraph at once, long words break at hyphenation points (`src/hyphenate.js`, using the `hyphen` package), and each full line takes up its last few pixels as a hair of letter spacing shared by every character. Wrap new body text in `<Justified text={...} />`.

Every size in the stylesheets is in `rem`, and on a computer the root size follows the window width (16px at 1440px wide, smaller on a laptop, 18.4px at 1920), so the whole design scales instead of crowding or leaving wide empty margins. Past 1920px (2K, 4K, big monitors) the page grows in exact proportion, as if the 1920 layout were enlarged to fill the screen; on an ultrawide screen it stays centred at that shape. Phones keep 16px. The rules are at the top of `src/styles/base.css`; width-based sizes use `var(--vw)` and side margins `var(--edge)`.

## Images

Upload images to `public/images/` at the paths listed in [`public/images/README.md`](public/images/README.md). Until an image is uploaded the site shows a plain, very light grey block in its place. Run `npm run images` to refresh that list and see which images are still missing.

## Develop

```sh
npm install
npm run dev
```
