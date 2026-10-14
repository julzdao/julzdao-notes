---
up: "[[julzdao/computer-science/Java]]"
title: Abstract Method
cs-foundations:
  - "[[julzdao/computer-science/Polymorphism]]"
tags:
  - l/java
  - java/interface
type:
  - concept
description: Declare a behaviour without providing an implementation yet
cover:
lifecycle:
  - sapling
---
An `abstract` method 
is like promising something. 
It does not implement yet. 
The concrete subclass 
should implement it though. 

---

An `abstract` method has no body. A **class** containing one must be `abstract`; a concrete class that inherits that method must implement it.

This method follows the [[julzdao/computer-science/Polymorphism]] way of doing things. Multiple concrete sub-classes from the `abstract` class implementing an `abstract` method, may contain different implementations. 

> [!important] Important
> abstract methods **are not exclusive to abstract classes**; [[julzdao/computer-science/Java Interface|interfaces]] can also declare abstract methods.

```java
abstract class Animal {
    abstract void speak();
}
```

---
## References

- Oracle: [Abstract Methods and Classes](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html) 
