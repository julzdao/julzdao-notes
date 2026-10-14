---
up:
title: Single Source of Truth
aliases:
  - Single Point of Truth
  - SSOT
  - SPOT
tags:
  - cs/clean-code
  - cs/design-pattern
  - cs/foundations
type:
  - principle
description: Every piece of data or rule must have a single authoritative source
cover:
lifecycle:
  - sapling
cs-foundations:
  - "[[Single Responsibility Principle]]"
  - "[[Dont Repeat Yourself - DRY]]"
---
The Single Point of Truth 
centralises the core logic 
behind a piece of code, rule 
or knowledge from a program.
The King of the implementation.

---

Centralising that rule ensures consistency and reduces the risk of conflicting changes. This links SSOT to [[Dont Repeat Yourself - DRY]]: **duplicating code is not always a problem; duplicating knowledge, however, can be.**

Let’s imagine that the rule states that a `username` must be at least four characters long. If that validation appears independently in the front-end, back-end and other components, we have several representations of the same truth. When the rule changes, one of them could become out of date.

```typescript
class User {
  static isValidUsername(username: string): boolean {
    return username.length >= 4;
  }
}
```

There is also a connection with [[Single Responsibility Principle]]. If there is a single authority responsible for a particular rule or state, it is easier to determine **who can modify it and where it should be changed**. However, these are different principles: SRP deals with responsibilities and reasons for change; SSOT deals with the authority over information.

> [!warning]  
> A single source of truth does not necessarily mean a single physical copy. We may have caches, replicas or derived representations, provided there is a clear authority and mechanisms to keep them consistent.

