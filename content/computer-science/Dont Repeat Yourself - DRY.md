---
up:
title: Don't Repeat Yourself
aliases:
  - DRY
cs-foundations:
  - "[[Coupling]]"
  - "[[Single Point of Truth|Single Point of Truth]]"
tags:
  - cs/clean-code
  - cs/foundations
type:
  - principle
description: Avoid multiple representations of the same knowledge
cover: "[[DONOTREPEAT.png]]"
lifecycle:
  - sapling
---
The same piece of code 
should not appear twice. 
Don't Repeat Yourself. 
Centralising the definition 
removes duplication.

---

**Don’t Repeat Yourself (DRY)** aims to prevent the same piece of knowledge or system rule from being defined independently in multiple places.

If a validation rule appears repeatedly:

```typescript
// Component A
username.length >= 4;

// Component B
username.length >= 4;
```

A change means you have to track all its instances. Centralising the rule ensures there is a single definition:

```typescript
isValidUsername(username);
```

> [!warning]  
> DRY does not mean removing any similar code. Two code snippets may appear identical today but represent different concepts. Abstracting them too soon can create unnecessary [[Coupling]].

DRY is particularly closely linked to [[Single Point of Truth|Single Point of Truth]] : DRY prevents **duplication of knowledge**, whilst SSOT establishes **which representation is the authoritative one** for that knowledge.

According to [Kent Beck](https://martinfowler.com/bliki/BeckDesignRules.html), he wrote four rules of simple design to follow: 

- Passes the tests
- Reveals intention
- No duplication
- Fewest elements

---

## References

- [Martin Fowler Beck Design Rules](https://martinfowler.com/bliki/BeckDesignRules.html) 
