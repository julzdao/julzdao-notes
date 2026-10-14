---
up: "[[Java]]"
title: Unreachable Statement
tags:
  - l/java
  - compiler
type:
  - concept
description: Code that the compiler can prove will never be executed
cover:
lifecycle:
  - sapling
---
If a path is never reached,
its code cannot be executed.
When [[Java]] can prove this,
the [[Java Compiler|Compiler]] rejects it
before generating [[byte]]code.

---

Java detects certain **unreachable statements** at compile time. For example, a statement placed immediately after an unconditional `return` cannot be reached and results in a compilation error.

```java
int value() {
    return 1;
    // System.out.println("never"); // unreachable
}
```

---
