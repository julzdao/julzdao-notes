---
up:
title: Single Responsibility Principle
cs-fundamentals:
  - "[[Coupling]]"
  - "[[Separation of Concerns SoC|Separation of Concerns SoC]]"
tags:
  - cs/clean-code
  - cs/design-pattern
  - cs/foundations
type:
  - principle
description: Group together those things that change for the same reason
cover:
lifecycle:
  - sapling
---
A module should be responsible  
for only one thing.  
Grouping together those elements 
that change for the same reason  
and separating those that change for different reasons.

---

The **Single Responsibility Principle (SRP)** is the `S` in SOLID. It states that a module should have **a single reason to change** or, in Robert C. Martin’s modern formulation, be responsible to a single **actor**.

Let’s imagine an `Invoice` class that calculates prices, stores data in a database and generates a PDF. Although everything relates to an invoice, there are different reasons for modifying it: business rules, persistence or the document format may change.

Separating these responsibilities allows them to evolve independently:

```typescript
class Invoice {
  calculateTotal(): number { /* ... */ }
}

class InvoiceRepository {
  save(invoice: Invoice): void { /* ... */ }
}

class InvoicePdfGenerator {
  generate(invoice: Invoice): PDF { /* ... */ }
}
```

SRP promotes high cohesion: elements belonging to the same responsibility remain together. At the same time, it helps to reduce [[Coupling]], because different responsibilities are no longer intertwined within the same module.

There is a direct link to [[Separation of Concerns SoC]]. SoC applies the separation of concerns broadly across a system; SRP helps us decide **which responsibilities should remain together within their modules**.

> [!warning]  
> SRP does not mean that a class must have only one method or ‘do one thing’. A responsibility may require multiple operations. What is important is that those operations belong to the same reason for change. Keeping the [[Open Closed Principle]] in line.

Applying SRP is also not about aggressively splitting the code until you end up with dozens of tiny classes. The correct boundary emerges when we can identify **responsibilities that evolve for different reasons**.

---

## References

- [The Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)

