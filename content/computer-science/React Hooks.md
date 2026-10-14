---
up:
type:
  - concept
cs-foundations:
tags:
  - react
description: Hook into the current state.
cover: "[[julzdao/computer-science/assets/HOOKS.svg]]"
lifecycle:
  - seed
---
Hooks are functions 
that let you get the latest 
state of functions, 
so React may re-render some 
other components. 

---

Instead of the deeply-connected "Angular" features such as Signals, where a value changes and then all of the bindings that use that value automatically updates, in React, things are a bit more direct. 

## How React works 

1. `setState(newState)` -> "HEY, this state has just change, do something!"
2. React then calls the whole function where this hook is added, so hooks are also called again returning the new values. 
3. Now checks what actually changed from JSX, and udpates the DOM components that actually changed. Only those. 
4. Children from those updated components re-render as well. 

> [!warning] Not Singletons
> Differing from the [[julzdao/computer-science/Observer Pattern]], hooks are like instances, not Singletons. They can hold arguments like other any function, that means that each parent component gets a copy of that hook. 
