const FACE_KEY = "grid-cards-face"

function savedFace() {
  try {
    return localStorage.getItem(FACE_KEY) === "back" ? "back" : "front"
  } catch {
    return "front"
  }
}

function saveFace(face) {
  try {
    localStorage.setItem(FACE_KEY, face)
  } catch {}
}

// Only the visible side of each card is exposed to keyboard and screen readers.
function showFace(grid, face) {
  grid.dataset.face = face
  for (const button of grid.querySelectorAll(".grid-cards-faces button")) {
    button.setAttribute("aria-pressed", String(button.dataset.face === face))
  }
  for (const side of grid.querySelectorAll(".grid-card-face")) {
    const hidden = side.classList.contains("grid-card-back") !== (face === "back")
    side.setAttribute("aria-hidden", String(hidden))
    for (const link of side.querySelectorAll("a")) link.tabIndex = hidden ? -1 : 0
  }
}

function initializeGridCards() {
  for (const grid of document.querySelectorAll(".grid-cards")) {
    showFace(grid, savedFace())
    for (const button of grid.querySelectorAll(".grid-cards-faces button")) {
      const onClick = () => {
        showFace(grid, button.dataset.face)
        saveFace(button.dataset.face)
      }
      button.addEventListener("click", onClick)
      window.addCleanup?.(() => button.removeEventListener("click", onClick))
    }
  }
}

document.addEventListener("nav", initializeGridCards)
