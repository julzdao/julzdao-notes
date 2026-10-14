---
up: "[[julzdao/computer-science/Java]]"
title: int
cs-fundamentals:
  - "[[julzdao/computer-science/Binary]]"
tags:
  - l/java
  - cs/data-types
type:
  - concept
description: 32-bit primitive integer and default integer type
cover:
lifecycle:
  - sapling
---
`int` stores integers,
32-bit signed integers,
its range is limited,
operations follow promotion
and the compiler checks the type.

---

`int` is a **32-bit** primitive integer type, with a range from `-2³¹` to `2³¹−1`. Integer literals are `int` by default; for `long` values outside this range, the suffix `L` is used.

In arithmetic expressions, `byte` and `short` are usually promoted to `int` via [[julzdao/computer-science/Numeric Promotion in Java]].

```java
int value = 10;
```

---
