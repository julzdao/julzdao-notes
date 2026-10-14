import { readFileSync } from "node:fs"
import type { QuartzComponent, QuartzComponentConstructor } from "../../../components/types"

const script = readFileSync(
  new URL("../../scripts/note-filters.inline.js", import.meta.url),
  "utf8",
)

const NoteFilters: QuartzComponent = ({ allFiles, cfg, ctx, fileData }) => {
  const slug = fileData.slug ?? ""
  if (slug === "tags" || slug === "tags/index") return null
  if (!slug.startsWith("tags/") && !slug.endsWith("/index")) return null

  const basePath =
    ctx.argv.serve || !cfg.baseUrl
      ? ""
      : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "")
  const noteTypes = Object.fromEntries(
    allFiles.flatMap((file) => {
      if (!file.slug || file.unlisted === true) return []
      const raw = (file.frontmatter as Record<string, unknown> | undefined)?.type
      const types = (Array.isArray(raw) ? raw : raw == null ? [] : [raw])
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim().toLowerCase())
      return types.length ? [[file.slug, types] as const] : []
    }),
  )

  return (
    <div class="note-filters" data-base-path={basePath} data-note-types={JSON.stringify(noteTypes)}>
      <section class="note-filter-panel note-filter-type" aria-label="Filter notes by type">
        <h2>
          Filter
          <br />
          by Type::
        </h2>
        <div class="note-filter-options" data-filter-options="type" />
      </section>
      <section class="note-filter-panel note-filter-tags" aria-label="Filter notes by tag">
        <h2>
          Filter
          <br />
          by Tags::
        </h2>
        <div class="note-filter-options" data-filter-options="tag" />
      </section>
      <p class="note-filter-status" role="status" aria-live="polite" />
    </div>
  )
}

NoteFilters.afterDOMLoaded = script

export default (() => NoteFilters) satisfies QuartzComponentConstructor
