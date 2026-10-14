---
up:
title: Builder Pattern
tags:
  - microej
  - cs/design-pattern
cs-foundations:
  - "[[Encapsulation]]"
type:
  - principle
description: Building complex objects step by step using a clear interface
cover:
lifecycle:
  - sapling
---
The Builder Pattern is a 
creational pattern 
to build objects in the most 
flexible and scalable way. 
The configuration step.

---

The **Builder Pattern** is a creational pattern that separates the **construction of a complex object** from its final representation. Instead of concentrating all the configuration within a single, large constructor, the construction is expressed through small, meaningful steps.

This is particularly useful when an object has many optional parameters, different possible configurations, or needs to be constructed following a specific process.

```java
User user = new User.Builder("Julian")
    .email("julian@example.com")
    .language("es")
    .notifications(true)
    .build();
```

The code describes **what we want to build**, whilst `User.Builder` encapsulates how the object is ultimately built and validated. This links the Builder pattern to [[Encapsulation]] and helps to avoid the well-known telescoping constructors.

In MicroEJ, we can apply the same idea to build a page using composition. Let’s imagine an IoT screen that displays information from a sensor:

```java
Page sensorPage = new PageBuilder()
    .header("Greenhouse")
    .add(new TemperatureWidget())
    .add(new HumidityWidget())
    .add(new ConnectionStatusWidget())
    .footer("Sensor #04")
    .build();
```

The page may contain containers, layouts, styles and widgets internally, but from the outside we can immediately see its **conceptual structure**:

`Header → Temperature → Humidity → Connection Status → Footer`

> [!tip] UI Builder for MicroEJ  
> In embedded interfaces, Builder can act as a small declarative API for building pages.
> 
> The complexity of the layout is encapsulated, whilst the code for each screen retains a visual structure that is easy to read and modify.

This separation also allows the `PageBuilder` itself to maintain invariants: it can set default styles, check for required components or ensure that the page is correctly configured before calling `build()`.

---

## References

- [Refactoring Guru Builder](https://refactoring.guru/design-patterns/builder)

