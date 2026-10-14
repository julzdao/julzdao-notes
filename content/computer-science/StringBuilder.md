---
up: "[[julzdao/computer-science/Java]]"
title: StringBuilder
tags:
  - l/java
type:
  - concept
description: Building mutable text efficiently without creating a new String for every modification
cover:
lifecycle:
  - sapling
cs-foundations:
---
String Builder is a [[julzdao/computer-science/Java]] feature 
to build a mutable sequence 
of characters in a more efficient way 
along a set of other useful [[julzdao/computer-science/API]] methods 
such as `append()`, `insert()` or `reverse()`. 

---

## Why it exists 

When modifying any `String` object, it creates a **new** Object and copies all of the characters there. It is **Immutable**. 

```java
String s = "";
for (String word : words) {
    s += word;            // new String + full copy every iteration → O(n²)
}
```

With `StringBuilder`, which keeps an internal buffer, each `append(s)` is amortized so no new Object is created. 

```java
StringBuilder sb = new StringBuilder();
for (String word : words) {
    sb.append(word);      // writes into the same buffer → O(n) total
}
String result = sb.toString();
```

`StringBuilder` helps [[julzdao/computer-science/Java]] to do a tremendous less amount of work in the long run for String operations.

> [!tip] When it matters
> Use `StringBuilder` when there is a loop going on, or an operation with strings takes multiple steps. 
> If only one line of concatenation like `a + b + c` , the [[julzdao/computer-science/Java Compiler]] already handles and optimises for this. No need for the Builder.

## Reversing a String

```java 
String reverse(String inputString) {  
    Objects.requireNonNull(inputString, "input must not be null");  
    return new StringBuilder(inputString).reverse().toString();  
}
```

**Cost**: The same as using `char[]` inside a loop, but the real **reason** is because of a more **readable** and **well-tested** (handling of edge cases such as surrogate pairs) solution.

## Sources 

- [StringBuilder in Java](https://www.geeksforgeeks.org/java/stringbuilder-class-in-java-with-examples/) 

