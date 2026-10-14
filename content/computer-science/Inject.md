---
up:
type:
  - concept
cs-fundamentals:
  - "[[julzdao/computer-science/KISS Principle]]"
tags:
  - fr/angular
  - cs/dependency
description: The modern way of injecting dependencies
cover:
lifecycle:
  - sapling
---
Like a vending machine.
You call it, 
grab what you need, 
and get the whole package. 
Forgetting the constructor way. 

---

## The Old Constructor Way 

With [[julzdao/computer-science/Java]], dependency injection happened normally by passing the service to the constructor of the class like: `JavaClass(SomeService someService)` . 

This was also true for early Angular days. 

Now just call the `inject()` method, and break that rule. Call it anywhere. Angular will be always listening to it. No constructor required. 

## Example from Vault42 

```ts 
export class V42NoteLayout {
  protected readonly facade = inject(V42GardenFacadeService);
}
```