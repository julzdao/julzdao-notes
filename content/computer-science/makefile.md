---
up:
type:
  - concept
cs-foundations:
  - "[[Single Point of Truth|Single Point of Truth]]"
tags:
  - cs/build
  - cs/automation
description: Automation tool acting as entry point
cover:
lifecycle:
  - seed
---
Automation tool 
for running and 
compiling programs 
more efficiently. 

---

The `makefile` commonly acts as the entry file or [[Single Point of Truth]] when compiling multiple sub-projects from within a [[Monorepo]]. 

We can think of it as a program which automates the building of your project. 
This is the syntax: 

```bash
target: prerequisites
<TAB> recipe
```

## Source 

- [What is a makefile](https://opensource.com/article/18/8/what-how-makefile) 
- [Getting Started on Makefiles](https://makefiletutorial.com) 