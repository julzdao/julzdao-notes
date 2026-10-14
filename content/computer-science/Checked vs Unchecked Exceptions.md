---
up: "[[julzdao/computer-science/Java]]"
title: Checked vs Unchecked Exceptions
tags:
  - l/java
  - cs/error-handling
type:
  - insight
description: Distinguish between exceptions that the compiler requires you to handle or declare and those that it does not
cover:
lifecycle:
  - sapling
---
There are two types.  
of potential problems ⚠️   
in any project:   
**Foreseeable Risks** and   
**Unforeseeable Accidents**.  

---

Checked Exceptions are the  foreseeable Risks which the [[julzdao/computer-science/Java Compiler]] is able to detect.   

Unchecked Exceptions are the Unforeseeable accidents or programmer errors that are   
produced while the [[julzdao/computer-science/JVM]] is being run.   

This is how differ the [[julzdao/computer-science/Compile-Time vs Runtime Error]].
#### Common Checked Exceptions 
`IOException`, `SQLException`, `FileNotFoundException`, `InterruptedException`.

#### Common Unchecked Exceptions 
`NullPointerException`, `ArrayIndexOutOfBoundsException`, `ArithmeticException`, `ClassCastException`.


### 🦕 Sources 
- [Oracle Java Documentation: The Catch and Specify Requirement (Checked vs Unchecked)](https://docs.oracle.com/javase/tutorial/essential/exceptions/catchOrDeclare.html)
- [Baeldung: Checked vs Unchecked Exceptions](https://www.baeldung.com/java-checked-unchecked-exceptions)
- [GeeksforGeeks: Checked and Unchecked Exceptions in Java](https://www.google.com/search?q=https://www.geeksforgeeks.org/checked-unchecked-exceptions-java/)

