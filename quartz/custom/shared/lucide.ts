import * as lucide from "lucide-static"

const icons = lucide as unknown as Record<string, string | undefined>

// Accepts Lucide names as written in Obsidian: "ShieldAlert", "shield-alert",
// "lucide-shield-alert", or Iconize's "LiShieldAlert".
export function toLucideName(raw: string): string {
  const name = raw
    .trim()
    .replace(/^lucide-/i, "")
    .replace(/^Li(?=[A-Z])/, "")
  return name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("")
}

// Single-line SVG markup for a Lucide icon, or undefined when the name is unknown.
export function lucideSvg(name: string, className: string): string | undefined {
  const svg = icons[name]
  if (typeof svg !== "string" || !svg.trimStart().startsWith("<svg")) return undefined
  return svg
    .replace(/\s*\n\s*/g, " ")
    .replace(/class="[^"]*"/, `class="${className}" aria-hidden="true"`)
    .trim()
}
