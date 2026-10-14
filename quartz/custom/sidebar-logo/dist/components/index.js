// components/SidebarLogo.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var SidebarLogo = ({ cfg, ctx, fileData }) => {
  const basePath = ctx.argv.serve || !cfg.baseUrl ? "" : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "");
  const isHome = fileData.slug === "index";
  return /* @__PURE__ */ jsxs(
    "a",
    {
      class: isHome ? "sidebar-logo active" : "sidebar-logo",
      href: `${basePath}/`,
      "aria-label": "julzdao \u2014 Home",
      "aria-current": isHome ? "page" : void 0,
      children: [
        /* @__PURE__ */ jsx("span", { children: "julz" }),
        /* @__PURE__ */ jsx("strong", { children: "dao" })
      ]
    }
  );
};
var SidebarLogo_default = (() => SidebarLogo);
export {
  SidebarLogo_default as SidebarLogo
};
