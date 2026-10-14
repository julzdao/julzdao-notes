---
up: "[[julzdao/computer-science/Java]]"
title: Functional Interface
cs-foundations:
tags:
  - l/java
  - java/interface
type:
  - concept
description: Containing exactly one abstract method.
cover:
lifecycle:
  - sapling
---
A functional interface is an interface 
that contains exactly one abstract method. 
It may contain zero or more 
default methods and/or static methods.
Perfect for predicates. 

---

```java 
 interface Predicate<T> {  
    boolean test(T t);  
}
```

### Why functional interfaces are cool? 

A functional interface 
comes super handy 
since having only one 
abstract method is enough for 
the [[julzdao/computer-science/Java Compiler]] to know that 
when a Simplified Lambda Expressions 
is called, the method being used is that one. 
