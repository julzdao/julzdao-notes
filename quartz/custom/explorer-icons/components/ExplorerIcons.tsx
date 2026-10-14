import { readFileSync } from "node:fs"
import type { QuartzComponent, QuartzComponentConstructor } from "../../../components/types"
import { lucideSvg, toLucideName } from "../../shared/lucide"

const script = readFileSync(
  new URL("../../scripts/explorer-icons.inline.js", import.meta.url),
  "utf8",
)

// Fallbacks for notes and folders without an `icon` in their frontmatter.
// Folder icons come from the folder's `index.md`.
const defaultIcons = { file: "File", folder: "Folder" }

const warned = new Set<string>()

const ExplorerIcons: QuartzComponent = ({ allFiles }) => {
  const bySlug: Record<string, string> = {}
  const svgs: Record<string, string> = {}

  const use = (name: string) => {
    if (svgs[name]) return true
    const svg = lucideSvg(name, "explorer-icon-svg")
    if (svg) svgs[name] = svg
    return Boolean(svg)
  }

  for (const file of allFiles) {
    const raw = (file.frontmatter as Record<string, unknown> | undefined)?.icon
    if (!file.slug || typeof raw !== "string" || raw.trim() === "") continue
    const name = toLucideName(raw)
    if (use(name)) {
      bySlug[file.slug] = name
    } else if (!warned.has(raw)) {
      warned.add(raw)
      console.warn(`[explorer-icons] Unknown Lucide icon "${raw}" in ${file.filePath}`)
    }
  }
  use(defaultIcons.file)
  use(defaultIcons.folder)

  return (
    <div
      class="explorer-icons"
      hidden
      data-icons={JSON.stringify({ svgs, bySlug, defaults: defaultIcons })}
    />
  )
}

ExplorerIcons.afterDOMLoaded = script

export default (() => ExplorerIcons) satisfies QuartzComponentConstructor
