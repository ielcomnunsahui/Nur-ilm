# 🟢 Nur al-Ilm (نور العلم)

> **Voice-First Hausa-to-English Offline PWA Language Learning Platform**  
> Empowers low-literacy learners in Northern Nigeria to speak, read, and master English using speech technology, offline caching, and native translation mechanisms.

---

## ⚡ Free Premium Access: Promo Code

To experience the full capability of the application—including high-level lesson practices, advanced interactive dialogues, and downloadable credentials—use the custom promotional code below inside the Checkout Portal:

```text
PROMO CODE: NUR2026
```

### How to Apply:
1. Try to open an advanced English lesson or click on the **Premium Checkout Button**.
2. Locate the **Kuna da Lambar ragi? (Have a promo code?)** section.
3. Type `NUR2026` and click **Shigar (Apply)**.
4. The system will play a Hausa-confirming TTS broadcast and dynamically unlock unlimited access for free.

---

## ✨ Primary Capabilities

*   **🎙️ Native Hausa TTS Streaming Server**: Translates complex phrases with an advanced Node.js proxy server. If your browser lacks native offline Hausa voice packages, it seamlessly falls back to streaming crystal-clear native speaker Hausa audio.
*   **📴 Robust Offline-First PWA Support**: Integrates Service Workers (`sw.js`) and Indexed/Cache APIs allowing learners to download entire interactive audio-description packages to their mobile devices for offline practice.
*   **🤖 Ustaz Nur AI Tutor Chat**: Dynamic Hausa-to-English conversation proxy utilizing advanced LLM templates providing step-by-step guidance, gentle corrections, and spelling checks.
*   **🔔 Zero-Literacy Audio Assistant Mode**: An always-available floating assist-button speaks translations, context descriptions, and on-board instructions in Hausa whenever tapped.
*   **📊 Parental Dashboard & Admin Control**: Tracks daily learning progress, unlocks credentials (PDF Certificate center), and administers customizable lessons.

---

## 🛠️ Technological Stack

*   **Frontend**: 
    *   React 18 + Vite (TypeScript modules)
    *   Tailwind CSS (highly structured fluid layouts)
    *   `motion/react` (for animations)
    *   Lucide React icons
*   **Backend**: 
    *   Express.js custom server (running on port `3000`)
    *   Streamed TTS proxy APIs powered by Translation TTS generators
    *   Gemini AI interaction engine
*   **PWA Core**: 
    *   Cache Storage API
    *   Dedicated service worker registration in `main.tsx`

---

## 📂 Project Structure

```text
├── LICENSE                 # MIT Open Source License
├── README.md               # User facing readme (this file)
├── documentation.md        # Deep architectural design doc
├── package.json            # Build specifications & task runners
├── server.ts               # Custom Express full-stack proxy & TTS server
├── tsconfig.json           # Type configurations
├── src/
│   ├── App.tsx             # Master React application dashboard router
│   ├── main.tsx            # PWA entrypoint & Service worker registration
│   ├── index.css           # Global typography & Tailwind configuration
│   ├── types.ts            # Type definitions (Lesson, Level, Progress)
│   ├── data.ts             # Initial curated system lessons databases
│   ├── components/         # Interactive layout chunks
│   │   ├── AdminDashboard.tsx      # Admin console
│   │   ├── AudioVoiceHelper.ts     # Local & cloud TTS and mic recognizer
│   │   ├── CertificateCenter.tsx   # PDF-simulated certificates
│   │   ├── CheckoutPortal.tsx      # Payment gateway with NUR2026 logic
│   │   ├── LandingPage.tsx         # Modern presentation landing page
│   │   ├── LessonPractice.tsx      # Interactive speaking loop
│   │   └── ParentDashboard.tsx     # Student monitoring & credentials
│   └── utils/
│       └── offlineHelper.ts        # PWA Client cache managers
```

---

## 🚀 Running the App Locally

### Prerequisites
Make sure you have Node.js (version 18 or above) installed on your system.

### 1. Close and Install Dependencies
```bash
npm install
```

### 2. Run the Full-Stack Developer server
```bash
npm run dev
```
The server will boot the integrated backend and client on **http://localhost:3000** automatically.

### 3. Build & Compile for Production
```bash
npm run build
```

---

## 📜 Academic License
This software is distributed under the standard **MIT License**. Check the full terms in the `LICENSE` file.
