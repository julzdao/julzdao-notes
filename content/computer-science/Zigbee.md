---
up: "[[julzdao/computer-science/IoT]]"
title: Zigbee
cs-fundamentals:
  - "[[julzdao/computer-science/Mesh Network]]"
tags:
  - cs/iot
  - cs/network
  - iot/wireless
type:
  - concept
description: Tecnología inalámbrica de bajo consumo para redes IoT de corto alcance
cover:
lifecycle:
  - sapling
---
Zigbee is a low-power 
wireless technology used in [[julzdao/computer-science/IoT]], 
particularly for sensors, lighting, automation 
and devices that need to 
transmit small amounts of data efficiently.

---

It is based on IEEE 802.15.4 and can organise devices via a [[julzdao/computer-science/Mesh Network]]. A Zigbee network primarily distinguishes between **coordinators**, **routers** and **end devices**.

```text
        Coordinator
        /         \
    Router ←────→ Router
      |              |
 End Device      End Device
```

> [!tip]
> **Routers** can relay traffic and extend the network. **End devices**, which are often battery-powered, can enter sleep mode for long periods to reduce power consumption and do not normally route messages.

Unlike technologies designed for higher bandwidth, Zigbee prioritises **low power consumption, short transmissions and networks with many devices**.

---

## References

- [Connectivity Standards Alliance Zigbee](https://csa-iot.org/all-solutions/zigbee/)
