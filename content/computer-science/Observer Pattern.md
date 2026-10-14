---
up:
title: Observer Pattern
tags:
  - microej
  - cs/design-pattern
  - cs/iot
cs-foundations:
  - "[[Coupling]]"
  - "[[Open Closed Principle]]"
type:
  - principle
description: Automatically notify multiple objects when a status changes
cover:
lifecycle:
  - sapling
---
The **Observer Pattern** is 
a behavioural pattern in 
which an object, the **Subject**, 
maintains a collection of **Observers** interested in its changes. 
When an event occurs, the Subject notifies them.

---

This reduces the [[Coupling]] between the entity that **triggers an event** and those that **react to it**, making it particularly useful in [[Event-Driven Architecture]], graphical user interfaces and [[IoT]].

In a MicroEJ application, for example, we might have a temperature sensor. The application should not need to constantly query the sensor, nor should the sensor have direct knowledge of the UI, the alarm system or MQTT.

```java
interface TemperatureObserver {
    void onTemperatureChanged(float temperature);
}

class TemperatureSensor {

    private TemperatureObserver observer;

    void setObserver(TemperatureObserver observer) {
        this.observer = observer;
    }

    void update(float temperature) {
        if (observer != null) {
            observer.onTemperatureChanged(temperature);
        }
    }
}
```

Now, various components can respond to the event:

```java
class TemperatureDisplay implements TemperatureObserver {

    @Override
    public void onTemperatureChanged(float temperature) {
        System.out.println("Temperature: " + temperature);
    }
}
```

The sensor knows that a `TemperatureObserver` exists, but **it does not need to know that a `TemperatureDisplay` exists**. We can replace it with an MQTT component, an alarm or any other implementation without modifying the sensor’s logic.

> [!tip] Observer in MicroEJ  
> This pattern appears constantly in IoT applications: GPIO listeners, connectivity changes, UI events, sensors or received messages.
> 
> In MicroEJ, it is common to find APIs based on **listeners and callbacks**, which apply this same idea: register interest now and react when the event occurs.

The Observer pattern is directly linked to the [[Open Closed Principle]]. The producer depends on an abstraction, and we can add new consumers without modifying it.

---

## References

- Gamma, Helm, Johnson & Vlissides — _Design Patterns: Elements of Reusable Object-Oriented Software_
- Refactoring.Guru — _Observer_: [https://refactoring.guru/design-patterns/observer](https://refactoring.guru/design-patterns/observer)
- MicroEJ — _Application Developer Guide_: [https://docs.microej.com/en/latest/ApplicationDeveloperGuide/index.html](https://docs.microej.com/en/latest/ApplicationDeveloperGuide/index.html)
