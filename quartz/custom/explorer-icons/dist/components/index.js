// components/ExplorerIcons.tsx
import { readFileSync } from "node:fs";

// ../shared/lucide.ts
import * as lucide from "lucide-static";
var icons = lucide;
function toLucideName(raw) {
  const name = raw.trim().replace(/^lucide-/i, "").replace(/^Li(?=[A-Z])/, "");
  return name.split(/[-_\s]+/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join("");
}
function lucideSvg(name, className) {
  const svg = icons[name];
  if (typeof svg !== "string" || !svg.trimStart().startsWith("<svg")) return void 0;
  return svg.replace(/\s*\n\s*/g, " ").replace(/class="[^"]*"/, `class="${className}" aria-hidden="true"`).trim();
}

// components/ExplorerIcons.tsx
import { jsx } from "preact/jsx-runtime";
var script = readFileSync(
  new URL("../../scripts/explorer-icons.inline.js", import.meta.url),
  "utf8"
);
var defaultIcons = { file: "File", folder: "Folder" };
var warned = /* @__PURE__ */ new Set();
var ExplorerIcons = ({ allFiles }) => {
  const bySlug = {};
  const svgs = {};
  const use = (name) => {
    if (svgs[name]) return true;
    const svg = lucideSvg(name, "explorer-icon-svg");
    if (svg) svgs[name] = svg;
    return Boolean(svg);
  };
  for (const file of allFiles) {
    const raw = file.frontmatter?.icon;
    if (!file.slug || typeof raw !== "string" || raw.trim() === "") continue;
    const name = toLucideName(raw);
    if (use(name)) {
      bySlug[file.slug] = name;
    } else if (!warned.has(raw)) {
      warned.add(raw);
      console.warn(`[explorer-icons] Unknown Lucide icon "${raw}" in ${file.filePath}`);
    }
  }
  use(defaultIcons.file);
  use(defaultIcons.folder);
  return /* @__PURE__ */ jsx(
    "div",
    {
      class: "explorer-icons",
      hidden: true,
      "data-icons": JSON.stringify({ svgs, bySlug, defaults: defaultIcons })
    }
  );
};
ExplorerIcons.afterDOMLoaded = script;
var ExplorerIcons_default = (() => ExplorerIcons);
export {
  ExplorerIcons_default as ExplorerIcons
};
