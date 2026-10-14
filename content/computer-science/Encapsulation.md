---
up: "[[Java]]"
title: Encapsulation
cs-foundations:
  - "[[Coupling]]"
tags:
  - l/java
  - cs/foundations
type:
  - concept
description: Hide internal state and control how other objects interact with it
cover:
lifecycle:
  - sapling
---
Encapsulation is one of the four pillars   
of [[Object-Oriented Programming]] (OOP),   
often described as **Data Hiding** + **Bundling**.  
Expose only certain fields and methods 
to other classes. Not everything. 

---

> [!hint] Encapsulation as a Casio
> The point of Encapsulation is to hide the internal wiring of the clock. 
> So the user only needs to learn about which button to click to update the time.

In life we often need to learn how to encapsulate our personal information.   
Not only in the online world, but also along people we know.   

> Privacy is power. 
> People cannot ruin what they don't know. 

The same happens in our application. The more secure and private our data, the more control we have.   

Classes expose **only** certain fields and methods to other classes for access.   
### How to encapsulate in Java OCA Exam 

1. Declare all instance variables (**data**) as **`private`**.
2. Provide **`public`** methods, commonly called **Getters** (access/read) and **Setters** (modify/write), to manage access to the private variables.

```java 
public class Student {
    private String name;
    private int age;

    // Getter method for name
    public String getName() {
        return name;
    }

    // Setter method for name
    public void setName(String name) {
        this.name = name;
    }

    // Getter method for age
    public int getAge() {
        return age;
    }

    // Setter method for age
    public void setAge(int age) {
        if (age > 0) {
            this.age = age;
        }
    }
}

```

> [!important] Beware of protected
> The "protected does not mean encapsulated" .
> It is easy to forget to fully privatize 
> the data in our application. 
> This might **violate strict encapsulation**. 

### Key Benefits

- **Data Integrity/Validation:** Setters allow you to enforce rules (e.g., age cannot be negative) before modifying the data.
- **Control:** You can make a variable read-only (provide a Getter but no Setter) or write-only.
- **Flexibility/Decoupling:** You can change the internal data structure or implementation (e.g., rename a private variable) without breaking any external code that relies only on the public methods.

### 🦕 Sources 

- [Oracle Java Documentation: Encapsulation](https://docs.oracle.com/javase/tutorial/java/concepts/object.html)
- [Baeldung: Encapsulation in Java](https://www.google.com/search?q=https://www.baeldung.com/java-encapsulation)
- [GeeksforGeeks: Encapsulation in Java](https://www.geeksforgeeks.org/encapsulation-in-java/)
---