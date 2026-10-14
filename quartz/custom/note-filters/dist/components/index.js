// components/NoteFilters.tsx
import { readFileSync } from "node:fs";
import { jsx, jsxs } from "preact/jsx-runtime";
var script = readFileSync(
  new URL("../../scripts/note-filters.inline.js", import.meta.url),
  "utf8"
);
var NoteFilters = ({ allFiles, cfg, ctx, fileData }) => {
  const slug = fileData.slug ?? "";
  if (slug === "tags" || slug === "tags/index") return null;
  if (!slug.startsWith("tags/") && !slug.endsWith("/index")) return null;
  const basePath = ctx.argv.serve || !cfg.baseUrl ? "" : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "");
  const noteTypes = Object.fromEntries(
    allFiles.flatMap((file) => {
      if (!file.slug || file.unlisted === true) return [];
      const raw = file.frontmatter?.type;
      const types = (Array.isArray(raw) ? raw : raw == null ? [] : [raw]).filter((value) => typeof value === "string").map((value) => value.trim().toLowerCase());
      return types.length ? [[file.slug, types]] : [];
    })
  );
  return /* @__PURE__ */ jsxs("div", { class: "note-filters", "data-base-path": basePath, "data-note-types": JSON.stringify(noteTypes), children: [
    /* @__PURE__ */ jsxs("section", { class: "note-filter-panel note-filter-type", "aria-label": "Filter notes by type", children: [
      /* @__PURE__ */ jsxs("h2", { children: [
        "Filter",
        /* @__PURE__ */ jsx("br", {}),
        "by Type::"
      ] }),
      /* @__PURE__ */ jsx("div", { class: "note-filter-options", "data-filter-options": "type" })
    ] }),
    /* @__PURE__ */ jsxs("section", { class: "note-filter-panel note-filter-tags", "aria-label": "Filter notes by tag", children: [
      /* @__PURE__ */ jsxs("h2", { children: [
        "Filter",
        /* @__PURE__ */ jsx("br", {}),
        "by Tags::"
      ] }),
      /* @__PURE__ */ jsx("div", { class: "note-filter-options", "data-filter-options": "tag" })
    ] }),
    /* @__PURE__ */ jsx("p", { class: "note-filter-status", role: "status", "aria-live": "polite" })
  ] });
};
NoteFilters.afterDOMLoaded = script;
var NoteFilters_default = (() => NoteFilters);
export {
  NoteFilters_default as NoteFilters
};
