---
up:
title: Fail Fast
tags:
  - cs/clean-code
  - cs/error-handling
  - cs/design-pattern
  - cs/foundations
type:
  - principle
description: Detect and stop errors as close as possible to their source
cover:
lifecycle:
  - sapling
---
A system must detect errors  
as close as possible to their source,  
make them visible immediately  
and halt the invalid operation  
before propagating an incorrect state.

---
### Core Concept

Fail-fast systems are designed to immediately stop functioning upon encountering an unexpected condition. This immediate failure helps to catch errors early, making debugging more straightforward.

> [!idea] Simply put
> It's like having an intelligent robot that, as soon as someone does something wrong, catches them on camera and tells them what they've done wrong.

The [fail-fast approach](https://javarevisited.blogspot.com/2012/02/fail-safe-vs-fail-fast-iterator-in-java.html) ensures that errors are caught immediately. For example, in the world of programming languages, Java embodies this approach by producing a [Null Pointer Exception](ttps://javarevisited.blogspot.com/2014/03/hibernate-nullpointerexception-due-to-space-in-HQL-Query.html#axzz8UkAByd7H)instantly when encountering a `null` value, stopping the system and making the error clear. This immediate response helps developers identify and address issues quickly, preventing them from becoming more serious.

By catching and stopping errors early, fail-fast systems reduce the risk of cascading failures, where one error leads to others. This makes it easier to contain and resolve issues before they spread through the system, preserving overall stability.

> [!info] Testing
> It is easy to write unit and integration tests for fail-fast systems. This advantage is even more pronounced when we need to understand the test failure. Fail-fast systems usually point directly at the problem in the error stack trace.

### Resources 
- https://medium.com/javarevisited/failure-is-required-understanding-fail-safe-and-fail-fast-strategies-ac9112fe056d

---

## References

- Martin Fowler - _Fail Fast_: [https://www.martinfowler.com/ieeeSoftware/failFast.pdf](https://www.martinfowler.com/ieeeSoftware/failFast.pdf)


