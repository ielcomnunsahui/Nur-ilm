# Nur al-Ilm: Platform Architecture, Schema & Technical Documentation

**Nur al-Ilm** (*The Light of Knowledge*) is an offline-first, voice-first, AI-assisted Progressive Web Application (PWA) designed to teach English to native Hausa speakers, with specialized methodology tailored for zero-literacy and low-literacy adult and youth learners.

---

## 1. Core Architecture & Design Philosophy

### 1.1 Zero-Literacy Pedagogy ("Ear Before Eye")
- **Auditory-First Learning Loop**: Lessons follow the strict 5-stage progression:
  1. **HEAR (Saurari)**: Pure acoustic exposure without reading or visual text interference.
  2. **UNDERSTAND (Fahimta)**: Semantic anchoring in spoken Hausa with culturally specific common error warnings and tips.
  3. **RECOGNIZE (Gani)**: Visual object association connecting auditory memory to real-world iconography.
  4. **REPEAT (Maimaita)**: Stepwise repetition with regular and slowed-down pacing.
  5. **SPEAK (Magana)**: Microphone activation with Gemini-powered phoneme and pronunciation evaluation.
- **Voice-Only Mode**: A dedicated UI toggle in settings and lesson views that removes on-screen text during exercises, compelling the learner to rely solely on auditory processing and listening comprehension.
- **Adaptive Voice Personas**: Tailored AI tutor voices designed for distinct domains:
  - **Ustaz Nur**: Founder & Head Teacher (Patient, foundational, encouraging).
  - **Malama Amina**: Market & Healthcare Specialist (Warm, community-focused).
  - **Malam Musa**: Business, Trade & Transactions (Fast-paced, commerce-focused).
  - **Dr. Ibrahim**: Health & Hospital Terminology (Precise, reassuring).
  - **Brother Bello**: Technology, Transport & Trades (Modern, energetic).
  - **Sister Sarah**: International English Specialist (Clear, standard global articulation).
  - **Sister Hafsat**: Family & Community Life (Gentle, supportive).

### 1.2 Full-Stack & Offline Capabilities
- **Client Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Motion Animations.
- **Server Backend**: Express.js server running in Node.js, providing secure server-side Gemini API endpoints for speech pronunciation analysis, conversational AI tutoring, and parental report generation.
- **IndexedDB & Local Storage**: Full offline caching of lesson plans, audio assets, voice models, user progress, and completion states.

---

## 2. Database Schema & Data Models

### 2.1 Learning Level Progression (`LearningLevel`)
```typescript
export enum LearningLevel {
  STAGE_0 = 'STAGE_0',   // Orientation: Confidence & Vocal Awakening (Tabbacin Zuciya Da Bude Murya)
  STAGE_1 = 'STAGE_1',   // Listening Awareness: Ear Training & Polite Greetings (Saurare Da Gaisuwar Girma)
  STAGE_2 = 'STAGE_2',   // Survival Needs & Food (Neman Abinci Da Bukatun Rayuwa)
  STAGE_3 = 'STAGE_3',   // Family, Home & Identity (Iyali, Gida Da Gabatar Da Kai)
  STAGE_4 = 'STAGE_4',   // Market, Money & Transportation (Kasuwa, Kudi Da Hanyoyin Tafiya)
  STAGE_5 = 'STAGE_5',   // Socializing & Directions (Hira Cikin Jama'a Da Neman Hanya)
  STAGE_6 = 'STAGE_6',   // Environmental Phonics & Reading A-Z (Fara Karatun Rubutu Da Alamomi)
  STAGE_7 = 'STAGE_7',   // Healthcare, Clinic & Emergencies (Turancin Asibiti Da Neman Agaji)
  STAGE_8 = 'STAGE_8',   // Workplace, Trades & Commerce (Turancin Sana'a, Aiki Da Kasuwanci)
  STAGE_9 = 'STAGE_9',   // Thinking in English & Storytelling (Sauya Harshe Da Ba Da Labari)
  STAGE_10 = 'STAGE_10', // Leadership, Debates & Public Voice (Kwarewa, Jagoranci Da Jawabi)
}
```

### 2.2 Voice Persona (`VoicePersona`)
| Property | Type | Description |
|---|---|---|
| `id` | `VoicePersonaId` | Unique persona identifier (`'ustaz' \| 'amina' \| 'musa' \| 'ibrahim' \| 'bello' \| 'hafsat' \| 'sarah'`) |
| `name` | `string` | Display name of the tutor |
| `role` | `string` | English functional role |
| `roleHausa` | `string` | Hausa cultural and functional role description |
| `avatarUrl` | `string` | Avatar image or emoji identifier |
| `bioHausa` | `string` | In-depth background story in Hausa |
| `voiceGender` | `'male' \| 'female'` | Synthesis vocal gender |
| `speakingRate` | `number` | Synthesis speed rate modifier (0.80 to 1.15) |
| `pitch` | `number` | Voice synthesis pitch modifier (0.85 to 1.25) |

### 2.3 Articulatory Technique (`ArticulatoryTip`)
| Property | Type | Description |
|---|---|---|
| `techniqueName` | `string` | Tactical name (e.g., "The Candle Test", "Tongue Bite", "Glue Technique", "Vibration Check") |
| `techniqueHausa` | `string` | Hausa instructional name |
| `steps` | `string[]` | English step-by-step physical motor guidance |
| `stepsHausa` | `string[]` | Hausa step-by-step physical motor guidance |
| `soundTarget` | `string` | Target phoneme contrast (e.g., "P vs F", "TH /θ/", "S-Clusters") |

### 2.4 Vocabulary Word (`VocabularyWord`)
| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g., `'v-greet-1'`) |
| `english` | `string` | Target English word or phrase |
| `hausa` | `string` | Direct Hausa translation |
| `pronunciationHint` | `string` | Phonics breakdown for learners |
| `hausaHint` | `string` | Contextual mnemonic sentence in Hausa |
| `imageUrl` | `string` | Icon or custom vector visual ID |
| `category` | `string` | Domain category (e.g., `'greetings'`, `'market'`) |
| `ipa` | `string?` | International Phonetic Alphabet notation |
| `syllableBreakdown` | `string?` | Hyphenated syllable breakdown |
| `slowPronunciation` | `string?` | Elongated phoneme guide for slow mode |
| `commonHausaMistake` | `string?` | Common L1 transfer error (e.g., "bellow" for "hello") |
| `correctionTip` | `string?` | Practical phonetic correction advice |
| `articulatoryTip` | `ArticulatoryTip?` | Physical articulatory guide |

### 2.5 Quiz Question (`QuizQuestion`)
| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique question ID |
| `questionText` | `string` | Primary question prompt |
| `questionAudioText` | `string` | Spoken auditory script read automatically to illiterate users |
| `options` | `string[]` | Array of response options |
| `optionImages` | `string[]?` | Visual icons corresponding to each option |
| `optionAudios` | `string[]?` | Direct audio prompts for each option |
| `correctOptionIndex` | `number` | Zero-based index of correct option |
| `explanation` | `string` | Spoken/written feedback and cultural explanation |
| `type` | `'sound_to_image' \| 'voice_reply' \| 'error_detect' \| 'multiple_choice'?` | Question mechanics type |

### 2.6 Real-World Mission (`RealWorldMission`)
| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique mission ID |
| `title` | `string` | English title |
| `titleHausa` | `string` | Hausa task name |
| `instruction` | `string` | English task details |
| `instructionHausa` | `string` | Hausa practical task steps in community/market |
| `verificationType` | `'voice_report' \| 'roleplay' \| 'self_check'` | Verification method |
| `rewardXp` | `number` | Experience points awarded on completion |
| `rewardCoins` | `number` | Lada coins awarded |
| `completed` | `boolean?` | Completion status |

### 2.7 Lesson (`Lesson`)
| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique lesson ID |
| `level` | `LearningLevel` | Target pedagogical stage |
| `title` | `string` | English lesson title |
| `titleHausa` | `string` | Hausa lesson title |
| `description` | `string` | English description |
| `descriptionHausa` | `string` | Hausa description |
| `points` | `number` | Base completion XP points |
| `vocabulary` | `VocabularyWord[]` | Array of vocabulary items |
| `quiz` | `QuizQuestion[]` | Interactive assessment questions |
| `primaryPersona` | `VoicePersonaId?` | Default voice tutor persona |
| `realWorldMission` | `RealWorldMission?` | Practical real-world field mission |
| `warmUpAudioText` | `string?` | Introductory breathing and voice warm-up script |
| `learningObjective` | `string?` | Pedagogical goal of the lesson |
| `hausaExplanation` | `string?` | Cultural context in Hausa |
| `englishExplanation` | `string?` | English context |
| `pronunciationGuide` | `string?` | Specific phonetic focus (e.g. /p/ vs /f/) |
| `aiTutorScript` | `object?` | Spoken scripts for introduction, encouragement, correction, achievements, and motivation |
| `conversationPractice` | `string?` | Roleplay dialogue script |
| `homework` | `string?` | Real-life conversational assignment |
| `masteryCriteria` | `string?` | Metric required to pass the unit |
| `estimatedDuration` | `string?` | Estimated completion time |
| `difficultyRating` | `string?` | Difficulty level (e.g., "Beginner Sifiri") |

### 2.8 User Progress & State (`UserProgress`)
| Property | Type | Description |
|---|---|---|
| `xp` | `number` | Cumulative experience points |
| `coins` | `number` | Lada (coins) earned for rewards |
| `streak` | `number` | Consecutive days of study |
| `streakFreezes` | `number` | Forgiveness tokens preventing streak loss on missed days |
| `lastActiveDate` | `string` | ISO Date string (`YYYY-MM-DD`) |
| `completedLessons` | `string[]` | Array of completed lesson IDs |
| `completedMissions` | `string[]` | Array of completed real-world mission IDs |
| `lessonProgress` | `Record<string, number>?` | Map of lesson ID to percentage completed (0-100) |
| `unlockedLevels` | `LearningLevel[]` | Array of accessible stages |
| `badges` | `string[]` | Array of unlocked achievement badge IDs |
| `isPremium` | `boolean` | Subscription/unlocked status |
| `name` | `string` | Learner's preferred name |
| `role` | `'student' \| 'parent' \| 'admin'` | Active user role |
| `zeroLiteracyMode` | `boolean` | Enables high-contrast icons and audio autoplay |
| `voiceOnlyMode` | `boolean` | Hides text displays in lessons for pure auditory processing |
| `preferredVoicePersona` | `VoicePersonaId?` | Active selected AI voice tutor |

### 2.9 Chat Message (`ChatMessage`)
| Property | Type | Description |
|---|---|---|
| `id` | `string` | Message identifier |
| `sender` | `'student' \| 'ustaz'` | Message originator |
| `personaId` | `VoicePersonaId?` | Tutor persona associated with the message |
| `text` | `string` | English or Hausa text transcript |
| `translation` | `string?` | Spoken Hausa translation |
| `audioBase64` | `string?` | Audio blob or URI for playback |
| `timestamp` | `string` | ISO timestamp |
| `pronunciationScore` | `object?` | Scores for `accuracy` (0-100), `pronunciation` (0-100), and `fluency` (0-100) |

---

## 3. Server Endpoints & API Specifications

All endpoints run on the custom Express server (`server.ts`) listening on port 3000.

### 3.1 `POST /api/gemini/pronunciation`
Evaluates user speech transcript against the target English phrase.
- **Request Body**:
  ```json
  {
    "studentSpeech": "Hellow, gud morning",
    "targetPhrase": "Hello, good morning"
  }
  ```
- **Response**:
  ```json
  {
    "result": {
      "accuracy": 88,
      "pronunciation": 85,
      "fluency": 90,
      "phonemeFeedback": "Lafazin 'Hello' yayi kyau sosai.",
      "coachingTip": "Kada a matsa 'H' sosai, a fada cikin sanyi."
    }
  }
  ```

### 3.2 `POST /api/gemini/chat`
Provides conversational responses from the active Voice Persona in bilingual English/Hausa.
- **Request Body**:
  ```json
  {
    "message": "Ina son koyon gaisuwa a kasuwa",
    "persona": "amina",
    "userLevel": "STAGE_1"
  }
  ```
- **Response**:
  ```json
  {
    "response": "Hello! Welcome to the market. A kasuwa, zaka iya cewa: 'How much is this?'",
    "hausaTranslation": "Sannu! Barka da zuwa kasuwa. Ana cewa: 'Nawa ne wannan?'",
    "suggestedReply": "How much is this?"
  }
  ```

### 3.3 `POST /api/gemini/parent-report`
Generates an auditory summary in spoken Hausa for parents and sponsors detailing the student's learning progress.
- **Request Body**:
  ```json
  {
    "studentName": "Aliyu",
    "xp": 450,
    "completedCount": 6,
    "streak": 5,
    "currentLevel": "STAGE_1"
  }
  ```
- **Response**:
  ```json
  {
    "reportHausa": "Masha Allah! Aliyu ya yi kokari sosai a wannan makon. Ya kammala darussa 6 kuma yana da maki 450.",
    "recommendations": "A karfafa masa gwiwa ya cigaba da sauraron muryar Ustaz kowace rana."
  }
  ```

---

## 4. Key UI Features & Components

1. **Lesson Practice Module (`LessonPractice.tsx`)**:
   - 6-step interactive workflow (Intro → 5-stage drill → Roleplay dialogue → Reinforcement matching → Auditory quiz → Rewards).
   - Dynamic avatar expressions (`smiling`, `speaking`, `explaining`, `listening`, `cheering`).
   - "Voice-Only" mode toggle with persistent state and persona voice synthesis options.
   - Built-in phonetic tips (e.g., "The Candle Test" for /p/ vs /f/).
2. **Interactive AI Tutor Chat (`AITutorChat.tsx`)**:
   - Real-time speech recognition and text-to-speech with persona configuration.
   - Instant pronunciation scoring and bilingual feedback.
3. **Voice Settings & Persona Selection**:
   - Full selector for all 7 Voice Personas with personalized audio preview samples.
   - Zero-Literacy and Voice-Only mode switches.
4. **Parental Audio Dashboard**:
   - Voice-based progress reports and WhatsApp shareable certificates for non-literate parents.
5. **Real-World Missions (`MissionsView.tsx`)**:
   - Community-based language challenges (e.g., ordering water in English at a local kiosk).
