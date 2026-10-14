---
up: "[[Teamwork]]"
title: Small Pull Requests
aliases:
  - Create Small PRs
tags:
  - g/teamwork
  - cs/git
type:
  - insight
description: Keep changes small to make review, testing and integration easier
cover:
lifecycle:
  - sapling
cs-foundations:
  - "[[julzdao/computer-science/Single Responsibility Principle]]"
---
Pull Requests should limit 
to 200 lines of code changed 
as a rule of thumb. 
Each PR representing 
a single coherent change. 

---

**Small Pull Requests** reduce the amount of context a reviewer needs to keep in mind. This makes code review, testing and the detection of errors easier before the merge.

> [!tip]
> If a PR requires a lengthy explanation to justify why it contains several different changes, it can probably be split up.

A small PR ties in naturally with [[julzdao/computer-science/Single Responsibility Principle]]: the change should have a clear purpose. It also promotes "Continuous Integration" by integrating small changes more frequently.

---

## References

- [Google Best Practices](https://google.github.io/eng-practices/review/developer/small-cls.html)