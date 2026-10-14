import type { QuartzComponent, QuartzComponentConstructor } from "../../../components/types"

const SidebarFooter: QuartzComponent = ({ allFiles, cfg, ctx }) => {
  const basePath =
    ctx.argv.serve || !cfg.baseUrl
      ? ""
      : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "")
  const hasAbout = allFiles.some(({ slug }) => slug === "about")

  return (
    <footer class="sidebar-footer">
      <nav aria-label="Site information">
        <a href="https://github.com/julzdao" rel="me">
          github
        </a>
        {hasAbout && <a href={`${basePath}/about`}>about</a>}
        <a href={`${basePath}/research`}>research</a>
        <a href={`${basePath}/index.xml`} type="application/rss+xml">
          rss
        </a>
      </nav>
      <p>© {new Date().getFullYear()} julzdao</p>
    </footer>
  )
}

export default (() => SidebarFooter) satisfies QuartzComponentConstructor
