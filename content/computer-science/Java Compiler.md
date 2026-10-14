---
up: "[[julzdao/computer-science/Java]]"
title: Java Compiler
cs-foundations:
  - "[[julzdao/computer-science/Binary]]"
tags:
  - l/java
type:
  - concept
description: Transformar código fuente Java en bytecode y detectar errores de compilación
cover:
lifecycle:
  - sapling
---
The  purpose  of a Java compiler   
is to translate the   
high-level Java source   
code into a [machine code](https://www.techtarget.com/whatis/definition/machine-code-machine-language)   
file consisting of machine-readable   
0s and 1s, and then execute the file.   

---

> [!hint] Super-smart, but very literal translator
> Your job, as the **Java Compiler (javac)**, is to meticulously read _every single word_ of the instructions. You don't execute the instructions yourself; you just translate them into a simpler, universal, machine-friendly blueprint called **bytecode** (stored in a `.class` file).
> While translating, you are extremely picky. 

If the translation is successful, you hand over the **bytecode** blueprint.   

This blueprint isn't for any one specific machine;  it's written in a special intermediate language   
that **any** machine with the right "interpreter" (the **Java Virtual Machine, or [[julzdao/computer-science/JVM]])  can understand and execute.   

This is what makes Java "**Write Once, Run Anywhere**."  

```bash 
# How a programmer typically runs the compiler from the command line
javac MyProgram.java
```

## Relevant Concepts 

- [Garbage Collector](xhidden/100-computer-science/101-knowledge/java/Garbage%20Collector.md) :: Imagine the Garbage Collector as a destructor of unused Worlds (objects). No longer needed and where any life is created.
- [[julzdao/computer-science/Heap Space]] :: The dark matter of Java. Where new objects are stored.
- [[julzdao/computer-science/String Pool]]:: Space in the JVM Universe for storing Strings. 
- [[Compiler Time Constants]] :: The compiler is like a cashier who, when she sees a compile-time constant, gets excited and instead of using the machine (runtime), does the calculations herself right there and then.
- [[julzdao/computer-science/Dynamic Dispatch]]:: The interface is like a contract. The compiler looks at the contract and sees if that clause exists. If it does, it lets the worker carry it out.

## Resources

- [Oracle Java Documentation: Compiling and Running](https://www.google.com/search?q=https://docs.oracle.com/javase/tutorial/getStarted/cup.html)
- [Wikipedia: Java Compiler](https://en.wikipedia.org/wiki/Java_compiler)
- [GeeksforGeeks: JVM, JRE & JDK](https://www.google.com/search?q=https://www.geeksforgeeks.org/jvm-jre-jdk/)
