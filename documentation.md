# Nur al-Ilm (نور العلم) — Comprehensive System Documentation & Technical Specification

> **Platform**: Nur al-Ilm English Learning Platform for Hausa Speakers  
> **Target Audience**: Native Hausa speakers, non-literate learners, beginner-to-fluent ESL students  
> **Architecture**: Full-Stack TypeScript (React 18 SPA + Express.js API + Google Gemini 3.5 Flash + Web Speech API + PWA Offline Cache)  
> **Default Port**: `3000` (Bound to `0.0.0.0`)

---

## 1. Executive Summary & Mission

**Nur al-Ilm (نور العلم — "Light of Knowledge")** is a purpose-built educational platform engineered to teach English to native Hausa speakers from zero literacy up to fluent functional and professional communication. 

Traditional language applications assume pre-existing literacy in Roman script or academic English. Nur al-Ilm removes this barrier by applying a **Sound-First, Visual-First, and Contextual Hausa Pedagogy**:
- **Zero-Literacy Inclusivity**: Audio narration for every interface element, high-contrast visual cues, and automatic vocal feedback.
- **Bilingual Hausa Explanations**: Native Hausa translations, phonetic guides (matching Hausa sound dynamics), common Hausa phonetic mistake alerts, and cultural context.
- **AI Tutor (Ustaz Nur)**: A conversational AI coach powered by Gemini 3.5 Flash with live native voice synthesis and real-time speech evaluation.
- **Offline Reliability**: Native Cache API integration enabling full lesson downloads in areas with unreliable internet connectivity.
- **Localized Monetization**: Affordable subscription tiers adapted for the Nigerian market with instant payment methods (Paystack, Flutterwave, USSD, Direct Bank Transfer).

---

## 2. Technology Stack & System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                              CLIENT TIER                               │
│  React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Motion   │
│  ┌────────────────────────┬───────────────────┬─────────────────────┐  │
│  │ Zero-Literacy Mode UI  │ Lesson Engine     │ Ustaz Nur AI Chat   │  │
│  ├────────────────────────┼───────────────────┼─────────────────────┤  │
│  │ Web Speech API (STT)   │ Multi-tier TTS    │ PWA Cache API       │  │
│  └────────────────────────┴───────────────────┴─────────────────────┘  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST (/api/*)
┌───────────────────────────────────▼────────────────────────────────────┐
│                              SERVER TIER                               │
│                   Express.js (Node.js / TypeScript)                    │
│  ┌───────────────────────┬──────────────────────────────────────────┐  │
│  │ POST /api/gemini/tutor│ Ustaz Nur Bilingual AI Tutor (Gemini)    │  │
│  ├───────────────────────┼──────────────────────────────────────────┤  │
│  │ POST /api/gemini/pron │ Real-time Pronunciation Evaluation       │  │
│  ├───────────────────────┼──────────────────────────────────────────┤  │
│  │ GET  /api/tts         │ High-Fidelity Hausa Stream Proxy         │  │
│  ├───────────────────────┼──────────────────────────────────────────┤  │
│  │ GET  /api/analytics   │ Admin Platform Metrics                   │  │
│  └───────────────────────┴──────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Core Technologies
1. **Frontend Framework**: React 18 with Vite build tooling and TypeScript type enforcement.
2. **Styling & UI**: Tailwind CSS utility design system with strict color contrast (WCAG AA compliance) and responsive layouts (mobile-first).
3. **Icons**: `lucide-react`.
4. **Backend Server**: Express.js with `@google/genai` SDK and JSON schema outputs.
5. **AI Engine**: Google Gemini 3.5 Flash (`gemini-3.5-flash`) for real-time pedagogical tutoring and oral evaluation.
6. **Voice Synthesis**: Hybrid Multi-Tier TTS (Server-side streamed native Hausa audio + Client-side SpeechSynthesis fallback with female voice preference).
7. **Speech Recognition**: Browser Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`).
8. **Offline Storage**: Service Worker, Browser Cache API (`nuralilm-lessons-cache`), and LocalStorage for state synchronization.

---

## 3. Database Schema & TypeScript Property Specifications

All shared interfaces, types, and database models are defined in `src/types.ts`.

### 3.1. `LearningLevel` (Enum)

Represents the 11 progressive stages of the Nur al-Ilm curriculum.

```typescript
export enum LearningLevel {
  STAGE_0 = 'STAGE_0',   // Orientation (Before English / Confidence building)
  STAGE_1 = 'STAGE_1',   // Listening Awareness (Sound discernment & basic acoustic recognition)
  STAGE_2 = 'STAGE_2',   // First Spoken Words (Essential nouns, food, family, colors)
  STAGE_3 = 'STAGE_3',   // Survival English (Urgent needs, self-introduction, emergency phrases)
  STAGE_4 = 'STAGE_4',   // Everyday Conversations (Market greetings, directions, time)
  STAGE_5 = 'STAGE_5',   // Reading Introduction (Alphabet phonics A-Z, letter blends)
  STAGE_6 = 'STAGE_6',   // Writing Basics (Spelling simple words, tracing, forms)
  STAGE_7 = 'STAGE_7',   // Functional English (Health clinic, hospital, transportation)
  STAGE_8 = 'STAGE_8',   // Workplace English (Trades, commerce, interviews, professionalism)
  STAGE_9 = 'STAGE_9',   // English Thinking (Idiomatic expressions, storytelling, news)
  STAGE_10 = 'STAGE_10', // Fluency Mastery (Debates, public speaking, leadership English)
}
```

---

### 3.2. `VocabularyWord` (Interface)

Represents a single vocabulary entry with comprehensive phonetics, Hausa translations, and pronunciation guides.

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique identifier for the vocabulary item (e.g. `v_water_1`). |
| `english` | `string` | Yes | The target English word or phrase (e.g. `"Water"`). |
| `hausa` | `string` | Yes | Direct Hausa translation (e.g. `"Ruwa"`). |
| `pronunciationHint` | `string` | Yes | Simplified phonetic guide (e.g. `"Wa-ter"`). |
| `hausaHint` | `string` | Yes | Example usage sentence in Hausa (e.g. `"Ina son ruwa"`). |
| `imageUrl` | `string` | Yes | High-contrast visual illustration or contextual icon URL. |
| `category` | `string` | Yes | Thematic category (e.g. `"Basics"`, `"Food"`, `"Family"`, `"Commerce"`). |
| `ipa` | `string` | Optional | International Phonetic Alphabet notation (e.g. `"/ˈwɔː.tər/"`). |
| `syllableBreakdown` | `string` | Optional | Syllable-by-syllable breakdown (e.g. `"Wa-ter"`). |
| `slowPronunciation` | `string` | Optional | Phonetic transcription for slow-speed reading (e.g. `"Waa-tuh"`). |
| `commonHausaMistake` | `string` | Optional | Detailed explanation of common mistakes native Hausa speakers make. |
| `correctionTip` | `string` | Optional | Concrete articulatory tip to achieve accurate sound production. |

---

### 3.3. `QuizQuestion` (Interface)

Represents an interactive quiz question embedded in a lesson.

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique identifier for the quiz question. |
| `questionText` | `string` | Yes | The English question text. |
| `questionAudioText` | `string` | Yes | Hausa audio narration script to read the question aloud for zero-literacy learners. |
| `options` | `string[]` | Yes | Array of 4 multiple-choice options. |
| `correctOptionIndex` | `number` | Yes | Zero-based index (0-3) of the correct answer. |
| `explanation` | `string` | Yes | Detailed explanation in Hausa and English explaining why the option is correct. |

---

### 3.4. `Lesson` (Interface)

Represents a comprehensive structured lesson within a module.

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique lesson ID (e.g. `"l_stage0_1"`). |
| `level` | `LearningLevel` | Yes | The curriculum stage enum this lesson belongs to. |
| `title` | `string` | Yes | English title of the lesson. |
| `titleHausa` | `string` | Yes | Hausa title of the lesson. |
| `description` | `string` | Yes | Short English summary of the lesson. |
| `descriptionHausa` | `string` | Yes | Short Hausa summary of the lesson. |
| `audioUrl` | `string` | Optional | Direct URL to pre-recorded master audio if available. |
| `points` | `number` | Yes | Experience points (XP) awarded upon completion (e.g. `100`, `150`). |
| `vocabulary` | `VocabularyWord[]` | Yes | Array of comprehensive vocabulary items taught in the lesson. |
| `quiz` | `QuizQuestion[]` | Yes | Array of interactive multiple-choice evaluation questions. |
| `learningObjective` | `string` | Optional | Pedagogical outcome of this lesson. |
| `hausaExplanation` | `string` | Optional | Comprehensive lesson overview in native Hausa. |
| `englishExplanation` | `string` | Optional | Comprehensive lesson overview in English. |
| `pronunciationGuide` | `string` | Optional | Articulatory guide for the mouth, tongue, and throat. |
| `aiTutorScript` | `object` | Optional | Custom Ustaz Nur script with 5 keys: `introduction`, `encouragement`, `corrections`, `achievements`, `motivation`. |
| `listeningExercise` | `string` | Optional | Ear-training listening prompt description. |
| `repeatAfterMeExercise` | `string` | Optional | Chime-based oral repetition prompt. |
| `speakingPractice` | `string` | Optional | Open speech task for microphone verification. |
| `conversationPractice` | `string` | Optional | Dialogue exchange between Ustaz Nur and the student. |
| `visualLearningSuggestions` | `string` | Optional | Visual cues and scene depictions for non-literate learners. |
| `assessment` | `string` | Optional | Criteria for passing and oral assessment verification. |
| `homework` | `string` | Optional | Real-world practical task to perform outside the app. |
| `masteryCriteria` | `string` | Optional | Benchmark for achieving 100% mastery. |
| `estimatedDuration` | `string` | Optional | Duration estimate (e.g. `"15 minutes"`). |
| `difficultyRating` | `string` | Optional | Difficulty score (e.g. `"1.5/5"`). |

---

### 3.5. `UserProgress` (Interface)

Persisted user state tracking progression, gamification, and settings.

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `xp` | `number` | Yes | Total earned Experience Points across all activities. |
| `coins` | `number` | Yes | In-app currency earned from perfect quiz scores and daily streaks. |
| `streak` | `number` | Yes | Consecutive days active count. |
| `lastActiveDate` | `string` | Yes | Date string formatted as `YYYY-MM-DD`. |
| `completedLessons` | `string[]` | Yes | Array of completed lesson IDs. |
| `lessonProgress` | `Record<string, number>` | Optional | Map of `lessonId` to completion percentage (`0` to `100`). |
| `unlockedLevels` | `LearningLevel[]` | Yes | List of unlocked curriculum stages. |
| `badges` | `string[]` | Yes | Array of unlocked achievement badge IDs. |
| `isPremium` | `boolean` | Yes | Flag indicating whether the user has active Premium subscription access. |
| `name` | `string` | Yes | Full name of the student. |
| `role` | `'student' \| 'parent' \| 'admin'` | Yes | Active user role and navigation perspective. |
| `zeroLiteracyMode` | `boolean` | Yes | Flag toggling voice-first UI and audio narration. |

---

### 3.6. `Badge` (Interface)

Achievement badge awarded upon reaching milestones.

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique badge ID (e.g. `"first_word"`, `"streak_7"`). |
| `title` | `string` | Yes | English badge title. |
| `titleHausa` | `string` | Yes | Hausa badge title. |
| `description` | `string` | Yes | English condition to unlock. |
| `descriptionHausa` | `string` | Yes | Hausa condition to unlock. |
| `icon` | `string` | Yes | Lucide icon identifier. |
| `unlockedAt` | `string` | Optional | ISO timestamp when the user earned the badge. |

---

### 3.7. `ChatMessage` (Interface)

Message schema for interactive chat sessions with Ustaz Nur.

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique message UUID. |
| `sender` | `'student' \| 'ustaz'` | Yes | Author of the message. |
| `text` | `string` | Yes | Primary message body (Hausa/English). |
| `translation` | `string` | Optional | Parallel translation for reference. |
| `audioBase64` | `string` | Optional | Encoded voice recording data if sent via microphone. |
| `timestamp` | `string` | Yes | Display timestamp (e.g. `"10:45 AM"`). |
| `pronunciationScore` | `object` | Optional | Evaluation scores: `accuracy` (0-100), `pronunciation` (0-100), `fluency` (0-100). |

---

### 3.8. `AnalyticsData` (Interface)

Platform analytics schema consumed by the Admin Dashboard.

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `dau` | `number` | Yes | Daily Active Users count. |
| `mau` | `number` | Yes | Monthly Active Users count. |
| `completionRate` | `number` | Yes | Aggregate percentage of started lessons finished. |
| `revenue` | `number` | Yes | Total platform revenue (in thousands of Naira ₦). |
| `retention` | `number` | Yes | 30-day user retention rate percentage. |
| `monthlyRevenueHistory` | `Array<{ month: string; amount: number }>` | Yes | Historical monthly revenue trends. |
| `levelCompletionDistribution` | `Array<{ level: string; count: number }>` | Yes | Distribution of completions per curriculum level. |

---

## 4. Backend API Endpoints & Specification

The backend server is implemented in `server.ts` running on port `3000`.

### 4.1. Ustaz Nur AI Tutor (`POST /api/gemini/tutor`)

Sends student conversation history and user query to Gemini 3.5 Flash with structured JSON output enforcing Hausa explanations and phonetic breakdowns.

- **Request Body**:
  ```json
  {
    "messages": [
      { "id": "1", "sender": "student", "text": "Yaya zan ce ina son ruwa da Turanci?" }
    ],
    "userProfile": {
      "name": "Amina Musa",
      "level": "STAGE_2"
    }
  }
  ```
- **Response Format**:
  ```json
  {
    "result": {
      "text": "Masha Allah! Domin cewa kana son ruwa, zaka ce: 'I want water'.",
      "englishTarget": "I want water",
      "hausaExplanation": "'I want' yana nufin 'Ina so', sai 'water' yana nufin 'ruwa'.",
      "pronunciationHint": "Ai want wah-tur"
    }
  }
  ```

---

### 4.2. Oral Pronunciation Scorer (`POST /api/gemini/pronunciation`)

Evaluates transcribed student speech against a target sentence or word.

- **Request Body**:
  ```json
  {
    "studentSpeech": "I wan wata",
    "targetPhrase": "I want water"
  }
  ```
- **Response Format**:
  ```json
  {
    "result": {
      "accuracy": 88,
      "pronunciation": 82,
      "fluency": 90,
      "coachingTip": "Kokarinka yana da kyau sosai! Ka tabbatar ka fadi sautin 't' a karshen 'want' sarai."
    }
  }
  ```

---

### 4.3. Native Hausa TTS Audio Stream Proxy (`GET /api/tts`)

Proxies and caches audio requests to stream natural-sounding Hausa speech.

- **Query Parameters**:
  - `text` (`string`, required): The text to synthesize.
  - `lang` (`string`, optional, default: `"ha"`): Language code (`ha` for Hausa, `en` for English).
- **Response**: `audio/mpeg` binary audio stream with HTTP header `Cache-Control: public, max-age=86400`.

---

### 4.4. Platform Analytics Metrics (`GET /api/analytics`)

Returns consolidated real-time and historical platform metrics for the Admin Dashboard.

- **Response Format**:
  ```json
  {
    "dau": 1240,
    "mau": 15800,
    "completionRate": 82.5,
    "revenue": 4120,
    "retention": 91.2,
    "monthlyRevenueHistory": [
      { "month": "Jan", "amount": 1500 },
      { "month": "Feb", "amount": 2200 },
      { "month": "Mar", "amount": 2900 },
      { "month": "Apr", "amount": 3500 },
      { "month": "May", "amount": 4120 }
    ],
    "levelCompletionDistribution": [
      { "level": "Stage 0", "count": 820 },
      { "level": "Stage 1", "count": 540 },
      { "level": "Stage 2", "count": 310 }
    ]
  }
  ```

---

## 5. Audio & Voice Architecture (`AudioVoiceHelper.ts`)

Speech is the central channel of communication in Nur al-Ilm. The platform implements a **fail-safe dual audio engine**:

```
                                  speakText(text, lang)
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    │                                               │
             lang == 'ha-NG'                                 lang == 'en-US'
                    │                                               │
         splitTextIntoChunks(text)                                  │
                    │                                               │
          Stream /api/tts (Audio)                                   │
                    │                                               │
       ┌────────────┴────────────┐                                  │
    Success                   Failure                               │
       │                         │                                  │
   Plays Audio          playLocalBackupTTS()               playLocalBackupTTS()
   Sequentially                  │                                  │
                         Browser Speech API                Browser Speech API
                         (Female Voice Priority)           (Female Voice Priority)
```

### Key Capabilities
1. **Intelligent Text Chunking (`splitTextIntoChunks`)**: Splits long paragraphs at punctuation and clause boundaries (<140 characters) to prevent audio stream truncations.
2. **Audio Cancellation (`stopAllSpeech`)**: Instantly terminates active speech synthesis and background playlists when a user triggers new audio or navigates between views.
3. **Speech Recognition (`startSpeechRecognition`)**: Connects to the Web Speech API with fallback error handling and speech-to-text transcription.

---

## 6. Offline PWA & Storage System (`offlineHelper.ts`)

To support rural communities and regions with intermittent power or mobile data, Nur al-Ilm operates as an **Offline-First Progressive Web App**:

1. **Cache API Bucket**: Named `'nuralilm-lessons-cache'`.
2. **Lesson Download Flow (`downloadLessonForOffline`)**:
   - Synthesizes and caches lesson metadata as JSON under `/api/lessons/{lessonId}`.
   - Caches verification status under `/api/lessons/{lessonId}/offline-ready`.
   - Adds the `lessonId` to the `nuralilm_downloaded_ids` index in `localStorage`.
3. **Local Storage Keys**:
   - `nuralilm_progress`: User XP, streaks, unlocked stages, and completed lessons.
   - `nuralilm_role`: Active user role (`student`, `parent`, `admin`).
   - `nuralilm_downloaded_ids`: Array of offline-ready lesson IDs.

---

## 7. Curriculum Breakdown: 11 Progressive Stages

| Stage | Title (English / Hausa) | Focus & Content | Free / Premium |
| :--- | :--- | :--- | :--- |
| **Stage 0** | **Orientation / Fara Daga Sifiri** | Fear removal, confidence building, how to use microphone, first open vowels (`Ah`, `Welcome`, `I can`). | **Free** |
| **Stage 1** | **Listening Awareness / Saurare Da Gane Sauti** | Sound discrimination without reading pressure, greetings, politeness (`Hello`, `Yes/No`, `Please`, `Thank you`, `Sorry`). | **Free** |
| **Stage 2** | **First Spoken Words / Kalmomi Da Ka Fi Bukata** | Essential daily items: Food (`Water`, `Rice`, `Bread`), Family (`Father`, `Mother`, `Baby`), Colors (`Red`, `Blue`, `Green`). | Premium |
| **Stage 3** | **Survival English / Gajerun Jimloli Na Bukata** | Basic desires (`I want water`), personal introductions (`My name is`), emergency help requests. | Premium |
| **Stage 4** | **Everyday Conversations / Tattaunawa Ta Gaske** | Market bargaining, asking prices, giving and following road directions, greeting elders. | Premium |
| **Stage 5** | **Reading Introduction / Haruffa Da Karatu** | Complete A-Z English alphabet with Hausa phonetic comparisons, letter-sound blends (`cat`, `man`, `sun`). | Premium |
| **Stage 6** | **Writing Basics / Rubutun Kalmomi** | Letter formation, writing personal names, filling basic forms, spelling 3-to-4 letter words. | Premium |
| **Stage 7** | **Functional English / Turancin Asibiti Da Hanyoyi** | Healthcare & pharmacy dialogues, reporting symptoms, public transport navigation (bus/train/taxi). | Premium |
| **Stage 8** | **Workplace English / Turancin Sana'a Da Kasuwanci** | Customer relations, trades (carpentry, tailoring, trading), job interviews, professional phone etiquette. | Premium |
| **Stage 9** | **English Thinking / Sauya Harshe Cikin Sauki** | Thinking without translation, common English idioms, storytelling, interpreting radio and TV news. | Premium |
| **Stage 10** | **Fluency Mastery / Kwarewa Da Jagoranci** | Public speaking, formal speeches, business negotiations, advanced debate and leadership communication. | Premium |

---

## 8. User Interface Modules & Roles

### 8.1. Student Perspective
- **Learning Roadmap**: Accordion-based stage navigation with completion progress bars and status indicators (Free, Locked, In Progress, Completed).
- **Interactive Lesson Practice Modal**:
  - *Vocabulary Cards*: High-contrast illustrations, IPA, slow sound breakdown, common mistake alerts, and articulatory tips.
  - *Listen & Repeat*: Chime-guided pronunciation training.
  - *Oral Evaluation*: Microphone recording with AI scoring (Accuracy, Pronunciation, Fluency) and Hausa coaching tips.
  - *Interactive Quiz*: Instant auditory feedback with spoken Hausa question narration.
- **Ustaz Nur AI Chat**: 24/7 bilingual companion with instant speech playback, syllable guides, and pronunciation practice.
- **Zero-Literacy Accessibility Mode**: Full voice guidance where hovering or tapping any icon triggers immediate Hausa audio explanation.

### 8.2. Parent Dashboard (`ParentDashboard.tsx`)
- **Child Progress Monitoring**: Real-time overview of current stage, lessons completed, and daily study streaks.
- **Mastered Vocabulary Bank**: Filterable list of words learned with play buttons for parent review.
- **Weekly Activity Chart**: Visual breakdown of minutes spent learning per day.
- **Encouragement Engine**: Allows parents to send pre-formatted Hausa voice audio cheers to their child.

### 8.3. Admin CMS & Analytics Dashboard (`AdminDashboard.tsx`)
- **Executive Analytics**: DAU, MAU, retention rates, completion rates, and historical monthly revenue graphs.
- **Curriculum CMS**: Visual editor to create, edit, delete, and reorder lessons, vocabulary entries, and quiz questions across all 11 stages.
- **User Management**: Searchable user table displaying learner status, role assignments, and subscription status.

### 8.4. Certificate Generation Center (`CertificateCenter.tsx`)
- **Dynamic Verification**: Validates whether the student has completed required stage milestones.
- **Printable Diplomas**: Generates downloadable, formatted PDF-style diplomas featuring student name, stage title, verification code, and instructor signature.

### 8.5. Monetization & Payment Gateways (`CheckoutPortal.tsx`)
- **Pricing Plans**:
  - *Monthly Access*: ₦1,500 / month
  - *Quarterly Bundle (Most Popular)*: ₦3,800 / 3 months
  - *Lifetime Mastery*: ₦9,500 one-time
- **Supported Payment Channels**:
  - Paystack (Debit card, Bank account)
  - Flutterwave
  - USSD Quick Code (`*737#`, `*894#`, `*966#`, `*919#`)
  - Direct Bank Transfer (Instant automated account generation)

---

## 9. Environment Configuration & Deployment

### 9.1. Environment Variables (`.env.example`)

```env
# Google Gemini API Secret Key (Server-Side Only)
GEMINI_API_KEY=
```

### 9.2. Scripts in `package.json`

```json
{
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs",
    "lint": "tsc --noEmit"
  }
}
```

### 9.3. Production Deployment Notes
1. The Express server binds to host `0.0.0.0` and port `3000`.
2. In development mode, Vite runs as middleware directly inside Express.
3. In production mode, `npm run build` compiles frontend assets to `dist/` and bundles `server.ts` into a self-contained CommonJS artifact at `dist/server.cjs`.

---

*Nur al-Ilm (نور العلم) — Empowering Hausa Communities Worldwide with the Light of English Knowledge.*
