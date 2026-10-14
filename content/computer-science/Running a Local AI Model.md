---
up:
type:
  - reference
cs-foundations:
  - "[[julzdao/computer-science/Encapsulation]]"
tags:
  - cs/ai
description: Reasons to run a local AI model instead of cloud based options.
cover:
lifecycle:
  - seed
---
Private. 
Free. 
Offline. 

---

The main reason for running a local AI model is privacy. Making sure that your data stays private and [[julzdao/computer-science/Encapsulation|encapsulated]] in your local system.  

Each prompt and token for processing an AI task costs money. If you run the model locally, no need to pay for subscription or anything else. 

> [!note] Electricity
> The only real cost of running a local LLM model instead of cloud, would be the cost of electricity. But this can also be optimised in the future with solar panels. 

Third is that it works offline. 
You can run this model forever even without Internet access. 

## Steps to run your own Local Agentic AI

1. Download and Install [Ollama](https://ollama.com) 
2. Pull your desired local model such as `ollama pull qwen3.5:9b` 
3. Install [Hermes Agent](https://hermes-agent.nousresearch.com) Open Source orchestrator. 
4. Point the Hermes Agent to your local ollama Endpoint API.

## Sources 

- [Run your own Agentic AI](https://www.youtube.com/watch?v=4KXLW9Y1r4c) 

