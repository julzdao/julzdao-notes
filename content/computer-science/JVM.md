---
up: "[[Java]]"
title: JVM
tags:
  - l/java
cs-foundations:
  - "[[Binary]]"
type:
  - concept
description: A virtual machine that executes Java bytecode
cover:
lifecycle:
  - sapling
---
The **JVM** is an abstract   
computing machine.  
that enables a computer   
to run a Java program.   

---

It is the core component  of the **Java Runtime Environment (JRE)**.  

It takes the platform-independent   
**bytecode** from the   
[[Java Compiler]]
and translates it   
into the native machine code.  
of the specific hardware/OS it is running on.  

 The JVM is tailored for each operating system   
 (e.g., a Windows JVM, a Linux JVM).   
 This allows the _same_ bytecode to run   
 on any machine,   
 as long as that machine has the.  
 correct JVM implementation.  

> [!hint] JVM as an operating room
> Imagine the **Java Virtual Machine (JVM)** is a universal, self-contained **operating room** 🏥 that exists inside any computer (Windows, Mac, Linux, etc.).

It uses tools such as   
the [[Garbage Collector]]
for cleaning up objects that   
are no longer needed.   

In relation with  
[[Java Compiler]],  
the JVM may raise an exception   
while executing the code.   
Producing an unchecked   
exception such as `NullPointerException`.   

### Resources

- [Oracle Java Documentation: What is the Java Virtual Machine?](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/index.html)
- [Baeldung: Understanding the Java Virtual Machine (JVM)](https://www.google.com/search?q=https://www.baeldung.com/jvm)
- [GeeksforGeeks: JVM, JRE & JDK](https://www.google.com/search?q=https://www.geeksforgeeks.org/jvm-jre-jdk/)
