// components/NoteCover.tsx
import { slugTag } from "@quartz-community/utils";

// ../shared/note-data.ts
import { slugifyFilePath } from "@quartz-community/utils";
function firstText(value) {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (typeof candidate !== "string" && typeof candidate !== "number") return void 0;
  const text = String(candidate).trim();
  return text || void 0;
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

// components/NoteCover.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var NoteCover = ({ cfg, ctx, fileData }) => {
  const slug = fileData.slug ?? "";
  if (!fileData.filePath?.endsWith(".md") || slug === "index" || slug.startsWith("tags/") || slug.endsWith("/index")) {
    return null;
  }
  const frontmatter = fileData.frontmatter ?? {};
  const basePath = ctx.argv.serve || !cfg.baseUrl ? "" : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "");
  const imageSlug = coverSlug(frontmatter.cover, fileData.links);
  const imageUrl = imageSlug ? assetUrl(basePath, imageSlug) : void 0;
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags.filter((tag) => typeof tag === "string") : [];
  const typeValue = firstText(frontmatter.type);
  const types = Array.isArray(frontmatter.type) ? frontmatter.type.filter((type) => typeof type === "string") : typeValue ? [typeValue] : [];
  const description = firstText(frontmatter.description) ?? "No description provided.";
  const published = frontmatter.published ?? frontmatter.publishDate ?? frontmatter.date ?? fileData.dates?.published;
  const publishedDate = published instanceof Date ? published : published ? new Date(String(published)) : void 0;
  const publishedLabel = publishedDate && !Number.isNaN(publishedDate.getTime()) ? new Intl.DateTimeFormat(cfg.locale ?? "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(publishedDate) : "Not set";
  const readingMinutes = Math.max(
    1,
    Math.ceil((fileData.text?.trim().split(/\s+/).length ?? 0) / 200)
  );
  const duration = firstText(frontmatter.duration) ?? `${readingMinutes} min read`;
  return /* @__PURE__ */ jsxs("section", { class: "note-cover", "aria-label": "Note overview", children: [
    /* @__PURE__ */ jsx("div", { class: "note-cover-tags", "aria-label": "Note tags", children: tags.length ? tags.map((tag) => /* @__PURE__ */ jsx("a", { class: "internal tag-link", href: `${basePath}/tags/${slugTag(tag)}`, children: tag })) : /* @__PURE__ */ jsx("span", { class: "note-cover-tags-empty", children: "No tags" }) }),
    /* @__PURE__ */ jsxs("div", { class: "note-cover-main", children: [
      /* @__PURE__ */ jsx("div", { class: imageUrl ? "note-cover-visual has-image" : "note-cover-visual is-empty", children: imageUrl ? /* @__PURE__ */ jsx("img", { src: imageUrl, alt: "", loading: "lazy" }) : /* @__PURE__ */ jsx("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M0 0L100 100M100 0L0 100" }) }) }),
      /* @__PURE__ */ jsxs("dl", { class: "note-cover-properties", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "Description" }),
          /* @__PURE__ */ jsx("dd", { children: description })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "Published on" }),
          /* @__PURE__ */ jsx("dd", { children: publishedLabel })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "Type" }),
          /* @__PURE__ */ jsx("dd", { children: types.length ? types.map(typeLabel).join(", ") : "Not set" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "Duration" }),
          /* @__PURE__ */ jsx("dd", { children: duration })
        ] })
      ] })
    ] })
  ] });
};
var NoteCover_default = (() => NoteCover);
export {
  NoteCover_default as NoteCover
};
