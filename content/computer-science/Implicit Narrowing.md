---
up: "[[julzdao/computer-science/Java]]"
title: Implicit Narrowing
cs-fundamentals:
  - "[[julzdao/computer-science/Compile-Time Constant]]"
tags:
  - l/java
  - cs/data-types
type:
  - concept
description: Allow certain integer constant literals within the range of a smaller type
cover:
lifecycle:
  - sapling
---
Narrowing usually requires a cast,
but a known constant
may fit exactly;
the compiler checks its range
and allows direct assignment.

---

Java allows a useful exception to narrowing: a [[julzdao/computer-science/Compile-Time Constant]] of type `int` can be assigned directly to `byte`, `short` or `char` if its value fits in the destination.

With normal variables, narrowing requires a cast.

```java
byte ok = 100;
// byte error = 200;
int n = 100;
byte explicit = (byte) n;
```
---
