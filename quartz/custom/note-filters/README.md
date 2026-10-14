# Note filters

Project-owned Quartz component for folder and tag listing pages. It renders two single-select filter panels below the page title. The browser script reads the existing Quartz note rows, their tag links, and build-time `type` frontmatter metadata, then hides rows that do not match the selected type and tag. Clicking a selected option again clears that filter.

Build the plugin after changing the component:

```sh
npm --prefix quartz/custom/note-filters run build
```

Styles live in `quartz/styles/components/_note-filters.scss`. The script lives in `scripts/note-filters.inline.js` and is loaded by the component at build time.
