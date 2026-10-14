---
up: "[[Java]]"
title: Dynamic Dispatch
cs-foundations:
  - "[[Polymorphism]]"
tags:
  - l/java
type:
  - concept
description: Selecting at runtime which overridden implementation to execute
cover:
lifecycle:
  - sapling
---
Dynamic Dispatching is the mechanism 
in which a call 
to an overridden method 
is resolved at run time 
instead of compile time.

---

The [[Java Compiler]] asks for the method at hand.   
It does only care, if the method is there.   

From the created object, the [[JVM]] Runtime is the one reading the actual code and inspect, hence what to do in the end.   

This is [[Polymorphism]] at its peak, using references and objects, for dancing with bits.   

---

### Example

```java 
1. interface Flyer{ String getName(); }
   
2. class Bird implements Flyer{
	1. public String name;
	2. public Bird(String name){
	3. this.name = name;
	4. }
	5. public String getName(){ 
		   return name; 
	    }
	6. }
	   
3. class Eagle extends Bird {
4. public Eagle(String name){
5. super(name);
6. }
7. }
8. public class TestClass {
9. public static void main(String[] args) throws Exception {
10. Flyer f = new Eagle("American Bald Eagle");
11. //PRINT NAME HERE
12. }
13. }
```


### 🦕 Sources 
- [Oracle Java Documentation: Polymorphism](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)
- [Baeldung: Dynamic Method Dispatch in Java](https://www.google.com/search?q=https://www.baeldung.com/java-dynamic-method-dispatch)
- [GeeksforGeeks: Dynamic Method Dispatch in Java](https://www.google.com/search?q=https://www.geeksforgeeks.org/dynamic-method-dispatch-in-java/)

---