import type { QuartzComponent, QuartzComponentConstructor } from "../../../components/types"

const SidebarLogo: QuartzComponent = ({ cfg, ctx, fileData }) => {
  const basePath =
    ctx.argv.serve || !cfg.baseUrl
      ? ""
      : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "")
  const isHome = fileData.slug === "index"

  return (
    <a
      class={isHome ? "sidebar-logo active" : "sidebar-logo"}
      href={`${basePath}/`}
      aria-label="julzdao — Home"
      aria-current={isHome ? "page" : undefined}
    >
      <span>julz</span>
      <strong>dao</strong>
    </a>
  )
}

export default (() => SidebarLogo) satisfies QuartzComponentConstructor
