---
up: "[[julzdao/computer-science/Java]]"
title: Catch Order Rule
tags:
  - cs/error-handling
  - l/java
type:
  - concept
description: Sort catch blocks from specific exceptions to more general types
cover:
lifecycle:
  - sapling
---
If the [[julzdao/computer-science/Java Compiler|Java Compiler]]
is able to recognise that    
the second Exception will   
never be catched, then it   
will throw an [[julzdao/computer-science/Unreachable Statement|Unreachable Statement]] 

---

> [!abstract] The Rule
   When chaining multiple `catch` blocks, exceptions must be ordered from **most specific (subclass)** to **most general (superclass)**.

```java 
try {
  // some code here
} catch ( Exception e) {
  e.printStackTrace();
} catch ( RuntimeException e ) { // this line will cause a compilation error because it would never be executed since the first catch would pick the exception
  e.printStackTrace();
}
```

> [!hint] Imagine an Hospital Urgent Room
> If an urgent patient comes and the first doctor that will always treat the patient is the General practicioner, then the specialist (second) will loose time or never be called since the first general doctor might also be able to treat the urgent patient. 

### 🦕 Sources 

- https://stackoverflow.com/questions/10964882/order-of-catching-exceptions-in-java :: Stack Overflow thread about this. 
---