---
up:
type:
  - moc
tags:
  - cs/iot
description: Mnemonic
cover:
lifecycle:
  - seed
---
The Internet of Things (IoT) 
is the way in which physical devices 
observe and interact with the world 
through the use of sensors, protocols 
and networks connected to the Internet.

---

The **Internet of Things (IoT)** connects physical devices capable of **measuring, processing, communicating and acting** on their environment.

An IoT system usually forms a simple chain:

**Physical World → Sensor → Device → Network → Cloud → Action**

For example, an agricultural system can measure temperature and humidity using sensors, process the data in an embedded system and send it via [[MQTT]] to a cloud platform.

```text
Temperature Sensor
        ↓
   IoT Device
        ↓
      MQTT
        ↓
      Cloud
        ↓
 Irrigation System
```

> [!tip]  
> IoT does not simply mean **connecting something to the Internet**.
> 
> The value lies in connecting the physical world with software capable of **observing, interpreting and acting upon it**.


---
