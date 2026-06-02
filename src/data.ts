/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningLevel, Lesson, Badge } from './types';
import curriculumData from './curriculum.json';

export const BADGES: Badge[] = [
  {
    id: 'first_word',
    title: 'First Word Mastery',
    titleHausa: 'Kwarewa a Kalmar Farko',
    description: 'You completed your very first English vocabulary repeat exercise!',
    descriptionHausa: 'Ka kammala maimaita kalmar Turanci ta farko!',
    icon: 'Sparkles',
  },
  {
    id: 'streak_3',
    title: '3-Day Fire',
    titleHausa: 'Wutar Kwana Uku',
    description: 'Maintained a active learning streak for 3 consecutive days.',
    descriptionHausa: 'Ka ci gaba da koyo na tsawon kwanaki uku a jere.',
    icon: 'Flame',
  },
  {
    id: 'chat_expert',
    title: 'Ustaz Nur Companion',
    titleHausa: 'Abokin Ustaz Nur',
    description: 'Initiated your first conversation practice session with Ustaz Nur.',
    descriptionHausa: 'Ka fara zaman tattaunawa na farko da Ustaz Nur.',
    icon: 'MessageSquareText',
  },
  {
    id: 'level_0_cert',
    title: 'Level 0 Graduate',
    titleHausa: 'Gwarzon Mataki na Farko',
    description: 'Mastered English basic sounds and nursery foundations.',
    descriptionHausa: 'Ka mallaki sautukan asali na yara a Turanci.',
    icon: 'Award',
  },
  {
    id: 'perfect_quiz',
    title: 'Flawless Mind',
    titleHausa: 'Zuciya marar Kuskure',
    description: 'Scored 100% on any lesson quiz on the first attempt.',
    descriptionHausa: 'Ka ci kashi 100% a jarrabawar darasi a karon farko.',
    icon: 'CheckCircle2',
  },
  {
    id: 'premium_scholar',
    title: 'Knowledge seeker',
    titleHausa: 'Mai Neman Ilmi',
    description: 'Unlocked premium learning resources for infinite conversational mastery.',
    descriptionHausa: 'Ka bude dukkan darussan Turanci don gogewa ta gari.',
    icon: 'Crown',
  }
];

// Map curriculumData to unified Lesson representation
const mappedLessons: Lesson[] = [];

curriculumData.forEach((lvl: any) => {
  const currentLevel = lvl.level as LearningLevel;
  lvl.modules.forEach((mod: any) => {
    mod.lessons.forEach((les: any) => {
      mappedLessons.push({
        id: `curr_${lvl.level}_${mod.id}_${les.lessonNumber}`,
        level: currentLevel,
        title: les.title,
        titleHausa: les.title, // Highly descriptive, context-friendly mixed titles
        description: les.englishExplanation || les.learningObjective || '',
        descriptionHausa: les.hausaExplanation || '',
        points: 100 + (les.lessonNumber * 20),
        
        // Rich teaching guidelines properties
        learningObjective: les.learningObjective,
        hausaExplanation: les.hausaExplanation,
        englishExplanation: les.englishExplanation,
        pronunciationGuide: les.pronunciationGuide,
        aiTutorScript: {
          introduction: les.aiTutorScript?.introduction || '',
          encouragement: les.aiTutorScript?.encouragement || '',
          corrections: les.aiTutorScript?.corrections || '',
          achievements: les.aiTutorScript?.achievements || '',
          motivation: les.aiTutorScript?.motivation || ''
        },
        listeningExercise: les.listeningExercise,
        repeatAfterMeExercise: les.repeatAfterMeExercise,
        speakingPractice: les.speakingPractice,
        conversationPractice: les.conversationPractice,
        visualLearningSuggestions: les.visualLearningSuggestions,
        assessment: les.assessment,
        homework: les.homework,
        masteryCriteria: les.masteryCriteria,
        estimatedDuration: les.estimatedDuration,
        difficultyRating: les.difficultyRating,
        
        vocabulary: les.vocabulary.map((v: any, vidx: number) => {
          let imageUrl = 'fallback';
          const textLower = v.word.toLowerCase();
          if (textLower.includes('hello')) imageUrl = 'hello';
          else if (textLower.includes('apple')) imageUrl = 'apple';
          else if (textLower.includes('ball')) imageUrl = 'ball';
          else if (textLower.includes('cat')) imageUrl = 'cat';
          else if (textLower.includes('dog')) imageUrl = 'dog';
          else if (textLower.includes('cow')) imageUrl = 'cow';
          else if (textLower.includes('goat')) imageUrl = 'goat';
          else if (textLower.includes('sheep')) imageUrl = 'sheep';
          else if (textLower.includes('daddy')) imageUrl = 'daddy';
          else if (textLower.includes('mommy')) imageUrl = 'mommy';
          else if (textLower.includes('baby')) imageUrl = 'baby';
          else if (textLower.includes('eye')) imageUrl = 'eye';
          else if (textLower.includes('nose')) imageUrl = 'nose';
          else if (textLower.includes('mouth')) imageUrl = 'mouth';
          else if (textLower.includes('one') || textLower === '1') imageUrl = 'num_1';
          else if (textLower.includes('two') || textLower === '2') imageUrl = 'num_2';
          else if (textLower.includes('three') || textLower === '3') imageUrl = 'num_3';
          else if (textLower.includes('red')) imageUrl = 'color_red';
          else if (textLower.includes('blue')) imageUrl = 'color_blue';
          else if (textLower.includes('yellow')) imageUrl = 'color_yellow';
          else if (textLower.includes('please')) imageUrl = 'please';

          return {
            id: `v_curr_${lvl.level}_${mod.id}_${les.lessonNumber}_${vidx}`,
            english: v.word,
            hausa: v.hausa,
            pronunciationHint: v.slowPronunciation || v.syllableBreakdown || v.word,
            hausaHint: v.correctionTip || `Ku fadi: ${v.word}`,
            imageUrl,
            category: mod.title,
            ipa: v.ipa,
            syllableBreakdown: v.syllableBreakdown,
            slowPronunciation: v.slowPronunciation,
            commonHausaMistake: v.commonHausaMistake,
            correctionTip: v.correctionTip
          };
        }),
        
        quiz: les.quiz.map((q: any, qidx: number) => ({
          id: `q_curr_${lvl.level}_${mod.id}_${les.lessonNumber}_${qidx}`,
          questionText: q.question,
          questionAudioText: q.hausaQuestion || q.question,
          options: q.options,
          correctOptionIndex: q.answerIndex,
          explanation: q.explanation
        }))
      });
    });
  });
});

export const LESSONS: Lesson[] = mappedLessons;
