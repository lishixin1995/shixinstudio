# SX Architecture

Portfolio website of Shixin Doris Li — architectural designer, New York.

Built with React and Vite, deployed on Cloudflare Pages (build command `npm run build`, output folder `dist`). `public/_redirects` sends every path to the single page app.

## Pages

- **Home** — the SX Architecture cover, then the featured projects (The Pixel Cloud, S.I LINC, Render Exploration) and a short statement.
- **About** — statement, profile, experience, education, skills and languages.
- **Projects** — every project on one screen, in two views: *Slices* (one strip per project; the strip under the pointer opens up) and *Index* (names beside a large preview). Arrow keys browse, Enter opens.
- **Project pages** — title, credits, statement and the drawings and images, then previous / next.
- **Gallery** — a grid of images that opens into a full-screen viewer.
- **AI Lab** — AI renders and workflows; entries marked `soon` show as "Coming soon".
- **Contact**

## Changing content

All text and image lists live in `src/data/`:

- `site.js` — name, email, statement, profile, experience, education, skills.
- `projects.js` — the projects, their text and their images.
- `aiLab.js` — AI Lab entries.
- `gallery.js` — gallery images.

The accent red (`#922224`, from the printed portfolio) is the `--accent` token in `src/styles/base.css`.

## Images

Upload images to `public/images/` at the paths listed in [`public/images/README.md`](public/images/README.md). Until an image is uploaded the site shows a grey crossed placeholder with the path it expects. Run `npm run images` to refresh that list and see which images are still missing.

## Develop

```sh
npm install
npm run dev
```
