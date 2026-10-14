---
up:
type:
  - concept
tags:
  - l/css
  - fr/angular
description: Styling the host of the component.
cover:
lifecycle:
  - seed
cs-foundations:
  - "[[julzdao/computer-science/Dont Repeat Yourself - DRY]]"
---
Each html component's template, 
is wrapped with a `ng` container. 
This container becomes the `host` 
of the whole component. 
Use the `:host` property for styling it. 

---

```scss
:host {
	// styles to apply to the ng wrapping component
}
```