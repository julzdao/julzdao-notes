---
up:
title: Separation of Concerns
tags:
  - microej
  - cs/clean-code
  - cs/design-pattern
type:
  - principle
description: Breaking a system down into parts that address different concerns
cover:
lifecycle:
  - sapling
aliases:
  - SoC
cs-foundations:
  - "[[Single Responsibility Principle]]"
---
Separation of Concerns (SoC) 
is a design principle that 
divides a **system** into parts, 
each of which deals 
with a different **concern**.

---

This separation reduces [[Coupling]] between components and promotes cohesion within each one. If the boundaries are well designed, we can modify one part of the system without needing to continually understand or alter the others.

SoC is closely related to [[Single Responsibility Principle]], but they are not exactly the same. **SRP focuses on a unit’s responsibility and the reasons for changing it; SoC is a broader concept concerning how to separate different aspects of a system.** 

---
