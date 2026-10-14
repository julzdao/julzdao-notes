// components/GridCards.tsx
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { getAllSegmentPrefixes, getDate, slugTag } from "@quartz-community/utils";

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

// ../shared/note-data.ts
import { slugifyFilePath } from "@quartz-community/utils";
function firstText(value) {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (typeof candidate !== "string" && typeof candidate !== "number") return void 0;
  const text = String(candidate).trim();
  return text || void 0;
}
function textList(value) {
  const values = Array.isArray(value) ? value : value == null ? [] : [value];
  return values.filter((item) => typeof item === "string" || typeof item === "number").map((item) => String(item).trim()).filter(Boolean);
}
function coverSlug(cover, links) {
  const raw = firstText(cover);
  if (!raw) return void 0;
  const target = raw.replace(/^!?(?:\[\[)/, "").replace(/\]\]$/, "").split("|")[0]?.trim();
  if (!target) return void 0;
  const assetSlug = slugifyFilePath(target);
  if (!/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(assetSlug)) return void 0;
  return Array.isArray(links) ? links.find(
    (link) => typeof link === "string" && (link === assetSlug || link.endsWith(`/${assetSlug}`))
  ) : void 0;
}
function assetUrl(basePath, slug) {
  return `${basePath}/${slug.split("/").map(encodeURIComponent).join("/")}`;
}
function typeLabel(type) {
  return type === "moc" ? "Map of Content" : type.replace(/^./, (letter) => letter.toUpperCase());
}

// components/GridCards.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var script = readFileSync(new URL("../../scripts/grid-cards.inline.js", import.meta.url), "utf8");
var EXCERPT_LINES = 5;
function folderCards(allFiles, folderSlug) {
  const prefix = folderSlug.slice(0, -"index".length);
  const cards = [];
  const subfolders = /* @__PURE__ */ new Map();
  for (const file of allFiles) {
    const slug = file.slug;
    if (!slug || file.unlisted === true || !slug.startsWith(prefix)) continue;
    const rest = slug.slice(prefix.length);
    if (!rest || rest === "index") continue;
    const [head, ...tail] = rest.split("/");
    if (tail.length === 0) cards.push({ kind: "note", slug, file, date: getDate(file) });
    else subfolders.set(head, [...subfolders.get(head) ?? [], file]);
  }
  for (const [name, files] of subfolders) {
    const slug = `${prefix}${name}/index`;
    const index = files.find((file) => file.slug === slug);
    const title = index?.frontmatter?.title ?? name;
    const dates = files.map(getDate).filter((date2) => Boolean(date2));
    const date = dates.sort((a, b) => b.getTime() - a.getTime())[0];
    cards.push({ kind: "folder", slug, title, count: files.length - (index ? 1 : 0), date });
  }
  return cards;
}
function tagCards(allFiles, tag) {
  return allFiles.flatMap((file) => {
    if (!file.slug || file.unlisted === true) return [];
    const tags = textList(file.frontmatter?.tags).flatMap(getAllSegmentPrefixes).map(slugTag);
    return tags.includes(tag) ? [{ kind: "note", slug: file.slug, file, date: getDate(file) }] : [];
  });
}
function byFolderDateTitle(a, b) {
  if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1;
  const byDate = (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0);
  return byDate || cardTitle(a).localeCompare(cardTitle(b));
}
function cardTitle(card) {
  return card.kind === "folder" ? card.title : firstText(card.file.frontmatter?.title) ?? card.slug.split("/").pop() ?? card.slug;
}
function plainLine(line) {
  return line.replace(/^\s*>\s*(\[![^\]]*\][+-]?\s*)?/, "").replace(/^\s*(#{1,6}\s+|[-*+]\s+(\[[ xX]\]\s+)?|\d+[.)]\s+)/, "").replace(/!\[\[[^\]]*\]\]|!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[\[([^\]|#]*)(#[^\]|]*)?\|([^\]]*)\]\]/g, "$3").replace(/\[\[([^\]|#]*)(#[^\]]*)?\]\]/g, "$1").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/(\*\*|__|==|~~|`)/g, "").replace(/(^|\W)[*_](\S[^*_]*)[*_](?=\W|$)/g, "$1$2").replace(/\s+/g, " ").trim();
}
var excerptCache = /* @__PURE__ */ new Map();
function excerpt(file, contentDir) {
  const relative = file.relativePath ?? file.filePath;
  if (!relative || !relative.endsWith(".md")) return [];
  const source = path.isAbsolute(relative) ? relative : path.resolve(contentDir, relative);
  try {
    const mtime = statSync(source).mtimeMs;
    const cached = excerptCache.get(source);
    if (cached?.mtime === mtime) return cached.lines;
    let lines = readFileSync(source, "utf8").split(/\r?\n/);
    if (lines[0]?.trim() === "---") {
      const end = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
      lines = end === -1 ? lines : lines.slice(end + 1);
    }
    let inCode = false;
    const result = [];
    for (const line of lines) {
      if (/^\s*(```|~~~)/.test(line)) inCode = !inCode;
      if (inCode || /^\s*(---+|\*\*\*+|___+)\s*$/.test(line) || /^\s*%%/.test(line)) continue;
      const text = plainLine(line);
      if (text) result.push(text);
      if (result.length === EXCERPT_LINES) break;
    }
    excerptCache.set(source, { mtime, lines: result });
    return result;
  } catch {
    return [];
  }
}
function formatDate(date) {
  if (!date || Number.isNaN(date.getTime())) return "----.--.--";
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}
function iconFor(raw, fallback) {
  const name = typeof raw === "string" && raw.trim() ? toLucideName(raw) : fallback;
  return lucideSvg(name, "grid-card-icon-svg") ?? lucideSvg(fallback, "grid-card-icon-svg");
}
var Barcode = () => /* @__PURE__ */ jsx("span", { class: "grid-card-barcode", "aria-hidden": "true" });
var minorWords = new Set(
  "a an and as at by for from in into is of on or the to vs vs. with - \u2013 \u2014 & /".split(" ")
);
function posterLines(title) {
  const words = title.split(/\s+/).flatMap((word) => word.split(/(?<=[^-\s]-)(?=[^-\s])/)).filter(Boolean);
  const hasMajor = words.some((word) => !minorWords.has(word.toLowerCase()));
  const lines = [];
  for (const word of words) {
    const minor = hasMajor && minorWords.has(word.toLowerCase());
    const last = lines[lines.length - 1];
    if (minor && last?.minor) last.text += ` ${word}`;
    else lines.push({ minor, text: word });
  }
  return lines;
}
var Poster = ({ title, icon }) => {
  const lines = posterLines(title);
  const major = lines.filter((line) => !line.minor);
  const chars = Math.max(4, ...major.map((line) => line.text.length));
  return /* @__PURE__ */ jsxs(
    "div",
    {
      class: "grid-card-poster",
      "aria-hidden": "true",
      style: `--chars:${chars};--major:${major.length};--minor:${lines.length - major.length}`,
      children: [
        /* @__PURE__ */ jsx("span", { class: "grid-card-poster-icon", dangerouslySetInnerHTML: { __html: icon ?? "" } }),
        /* @__PURE__ */ jsx("p", { class: "grid-card-poster-title", children: lines.map((line) => /* @__PURE__ */ jsx("span", { class: line.minor ? "is-minor" : "is-major", children: line.text })) })
      ]
    }
  );
};
var GridCards = ({ allFiles, cfg, ctx, fileData }) => {
  const slug = fileData.slug ?? "";
  const isTag = slug.startsWith("tags/") && slug !== "tags/index";
  const isFolder = slug.endsWith("/index") && !slug.startsWith("tags/");
  if (!isFolder && !isTag) return null;
  const cards = (isFolder ? folderCards(allFiles, slug) : tagCards(allFiles, slug.slice("tags/".length))).sort(byFolderDateTitle);
  if (cards.length === 0) return null;
  const basePath = ctx.argv.serve || !cfg.baseUrl ? "" : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "");
  const contentDir = path.resolve(ctx.argv.directory ?? "content");
  const href = (target) => `${basePath}/${target.replace(/(^|\/)index$/, "$1")}`;
  const digits = Math.max(2, String(cards.length).length);
  const number = (index) => String(index + 1).padStart(digits, "0");
  const total = number(cards.length - 1);
  const collection = isFolder ? slug.split("/").slice(-2, -1)[0] ?? "" : `#${slug.slice("tags/".length)}`;
  return /* @__PURE__ */ jsxs("section", { class: "grid-cards", "data-face": "front", "aria-label": "Notes", children: [
    /* @__PURE__ */ jsxs("header", { class: "grid-cards-header", children: [
      /* @__PURE__ */ jsxs("p", { class: "grid-cards-count", children: [
        /* @__PURE__ */ jsx("span", { children: "Collection" }),
        /* @__PURE__ */ jsx("span", { children: collection }),
        /* @__PURE__ */ jsxs("span", { children: [
          cards.length,
          " ",
          cards.length === 1 ? "card" : "cards"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { class: "grid-cards-faces", role: "group", "aria-label": "Card side", children: [
        /* @__PURE__ */ jsx("button", { type: "button", "data-face": "front", "aria-pressed": "true", children: "Fronts" }),
        /* @__PURE__ */ jsx("button", { type: "button", "data-face": "back", "aria-pressed": "false", children: "Backs" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("ul", { class: "grid-cards-list", children: cards.map((card, index) => {
      const position = `${number(index)}/${total}`;
      if (card.kind === "folder") {
        return /* @__PURE__ */ jsx(
          "li",
          {
            class: "grid-card is-folder",
            "data-types": "[]",
            "data-tags": "[]",
            style: `--i:${index % 12}`,
            children: /* @__PURE__ */ jsxs("div", { class: "grid-card-inner", children: [
              /* @__PURE__ */ jsx("div", { class: "grid-card-face grid-card-front", children: /* @__PURE__ */ jsxs("div", { class: "grid-card-surface", children: [
                /* @__PURE__ */ jsxs("div", { class: "grid-card-top", children: [
                  /* @__PURE__ */ jsx("span", { children: position }),
                  /* @__PURE__ */ jsx("span", { class: "grid-card-badge", children: "Folder" })
                ] }),
                /* @__PURE__ */ jsx("div", { class: "grid-card-visual is-empty", children: /* @__PURE__ */ jsx(Poster, { title: card.title, icon: iconFor(void 0, "Folder") }) }),
                /* @__PURE__ */ jsx("h3", { class: "grid-card-title", children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    class: "internal grid-card-link",
                    href: href(card.slug),
                    "data-no-popover": "true",
                    children: card.title
                  }
                ) }),
                /* @__PURE__ */ jsxs("p", { class: "grid-card-description", children: [
                  card.count,
                  " ",
                  card.count === 1 ? "note" : "notes",
                  " inside"
                ] }),
                /* @__PURE__ */ jsxs("div", { class: "grid-card-bottom", children: [
                  /* @__PURE__ */ jsx("span", { children: formatDate(card.date) }),
                  /* @__PURE__ */ jsx(Barcode, {})
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { class: "grid-card-face grid-card-back", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("div", { class: "grid-card-surface", children: [
                /* @__PURE__ */ jsxs("div", { class: "grid-card-top", children: [
                  /* @__PURE__ */ jsx("span", { children: position }),
                  /* @__PURE__ */ jsx("span", { children: "// Folder" })
                ] }),
                /* @__PURE__ */ jsx("p", { class: "grid-card-back-title", children: card.title }),
                /* @__PURE__ */ jsxs("div", { class: "grid-card-bottom", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    card.count,
                    " ",
                    card.count === 1 ? "note" : "notes"
                  ] }),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      class: "internal grid-card-open",
                      href: href(card.slug),
                      tabIndex: -1,
                      "data-no-popover": "true",
                      children: "Open \u2192"
                    }
                  )
                ] })
              ] }) })
            ] })
          }
        );
      }
      const { file } = card;
      const frontmatter = file.frontmatter ?? {};
      const title = cardTitle(card);
      const types = textList(frontmatter.type).map((type) => type.toLowerCase());
      const tags = textList(frontmatter.tags);
      const lifecycle = textList(frontmatter.lifecycle)[0];
      const description = firstText(frontmatter.description) ?? file.description;
      const imageSlug = coverSlug(frontmatter.cover, file.links);
      const imageUrl = imageSlug ? assetUrl(basePath, imageSlug) : void 0;
      const icon = iconFor(frontmatter.icon, "File");
      const lines = excerpt(file, contentDir);
      const words = file.text?.trim().split(/\s+/).length ?? 0;
      const minutes = Math.max(1, Math.ceil(words / 200));
      return /* @__PURE__ */ jsx(
        "li",
        {
          class: "grid-card",
          style: `--i:${index % 12}`,
          "data-slug": card.slug,
          "data-types": JSON.stringify(types),
          "data-tags": JSON.stringify(tags),
          children: /* @__PURE__ */ jsxs("div", { class: "grid-card-inner", children: [
            /* @__PURE__ */ jsx("div", { class: "grid-card-face grid-card-front", children: /* @__PURE__ */ jsxs("div", { class: "grid-card-surface", children: [
              /* @__PURE__ */ jsxs("div", { class: "grid-card-top", children: [
                /* @__PURE__ */ jsx("span", { children: position }),
                lifecycle && /* @__PURE__ */ jsx("span", { class: "grid-card-badge", children: lifecycle })
              ] }),
              /* @__PURE__ */ jsxs("div", { class: imageUrl ? "grid-card-visual" : "grid-card-visual is-empty", children: [
                imageUrl ? /* @__PURE__ */ jsx("img", { src: imageUrl, alt: "", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsx(Poster, { title, icon }),
                /* @__PURE__ */ jsx("span", { class: "grid-card-type", children: types.length ? types.map(typeLabel).join(" / ") : "Note" })
              ] }),
              /* @__PURE__ */ jsx("h3", { class: "grid-card-title", children: /* @__PURE__ */ jsx(
                "a",
                {
                  class: "internal grid-card-link",
                  href: href(card.slug),
                  "data-no-popover": "true",
                  children: title
                }
              ) }),
              description && /* @__PURE__ */ jsx("p", { class: "grid-card-description", children: description }),
              /* @__PURE__ */ jsxs("div", { class: "grid-card-bottom", children: [
                /* @__PURE__ */ jsx("span", { children: formatDate(card.date) }),
                /* @__PURE__ */ jsx(Barcode, {}),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    class: "grid-card-icon",
                    dangerouslySetInnerHTML: { __html: icon ?? "" }
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { class: "grid-card-face grid-card-back", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("div", { class: "grid-card-surface", children: [
              /* @__PURE__ */ jsxs("div", { class: "grid-card-top", children: [
                /* @__PURE__ */ jsx("span", { children: position }),
                /* @__PURE__ */ jsx("span", { children: "// Field notes" })
              ] }),
              /* @__PURE__ */ jsx("p", { class: "grid-card-back-title", children: title }),
              lines.length ? /* @__PURE__ */ jsx("ol", { class: "grid-card-excerpt", children: lines.map((line) => /* @__PURE__ */ jsx("li", { children: line })) }) : /* @__PURE__ */ jsx("p", { class: "grid-card-excerpt-empty", children: "No notes written yet." }),
              /* @__PURE__ */ jsx("ul", { class: "grid-card-tags", children: tags.length ? tags.map((tag) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "a",
                {
                  class: "internal tag-link",
                  "data-no-popover": "true",
                  href: `${basePath}/tags/${slugTag(tag)}`,
                  tabIndex: -1,
                  children: tag
                }
              ) })) : /* @__PURE__ */ jsx("li", { class: "grid-card-tags-empty", children: "No tags" }) }),
              /* @__PURE__ */ jsxs("div", { class: "grid-card-bottom", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  minutes,
                  " min read"
                ] }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    class: "internal grid-card-open",
                    href: href(card.slug),
                    tabIndex: -1,
                    "data-no-popover": "true",
                    children: "Open note \u2192"
                  }
                )
              ] })
            ] }) })
          ] })
        }
      );
    }) })
  ] });
};
GridCards.afterDOMLoaded = script;
var GridCards_default = (() => GridCards);
export {
  GridCards_default as GridCards
};
