---
up: "[[julzdao/computer-science/Java]]"
title: byte
tags:
  - l/java
  - cs/data-types
  - cs/binary
cs-foundations:
  - "[[julzdao/computer-science/Binary]]"
type:
  - concept
description: 8-bit signed primitive integer
cover:
lifecycle:
  - sapling
---
A `byte` stores integers,
as 8-bit signed integers.
Its range is limited,
operations follow promotion rules,
and the compiler checks the type.

---

Imagine a **`byte`** as the 
**smallest possible storage unit** 🤏 
in the Java warehouse—a tiny locker.

This tiny locker is always 
exactly **8 bits** (or 1 byte) in size. 

> Because it's so small, it can only hold a very small range of whole numbers: from **−128 to +127**

Defaults to `0`. 

We can use this method of 
How to convert a number to binary
to learn the system behind 
the arrange of bits for each number.

Because `byte` is smaller than int, 
it often requires **explicit casting** 
when the value is a result of an 
expression that defaults to `int`.

```java 
byte a = 10; 
byte b = 20; 

byte c = (byte) (a + b); // Explicit type casting
```
### Resources

- https://www.datacamp.com/doc/java/byte :: Nice article on how to use the `byte` keyword in java with examples.

---