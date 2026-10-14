---
up:
title: Mesh Network
aliases:
  - Mesh Networking
tags:
  - cs/iot
  - cs/network
type:
  - concept
description: A network in which multiple nodes can relay data to one another
cover:
lifecycle:
  - sapling
---
A **Mesh Network** is a network topology 
where nodes can connect 
and relay information via other nodes, 
rather than relying solely 
on a direct connection to a central point.

---

In [[julzdao/computer-science/IoT]], this allows coverage to be extended using intermediate devices:

```text
Coordinator ←→ Router ←→ Router ←→ Device
                  ↕
                Device
```

> [!tip]
> **Mesh does not mean that all devices are repeaters.** The ability to route depends on the technology and the role of the node. In [[julzdao/computer-science/Zigbee]], for example, routers can relay traffic whilst end devices do not normally do so.

A mesh network can provide alternative routes when connectivity changes, increasing coverage and resilience. In return, routing and network management introduce greater complexity.

---

