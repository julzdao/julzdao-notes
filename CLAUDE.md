# julzdao-notes

Public digital garden for julzdao, built on a fork of [Quartz v5](https://quartz.jzhao.xyz/) and deployed to `julzdao.vercel.app`. Notes are written in Obsidian.

## Status

Custom components were ported verbatim from the previous private monorepo (`~/projects/julzdao/apps/julzdao`). The plan is to review, simplify and document them **one at a time** — don't refactor several plugins in one go. Each plugin should end up with a `README.md` (only `note-filters` has one so far).

## Commands

```sh
npx quartz build --serve          # local dev server (http://localhost:8080)
npx quartz build                  # production build into public/
npm run check                     # tsc --noEmit + prettier --check (what CI runs)
npm run format                    # prettier --write
npm --prefix quartz/custom/<plugin> run build   # rebuild a custom plugin's dist/
```

Uses **npm** (there is a `package-lock.json`), Node >= 22.

## Repository layout

| Path                                                                | What it is                                                              | Owner    |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------- |
| `content/`                                                          | The notes (Markdown + `assets/` images). **Everything here is public.** | julzdao  |
| `quartz.config.yaml`                                                | Site config, plugin list, layout                                        | julzdao  |
| `quartz/custom/<plugin>/`                                           | Project-owned Quartz component plugins                                  | julzdao  |
| `quartz/custom/shared/`                                             | Helpers shared by the custom plugins (`lucide.ts`, `note-data.ts`)      | julzdao  |
| `quartz/styles/custom.scss` + `quartz/styles/components/_*.scss`    | All custom styling, one partial per component                           | julzdao  |
| `LICENSE-CONTENT.txt`                                               | CC BY-NC-SA 4.0 for `content/`                                          | julzdao  |
| Everything else (`quartz/` core, `docs/`, `.github/`, `Dockerfile`) | Upstream Quartz                                                         | upstream |

Keep upstream files untouched where possible so `git merge upstream/v5` stays painless. The `upstream` remote already points at `jackyzha0/quartz`.

## Custom plugins

Registered in `quartz.config.yaml` as `source: "./quartz/custom/<name>"`.

| Plugin           | Position       | Renders on         | Purpose                                                                                                                                                      |
| ---------------- | -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sidebar-logo`   | left, 5        | all                | "julz**dao**" home link                                                                                                                                      |
| `explorer-icons` | left, 51       | all                | Lucide icons from frontmatter `icon` in the explorer (client-side, MutationObserver). Also patches `scrollIntoView` so the explorer doesn't scroll the page. |
| `sidebar-footer` | left, 60       | all                | github / about / research / rss links + copyright                                                                                                            |
| `note-cover`     | beforeBody, 25 | notes              | Cover image + description/date/type/duration panel                                                                                                           |
| `note-filters`   | beforeBody, 25 | folder & tag pages | Type/tag filter buttons over grid cards (or the plain folder list)                                                                                           |
| `grid-cards`     | afterBody, 5   | folder & tag pages | Flip cards (front: cover/poster, back: excerpt)                                                                                                              |

### Anatomy of a plugin

```
<plugin>/
  package.json              # "quartz" manifest + esbuild "build" script
  index.js                  # export {}  (no transformer/emitter part)
  components/index.ts       # export { default as Name } from "./Name"
  components/Name.tsx       # the QuartzComponent
  scripts/name.inline.js    # optional client script, attached as afterDOMLoaded
  dist/components/index.js  # COMMITTED build output — this is what Quartz loads
```

**Quartz imports `dist/`, not the `.tsx` source.** After editing a component or anything in `shared/`, rebuild every plugin that uses it, and commit `dist/` together with the source. Inline scripts are read at runtime via `readFileSync(new URL("../../scripts/…", import.meta.url))`, a path that only resolves from `dist/components/`.

### Conventions

- Client scripts listen to Quartz's `nav` event (SPA navigation) and register teardown with `window.addCleanup`.
- Data needed by client scripts is passed as JSON in `data-*` attributes on the rendered element.
- Base path: components compute it from `cfg.baseUrl` (empty during `--serve`); client scripts read `document.body.dataset.basepath`.
- Lucide SVGs come from `lucide-static` (root dependency) via `shared/lucide.ts`; `toLucideName` accepts `shield-alert`, `ShieldAlert`, `LiShieldAlert`, `lucide-shield-alert`.
- Styles go in `quartz/styles/components/_<plugin>.scss` and are `@use`d from `custom.scss`. Selectors are scoped (e.g. `body #quartz-root …`) to beat the explorer plugin's CSS and the `@quartz-themes/core` Obsidian theme.
- Match the existing code style: small functions, a short comment only where intent isn't obvious, Prettier formatting (no semicolons, double quotes, 100 cols).

## Content & frontmatter

- Notes live in the Obsidian vault through a symlink: `~/obsidian/docs/julzdao -> ~/projects/julzdao-notes/content`. Edits in Obsidian are edits in this repo.
- **Links must use Obsidian "shortest path" form**: `[[Note Name]]`, `cover: "[[hydro 1.png]]"`. Vault-absolute links like `[[julzdao/agriculture/...]]` break on the site (Quartz treats `julzdao/` as a real folder). They get created when a note name becomes ambiguous in the vault, e.g. if a duplicate of the folder exists inside `~/obsidian`. Never keep copies of `content/` inside the vault.
- Frontmatter used by the custom components: `title`, `description`, `tags`, `type` (`fundamental`, `principle`, `concept`, `insight`, `technique`, `reference`, `moc`, `exercise`), `icon` (Lucide name), `cover` (wikilink to an image), `up`/`related` (wikilinks), `lifecycle`, `duration`, `published`/`date`.
- Images live in an `assets/` folder next to the notes that use them.
- Private notes go in a `private/` folder (gitignored and in `ignorePatterns`). `draft: true` and the `encrypted-pages` plugin only hide content **from the site** — the Markdown is still pushed to the public repo.

## Licensing

- Code: MIT (`LICENSE.txt`, keep jackyzha0's notice alongside julzdao's).
- Content in `content/`: CC BY-NC-SA 4.0 (`LICENSE-CONTENT.txt`). Do not put the license inside `content/` — Quartz would publish it as a page.

## Known issues / backlog

- `npm run check` fails: Prettier flags the generated `dist/` files and four SCSS partials. Add `quartz/custom/*/dist` to `.prettierignore` and format the SCSS.
- No `vercel.json` yet (the old repo had `cleanUrls: true`, `outputDirectory: public`). `package.json` has a `prebuild` hook but no `build` script.
- `quartz.config.yaml` still has upstream defaults: `pageTitle: Quartz 5` and footer links to the Quartz GitHub/Discord.
- Upstream-only files that matter on this fork: `.github/FUNDING.yml` (jackyzha0's sponsor link), `.github/dependabot.yml` (already opening PRs on origin). The other workflows are gated to `jackyzha0/quartz` or the `v5` branch and don't run here.
- `explorer-icons`: plugin `package.json` should declare `lucide-static`; move the `scrollIntoView` patch to its own file; cache the per-page icon payload.
- The base-path computation is copy-pasted in five components; candidate for `shared/`.
- `note-filters` has its own type-label map duplicating `typeLabel` in `shared/note-data.ts`.
