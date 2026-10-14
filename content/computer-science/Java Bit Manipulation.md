---
up: "[[Java]]"
title: Java Bit Manipulation
cs-foundations:
  - "[[Binary]]"
tags:
  - l/java
  - cs/binary
type:
  - concept
description: Manipulating binary representations using bitwise operators and shifts
cover:
lifecycle:
  - sapling
---
Numbers are also bits,
masks select positions,
AND clears or checks,
OR sets, and shifts move
without losing the integer value.

---

[[Java]] allows you to operate directly on bits using `&`, `|`, `^`, `~`, `<<`, `>>` and `>>>`. **Bit masks** are useful for representing compact flags, protocols and hardware registers, particularly in [[IoT]] and embedded systems.

```java
int READ = 1 << 0;
int WRITE = 1 << 1;
int permissions = READ | WRITE;
boolean canRead = (permissions & READ) != 0;
```

---
