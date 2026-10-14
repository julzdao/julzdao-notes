---
up: "[[julzdao/computer-science/Java]]"
title: char
tags:
  - l/java
  - cs/data-types
cs-foundations:
  - "[[julzdao/computer-science/Binary]]"
type:
  - concept
description: A 16-bit Java primitive representing a UTF-16 code unit
cover:
lifecycle:
  - sapling
---
A `char` stores a value,
of sixteen bits,
which can be treated as a character
or as an unsigned number
within an expression.

---

`char` is a 16-bit primitive that represents a UTF-16 code unit, with values ranging from `0` to `65535`. It can be assigned a character, a Unicode value or a compatible integer value.

```java
char letter = 'A';
char unicode = '\u0041';
char number = 65;
```

---