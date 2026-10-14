---
up: "[[Git]]"
title: Git Remote
aliases:
  - git remote
cs-fundamentals:
tags:
  - cs/git
type:
  - concept
description: Local reference to another Git repository
cover:
lifecycle:
  - sapling
---
A **Git Remote** is a named reference 
to another [[Git]] repository. 
When cloning a project, 
Git usually creates 
the `origin` remote automatically.

---

```bash
git remote -v
git fetch origin
git push origin main
```

A repository can have several remotes. In open source, it is common to use `origin` for our fork and `upstream` for the original repository.

> [!tip]
> Git Fetch, fetches information from the remote without merging it. Git Pull, fetches and merges; Git Push, sends our commits to the remote.

---
