---
up: "[[Java]]"
title: float
cs-fundamentals:
tags:
  - l/java
  - cs/data-types
type:
  - concept
description: 32-bit IEEE 754 floating-point number
cover:
lifecycle:
  - sapling
---
`float` approximates decimals,
using thirty-two bits.
Sacrifices precision for size.
Requires an ‘f’ suffix in literals
and does not represent everything exactly.

---

`float` is Java’s 32-bit floating-point type. Decimal literals are `double` by default, so a `float` literal usually requires an ‘f’ or ‘F’.

For greater precision, [[double]] is used, although neither is suitable for exact decimal arithmetic.

```java
float temperature = 23.5f;
```

---