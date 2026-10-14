---
up:
title: KISS Principle
aliases:
  - Keep It Simple
  - Keep It Simple, Stupid
tags:
  - cs/clean-code
  - cs/foundations
type:
  - principle
description: Choose the simplest solution that correctly solves the problem
cover:
lifecycle:
  - sapling
---
Keep it Simple, 
Stupid. 
No need to add 
more complexity. 
Simplicity as the most elegant solution.

---

The **KISS Principle** suggests choosing the simplest solution that correctly solves the problem. Any additional complexity must be justified by a genuine need.

If an operation can be expressed directly:

```typescript
const activeUsers = users.filter(user => user.active);
```

we do not need to introduce factories, strategies or new layers of abstraction straight away simply because they might be useful one day.

> [!tip]  
> Before adding an abstraction, ask yourself:  
> **What specific problem is it solving?**

A simple architecture is easier to understand, maintain and modify; if the system requires greater sophistication in the future, we can introduce it when there is evidence to support doing so.

---

