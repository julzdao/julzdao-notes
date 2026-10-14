---
up: "[[julzdao/computer-science/Java]]"
title: Java Static
cs-foundations:
  - "[[julzdao/computer-science/Heap Space]]"
tags:
  - l/java
  - cs/memory
type:
  - concept
description: Associate a member with the class rather than with each instance
cover:
lifecycle:
  - sapling
---
A `static` member 
belongs to the **class**. 

---

A static context cannot directly access instance members because there is no associated `this`.

```java
class Counter {
    static int total;
}
```

---

## References

- Oracle — *Java Language Specification*: https://docs.oracle.com/javase/specs/
- Oracle — *Java Tutorials*: https://docs.oracle.com/javase/tutorial/
