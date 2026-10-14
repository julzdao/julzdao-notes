---
up: "[[Java]]"
title: Throwable Hierarchy
tags:
  - l/java
  - cs/error-handling
type:
  - concept
description: Organising errors and exceptions using the Throwable hierarchy
cover:
lifecycle:
  - sapling
---
`Throwable` is the root.
`Error` represents serious faults.
`Exception` models manageable conditions.
`RuntimeException` denotes unchecked exceptions,
and the hierarchy governs `catch` and `throw`.

---

`Throwable` is the root of what can be thrown using `throw`. Its main branches are `Error` and `Exception`; within `Exception`, `RuntimeException` covers a large proportion of the [[Checked vs Unchecked Exceptions|unchecked exceptions]].

```java
Throwable
├── Error
└── Exception
    └── RuntimeException
```

---

