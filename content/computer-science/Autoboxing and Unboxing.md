---
up: "[[julzdao/computer-science/Java]]"
title: Autoboxing and Unboxing
tags:
  - l/java
  - cs/data-types
type:
  - concept
description: Automatically convert between Java primitives and their wrapper classes
cover:
lifecycle:
  - sapling
---
*Autoboxing* and *unboxing* 
data types allows 
flexible manipulation of data.
Either by expanding to `Objects`, 
or simplifying to primitives. 

---

**Autoboxing** automatically converts a primitive to its wrapper (`int → Integer`); **unboxing** performs the reverse conversion. This allows primitives to be used with object-based APIs, such as collections.

Unboxing `null` results in a `NullPointerException`.

```java
Integer boxed = 42; // boxing
int value = boxed;   // unboxing
```

---