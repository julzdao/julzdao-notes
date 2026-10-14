---
up: "[[julzdao/computer-science/Java]]"
title: Java Main Method
tags:
  - l/java
type:
  - concept
description: Defining the entry point of a Java application
cover:
lifecycle:
  - sapling
---
Every application begins
at a known point;
the JVM looks for `main`,
receives its arguments
and the programme starts from there.

---

In a traditional Java application, the JVM begins execution by looking for a `main` method with a valid signature. `public` makes it accessible, `static` means it does not require an instance, and `String[] args` receives command-line arguments.

```java
public static void main(String[] args) {
    System.out.println("Hello Java");
}
```

---

