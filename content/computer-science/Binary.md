---
up: "[[Java]]"
title: Binary
cs-foundations:
tags:
  - cs/binary
  - l/java
  - cs/foundations
type:
  - fundamental
description: Representing information using only 0s and 1s
cover: "[[binary.png]]"
lifecycle:
  - sapling
---
Everything starts with bits.
Each position represents a power.
Zeros and ones form numbers.
Data types determine their size
and [[Java]] abstracts that representation.

---

The **binary** system represents values using `0` and `1`. Java’s primitive types occupy a defined number of bits, so concepts such as range, overflow and [[Java Bit Manipulation]] depend on this representation.

```java
int mask = 0b1010;
```

---