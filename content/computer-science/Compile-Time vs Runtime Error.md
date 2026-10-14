---
up: "[[Java]]"
title: Compile-Time vs Runtime Error
tags:
  - l/java
  - java/compiler
type:
  - concept
description: Distinguish between errors detected at compile time and those that occur at runtime
cover:
lifecycle:
  - sapling
---
A **compile-time error** prevents 
the generation of valid [[byte]] code: incorrect syntax, 
incompatible types or unreachable code. 
A **runtime error** occurs after compilation, 
during execution on the [[JVM]].

---

```java
int x = "hello"; // compile-time
// int y = 10 / 0; // ArithmeticException at runtime
```

Imagine you're writing a highly detailed script for a play 🎭.   
The [[Java Compiler]] is the **Script Editor**,   
and the [[JVM]] Runtime is the actual **Performance Director**.  

Before the first rehearsal even begins, the [[Java Compiler]] reviews the manuscript.   
They look for grammatical mistakes, misspelled character names, or impossible stage directions.  

The [[JVM]] takes the _perfectly edited script.   
and starts the actual performance.   
Everything is fine until an actor is told to   
divide the props in half—but the prop count is zero.   
Or, the script tells the actor to find a file backstage,   
but the file was deleted yesterday.   

The script was grammatically correct,   
but the instruction is **impossible to execute in the current environment**.  

> [!hint] Conclusion
> If the error is about **Java's grammar and rules**, the **Compiler** catches it before a `.class` file is even created. If the error is about an **impossible action** or a **missing resource** during execution, the **JVM** throws a **Runtime Error** (an Exception).

### 🦕 Sources 
- [Oracle Java Documentation: Catching and Handling Exceptions (Runtime)](https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html)
- [Baeldung: Java Compile-Time vs Runtime](https://www.google.com/search?q=https://www.baeldung.com/java-compile-time-vs-runtime)
- [GeeksforGeeks: Compile-Time vs Runtime Errors](https://www.google.com/search?q=https://www.geeksforgeeks.org/difference-between-compile-time-and-run-time-errors/)****
