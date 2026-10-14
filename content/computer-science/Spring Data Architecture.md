---
up:
type:
principios:
tags:
  - fr/spring
  - cs/api
description: Mnemonic
cover:
grado:
lifecycle:
  - sapling
---
Database is the memory. 
Repositories are the links.
Entities are the prototypes. 
Service is the [[julzdao/computer-science/java/ideas/API|API]].
This is the standard. 

--- 

Databases -> Repositories -> Entity / Model -> Service > Controllers

1. **Databases**: This is the storage of most of our data in the application. The Memory. 
2. **Repositories**: They are like the only people which has access and the key to the old mysterious library. They are fully connected with each table, row and component from our databases. 
3. **Entity / Model**: The prototype of each of our Models from the Database. We craft a prototype so we can create, find or delete entities from database or create more. 
4. **Service**: The service is the layer where we use the api from our repositories to actually get the info and logic that we want to get. 