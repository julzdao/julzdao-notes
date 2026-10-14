---
up: "[[Java]]"
title: Java Array
cs-fundamentals:
tags:
  - l/java
  - array
type:
  - concept
description: A fixed-size collection that stores elements of the same type
cover:
lifecycle:
  - sapling
---
An array groups values
of a single type;
its length is fixed from the outset,
its indices start at zero,
and the array itself is an object.

---

An **array** stores a fixed number of elements of the same type. It is accessed via indices ranging from `0` to `length - 1`.

Although it may contain primitive types, the array itself is always an object and resides in the [[Java Heap]].

```java
int[] values = {10, 20, 30};
System.out.println(values.length);
```
---
