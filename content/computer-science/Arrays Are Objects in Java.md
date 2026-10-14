---
up: "[[julzdao/computer-science/Java]]"
title: Arrays Are Objects in Java
cs-foundations:
  - "[[julzdao/computer-science/Object-Oriented Programming]]"
tags:
  - l/java
  - java/array
type:
  - concept
description: Understand that every array instance is a Java object
cover: "[[julzdao/computer-science/assets/arrays-are-objects.png]]"
lifecycle:
  - sapling
---
In [[julzdao/computer-science/Java]], **every array is an object**, 
even `int[]`. 
It can be assigned to an `Object` reference, 
has its own identity, 
and inherits the methods available from `Object`.

---

Since [[julzdao/computer-science/Java]] is an [[julzdao/computer-science/Object-Oriented Programming]] language, pretty much everything is an `Object`. 
Two arrays with the same contents are still distinct objects.

```java
int[] values = {1, 2};
Object object = values;
System.out.println(values instanceof Object); // true
```

---