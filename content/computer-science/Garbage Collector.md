---
up: "[[Java]]"
title: Garbage Collector
aliases:
  - GC
cs-foundations:
tags:
  - l/java
  - cs/memory
type:
  - concept
description: A JVM service that reclaims memory from unreachable objects
cover:
lifecycle:
  - sapling
---
The Garbage Collector (GC) 
is the [[JVM]]'s automatic 
memory management system. 

---
## Core Concept

It automatically **deallocates** (frees up) memory occupied by objects that are no longer actively used by the program.

GC primarily operates on the 
[[Heap Space]] memory area of the [[JVM]], 
where all Java objects reside.

> [!info] When is an object collected?
> An object is considered "garbage" when it is **unreachable** or **unreferenced**—meaning there are no active references (variables) in the running program that point to that object's memory location. 
> Check [[Beware of Variable Scope]] for more info.

Java is unique in that the programmer **does not** explicitly destroy objects or free memory (unlike C++). This avoids common memory leaks and dangling pointer errors.

### Resources

- [Oracle Java Documentation: Garbage Collection](https://www.google.com/search?q=https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gc-mechanism.html)
- [Baeldung: Guide to Java Garbage Collection](https://www.google.com/search?q=https://www.baeldung.com/java-garbage-collection)
- [GeeksforGeeks: Garbage Collector in Java](https://www.google.com/search?q=https://www.geeksforgeeks.org/garbage-collector-in-java/)