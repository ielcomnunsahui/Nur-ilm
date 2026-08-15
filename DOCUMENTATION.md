# Nur al-Ilm: Comprehensive Architecture & Pedagogical Documentation

---

## 1. Executive Summary & Vision

**Nur al-Ilm** ("Light of Knowledge" / "Hasken Ilimi") is a culturally rooted, voice-first English language learning system engineered specifically for native Hausa speakers.

### Target Demographics & Core Realities
* **Primary Language**: Native Hausa speakers (Northern Nigeria, Niger, and the broader diaspora).
* **Literacy Baseline**: Many learners have zero or emerging written literacy in both English and Latin-script Hausa, but possess rich oral linguistic competence and traditional auditory memory traditions (memorization, repetition, oral storytelling).
* **Hardware & Connectivity**: Predominantly low-to-mid tier Android devices operating under intermittent cellular data connections, metered power, and offline conditions.
* **Core Philosophy**: Language acquisition must **NOT** be treated as textbook grammar rules. It must mimic natural human mother-tongue acquisition:
  $$\text{HEAR} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{REPEAT} \longrightarrow \text{SPEAK} \longrightarrow \text{RECOGNIZE} \longrightarrow \text{READ} \longrightarrow \text{WRITE} \longrightarrow \text{THINK IN ENGLISH} \longrightarrow \text{FLUENCY}$$

---

## 2. Pedagogical Architecture

### 2.1 The 9-Stage Natural Acquisition Path

```
 Stage 0: Sautin Haruffa (Phonetics & English Sounds: A to Z complete audio immersion)
   │
 Stage 1: Gaisuwa & Sunaye (Greetings, Family & Survival Identity)
   │
 Stage 2: Kasuwanci & Kudi (Marketplace, Currency, Bargaining & Numbers)
   │
 Stage 3: Lafiya & Asibiti (Health, Clinic, Pharmacy & Body Emergencies)
   │
 Stage 4: Balaguro & Hanyoyi (Travel, Transport, Directions & Police/Checkpoints)
   │
 Stage 5: Aiki & Sadarwa (Workplace, Banking, Official Documents & Digital Fluency)
```

### 2.2 Five-Phase Micro-Lesson Cycle
Each micro-lesson is limited to **5–7 minutes** to respect cognitive load and battery conservation:

1. **Phase 1: Warm-up & Auditory Priming (Saurari / Listen First)**
   * Learner hears native sound and intonation before seeing text.
   * Prevents visual reading anxiety.
2. **Phase 2: Meaning & Cultural Bridging (Ma'ana / Understand)**
   * Hausa explanation connecting the English term to lived cultural concepts (e.g., market negotiation, hospital visit, greeting elders).
   * Contextual notes addressing common Hausa phonetic interference (e.g., `P` vs `F`, `V` vs `B`, `TH` vs `S/Z`).
3. **Phase 3: Visual & Audio Recognition (Gani / Recognize)**
   * Association with visual illustrations and icons without relying solely on orthography.
4. **Phase 4: Multi-Speed Repetition (Maimaita / Repeat)**
   * Guided 3-speed repetition: Slow tempo (0.7x), Normal conversation tempo (1.0x), and Natural rapid flow (1.1x).
5. **Phase 5: Spoken Production & AI Pronunciation Feedback (Magana / Speak)**
   * Browser-integrated speech recognition and server-side Gemini Multi-dimensional pronunciation grading:
     * **Accuracy Score (0-100)**
     * **Pronunciation Clarity (0-100)**
     * **Fluency Flow (0-100)**
     * **Culturally respectful Hausa coaching advice**

---

## 3. Multi-Persona Voice System

To train auditory flexibility and prepare students for real-world interactions with varied speakers, Nur al-Ilm incorporates multiple pedagogical personas:

| Persona ID | Name | Role & Persona Specialty | Voice Characteristics |
| :--- | :--- | :--- | :--- |
| `ustaz` | **Ustaz Nur** | Chief Mentor, Warm & Patient | Deep, slow pace (0.85x), gentle pitch, high empathy |
| `amina` | **Malama Amina** | Articulation & Clinic Specialist | Clear female voice, measured pace (0.9x), crisp enunciation |
| `musa` | **Musa Dan Kasuwa** | Market Trader & Commerce Coach | Energetic male, rapid real-world flow (1.05x), lively intonation |
| `ibrahim` | **Dr. Ibrahim** | Medical Professional | Authoritative, calm, reassuring tone for health contexts |
| `hafsat` | **Hajiya Hafsat** | Community Elder & Encourager | Warm maternal tone, ultra-patient, high praise |

---

## 4. Technical Architecture & Data Schema

### 4.1 Technology Stack
* **Frontend**: React 18+, TypeScript, Tailwind CSS, Motion (Framer Motion)
* **Audio Engine**: Web Audio API Synthesizer (Zero-Latency FX) + Web Speech Synthesis + Server-Side Streaming Proxy (`/api/tts/hausa`)
* **AI Engine**: Google Gemini API (`gemini-2.5-flash`) via secure Express backend
* **Speech Recognition**: Browser SpeechRecognition API with Hausa (`ha-NG`) & English (`en-US`) dynamic locale switching
* **Offline Storage**: IndexedDB / Local Storage cache with downloadable lesson packages

### 4.2 Core Data Interfaces & Schemas

#### A. UserProgress Schema
```typescript
interface UserProgress {
  userId: string;
  name: string;
  role: 'student' | 'parent';
  level: LearningLevel;
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  lessonProgress: Record<string, number>; // lessonId -> percentage (0-100)
  unlockedLevels: LearningLevel[];
  badges: string[];
  zeroLiteracyMode: boolean; // Voice-guided auto-speak mode
  isPremium: boolean;
  dailyGoalMinutes: number;
  weeklyActivity: { day: string; minutes: number }[];
  parentPin?: string;
  parentPhone?: string;
}
```

#### B. Lesson Schema
```typescript
interface Lesson {
  id: string;
  level: LearningLevel;
  title: string;
  titleHausa: string;
  description: string;
  descriptionHausa: string;
  points: number;
  estimatedMinutes: number;
  vocabulary: VocabItem[];
  dialogue?: DialogueLine[];
  quiz: QuizQuestion[];
  culturalNote?: string;
  homework?: string;
  aiTutorScript?: {
    introduction: string;
    practiceTip: string;
    congratulations: string;
  };
}
```

#### C. VocabItem Schema
```typescript
interface VocabItem {
  id: string;
  english: string;
  hausa: string;
  pronunciationHint: string; // Phonetic spelling for Hausa speakers (e.g., "Gud mor-nin")
  audioSlowUrl?: string;
  audioNormalUrl?: string;
  imageUrl?: string;
  exampleSentence?: string;
  exampleSentenceHausa?: string;
  commonHausaMistake?: string; // e.g. "Hausa speakers often substitute F for P"
}
```

#### D. VoicePersona & RealWorldMission Schema
```typescript
interface VoicePersona {
  id: string;
  name: string;
  roleHausa: string;
  roleEnglish: string;
  avatarUrl: string;
  speakingRate: number;
  pitch: number;
  voiceGender: 'male' | 'female';
  accent: string;
  systemPromptModifier: string;
}

interface RealWorldMission {
  id: string;
  title: string;
  titleHausa: string;
  descriptionHausa: string;
  targetLevel: LearningLevel;
  personaId: string;
  scenarioContext: {
    location: string;
    goalHausa: string;
    targetPhrases: string[];
  };
  xpReward: number;
}
```

---

## 5. API Endpoints

### 5.1 `POST /api/gemini/tutor`
* **Purpose**: Conversational AI tutoring tailored to the selected persona and learner literacy level.
* **Payload**:
  ```json
  {
    "messages": [{ "sender": "student", "text": "Ina son koyon gaisuwa" }],
    "userProfile": { "zeroLiteracyMode": true, "level": "STAGE_1_GREETINGS" },
    "personaId": "amina"
  }
  ```
* **Response**:
  ```json
  {
    "result": {
      "text": "Madalla! Idan zaki gaishe da mutum da safe a asibiti, sai kice: 'Good morning'.",
      "hausaExplanation": "Good morning na nufin Ina kwana / Barka da asuba.",
      "englishTarget": "Good morning",
      "pronunciationHint": "Gud mor-nin"
    }
  }
  ```

### 5.2 `POST /api/gemini/pronunciation`
* **Purpose**: Multi-metric speech assessment comparing student speech against target phrases.
* **Payload**:
  ```json
  {
    "targetPhrase": "Good morning, Doctor",
    "studentAudioText": "Gud mornin Dokto"
  }
  ```
* **Response**:
  ```json
  {
    "result": {
      "accuracy": 92,
      "pronunciation": 88,
      "fluency": 90,
      "coachingTip": "Madalla! Ka kusa kwarewa sosai. Fadi kalmar 'Doctor' a bayyane."
    }
  }
  ```

### 5.3 `GET /api/tts/hausa?text=...`
* **Purpose**: High-fidelity Google Translate TTS audio streaming proxy for authentic Hausa dialect pronunciation.

---

## 6. Offline & Accessibility Features

1. **Zero-Literacy Floating Voice Guide**:
   * One-touch voice narration reads every screen, button, and instruction in native Hausa.
2. **Audio-First Feedback**:
   * Synthesized chime, success chords, and error feedback for instant tactile learning reinforcement without visual clutter.
3. **One-Tap Offline Download**:
   * Complete micro-lesson packages (audio scripts, vocab, quiz logic) can be saved to device storage for learning in zero-connectivity areas.
4. **PWA Standalone App**:
   * Installable directly on Android home screen with minimal storage footprint (< 5MB).
