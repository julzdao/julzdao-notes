---
up: "[[julzdao/computer-science/Java]]"
title: Numeric Promotion in Java
tags:
  - l/java
  - cs/data-types
type:
  - concept
description: Determining the resulting data type of numerical operations in Java
cover:
lifecycle:
  - sapling
---
Feature from Java 
for automatic conversion.
Numeric Promotion   
in Java is all about   
universal balance.  

---

> [!abstract] Definition
> Numeric Promotion is a feature from Java for an automatic conversion of a value to a larger data type in order to perform a mathematical operation. 

```java 
int i = 12;  
double d = 3.3;  
double result = i * d; // 12.0 * 3.3 (int i is promoted to double)
```

This balance has still  a set of fixed rules.   

> [!important] Rule 1 - Make it Larger
> If two values have different data types, Java will automatically promote one of the values to the larger of the two data types. 

> [!important] Rule 2 - Floating Clouds
> If one of the values is integral and the other is floating-point, Java will automatically promote the integral value to the floating-point value`s data type. 

> [!important] Rule 3 - int as a golden rule
> Smaller data types, namely byte, short and char are first promoted to int any time they`re ` used with a Java binary arithmetic operator, even if neither of the operands is int. 

> [!important] Rule 4 - Universal balance
> After all promotion has occurred and the operands have the same data type, the resulting value will have the same data type as its promoted operands. 

### Sources 

- [Nice short article on Numeric Promotion](https://medium.com/@wassim2akkacha/numeric-promotion-in-java-acbc45ccee00) 

