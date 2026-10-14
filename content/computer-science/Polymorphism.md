---
title: polymorphism
timestamp: 2025-11-25T01:35:00
type:
  - concept
icon: Sigma
tags:
  - l/java
  - cs/foundations
description: Fundamental pillar of Java
---
## Core Concept 
Polymorphism is one of the fundamental pillars of Java. Thanks to this power, objects can behave in different ways, inherit logic using Java Inheritance from other objects and even act as prototypes or templates. 

Polymorphism is a way of connecting objects to each other,   
as we do with the Linking your Thinking concept in this vault.

This allows us to create flexible, interconnected objects,   
giving rise to 1001 ways to use creativity.
For example, with Java Interface.

> [!abstract] Etimology
> The word **polymorphism** means having **many forms**, and it comes from the Greek 
words **poly (many)** and **morph (forms)**, this means one entity can take many forms. 

### How to make use of Polymorphism in Java

We can use this concept in Java as follows:

1. `extends`: Creates a subclass from another (super).
2. `implements`: Implements an interface in a class. 
3. `super`: Keyword to access the parent class.

```java 
interface Publishable {
    void publish();
}

class Page implements Publishable {
    public void publish() {
        System.out.println("Publishing a Page.");
    }
}

class Post implements Publishable {
    public void publish() {
        System.out.println("Publishing a Post.");
    }
}
```

### Resources

- #article [Article on Polymorphism](https://www.datacamp.com/doc/java/polymorphism)
- #video [Basic Video on Polymorphism](https://www.youtube.com/watch?v=jhDUxynEQRI)
- #forum  [Polymorphism on Stackoverflow](https://stackoverflow.com/questions/1031273/what-is-polymorphism-what-is-it-for-and-how-is-it-used) 


