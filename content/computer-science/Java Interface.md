---
up: "[[julzdao/computer-science/Java]]"
title: Java Interface
cs-foundations:
  - "[[julzdao/computer-science/Single Point of Truth|Single Point of Truth]]"
  - "[[julzdao/computer-science/Polymorphism]]"
tags:
  - interface
  - l/java
type:
  - concept
description: Define a contract that different classes can implement
cover:
lifecycle:
  - sapling
---
An **interface** defines 
an abstract **type** that classes can implement. 
Its abstract methods represent required behaviour; 
it may also contain constants, `default` methods and `static` methods, 
depending on the version of Java.

---

Interfaces provide a natural basis for [[julzdao/computer-science/Polymorphism]] and [[julzdao/computer-science/Functional Interface]].

```java
interface Sensor {
    double read();
}
```
---
