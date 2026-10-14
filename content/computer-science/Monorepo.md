---
up:
type:
cs-foundations:
tags:
description: Mnemonic
cover:
lifecycle:
  - seed
---
A single repository 
containing multiple projects 
with well-defined relationships
to form a 
bigger project. 

---

## Definition 

A monorepo means having all the code for an organization, project or application into one single repository. Putting everything together. 
## What is a Polyrepo 

Before diving deeper into what is a Monorepo and how to build one, let's define the opposite of a monorepo, the "Polyrepo". 

In a Polyrepo, each application lives in its own repository, with its own dependencies, tooling, build and CI pipeline. This is how organisations are able to put different teams working on different projects, separated by stack or purposes. 

This was fine before, but now with the help of AI agents in the way, the boundaries of each repo make it difficult for agents to work within the limits or relationships between apps.

> [!warning] Monorepo NOT EQUAL TO Monolith
> This is a known misconception.

## Anatomy 

This is how a typical monorepo looks like: 

```
monorepo/  
├── apps/  
│   ├── web-app/       # React frontend  
│   └── api-server/    # Node.js backend  
├── packages/  
│   ├── shared-ui/     # Reusable React components  
│   └── utils/         # Shared utility functions  
├── tools/             # Scripts for builds/testing  
├── configs/           # ESLint, Jest, etc.  
└── package.json       # Root workspace config
```

Source: [Monorepo Guide Medium](https://medium.com/@julakadaredrishi/monorepos-a-comprehensive-guide-with-examples-63202cfab711) 


> [!tip] Use a [[makefile]] to run different apps
> For running each application in a separate way, create a `makefile` to run commands targeting each application. 
> 

## Sources 

- [Sample Monorepo](https://github.com/wixplosives/sample-monorepo/tree/main) 
- [Monorepo.tools](https://monorepo.tools/) 
- [What is a monorepo](https://nx.dev/docs/kb/what-is-a-monorepo) 