---
up: "[[Java]]"
title: Arrays Are Objects in Java
cs-foundations:
  - "[[Object-Oriented Programming]]"
tags:
  - l/java
  - java/array
type:
  - concept
description: Understand that every array instance is a Java object
cover: "[[arrays-are-objects.png]]"
lifecycle:
  - sapling
---
In [[Java]], **every array is an object**, 
even `int[]`. 
It can be assigned to an `Object` reference, 
has its own identity, 
and inherits the methods available from `Object`.

---

Since [[Java]] is an [[Object-Oriented Programming]] language, pretty much everything is an `Object`. 
Two arrays with the same contents are still distinct objects.

```java
int[] values = {1, 2};
Object object = values;
System.out.println(values instanceof Object); // true
```

---