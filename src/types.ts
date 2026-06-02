/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum LearningLevel {
  LEVEL_0 = 'LEVEL_0', // No English Knowledge
  LEVEL_1 = 'LEVEL_1', // First Words
  LEVEL_2 = 'LEVEL_2', // Basic Sentences
  LEVEL_3 = 'LEVEL_3', // Everyday Conversations
  LEVEL_4 = 'LEVEL_4', // Reading & Writing
  LEVEL_5 = 'LEVEL_5', // Fluent Communication
}

export interface VocabularyWord {
  id: string;
  english: string;
  hausa: string;
  pronunciationHint: string; // e.g., "Wa-ter"
  hausaHint: string; // e.g., "Ina son ruwa"
  imageUrl: string;
  category: string;
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
}

export interface UserProgress {
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[]; // lessonIds
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
