---
up: "[[julzdao/computer-science/IoT]]"
title: MQTT
aliases:
  - Message Queuing Telemetry Transport
tags:
  - messaging
  - cs/iot
  - cs/network
type:
  - concept
description: Exchanging IoT messages using a lightweight publish-subscribe model
cover:
lifecycle:
  - sapling
---
**MQTT** is a lightweight 
messaging protocol based on 
the ‘Publish/Subscribe’ model (similar to the [[julzdao/computer-science/Observer Pattern]]), 
widely used in [[julzdao/computer-science/IoT]] to connect devices, gateways and services, 
even over networks with limited resources.

---

Clients do not communicate directly. They publish messages to **topics** managed by a **broker**, whilst other clients subscribe to the topics that interest them.

```text
Sensor ──publish──> greenhouse/temperature
                         ↓
                     MQTT Broker
                         ↓
Dashboard <──subscribe── greenhouse/temperature
```

> [!tip]
> MQTT decouples **who produces the data** from **who consumes it**. The producer only needs to know the broker and the topic, not the consumers.

MQTT also defines **QoS** levels to determine what delivery guarantees each message requires. This combination of low overhead and decoupled communication makes it particularly useful in IoT systems.

---

## References

- OASIS — *MQTT Version 5.0*: https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html
- MQTT.org — *MQTT*: https://mqtt.org/
- Eclipse Mosquitto — *An Open Source MQTT Broker*: https://mosquitto.org/
