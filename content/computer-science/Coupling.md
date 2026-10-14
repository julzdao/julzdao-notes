---
up:
title: Coupling
cs-foundations:
  - "[[julzdao/computer-science/Encapsulation]]"
tags:
  - cs/clean-code
  - cs/foundations
type:
  - concept
description: Degree of interdependence between components
cover: "[[julzdao/computer-science/assets/coupling.png]]"
lifecycle:
  - sapling
---
The more a component knows  
about the details of another,  
the more closely their fates are bound.
Good design limits that knowledge  
to necessary contracts and behaviours.

---

**Coupling** describes the degree of dependency between components. High coupling means that a change in one part of the system can easily propagate to others. To illustrate this, 

The aim is not to eliminate dependencies — components need to collaborate — but to maintain **low and controlled coupling**, relying on contracts and behaviours rather than internal details or context.

For example, a component should not need to know where it is being used:

```typescript
// Coupled to its environment
if (fromFooter) {
  darkMode = true;
}

// Expresses the actual behaviour
theme = 'dark';
```

In the second case, we describe **what behaviour we want**, not who is using the component. This allows it to be reused in other contexts without modifying its implementation.

> [!tip]  
> When an API contains properties such as `fromFooter`, `insideSidebar` or `calledFromAdmin`, ask yourself:  
> **Am I describing behaviour, or am I filtering knowledge of the environment within the component?**

Reducing coupling is usually accompanied by an increase in cohesion. It also ties in directly with the [[julzdao/computer-science/The Law of Demeter|The Law of Demeter]]  or the [[julzdao/computer-science/Separation of Concerns SoC]].

---
