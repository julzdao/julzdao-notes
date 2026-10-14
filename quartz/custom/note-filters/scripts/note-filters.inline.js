const typeLabels = new Map([
  ["fundamental", "Fundamental"],
  ["principle", "Principle"],
  ["concept", "Concept"],
  ["insight", "Insight"],
  ["technique", "Technique"],
  ["reference", "Reference"],
  ["moc", "Map of Content"],
  ["exercise", "Exercise"],
])

function parseList(value) {
  try {
    const parsed = JSON.parse(value || "[]")
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Grid cards carry their own types and tags.
function cardRows(grid) {
  return [...grid.querySelectorAll(":scope > li.grid-card")].map((element) => ({
    element,
    types: parseList(element.dataset.types),
    tags: parseList(element.dataset.tags),
  }))
}

// Fallback for the plain folder-page list when the grid is disabled.
function listRows(root, list) {
  let typeBySlug = {}
  try {
    typeBySlug = JSON.parse(root.dataset.noteTypes || "{}")
  } catch {
    return null
  }

  const basePath = root.dataset.basePath || ""
  return [...list.querySelectorAll(":scope > li.section-li")].map((element) => {
    const link = element.querySelector(".desc h3 a.internal")
    const path = link ? decodeURI(new URL(link.href, location.href).pathname) : ""
    const slug = path.startsWith(`${basePath}/`) ? path.slice(basePath.length + 1) : ""
    return {
      element,
      types: typeBySlug[slug] || [],
      tags: [...element.querySelectorAll(".tags a.tag-link")].map((tag) =>
        tag.textContent.trim().replace(/^#/, ""),
      ),
    }
  })
}

function initializeNoteFilters() {
  const root = document.querySelector(".center .note-filters")
  if (!root || root.dataset.ready === "true") return

  const center = root.closest(".center")
  const grid = center?.querySelector(".grid-cards .grid-cards-list")
  const list = grid ?? center?.querySelector(".page-listing ul.section-ul")
  if (!list) return

  const rows = grid ? cardRows(grid) : listRows(root, list)
  if (!rows) return

  const typeOptions = root.querySelector('[data-filter-options="type"]')
  const tagOptions = root.querySelector('[data-filter-options="tag"]')
  const status = root.querySelector(".note-filter-status")
  if (!typeOptions || !tagOptions || !status) return

  const types = [...new Set(rows.flatMap((row) => row.types))].sort((a, b) => {
    const order = [...typeLabels.keys()]
    const aIndex = order.indexOf(a)
    const bIndex = order.indexOf(b)
    const aRank = aIndex === -1 ? order.length : aIndex
    const bRank = bIndex === -1 ? order.length : bIndex
    return aRank - bRank || a.localeCompare(b)
  })
  const tags = [...new Set(rows.flatMap((row) => row.tags))].sort((a, b) => a.localeCompare(b))
  let selectedType = null
  let selectedTag = null

  const empty = document.createElement("p")
  empty.className = "note-filter-empty"
  empty.textContent = "No notes match these filters."
  empty.hidden = true
  list.after(empty)

  function update() {
    let shown = 0
    for (const row of rows) {
      const matches =
        (!selectedType || row.types.includes(selectedType)) &&
        (!selectedTag || row.tags.includes(selectedTag))
      row.element.hidden = !matches
      if (matches) shown++
    }
    empty.hidden = shown !== 0
    status.textContent = `Showing ${shown} of ${rows.length} ${rows.length === 1 ? "note" : "notes"}`
  }

  function addOption(container, kind, value, label) {
    const button = document.createElement("button")
    button.type = "button"
    button.className = `note-filter-option note-filter-option-${kind}`
    button.textContent = label
    button.dataset.value = value
    button.setAttribute("aria-pressed", "false")
    button.addEventListener("click", () => {
      if (kind === "type") {
        selectedType = selectedType === value ? null : value
      } else {
        selectedTag = selectedTag === value ? null : value
      }
      for (const option of container.querySelectorAll("button")) {
        option.setAttribute(
          "aria-pressed",
          String(option.dataset.value === (kind === "type" ? selectedType : selectedTag)),
        )
      }
      update()
    })
    container.append(button)
  }

  for (const type of types) addOption(typeOptions, "type", type, typeLabels.get(type) || type)
  for (const tag of tags) addOption(tagOptions, "tag", tag, `#${tag}`)
  if (types.length === 0) typeOptions.textContent = "No types in this list"
  if (tags.length === 0) tagOptions.textContent = "No tags in this list"

  root.dataset.ready = "true"
  update()
}

document.addEventListener("nav", initializeNoteFilters)
document.addEventListener("render", initializeNoteFilters)
