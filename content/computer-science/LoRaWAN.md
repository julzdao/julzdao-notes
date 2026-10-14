---
up:
type:
  - concept
cs-fundamentals:
  - "[[Mesh Network]]"
tags:
  - iot/protocol
  - iot/lora
description: Low-power Wide Area Network protocol for LoRa.
cover:
lifecycle:
  - seed
---
LoRaWan is a low-power 
wide-area network protocol 
using LoRa for connecting 
battery-operated devices 
to the Internet.

---

Even though [[LoRa]] is the radio signal technology, LoRaWan is the protocol and network architecture that manages all the data, connection and communication over that [^1]signal. 

Together, they provide a great combo for connecting low-power or [[Resource-Constrained Systems]] and devices over long distances, making them a key technology for [[IoT]]. 

> To address these needs, low-power wide area network (LPWAN) technology has emerged as the favored connectivity option for IoT networks due to its extensive communication range, energy efficiency, and cost-effectiveness.
> Source in footnotes[^2] 

## LoRa WAN Architecture 

The LoRaWAN network architecture consists of three main components: 

1. **End Devices**: The sensors spread out in the field. Transmitting small data packages over [[LoRa]] radio signal. 
2. **Gateways (base stations)**: A receiving station connected to the Internet. It listens to all the messages from the end devices within its range. 
3. **Network Server**: The central brain of the operation. Receives the data from all the gateways, removes duplicate messages (a message can reach multiple gateways), and points to the proper application server. 

![[lorawan-example.png]]
> Representative LoRaWAN deployment, with a Raspberry Pi 4 with LoRaWAN Gateway HAT, and a Dragino SDI-12 to LoRaWAN converter. The Gateway then forwards packets to the network and application server. 
> [Wikipedia](https://en.wikipedia.org/wiki/LoRaWAN#cite_note-1)


![[lora-arch.png]]
Source: https://www.youtube.com/watch?v=YQ7aLHCTeeE
## References 

- [LoraWan Fundamentals in 5 Minutes](https://www.youtube.com/watch?v=SmDza__-wAA) 
## Footnotes 

[^1]: Haxhibeqiri, J.; Van den Abeele, F.; Hoebeke, J.; [Moerman, I.](https://en.wikipedia.org/wiki/Ingrid_Moerman "Ingrid Moerman") (2018). "A Survey of LoRaWAN for the Internet of Things". _LoRaWAN for smart city applications_. Springer. pp. 1–25.

[^2]: A. Maleki, H. H. Nguyen, E. Bedeer and R. Barton, "A Tutorial on Chirp Spread Spectrum Modulation for LoRaWAN: Basics and Key Advances," in IEEE Open Journal of the Communications Society, vol. 5, pp. 4578-4612, 2024, doi: 10.1109/OJCOMS.2024.3433502.
	keywords: {Modulation;LoRaWAN;Internet of Things;Tutorials;Frequency modulation;Chirp;Surveys;Chirp spread spectrum (CSS);Internet of Things (IoT);long-range wide area network (LoRaWAN);low-power wide area network (LPWAN);spreading factor (SF)},
	
	
