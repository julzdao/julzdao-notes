---
up: "[[julzdao/computer-science/Java]]"
title: Float vs Double
cs-fundamentals:
tags:
  - l/java
  - cs/data-types
type:
  - concept
description: Comparing the two primitive floating-point types in Java
cover:
lifecycle:
  - sapling
---
`float` takes up less space,
`double` offers greater precision,
both round decimal places,
Java prefers `double`,
and the context determines the cost.

---

`float` uses 32 bits and has a precision of approximately 6–7 decimal places; `double` uses 64 bits and has a precision of approximately 15–16. Java interprets decimal literals as `double` by default.

The choice is a trade-off between memory, precision and application requirements.

```java
float f = 3.14f;
double d = 3.14;
```

---

