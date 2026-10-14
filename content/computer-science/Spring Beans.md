---
up:
type:
principios:
tags:
  - fr/spring
  - spring/beans
description: Mnemonic
cover:
hasFundamental: true
grado:
lifecycle:
  - sapling
---
Each "Bean" is kind of 
a unique seed 
that we are able to plant inside 
the Spring Container or Context 
for the Back-end of the application. 

---

Spring has some cool things. Starting with Beans. 

> What is a **Spring Bean**?
> Apart from being a superfood, the objects that form the backbone of your application and that are managed by the Spring IoC container are called **beans**. A bean is an object that is
  instantiated, assembled, and otherwise managed by a Spring IoC container. 

Every Bean is an Object with the `@Component` attribute to it. 

Sad story? The Bean has always a predefined future. 
Be cleaned up by the Garbage Collector. 

### How to declare Beans

We can create Beans in our Universe by adding them to our `AppConfig`:

```java 
@Configuration
public class AppConfig {
    @Bean
    public AwesomeBean awesomeBean() {
        return new AwesomeBeanImpl();
    }
}
```

### How to get Beans 

Since we are able to get our hands dirty into the soil (Spring Container Context), we can use the `getBeans()` method for accessing its inner powers: 

```java 
JavaConfigApplicationContext context = new JavaConfigApplicationContext(...);
AwesomeBean awesomeBean = context.getBean(AwesomeBean.class);

awesomeBean.usePower(); // BAM!
```

Instead of relying on pre-defined Beans from some frameworks, 
being able to create custom Beans is like being able to create new Microgreens seeds based on your own criteria. Isn't that awesome? 

End log. 
### Sources: 

- https://docs.spring.io/spring-javaconfig/docs/1.0.0.m3/reference/html/creating-bean-definitions.html 