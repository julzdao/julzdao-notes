import type { QuartzComponent, QuartzComponentConstructor } from "../../../components/types"
import { slugTag } from "@quartz-community/utils"
import { assetUrl, coverSlug, firstText, typeLabel } from "../../shared/note-data"

const NoteCover: QuartzComponent = ({ cfg, ctx, fileData }) => {
  const slug = fileData.slug ?? ""
  if (
    !fileData.filePath?.endsWith(".md") ||
    slug === "index" ||
    slug.startsWith("tags/") ||
    slug.endsWith("/index")
  ) {
    return null
  }

  const frontmatter = (fileData.frontmatter ?? {}) as Record<string, unknown>
  const basePath =
    ctx.argv.serve || !cfg.baseUrl
      ? ""
      : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "")
  const imageSlug = coverSlug(frontmatter.cover, fileData.links)
  const imageUrl = imageSlug ? assetUrl(basePath, imageSlug) : undefined
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.filter((tag): tag is string => typeof tag === "string")
    : []
  const typeValue = firstText(frontmatter.type)
  const types = Array.isArray(frontmatter.type)
    ? frontmatter.type.filter((type): type is string => typeof type === "string")
    : typeValue
      ? [typeValue]
      : []
  const description = firstText(frontmatter.description) ?? "No description provided."
  const published =
    frontmatter.published ??
    frontmatter.publishDate ??
    frontmatter.date ??
    fileData.dates?.published
  const publishedDate =
    published instanceof Date ? published : published ? new Date(String(published)) : undefined
  const publishedLabel =
    publishedDate && !Number.isNaN(publishedDate.getTime())
      ? new Intl.DateTimeFormat(cfg.locale ?? "en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(publishedDate)
      : "Not set"
  const readingMinutes = Math.max(
    1,
    Math.ceil((fileData.text?.trim().split(/\s+/).length ?? 0) / 200),
  )
  const duration = firstText(frontmatter.duration) ?? `${readingMinutes} min read`

  return (
    <section class="note-cover" aria-label="Note overview">
      <div class="note-cover-tags" aria-label="Note tags">
        {tags.length ? (
          tags.map((tag) => (
            <a class="internal tag-link" href={`${basePath}/tags/${slugTag(tag)}`}>
              {tag}
            </a>
          ))
        ) : (
          <span class="note-cover-tags-empty">No tags</span>
        )}
      </div>
      <div class="note-cover-main">
        <div class={imageUrl ? "note-cover-visual has-image" : "note-cover-visual is-empty"}>
          {imageUrl ? (
            <img src={imageUrl} alt="" loading="lazy" />
          ) : (
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 0L100 100M100 0L0 100" />
            </svg>
          )}
        </div>
        <dl class="note-cover-properties">
          <div>
            <dt>Description</dt>
            <dd>{description}</dd>
          </div>
          <div>
            <dt>Published on</dt>
            <dd>{publishedLabel}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{types.length ? types.map(typeLabel).join(", ") : "Not set"}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{duration}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default (() => NoteCover) satisfies QuartzComponentConstructor
