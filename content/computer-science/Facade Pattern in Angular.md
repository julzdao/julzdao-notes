---
up: "[[vault/0000-focus/02-farm-orchestra/angular-migration/Angular Concepts|Angular Concepts]]"
type:
  - principle
cs-fundamentals:
  - "[[julzdao/computer-science/The Law of Demeter|The Law of Demeter]]"
tags:
  - cs/design-pattern
  - fr/angular
description: Like the counter of a restaurant. You ask for.
cover:
lifecycle:
  - sapling
---
A Facade Pattern is like 
the counter of a restaurant. 
It creates a communication 
service for receiving each 
separate service. 

---

A Facade is just a design pattern that lets others do the real work. It does not interfere. It holds the channel to reach the several things or services which **do** the real work. 

## Example from Vault42

```ts 
@Injectable({ providedIn: 'root' })
export class V42GardenFacadeService {
  private readonly indexSvc = inject(V42GardenIndexService);
  private readonly nav = inject(V42GardenNavigationService);

  readonly selected = computed(() => { /* combines index + params */ });
  openNote = this.nav.openNote.bind(this.nav);
}
```

This follows exactly [[julzdao/computer-science/The Law of Demeter|The Law of Demeter]] where components do not need to know the whole system's architecture. Only one counter to order from. The Facade. 