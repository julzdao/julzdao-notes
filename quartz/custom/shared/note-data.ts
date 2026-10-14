import { slugifyFilePath } from "@quartz-community/utils"
import type { FilePath } from "../../util/path"

export function firstText(value: unknown): string | undefined {
  const candidate = Array.isArray(value) ? value[0] : value
  if (typeof candidate !== "string" && typeof candidate !== "number") return undefined
  const text = String(candidate).trim()
  return text || undefined
}

export function textList(value: unknown): string[] {
  const values = Array.isArray(value) ? value : value == null ? [] : [value]
  return values
    .filter((item): item is string | number => typeof item === "string" || typeof item === "number")
    .map((item) => String(item).trim())
    .filter(Boolean)
}

// Resolves a `cover: "[[image.png]]"` frontmatter value to the asset slug Quartz
// emitted, using the note's resolved links.
export function coverSlug(cover: unknown, links: unknown): string | undefined {
  const raw = firstText(cover)
  if (!raw) return undefined
  const target = raw
    .replace(/^!?(?:\[\[)/, "")
    .replace(/\]\]$/, "")
    .split("|")[0]
    ?.trim()
  if (!target) return undefined
  const assetSlug = slugifyFilePath(target as FilePath)
  if (!/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(assetSlug)) return undefined
  return Array.isArray(links)
    ? links.find(
        (link): link is string =>
          typeof link === "string" && (link === assetSlug || link.endsWith(`/${assetSlug}`)),
      )
    : undefined
}

export function assetUrl(basePath: string, slug: string): string {
  return `${basePath}/${slug.split("/").map(encodeURIComponent).join("/")}`
}

export function typeLabel(type: string): string {
  return type === "moc" ? "Map of Content" : type.replace(/^./, (letter) => letter.toUpperCase())
}
