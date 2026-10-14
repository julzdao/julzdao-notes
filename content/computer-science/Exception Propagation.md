---
up: "[[Java]]"
title: Exception Propagation
tags:
  - l/java
  - cs/error-handling
type:
  - concept
description: Pass an exception up the call stack until a handler is found
cover:
lifecycle:
  - sapling
---
Exception handling allows for 
the **separation of error-reporting code 
from the normal flow of business logic**.
If the error finally happens, 
it will have proper documentation and handling. 

---

A method that detects an error (throws or receives an exception) does not need to handle it.   
It can use the `throws` clause to delegate the responsibility up the method call stack.  

It **propagates** to its caller along the call stack. The process continues until a compatible `catch` is found or the thread reaches its end.

This principle is tied up with the [[Single Responsibility Principle]] in computer science.   

### 🦕 Sources 

- [Oracle Java Documentation: Why Use Exceptions?](https://www.google.com/search?q=https://docs.oracle.com/javase/tutorial/essential/exceptions/why.html)
- [Baeldung: Exception Handling in Java](https://www.google.com/search?q=https://www.baeldung.com/java-exception-handling)