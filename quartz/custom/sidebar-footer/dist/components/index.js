// components/SidebarFooter.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var SidebarFooter = ({ allFiles, cfg, ctx }) => {
  const basePath = ctx.argv.serve || !cfg.baseUrl ? "" : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "");
  const hasAbout = allFiles.some(({ slug }) => slug === "about");
  return /* @__PURE__ */ jsxs("footer", { class: "sidebar-footer", children: [
    /* @__PURE__ */ jsxs("nav", { "aria-label": "Site information", children: [
      /* @__PURE__ */ jsx("a", { href: "https://github.com/julzdao", rel: "me", children: "github" }),
      hasAbout && /* @__PURE__ */ jsx("a", { href: `${basePath}/about`, children: "about" }),
      /* @__PURE__ */ jsx("a", { href: `${basePath}/research`, children: "research" }),
      /* @__PURE__ */ jsx("a", { href: `${basePath}/index.xml`, type: "application/rss+xml", children: "rss" })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " julzdao"
    ] })
  ] });
};
var SidebarFooter_default = (() => SidebarFooter);
export {
  SidebarFooter_default as SidebarFooter
};
