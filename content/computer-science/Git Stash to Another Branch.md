---
up: "[[Git]]"
title: Git Stash to Another Branch
tags:
  - cs/git
type:
  - reference
description: Move uncommitted changes to another branch using Git Stash
cover:
lifecycle:
  - sapling
---
Save your work without committing.
Switch to another branch,  
restore the changes there  
and carry on working  
without creating a temporary commit.

---

`git stash` allows you to temporarily save changes from the working tree and restore them later on another branch.

```bash
git stash
git switch destination-branch
git stash pop
```

If you want to create a new branch directly from the point where the stash was created:

```bash
git stash branch new-branch
```

> [!tip]
> `git stash pop` applies the stash and, if successful, removes it from the list. `git stash apply` applies it but keeps the entry.

This is useful when you start making changes on the wrong branch and don’t want to create a `git commit` just yet.

---

## References

- Git — *git-stash*: https://git-scm.com/docs/git-stash
- Atlassian — *Git Stash*: https://www.atlassian.com/git/tutorials/saving-changes/git-stash