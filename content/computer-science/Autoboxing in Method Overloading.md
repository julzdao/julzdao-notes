---
up: "[[Java]]"
title: Autoboxing in Method Overloading
tags:
  - l/java
  - cs/data-types
type:
  - concept
description: Understanding conversion priority when resolving overloaded methods
cover:
lifecycle:
  - sapling
---
When the case happens, 
that [[Java]] needs to decide 
which method to use, 
it goes right to the 
simplest solution. 

---

When resolving Method Overloading, Java attempts to find the most specific applicable method. Put simply for OCA, an exact match or **primitive widening** is usually preferred over boxing, and varargs has the lowest priority.

The decision is made at [[Java Compiler|Java Compiler]] time, not via [[Dynamic Dispatch]].

```java
void test(long x) {}
void test(Integer x) {}

test(5); // chooses long
```

---