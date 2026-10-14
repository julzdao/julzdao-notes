---
up:
type:
  - technique
  - moc
cs-fundamentals:
  - "[[julzdao/computer-science/Mesh Network]]"
tags:
  - cs/iot
  - cs/network
description: Mnemonic
cover:
lifecycle:
  - seed
---
Super cool low-power 
radio communication technique
based on spread spectrum modulation. 
Kind of a radio signal technology. 
Great for hard-to-reach locations.

---

## What is LoRa?

In simple terms, LoRa (from "long range"), is a low-power[^2] radio communication technique, similar to Wi-Fi, [[julzdao/computer-science/Zigbee]] or Bluetooth, but with a longer range for sending and receiving messages. It uses the [[julzdao/computer-science/LoRaWAN]] "Long Range Wide Area Network" as protocol to how two or more devices communicate within the LoRa technique. 

The main protagonist making this communication possible is the [[julzdao/computer-science/Chirp Spread Spectrum]], developed recently by *Semtech* in 2014. 

In contrast with Wi-Fi, it can only work with small data packages, trading it for greater sensitivity and range. Wi-Fi is great for streaming and all kinds of things, but not for stable long range connection. Just go to a rural village. 

> In essence, LoRa’s strength lies in its ability to trade off data rate for greater sensitivity and range, using an elegant chirp-based signal design — all while keeping power consumption impressively low.
> [Samuel Ajala](https://medium.com/@samuelajala01/what-is-lora-a-beginners-guide-to-long-range-iot-communication-503bab08f17c) 

## Applications

This protocol technology is great for [[julzdao/computer-science/Resource-Constrained Systems]] where there is no Wi-Fi coverage or data should be emitted in long-range scenarios. 

For the appliance in projects related with [[julzdao/agriculture/Hydroponics]], it may improve the Energy and [[julzdao/agriculture/Resource Efficiency]] while also improving the Continuity of the system [^1]. 

> [!info] Comment from Article on Hydroponics Setup
> The CM4 NAS system consumes 10–12W of power and operates 24/7.  This ensures that data in the greenhouse is never lost.  
   Additionally, thanks to LoRa, data is received even from sensors in locations without Wi-Fi coverage.
> Source: [Hydroponics Setup with Lora](https://medium.com/@ahmettastannnn/smart-hydroponics-with-lora-and-raspberry-pi-real-time-data-tracking-on-cm4-nas-a223526b70d1)

## Sources 

- [Wikipedia Lora](https://en.wikipedia.org/wiki/LoRa) 
- [LoRa for IoT Workshop in Youtube](https://www.youtube.com/watch?v=YQ7aLHCTeeE)
- [Application of LoRa Technology in a Hydroponic System to Improve Lettuce Cultivation in Urban Areas](https://link.springer.com/chapter/10.1007/978-981-95-2820-2_22)
- [What is LoRa Medium Article](https://medium.com/@samuelajala01/what-is-lora-a-beginners-guide-to-long-range-iot-communication-503bab08f17c) 

## Footnotes

[^1]: https://medium.com/@ahmettastannnn/smart-hydroponics-with-lora-and-raspberry-pi-real-time-data-tracking-on-cm4-nas-a223526b70d1

[^2]: It was created targeting devices and components that use very little power, but do need to still transmit messages in long ranges. 
