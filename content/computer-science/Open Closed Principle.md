---
up:
title: Open Closed Principle
cs-fundamentals:
  - "[[julzdao/computer-science/Polymorphism]]"
tags:
  - cs/clean-code
  - cs/design-pattern
type:
  - principle
description: Extending functionality without modifying existing code
cover:
lifecycle:
  - sapling
---
The Open Closed Principle 
states how a program should 
have the ability to [[Change]] 
without the need of constantly
modifying existing implementation.

---

> The strongest tree grows new branches.  
> It doesn’t replace its trunk.

The idea is not that the code can never be modified. The aim is to identify the points where we expect variation and to protect the rest of the system through abstraction. Interfaces, [[julzdao/computer-science/Polymorphism]] and composition allow new implementations to be introduced whilst keeping the code that uses them stable.

For example, let’s imagine a system that calculates different types of discounts:

```typescript
interface Discount {
  calculate(price: number): number;
}

class StudentDiscount implements Discount {
  calculate(price: number): number {
    return price * 0.8;
  }
}

class SeniorDiscount implements Discount {
  calculate(price: number): number {
    return price * 0.7;
  }
}
```

If we need `EmployeeDiscount` tomorrow, we can create a new implementation of `Discount` without modifying the previous ones. **The system is extended by adding code, not by constantly altering stable code.**

> [!warning]  
> OCP does not mean creating an abstraction for every possible future change. Otherwise, we may fall into "Overengineering".

---

## References

- [The Open-Closed Principle](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html)