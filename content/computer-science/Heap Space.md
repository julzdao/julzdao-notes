---
title: Heap Space
timestamp: 2025-11-25T01:35:00
type:
  - concept
cs-foundations:
  - "[[Heap Space]]"
icon: Orbit
tags:
  - l/java
  - cs/memory
  - cs/foundations
description: The Void
---
The Heap Space is where   
the objects are allocated   
at Runtime.   
It is representing the Void.   

---

For optimizing performance,   
Java divides its memory and   
elements into stack and heap.   

For cleaning up   
the unused objects,   
the [[Garbage Collector|Garbage Collector]] 
is needed.   

It uses the [[String Pool]]
for optimizing the creation   
of new Strings and re-using   
existing ones.   

> [!hint] Lifetime
> Every new object that gets stored in the heap, gets a timestamp. That means that the heap is able to divide into younger and older generations. Leading up to an organized tree of stored objects. 

The most common error dealing with heap space is the `java.lang.OutOfMemoryError` , meaning that you have reached the limits of memory in your application by doing something wrong or not optimizing enough: 

```java 
public class JavaHeapSpace {
  public static void main(String[] args) throws Exception {
    String[] array = new String[200000 * 300000];
  }
}

// Output: 
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
  at memory.JavaHeapSpace.main(JavaHeapSpace.java:5)
```

### Resources

- [Understanding Java Heap Space](https://rollbar.com/blog/java-heap-space/#) 
- [Out of memory error](https://sematext.com/blog/java-lang-outofmemoryerror/) 
---
