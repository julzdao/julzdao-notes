---
up:
title: Law of Demeter
aliases:
  - Principle of Least Knowledge
tags:
  - cs/clean-code
  - cs/design-pattern
type:
  - principle
description: Talk to your direct reports, not about their internal affairs
cover:
lifecycle:
  - sapling
cs-foundations:
  - "[[julzdao/computer-science/Encapsulation]]"
  - "[[julzdao/computer-science/Single Responsibility Principle]]"
---

The Law of Demeter is 
a principle of least knowledge 
for designing and developing software. 
It recommends that objects should avoid accessing 
the internal data and methods of other objects.

---

To put this more clearly, an object should only invoke methods on:

- Itself.
- Its direct dependencies (fields or instance variables).
- Objects passed in as arguments.
- Objects it creates.

> [!info] Explanation
> An object should only concern itself with its own affairs or those that truly pertain to it. It should not know what is happening beyond its own life. This is a way for the object to be at peace and have as little information as possible about what is going on around it.

By following the Law of Demeter, you often naturally create classes with more focused responsibilities, thus supporting the [[julzdao/computer-science/Single Responsibility Principle]]. Conversely, when a class adheres to SRP, it's often easier to follow the Law of Demeter because it has a well-defined boundary and fewer reasons to reach out to distant objects.

## Benefits

1. **Loose Coupling**: Changing a part of the system will not break another part. 
2. [[julzdao/computer-science/Encapsulation]]: Each class is responsible for its own logic.  
3. **Better Maintainability**: Less knowledge about other objects’ structures means fewer dependencies. 

> [!info] History
> The Law of Demeter was proposed by Ian Holland in 1987 at Northeastern University as part of the _Demeter Project_, an adaptive programming and aspect-oriented programming effort. The project was named after Demeter, the Greek goddess of agriculture, to signify a bottom-up philosophy of programming that is also embodied in the law itself.

### Resources 
- https://www.mintbit.com/blog/applying-the-law-of-demeter-in-object-oriented-programming-with-rails/ 
- https://www.youtube.com/watch?v=Q1uST7RNVN8