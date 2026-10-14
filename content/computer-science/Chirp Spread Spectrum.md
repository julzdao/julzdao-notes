---
up: "[[julzdao/computer-science/LoRa]]"
type:
  - concept
cs-foundations:
  - "[[julzdao/computer-science/Binary]]"
tags:
  - iot/lora
  - iot/protocol
description: Mnemonic
cover:
lifecycle:
  - seed
---
A spread spectrum technique 
that uses wideband linear frequency 
modulated chirp pulses 
to encode information. 
The heart of [[julzdao/computer-science/LoRa]] and [[julzdao/computer-science/LoRaWAN]] communication.

---

The "Chirp" part refers to a sinusoidal signal whose frequency varies with time linearly. 

Thanks to this dance of the signal, a digital communication technique can be encoded within the modulation with the positive slope representing the [[julzdao/computer-science/Binary]] one, and negative slope representing the [[julzdao/computer-science/Binary]] zero. 

> [!info] CSS modulation Terminology 
> A patented modulation that embeds the information data in the starting frequency of a chirp. It is also known as LoRa modulation, frequency shift chirp modulation, and frequency shift CSS (FSCSS).
> Source in footnote [^1]

## References 

- [LoRa Chirp Visual Explanation Video](https://www.youtube.com/watch?v=dxYY097QNs0)
## Footnotes

[^1]: A. Maleki, H. H. Nguyen, E. Bedeer and R. Barton, "A Tutorial on Chirp Spread Spectrum Modulation for LoRaWAN: Basics and Key Advances," in IEEE Open Journal of the Communications Society, vol. 5, pp. 4578-4612, 2024, doi: 10.1109/OJCOMS.2024.3433502.
	keywords: {Modulation;LoRaWAN;Internet of Things;Tutorials;Frequency modulation;Chirp;Surveys;Chirp spread spectrum (CSS);Internet of Things (IoT);long-range wide area network (LoRaWAN);low-power wide area network (LPWAN);spreading factor (SF)},
	
	
