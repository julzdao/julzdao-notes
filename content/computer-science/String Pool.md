---
up: "[[julzdao/computer-science/Java]]"
title: String Pool
cs-fundamentals:
  - "[[Object Identity]]"
  - "[[Interning]]"
tags:
  - l/java
type:
  - concept
description: Reutilizar literales String para evitar objetos equivalentes innecesarios
cover:
lifecycle:
  - sapling
---
One of the most  
used features in Java  
is the Java String.  

---

That's why the [[julzdao/computer-science/JVM]] has created a special  galaxy in its universe called String Pool for storing Strings.   

The String Pool lives also inside the [[julzdao/computer-science/Heap Space]].
 
The reason for this  is basically for optimising  as much as possible the creation of Java String since every string object is immutable. 

For searching a match, the [[julzdao/computer-science/Java Compiler|Java Compiler]]  is the one checking the literals and [[xhidden/100-computer-science/101-knowledge/java/Compiler Time Constants]] . 


> [!hint] The new keyword 
> Using the new() operator for the String, creates always a unique and different object in heap memory. Even if it is exactly the same as other literal or object. 

```java 
String first = "Baeldung"; 
String second = "Baeldung"; 
System.out.println(first == second); // True :: Compiler has found a match on String pool

String third = new String("Baeldung");
String fourth = new String("Baeldung"); 
System.out.println(third == fourth); // False :: Each object is unique. 
```

Since one of the   
benefits of Java is  
causing less memory leaks,  
the String Pool is stored in  
the [[julzdao/computer-science/Heap Space]], where the  
[[julzdao/computer-science/Garbage Collector]] may  
remove unreferenced Strings. 

### Resources

- [Basic String Pool Documentation](https://www.baeldung.com/java-string-pool) 
---
