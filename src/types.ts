/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum LearningLevel {
  STAGE_0 = 'STAGE_0', // Orientation (Before English)
  STAGE_1 = 'STAGE_1', // Listening Awareness
  STAGE_2 = 'STAGE_2', // First Spoken Words
  STAGE_3 = 'STAGE_3', // Survival English
  STAGE_4 = 'STAGE_4', // Everyday Conversations
  STAGE_5 = 'STAGE_5', // Reading Introduction
  STAGE_6 = 'STAGE_6', // Writing Basics
  STAGE_7 = 'STAGE_7', // Functional English
  STAGE_8 = 'STAGE_8', // Workplace English
  STAGE_9 = 'STAGE_9', // English Thinking
  STAGE_10 = 'STAGE_10', // Fluency Mastery
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
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  questionAudioText: string; // spoken in Hausa/English
  options: string[];
  correctOptionIndex: number;
  explanation: string;
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
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[]; // lessonIds
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
  unlockedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'ustaz';
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
