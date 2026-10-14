---
title: Beware of Variable Scope
description: Important aspect for variable handling
cs-foundations:
  - "[[Encapsulation]]"
timestamp: 2025-11-25T01:35:00
type:
  - insight
tags:
  - l/java
  - java/scope
---
Beware of variable scope. 
Depending on the situation, 
the value of a variable 
may have its limits. 
Check the domain expansion. 

---

## Overview

- Local Variables -- in scope from declaration to end of block. 
- Instance Variables -- in scope from declaration until object garbage collected. 
- Class Variables (static) -- in scope from declaration until program ends. 

> [!important] Watch out for out-of-scope errors
> Some questions may seem very complex, but then it turns out that you just need to catch an out-of-scope error where a variable is not accessible outside an if statement.

```java 
public void eatIfHungry(boolean hungry) {
	if (hungry) {
		int bitesOfCheese = 1; 
		{
			boolean teenyBit = true; 
			System.out.println(bitesOfCheese);
		}
	}
	System.out.println(teenyBit); // DOES NOT COMPILE
}
```







---
