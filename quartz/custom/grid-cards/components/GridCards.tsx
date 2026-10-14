import { readFileSync, statSync } from "node:fs"
import path from "node:path"
import { getAllSegmentPrefixes, getDate, slugTag } from "@quartz-community/utils"
import type { QuartzComponent, QuartzComponentConstructor } from "../../../components/types"
import type { QuartzPluginData } from "../../../plugins/vfile"
import { lucideSvg, toLucideName } from "../../shared/lucide"
import { assetUrl, coverSlug, firstText, textList, typeLabel } from "../../shared/note-data"

const script = readFileSync(new URL("../../scripts/grid-cards.inline.js", import.meta.url), "utf8")

const EXCERPT_LINES = 5

type Card =
  | { kind: "folder"; slug: string; title: string; count: number; date?: Date }
  | { kind: "note"; slug: string; file: QuartzPluginData; date?: Date }

// Mirrors the folder-page plugin: direct children, plus one entry per subfolder.
function folderCards(allFiles: QuartzPluginData[], folderSlug: string): Card[] {
  const prefix = folderSlug.slice(0, -"index".length)
  const cards: Card[] = []
  const subfolders = new Map<string, QuartzPluginData[]>()
  for (const file of allFiles) {
    const slug = file.slug
    if (!slug || file.unlisted === true || !slug.startsWith(prefix)) continue
    const rest = slug.slice(prefix.length)
    if (!rest || rest === "index") continue
    const [head, ...tail] = rest.split("/")
    if (tail.length === 0) cards.push({ kind: "note", slug, file, date: getDate(file) })
    else subfolders.set(head, [...(subfolders.get(head) ?? []), file])
  }
  for (const [name, files] of subfolders) {
    const slug = `${prefix}${name}/index`
    const index = files.find((file) => file.slug === slug)
    const title = (index?.frontmatter?.title as string | undefined) ?? name
    const dates = files.map(getDate).filter((date): date is Date => Boolean(date))
    const date = dates.sort((a, b) => b.getTime() - a.getTime())[0]
    cards.push({ kind: "folder", slug, title, count: files.length - (index ? 1 : 0), date })
  }
  return cards
}

// Mirrors the tag-page plugin: a note matches its tags and every parent of a nested tag.
function tagCards(allFiles: QuartzPluginData[], tag: string): Card[] {
  return allFiles.flatMap((file): Card[] => {
    if (!file.slug || file.unlisted === true) return []
    const tags = textList(file.frontmatter?.tags).flatMap(getAllSegmentPrefixes).map(slugTag)
    return tags.includes(tag) ? [{ kind: "note", slug: file.slug, file, date: getDate(file) }] : []
  })
}

function byFolderDateTitle(a: Card, b: Card): number {
  if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1
  const byDate = (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)
  return byDate || cardTitle(a).localeCompare(cardTitle(b))
}

function cardTitle(card: Card): string {
  return card.kind === "folder"
    ? card.title
    : (firstText(card.file.frontmatter?.title) ?? card.slug.split("/").pop() ?? card.slug)
}

// Strips inline Markdown/Obsidian syntax so the back of the card reads as plain text.
function plainLine(line: string): string {
  return line
    .replace(/^\s*>\s*(\[![^\]]*\][+-]?\s*)?/, "")
    .replace(/^\s*(#{1,6}\s+|[-*+]\s+(\[[ xX]\]\s+)?|\d+[.)]\s+)/, "")
    .replace(/!\[\[[^\]]*\]\]|!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[\[([^\]|#]*)(#[^\]|]*)?\|([^\]]*)\]\]/g, "$3")
    .replace(/\[\[([^\]|#]*)(#[^\]]*)?\]\]/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__|==|~~|`)/g, "")
    .replace(/(^|\W)[*_](\S[^*_]*)[*_](?=\W|$)/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim()
}

const excerptCache = new Map<string, { mtime: number; lines: string[] }>()

// The first lines of the note body as written, read from the Markdown source:
// Quartz's plain-text field drops the hard line breaks these notes rely on.
function excerpt(file: QuartzPluginData, contentDir: string): string[] {
  const relative = file.relativePath ?? file.filePath
  if (!relative || !relative.endsWith(".md")) return []
  const source = path.isAbsolute(relative) ? relative : path.resolve(contentDir, relative)
  try {
    const mtime = statSync(source).mtimeMs
    const cached = excerptCache.get(source)
    if (cached?.mtime === mtime) return cached.lines

    let lines = readFileSync(source, "utf8").split(/\r?\n/)
    if (lines[0]?.trim() === "---") {
      const end = lines.findIndex((line, index) => index > 0 && line.trim() === "---")
      lines = end === -1 ? lines : lines.slice(end + 1)
    }
    let inCode = false
    const result: string[] = []
    for (const line of lines) {
      if (/^\s*(```|~~~)/.test(line)) inCode = !inCode
      if (inCode || /^\s*(---+|\*\*\*+|___+)\s*$/.test(line) || /^\s*%%/.test(line)) continue
      const text = plainLine(line)
      if (text) result.push(text)
      if (result.length === EXCERPT_LINES) break
    }
    excerptCache.set(source, { mtime, lines: result })
    return result
  } catch {
    return []
  }
}

function formatDate(date: Date | undefined): string {
  if (!date || Number.isNaN(date.getTime())) return "----.--.--"
  const pad = (value: number) => String(value).padStart(2, "0")
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`
}

function iconFor(raw: unknown, fallback: string): string | undefined {
  const name = typeof raw === "string" && raw.trim() ? toLucideName(raw) : fallback
  return lucideSvg(name, "grid-card-icon-svg") ?? lucideSvg(fallback, "grid-card-icon-svg")
}

const Barcode = () => <span class="grid-card-barcode" aria-hidden="true" />

// Connector words stay small in the poster title, like "FROM / EARTH / TO / VENUS".
const minorWords = new Set(
  "a an and as at by for from in into is of on or the to vs vs. with - – — & /".split(" "),
)

type PosterLine = { minor: boolean; text: string }

function posterLines(title: string): PosterLine[] {
  // Hyphenated compounds break after the hyphen so "Resource-Constrained" sets as
  // two big lines instead of one tiny one.
  const words = title
    .split(/\s+/)
    .flatMap((word) => word.split(/(?<=[^-\s]-)(?=[^-\s])/))
    .filter(Boolean)
  const hasMajor = words.some((word) => !minorWords.has(word.toLowerCase()))
  const lines: PosterLine[] = []
  for (const word of words) {
    const minor = hasMajor && minorWords.has(word.toLowerCase())
    const last = lines[lines.length - 1]
    if (minor && last?.minor) last.text += ` ${word}`
    else lines.push({ minor, text: word })
  }
  return lines
}

// Cover stand-in: the title set as a poster, sized in CSS from the longest word
// and the number of lines so it always fills the frame.
const Poster = ({ title, icon }: { title: string; icon?: string }) => {
  const lines = posterLines(title)
  const major = lines.filter((line) => !line.minor)
  const chars = Math.max(4, ...major.map((line) => line.text.length))
  return (
    <div
      class="grid-card-poster"
      aria-hidden="true"
      style={`--chars:${chars};--major:${major.length};--minor:${lines.length - major.length}`}
    >
      <span class="grid-card-poster-icon" dangerouslySetInnerHTML={{ __html: icon ?? "" }} />
      <p class="grid-card-poster-title">
        {lines.map((line) => (
          <span class={line.minor ? "is-minor" : "is-major"}>{line.text}</span>
        ))}
      </p>
    </div>
  )
}

// Card links opt out of Quartz hover previews: the card already is the preview,
// so popovers stay reserved for links inside a note's body.
const GridCards: QuartzComponent = ({ allFiles, cfg, ctx, fileData }) => {
  const slug = fileData.slug ?? ""
  const isTag = slug.startsWith("tags/") && slug !== "tags/index"
  const isFolder = slug.endsWith("/index") && !slug.startsWith("tags/")
  if (!isFolder && !isTag) return null

  const cards = (
    isFolder ? folderCards(allFiles, slug) : tagCards(allFiles, slug.slice("tags/".length))
  ).sort(byFolderDateTitle)
  if (cards.length === 0) return null

  const basePath =
    ctx.argv.serve || !cfg.baseUrl
      ? ""
      : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "")
  const contentDir = path.resolve(ctx.argv.directory ?? "content")
  const href = (target: string) => `${basePath}/${target.replace(/(^|\/)index$/, "$1")}`
  const digits = Math.max(2, String(cards.length).length)
  const number = (index: number) => String(index + 1).padStart(digits, "0")
  const total = number(cards.length - 1)
  const collection = isFolder
    ? (slug.split("/").slice(-2, -1)[0] ?? "")
    : `#${slug.slice("tags/".length)}`

  return (
    <section class="grid-cards" data-face="front" aria-label="Notes">
      <header class="grid-cards-header">
        <p class="grid-cards-count">
          <span>Collection</span>
          <span>{collection}</span>
          <span>
            {cards.length} {cards.length === 1 ? "card" : "cards"}
          </span>
        </p>
        <div class="grid-cards-faces" role="group" aria-label="Card side">
          <button type="button" data-face="front" aria-pressed="true">
            Fronts
          </button>
          <button type="button" data-face="back" aria-pressed="false">
            Backs
          </button>
        </div>
      </header>

      <ul class="grid-cards-list">
        {cards.map((card, index) => {
          const position = `${number(index)}/${total}`

          if (card.kind === "folder") {
            return (
              <li
                class="grid-card is-folder"
                data-types="[]"
                data-tags="[]"
                style={`--i:${index % 12}`}
              >
                <div class="grid-card-inner">
                  <div class="grid-card-face grid-card-front">
                    <div class="grid-card-surface">
                      <div class="grid-card-top">
                        <span>{position}</span>
                        <span class="grid-card-badge">Folder</span>
                      </div>
                      <div class="grid-card-visual is-empty">
                        <Poster title={card.title} icon={iconFor(undefined, "Folder")} />
                      </div>
                      <h3 class="grid-card-title">
                        <a
                          class="internal grid-card-link"
                          href={href(card.slug)}
                          data-no-popover="true"
                        >
                          {card.title}
                        </a>
                      </h3>
                      <p class="grid-card-description">
                        {card.count} {card.count === 1 ? "note" : "notes"} inside
                      </p>
                      <div class="grid-card-bottom">
                        <span>{formatDate(card.date)}</span>
                        <Barcode />
                      </div>
                    </div>
                  </div>
                  <div class="grid-card-face grid-card-back" aria-hidden="true">
                    <div class="grid-card-surface">
                      <div class="grid-card-top">
                        <span>{position}</span>
                        <span>// Folder</span>
                      </div>
                      <p class="grid-card-back-title">{card.title}</p>
                      <div class="grid-card-bottom">
                        <span>
                          {card.count} {card.count === 1 ? "note" : "notes"}
                        </span>
                        <a
                          class="internal grid-card-open"
                          href={href(card.slug)}
                          tabIndex={-1}
                          data-no-popover="true"
                        >
                          Open →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          }

          const { file } = card
          const frontmatter = (file.frontmatter ?? {}) as Record<string, unknown>
          const title = cardTitle(card)
          const types = textList(frontmatter.type).map((type) => type.toLowerCase())
          const tags = textList(frontmatter.tags)
          const lifecycle = textList(frontmatter.lifecycle)[0]
          const description = firstText(frontmatter.description) ?? file.description
          const imageSlug = coverSlug(frontmatter.cover, file.links)
          const imageUrl = imageSlug ? assetUrl(basePath, imageSlug) : undefined
          const icon = iconFor(frontmatter.icon, "File")
          const lines = excerpt(file, contentDir)
          const words = file.text?.trim().split(/\s+/).length ?? 0
          const minutes = Math.max(1, Math.ceil(words / 200))

          return (
            <li
              class="grid-card"
              style={`--i:${index % 12}`}
              data-slug={card.slug}
              data-types={JSON.stringify(types)}
              data-tags={JSON.stringify(tags)}
            >
              <div class="grid-card-inner">
                <div class="grid-card-face grid-card-front">
                  <div class="grid-card-surface">
                    <div class="grid-card-top">
                      <span>{position}</span>
                      {lifecycle && <span class="grid-card-badge">{lifecycle}</span>}
                    </div>
                    <div class={imageUrl ? "grid-card-visual" : "grid-card-visual is-empty"}>
                      {imageUrl ? (
                        <img src={imageUrl} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <Poster title={title} icon={icon} />
                      )}
                      <span class="grid-card-type">
                        {types.length ? types.map(typeLabel).join(" / ") : "Note"}
                      </span>
                    </div>
                    <h3 class="grid-card-title">
                      <a
                        class="internal grid-card-link"
                        href={href(card.slug)}
                        data-no-popover="true"
                      >
                        {title}
                      </a>
                    </h3>
                    {description && <p class="grid-card-description">{description}</p>}
                    <div class="grid-card-bottom">
                      <span>{formatDate(card.date)}</span>
                      <Barcode />
                      <span
                        class="grid-card-icon"
                        dangerouslySetInnerHTML={{ __html: icon ?? "" }}
                      />
                    </div>
                  </div>
                </div>

                <div class="grid-card-face grid-card-back" aria-hidden="true">
                  <div class="grid-card-surface">
                    <div class="grid-card-top">
                      <span>{position}</span>
                      <span>// Field notes</span>
                    </div>
                    <p class="grid-card-back-title">{title}</p>
                    {lines.length ? (
                      <ol class="grid-card-excerpt">
                        {lines.map((line) => (
                          <li>{line}</li>
                        ))}
                      </ol>
                    ) : (
                      <p class="grid-card-excerpt-empty">No notes written yet.</p>
                    )}
                    <ul class="grid-card-tags">
                      {tags.length ? (
                        tags.map((tag) => (
                          <li>
                            <a
                              class="internal tag-link"
                              data-no-popover="true"
                              href={`${basePath}/tags/${slugTag(tag)}`}
                              tabIndex={-1}
                            >
                              {tag}
                            </a>
                          </li>
                        ))
                      ) : (
                        <li class="grid-card-tags-empty">No tags</li>
                      )}
                    </ul>
                    <div class="grid-card-bottom">
                      <span>{minutes} min read</span>
                      <a
                        class="internal grid-card-open"
                        href={href(card.slug)}
                        tabIndex={-1}
                        data-no-popover="true"
                      >
                        Open note →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

GridCards.afterDOMLoaded = script

export default (() => GridCards) satisfies QuartzComponentConstructor
