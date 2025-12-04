# **Certus — Decentralised Prediction Markets (Frontend Prototype)**

![Project Screenshot](https://i.ibb.co/twWxY9qk/image.png)

## **🚀 Overview**

**Certus** is a decentralised prediction-market platform built to demonstrate how users can create, participate in, and resolve markets around real-world events.
This prototype showcases the user experience end-to-end — wallet connection, browsing markets, and opening new markets — using **two demo categories (Weather + Crypto)** and simulated oracle resolution.

The full vision integrates **AI-powered question parsing** to map any written question to the correct external data source.
This demo uses **predefined markets** to illustrate the flow.

---

## **🧩 Problem Statement**

Prediction markets today struggle with **trust**, **data sourcing**, and **complex UX**.
Users often rely on opaque or centralised systems to validate outcomes, making participation risky or inaccessible.

**Certus** explores how decentralised rails + controlled data sources can produce a safer, transparent, and user-friendly prediction environment.

---

## **Live Demo**

[https://certus-bice.vercel.app/](https://certus-bice.vercel.app/)

![Video Demo](https://i.ibb.co/XxGtDhgj/ezgif-7f8003d49da74e4b.gif)

---

## **💡 Solution Summary**

* 🔐 **Wallet-based Access** — Users connect using a Web3 wallet (MetaMask simulation in this prototype).
* 🎯 **Two Demo Market Types** —

  * **Weather Example:** *“Will Lagos be sunny tomorrow?”*
  * **Crypto Example:** *“Will BTC close above $100K this week?”*
* 🧠 **AI Vision (Future)** — Free-form natural language questions parsed, categorised, and auto-linked to correct data sources.
* 📊 **Market Interaction** — Create markets, view probabilities, vote Yes/No, and view results.
* 🛰️ **Oracle Simulation** — In the frontend demo, outcomes resolve via pre-seeded values.

---

## **📦 Folder Structure**

```sh
/app
    page.tsx
    globals.css
    /login
    /markets
    /new
/components
    /ui
/hooks
    useWallet.ts
/lib
/public
/stores
/types
```

---

## **🛠️ Running the Prototype**

### **1. Clone the Repository**

```bash
git clone https://github.com/abrahamebij/certus.git
cd certus
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Start the Dev Server**

```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)**
You should see the landing page.

---

## **🧪 Testing Instructions (For Judges)**

![User Flow](https://i.ibb.co/KpTGMdRC/unnamed-1.jpg)

Since this is a frontend-only prototype:

1. **Open the app**
   → Landing page, branding + mission.

2. **Go to Login**
   → Click “Connect Wallet”.
   → Wallet connection is real, please install Metamask extension first.

3. **Explore Markets**
   → Two demo markets appear (Weather + Crypto).
   → Try voting “Yes” or “No”.

4. **Open a Market**
   → Click “Create Market”.
   → Choose Weather or Crypto.
   → Fill the quick form and submit.
   → Your new market appears instantly (local state).

5. **View Resolution**
   → Markets resolve automatically via mocked data.

No backend, no blockchain, no real oracles — **just UX demonstration**.

---

## **🧭 Vision Beyond the Demo**

* AI-driven question classification
* Canton-style privacy for market data
* Real on-chain DASM contracts
* Automated oracle feeds
* User reputation & staking mechanics

---

## **📝 Additional Files**

* `/public` — Logo
* `/docs` — Supporting Documents
  