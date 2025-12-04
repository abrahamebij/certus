# **Certus — Architecture Overview**

Certus is a prediction marketplace that allows users to stake tokens (or points) on simple, verifiable questions such as **weather outcomes** or **crypto price movements**.
The architecture below describes both the **prototype implementation** (frontend-only demo) and the **full product vision** (decentralised, AI-assisted, oracle-powered system).

---

## **1. Prototype Architecture (Frontend Only — Demo Version)**

For the ideathon demo, Certus runs entirely in the browser with **no backend, no blockchain, and no API calls**.
All market logic is preloaded and simulated so judges can interact with the core experience.

### **Core Components**

* **Next.js Frontend**
  Handles UI, navigation, displaying markets, and simulating outcomes.
* **Local Mock Data (`markets.json`)**
  Contains the predefined crypto and weather questions (used instead of real oracles).
* **Local State Logic**
  Simulates:

  * Creating a market
  * Setting a deadline
  * Locking predictions
  * Manually resolving outcomes
* **Mock Wallet Connection**
  Uses browser state to simulate a connected wallet address (for UX demonstration).

### **User Flow**

1. User opens the web app
2. User “connects” wallet
3. User views available markets
4. User predicts “YES” or “NO”
5. After the deadline, a simulated resolution determines the winner

This demonstrates the *interaction model* cleanly without blockchain complexity.

---

## **2. Full Product Architecture (Future Vision)**

The complete Certus system is designed to operate as a **trust-minimised, AI-assisted prediction marketplace** using three key components:

---

## **A. Frontend Layer (Next.js + Wallet Integration)**

* Wallet connection (MetaMask/WalletConnect)
* Market discovery
* Creating new markets via natural language prompts
* Real-time updates

---

## **B. AI Categorisation & Routing Layer**

A lightweight LLM is used to interpret user-created questions.

### **Tasks**

* Detect the market category (e.g., *Weather*, *Crypto*)
* Extract key parameters:

  * location (for weather)
  * asset + price delta (for crypto)
  * deadline
* Route the question to the correct oracle template

### **Example**

User asks:
**“Will the weather in Lagos be sunny tomorrow?”**

AI transforms this into a structured oracle request:

```json
{
  "category": "weather",
  "location": "Lagos",
  "time": "2025-12-03",
  "condition": "sunny"
}
```

---

## **C. Smart Contract Layer**

A single factory contract creates new prediction markets.

### **Contract Responsibilities**

* Create new markets
* Lock stake during prediction period
* Store prediction outcomes
* Distribute winnings

Each market is a small contract with:

* Question
* Deadline
* YES/NO pools
* Resolution

---

## **D. Oracle Layer (API → Chain)**

This layer fetches real-world data for verification.

### **Weather Markets**

Uses weather APIs (e.g., OpenWeatherMap) to fetch:

* temperature
* forecast
* cloud coverage
* UV index

### **Crypto Markets**

Uses price feeds (e.g., CoinGecko / Coinbase API).

The oracle posts final results to the smart contract once the deadline is reached.

---

## **3. Component Interactions (Full System)**

### **1. User submits question → AI interprets it**

AI converts natural language into structured oracle parameters.

### **2. Certus creates a market contract**

Smart contract stores all details immutably.

### **3. Users stake YES/NO predictions**

Wallet transactions lock tokens into the pool.

### **4. Deadline passes → Oracle fetches final data**

Trusted off-chain worker hits the correct API automatically.

### **5. Oracle writes the result on-chain**

Contract resolves, releasing tokens to winners.

---

## **4. Why This Architecture Works**

* **Scalable:** New categories can be added by teaching the AI new rules.
* **Transparent:** Outcomes are based on public data + on-chain resolution.
* **User-Friendly:** Natural language creation removes complexity.
* **Modular:** Frontend, AI, oracles, and contracts are loosely coupled.
