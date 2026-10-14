// The explorer renders its tree client-side after every navigation, so icons
// are attached by watching each explorer list for new rows.

function readIconData() {
  const root = document.querySelector(".explorer-icons")
  if (!root) return null
  try {
    return JSON.parse(root.dataset.icons || "{}")
  } catch {
    return null
  }
}

function slugFromHref(href) {
  const basePath = document.body?.dataset?.basepath ?? ""
  let path = href || ""
  if (basePath && path.startsWith(basePath)) path = path.slice(basePath.length)
  return path.replace(/^\/+/, "")
}

function iconElement(data, slug, fallback) {
  const name = data.bySlug[slug] || fallback
  const svg = data.svgs[name]
  if (!svg) return null
  const span = document.createElement("span")
  span.className = "explorer-icon"
  span.dataset.icon = name
  span.innerHTML = svg
  return span
}

function decorate(list, data) {
  for (const link of list.querySelectorAll("a.nav-file-title:not([data-icon-ready])")) {
    link.dataset.iconReady = "true"
    const icon = iconElement(data, slugFromHref(link.getAttribute("href")), data.defaults.file)
    if (icon) link.prepend(icon)
  }

  for (const folder of list.querySelectorAll(".folder-container:not([data-icon-ready])")) {
    folder.dataset.iconReady = "true"
    const target = folder.querySelector(".folder-button")
    const icon = iconElement(data, folder.dataset.folderpath || "", data.defaults.folder)
    if (target && icon) target.prepend(icon)
  }
}

function initializeExplorerIcons() {
  const data = readIconData()
  if (!data) return

  for (const list of document.querySelectorAll(".explorer .explorer-ul")) {
    decorate(list, data)
    const observer = new MutationObserver(() => decorate(list, data))
    observer.observe(list, { childList: true, subtree: true })
    window.addCleanup?.(() => observer.disconnect())
  }
}

// The explorer calls `scrollIntoView()` on the active note after rendering, which
// aligns it to the top of the viewport and scrolls the whole page with it. Keep
// that scroll inside the explorer list and leave the page where it is.
const nativeScrollIntoView = Element.prototype.scrollIntoView
Element.prototype.scrollIntoView = function (...args) {
  const list = this.closest?.(".explorer .explorer-ul")
  if (!list) return nativeScrollIntoView.apply(this, args)

  const listBox = list.getBoundingClientRect()
  const box = this.getBoundingClientRect()
  if (box.top < listBox.top) list.scrollTop -= listBox.top - box.top
  else if (box.bottom > listBox.bottom) list.scrollTop += box.bottom - listBox.bottom
}

document.addEventListener("nav", initializeExplorerIcons)
