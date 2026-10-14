---
up: "[[julzdao/computer-science/Java]]"
title: Try Catch Finally
tags:
  - l/java
  - cs/error-handling
type:
  - concept
description: Handling exceptions and performing clean-up using structured blocks
cover:
lifecycle:
  - sapling
---
The Try Catch Finally 
block lets you handle 
possible thrown exceptions. 
Catching depending on the types, 
and finally executing something.

---

`try` contains code that may throw exceptions; `catch` handles compatible types and `finally` is executed as normal when exiting the `try/catch` block, regardless of whether an exception occurs.

`catch` blocks must adhere to the [[julzdao/computer-science/Catch Order Rule]] to ensure that specific handlers remain reachable.

```java
try {
    read();
} catch (IOException e) {
    recover();
} finally {
    close();
}
```

---
