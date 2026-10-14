---
up: "[[Computer Graphics]]"
title: Graphics Context
aliases:
  - Graphical Context
cs-fundamentals:
tags:
  - microej
  - cs/iot
  - cs/ui
type:
  - concept
description: Drawing interface associated with a graphics surface
cover:
lifecycle:
  - sapling
---
A **Graphics Context** is the interface 
used to draw on a surface such 
as a screen or a [[Buffered Image]]. 
It encapsulates graphical operations so that 
pixels do not have to be manipulated individually.

---

It typically maintains information such as colour, font, clipping or coordinates, and provides operations for drawing text, lines, shapes and images.

```java
GraphicsContext g = image.getGraphicsContext();

g.setColor(BLACK);
g.drawLine(0, 0, 100, 100);
g.drawText("IoT Dashboard", 10, 20);
```

> [!tip]
> Think of the image as **the canvas** and the Graphics Context as **the tools you use to draw on it**.

---

## References

- MicroEJ *Application Developer Guide*: https://docs.microej.com/en/latest/ApplicationDeveloperGuide/index.html
