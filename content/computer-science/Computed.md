---
up: "[[vault/0000-focus/02-farm-orchestra/angular-migration/Angular Concepts|Angular Concepts]]"
type:
  - concept
cs-fundamentals:
tags:
  - fr/angular
  - angular/signals
description: The Smart Spreadsheet from Excel
lifecycle:
  - sapling
---
Computed is like 
an Excel Formula 
which always recomputes 
itself automatically 
whenever a change happens. 

---

It is similar to the =`A1+B1` in Excel. You never need to type an specific number to it. It **recalculates** itself the instant A1 or B1 changes.  

Before signals were a thing, a proper `recomputeState()` was needed in case something changed. 

## Example in Vault42 

```ts
readonly filtered = computed(() => {
  const p = this.params();
  return filterNotes(this.indexSvc.index().notes, p.q, p.notebook, p.subfolder, p.subfolder3);
});

readonly selected = computed(() => {
  const { note, notebook, subfolder, subfolder3 } = this.params();
  if (!note) return undefined;
  return this.filtered().find((n) => n.slug === note)
    ?? (!notebook && !subfolder && !subfolder3
      ? this.indexSvc.index().notes.find((n) => n.slug === note)
      : undefined);
});
```

`selected` depends on `filtered`, which depends on a change within `params` and `index`. Angular tracks that whole dependency chain by itself. 