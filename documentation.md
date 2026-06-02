# 📘 Nur al-Ilm (نور العلم) — Architectural Design & Documentation

Welcome to the comprehensive technical documentation for **Nur al-Ilm**, a full-stack, offline-first Hausa-to-English educational application. Designed specifically for low-literacy or zero-literacy learners in Hausa-speaking regions of Northern Nigeria, the platform teaches practical, vocational English through intuitive sound, voice reproduction, and immediate feedback.

---

## 🧭 Table of Contents
1. **System Vision & Core Goal**
2. **Technical Stack & Port Configuration**
3. **Full-Stack Architecture & API Routes**
4. **Speech-to-Text & Text-to-Speech Engine**
5. **Offline-First PWA & Service Worker Cache**
6. **Billing, Premium Levels, & Promo Codes (NUR2026)**
7. **Zero-Literacy & Parent/Admin Dashboards**
8. **Deployment & Operational Guide**

---

## 1. System Vision & Core Goal

Conventional language learning applications rely heavily on written interfaces, which alienates low-literacy learners. Nur al-Ilm reverses this bottleneck with a **Voice-First Paradigm**:
*   Every button, instruction, word, and category is speakable instantly on gesture tap.
*   Learners hear terms translated and explained in soft, clear Hausa first, and then repeated in professional, comfortable English.
*   The application evaluates spoken English directly via mobile microphones, using standard, lightweight speech recognition APIs combined with phoneme matching fallbacks.

---

## 2. Technical Stack & Port Configuration

Nur al-Ilm runs as a seamless **Full-Stack (Vite + Express)** single-process server:
*   **Operating Port**: Port `3000` is hardcoded for absolute compatibility with reverse-proxy container hosting. No other ports are exposed.
*   **Framework**: React 18, utilizing strict functional modules, declarative custom hook states, and **Tailwind CSS** for responsive layout scaling.
*   **Animation**: Powered by `motion/react` implementing smooth, low-overhead visual transitions, list entrances, and button popups.
*   **Backend Node.js**: Express backend running on TypeScript (`tsx server.ts` in Dev, compiled via `esbuild` to a consolidated CJS `dist/server.cjs` file for production).

---

## 3. Full-Stack Architecture & API Routes

Our backend server operates in `server.ts` and handles critical tasks that must remain confidential, such as AI model prompting (Gemini) and Google TTS stream relays.

### Essential API Directory

| Endpoint | Method | Role | Caching / Security |
| :--- | :--- | :--- | :--- |
| `/api/tts` | GPL GET | Native-speaker vocal streaming for Hausa text | Cacheable (max-age 24 hours) |
| `/api/gemini/tutor` | POST | Proxies voice inquiries to Gemini API | API keys hidden server-side |
| `/api/analytics` | GET | Relays classroom usage to admin | Admin-level authentication |
| `/api/lessons/:id` | GET | Serving JSON specifications | Offline pre-caches |

---

## 4. Speech-to-Text & Text-to-Speech Engine

The visual highlight of the app is the voice feedback engine, implemented modularly under `src/components/AudioVoiceHelper.ts` and backend route `app.get("/api/tts")`.

### Text-to-Speech (TTS) Flow
1. **Device Voice Validation**: On boot, the helper tests if the client's browser has a native **Hausa language ('ha')** TTS module installed locally.
2. **Local Render fallback**: If a local Hausa voice package is found, the system synthesizes speech locally via `window.speechSynthesis` for instantaneous response.
3. **Streamed Native Speaker Fallback**: Since the vast majority of standard Android/Windows devices lack pre-installed Hausa sound modules, the helper initiates a remote stream request to our local server endpoint `/api/tts?lang=ha&text=...`.
4. **Google TTS Proxy Engine**: The Express backend requests high-fidelity Google-synthesized Hausa audio files on-the-fly and streams them to the browser client using `Audio` buffering, avoiding raw Web Speech synthesis crashes.

### Speech Recognition (Microphone)
*   Integrates standard `webkitSpeechRecognition` or `SpeechRecognition` systems natively.
*   If browsers block recognition inside sandboxed iFrames, the user interface gracefully displays a visual phonemic button matching list, so no user gets locked out.

---

## 5. Offline-First PWA & Service Worker Cache

Nur al-Ilm has full Progressive Web App capabilities for offline stability across parts of Nigeria with sparse network connections.

### Pre-Caching Assets (`/public/sw.js`)
At boot, the service worker registers and pre-caches the shell layout files:
*   `index.html`
*   `src/main.tsx`
*   `src/index.css`
*   `src/App.tsx`

### Lesson Caching (`src/utils/offlineHelper.ts`)
Users can choose to save any specific beginner, vocational, or advanced lesson. When clicking "**Sauke (Download)**":
1.  **JSON Matcher caching**: Under-the-hood, the Cache API saves a mock endpoint `/api/lessons/[lessonId]` with the lesson's structural definitions.
2.  **Metadata storage**: Set an active item in `localStorage` to identify downloaded lists.
3.  **No internet playback**: When offline, the application matches cached lessons immediately from the Cache storage, allowing active interactive learning to occur completely offline.

---

## 6. Billing, Premium Levels, & Promo Codes (NUR2026)

To restrict and monetize advanced corporate lessons, we incorporate a Paywall & Premium model:
*   **Levels 0 and 1** are fully free, allowing standard introductory english and travel practices.
*   **Levels 2, 3, 4, 5** (vocational, business, healthcare, intermediate speaking dialogues) require a Premium subscription upgrade.

### The NUR2026 Promotional Code
We built a direct back-door promotional access bypass inside `/src/components/CheckoutPortal.tsx`:
*   **Action**: When users open a locked level, the Checkout Portal pops up.
*   **Promo Bypass**: Typing the promotional code **`NUR2026`** (case-insensitive) and pressing **Shigar (Apply)** instantly applies a 100% discount.
*   **Success handling**: It triggers the `handlePremiumUpgrade()` callback, registers `isPremium: true` in state (persisted locally), plays an encouraging vocal Hausa confirmation message, and closes the paywall.

---

## 7. Zero-Literacy & Parent/Admin Dashboards

### Zero-Literacy Mode
When activated, a lovely floating voice assistant remains anchored to the bottom-right corner. Tapping this assistant causes the app to read contextual Hausa instructions matched dynamically to the user's active page (e.g., explaining how to use correct vocal patterns on the lesson board vs. tracking child scores on the parent screen).

### Parent Portal & Certificate Center
Provides parents with full visibility over their child's learning metrics:
*   Accumulated Experience points (XP) and currency coins.
*   Completed lesson lists with visual status indicators.
*   **Certificate of Completion**: If a child successfully achieves enough XP milestones, parent can download / print a beautiful dynamic certificate with real student names.

### Admin Panel
Allows Ustaz administrators to:
1.  Track active daily users (DAU) and financial receipts.
2.  Dynamically add vocabulary terms, sentence structures, and questions directly to the active list database.

---

## 8. Deployment & Operational Guide

### Production Bundling Flow
When building the app:
1.  The frontend elements are compiled inside `dist/`.
2.  The server elements are bundled in a single `dist/server.cjs` file using `esbuild`.
3.  The single-command process starting script `node dist/server.cjs` runs safely without dependency path collisions.

### Environment Requirements
Add safety defaults to your local `.env` variables list:
```env
# .env.example
GEMINI_API_KEY=
PORT=3000
NODE_ENV=production
```
No frontend API key overrides are required; all security-sensitive interactions take place behind the Express server API walls.
