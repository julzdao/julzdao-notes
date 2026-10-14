---
up: "[[Java]]"
title: Variable Scope in Java
tags:
  - l/java
type:
  - concept
description: Determine where a variable can be used within the code
cover:
lifecycle:
  - sapling
---
The Scope of a variable 
is like its domain expansion. 
The data from the variable 
is only able to be reached 
from within this limit. 

---

The **scope** determines where a name is visible. A local variable exists from the moment it is declared until the end of its block; parameters exist for the duration of the method; fields belong to the instance or class, depending on whether they are instance or `static`.

```java
if (true) {
    int x = 10;
}
// x is not visible here
```

---
