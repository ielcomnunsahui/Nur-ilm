/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum LearningLevel {
  STAGE_0 = 'STAGE_0', // Orientation: Confidence & Vocal Awakening (Tabbacin Zuciya Da Bude Murya)
  STAGE_1 = 'STAGE_1', // Listening Awareness: Ear Training & Polite Greetings (Saurare Da Gaisuwar Girma)
  STAGE_2 = 'STAGE_2', // Survival Needs & Food (Neman Abinci Da Bukatun Rayuwa)
  STAGE_3 = 'STAGE_3', // Family, Home & Identity (Iyali, Gida Da Gabatar Da Kai)
  STAGE_4 = 'STAGE_4', // Market, Money & Transportation (Kasuwa, Kudi Da Hanyoyin Tafiya)
  STAGE_5 = 'STAGE_5', // Socializing & Directions (Hira Cikin Jama'a Da Neman Hanya)
  STAGE_6 = 'STAGE_6', // Environmental Phonics & Reading A-Z (Fara Karatun Rubutu Da Alamomi)
  STAGE_7 = 'STAGE_7', // Healthcare, Clinic & Emergencies (Turancin Asibiti Da Neman Agaji)
  STAGE_8 = 'STAGE_8', // Workplace, Trades & Commerce (Turancin Sana'a, Aiki Da Kasuwanci)
  STAGE_9 = 'STAGE_9', // Thinking in English & Storytelling (Sauya Harshe Da Ba Da Labari)
  STAGE_10 = 'STAGE_10', // Leadership, Debates & Public Voice (Kwarewa, Jagoranci Da Jawabi)
}

export type VoicePersonaId = 'ustaz' | 'amina' | 'musa' | 'ibrahim' | 'bello' | 'hafsat' | 'sarah';

export interface VoicePersona {
  id: VoicePersonaId;
  name: string;
  role: string;
  roleHausa: string;
  avatarUrl: string;
  bioHausa: string;
  voiceGender: 'male' | 'female';
  speakingRate: number; // 0.8 to 1.2
  pitch: number;
}

export interface RealWorldMission {
  id: string;
  title: string;
  titleHausa: string;
  instruction: string;
  instructionHausa: string;
  verificationType: 'voice_report' | 'roleplay' | 'self_check';
  rewardXp: number;
  rewardCoins: number;
  completed?: boolean;
}

export interface ArticulatoryTip {
  techniqueName: string; // e.g. "The Candle Test", "Tongue Bite", "Glue Technique", "Vibration Check"
  techniqueHausa: string;
  steps: string[];
  stepsHausa: string[];
  soundTarget: string; // e.g. "P vs F", "TH /θ/", "S-Clusters"
}

export interface VocabularyWord {
  id: string;
  english: string;
  hausa: string;
  pronunciationHint: string; // e.g., "Wa-ter"
  hausaHint: string; // e.g., "Ina son ruwa"
  imageUrl: string;
  category: string;
  ipa?: string;
  syllableBreakdown?: string;
  slowPronunciation?: string;
  commonHausaMistake?: string;
  correctionTip?: string;
  articulatoryTip?: ArticulatoryTip;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  questionAudioText: string; // spoken in Hausa/English
  options: string[];
  optionImages?: string[];
  optionAudios?: string[];
  correctOptionIndex: number;
  explanation: string;
  type?: 'sound_to_image' | 'voice_reply' | 'error_detect' | 'multiple_choice';
}

export interface Lesson {
  id: string;
  level: LearningLevel;
  title: string;
  titleHausa: string;
  description: string;
  descriptionHausa: string;
  audioUrl?: string;
  points: number;
  vocabulary: VocabularyWord[];
  quiz: QuizQuestion[];
  primaryPersona?: VoicePersonaId;
  realWorldMission?: RealWorldMission;
  warmUpAudioText?: string;
  learningObjective?: string;
  hausaExplanation?: string;
  englishExplanation?: string;
  pronunciationGuide?: string;
  aiTutorScript?: {
    introduction: string;
    encouragement: string;
    corrections: string;
    achievements: string;
    motivation: string;
  };
  listeningExercise?: string;
  repeatAfterMeExercise?: string;
  speakingPractice?: string;
  conversationPractice?: string;
  visualLearningSuggestions?: string;
  assessment?: string;
  homework?: string;
  masteryCriteria?: string;
  estimatedDuration?: string;
  difficultyRating?: string;
}

export interface UserProgress {
  xp: number;
  coins: number;
  streak: number;
  streakFreezes: number; // Forgiveness mechanic
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[]; // lessonIds
  completedMissions: string[]; // missionIds
  lessonProgress?: Record<string, number>; // lessonId -> percentage (0-100)
  unlockedLevels: LearningLevel[];
  badges: string[]; // badgeIds
  isPremium: boolean;
  name: string;
  role: 'student' | 'parent' | 'admin';
  zeroLiteracyMode: boolean;
}

export interface Badge {
  id: string;
  title: string;
  titleHausa: string;
  description: string;
  descriptionHausa: string;
  icon: string; // Lucide icon name
  audioCheerUrl?: string;
  unlockedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'ustaz';
  personaId?: VoicePersonaId;
  text: string;
  translation?: string;
  audioBase64?: string;
  timestamp: string;
  pronunciationScore?: {
    accuracy: number;
    pronunciation: number;
    fluency: number;
  };
}

export interface AnalyticsData {
  dau: number;
  mau: number;
  completionRate: number;
  revenue: number;
  retention: number;
  monthlyRevenueHistory: { month: string; amount: number }[];
  levelCompletionDistribution: { level: string; count: number }[];
}
