---
up:
title: Cache
tags:
  - cs/iot
  - cs/performance
  - cs/buffering
type:
  - concept
description: Temporarily store data to speed up future access
cover:
lifecycle:
  - sapling
cs-foundations:
  - "[[Dont Repeat Yourself - DRY]]"
---
A cache stores nearby  
what is difficult to obtain from afar. 
If the data is there, we respond quickly,  
if not, we return to the source  
and save a copy for later.

---

A **cache** temporarily stores data retrieved from a slower source to reduce latency and avoid repeating costly operations.

If a resource has already been computed, calculated or processed, [[Dont Repeat Yourself - DRY]] and do not repeat the same process. Which means that [[Resource Efficiency]] happens even to methods, objects or computations at each level of the program.

Each query produces one of two results: a **cache hit**, when the data is available, or a **cache miss**, when we must retrieve it from the original source.

```java
SensorData data = cache.get(sensorId);

if (data == null) {
    data = cloud.getSensorData(sensorId);
    cache.put(sensorId, data);
}

return data;
```

In an [[IoT]] application, for example, we can keep the latest configuration received from the cloud in memory. The application can access it quickly without having to make a network request every time.

Caches appear at many levels: CPU, application memory, databases, browsers and distributed systems. They all exploit the same idea: **trading space and complexity for speed**.

---

