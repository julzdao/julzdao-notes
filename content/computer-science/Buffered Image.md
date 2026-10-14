---
up:
title: Buffered Image
cs-fundamentals:
tags:
  - microej
  - cs/iot
  - cs/buffering
type:
  - concept
description: An image stored in memory that we can render before displaying it
cover:
lifecycle:
  - sapling
---
A **Buffered Image** represents 
an image stored in a memory buffer.
First drawing in memory, 
composing the image, 
and then use that result multiple times. 

---

A **Buffered Image** represents an image stored in a memory [[Buffer]]. Instead of working directly on the display, we can draw onto that surface and then reuse the result.

In an embedded UI, this is useful for preparing graphics, composing elements or avoiding the need to continually recalculate content that can be kept in memory.

```java
BufferedImage image = createImage(width, height);
GraphicsContext g = image.getGraphicsContext();

g.drawText("Temperature: 24°C", 10, 20);
display.drawImage(image, 0, 0);
```

> [!warning]
> **A buffered image and double buffering are not synonymous.** An image in memory may form part of a double-buffering strategy, but double buffering specifically requires switching or copying between a drawing surface and the visible surface.

The main benefit is to trade [[Memory]] for a more controlled and, in certain cases, more efficient rendering.

---

## References

- [MicroEJ Application Developer Guide]( https://docs.microej.com/en/latest/ApplicationDeveloperGuide/index.html)
