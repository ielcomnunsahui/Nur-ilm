/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningLevel, Lesson, Badge, VoicePersona, RealWorldMission } from './types';
import curriculumData from './curriculum.json';

export const VOICE_PERSONAS: VoicePersona[] = [
  {
    id: 'ustaz',
    name: 'Ustaz Nur',
    role: 'Elder Mentor & Cultural Anchor',
    roleHausa: 'Babban Jagora da Mai Nasiha',
    avatarUrl: 'ustaz',
    bioHausa: 'Mai koyarwa mai hakuri, yana bada misalai cikin girmamawa da Hausa mai dadi.',
    voiceGender: 'male',
    speakingRate: 0.9,
    pitch: 1.0,
  },
  {
    id: 'amina',
    name: 'Malama Amina',
    role: 'Patient Teacher & Clinic Nurse',
    roleHausa: 'Malama Mai Hakuri & Ma\'aikaciyar Lafiya',
    avatarUrl: 'amina',
    bioHausa: 'Muryarta a bayyane take, kwararriya wajen koyar da lafazi da Turancin asibiti.',
    voiceGender: 'female',
    speakingRate: 0.85,
    pitch: 1.1,
  },
  {
    id: 'musa',
    name: 'Musa the Trader',
    role: 'Kano Market Champion',
    roleHausa: 'Gwarzon Kasuwar Kurmi',
    avatarUrl: 'musa',
    bioHausa: 'Yana koya muku yadda ake ciniki, ragi, da kiran kudi cikin sauri da basira.',
    voiceGender: 'male',
    speakingRate: 1.05,
    pitch: 0.95,
  },
  {
    id: 'ibrahim',
    name: 'Dr. Ibrahim',
    role: 'Professional Physician',
    roleHausa: 'Likita Mai Bada Shawarwari',
    avatarUrl: 'ibrahim',
    bioHausa: 'Yana koya muku kalmomin asibiti, magunguna, da yadda ake bayyana ciwo.',
    voiceGender: 'male',
    speakingRate: 0.9,
    pitch: 0.9,
  },
  {
    id: 'hafsat',
    name: 'Hajiya Hafsat',
    role: 'Community Elder & Mother',
    roleHausa: 'Uwar Al\'umma Mai Nasiha',
    avatarUrl: 'hafsat',
    bioHausa: 'Kullum tana karfafa gwiwar mata da matasa su koyi Turanci don ci gaban rayuwa.',
    voiceGender: 'female',
    speakingRate: 0.9,
    pitch: 1.05,
  },
  {
    id: 'bello',
    name: 'Brother Bello',
    role: 'Tech & Transport Youth Guide',
    roleHausa: 'Matashin Jagoran Fasaha & Direba',
    avatarUrl: 'bello',
    bioHausa: 'Yana koya muku Turancin tafiye-tafiye, wayar salula, da tattaunawar matasa.',
    voiceGender: 'male',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  {
    id: 'sarah',
    name: 'Sister Sarah',
    role: 'International English Specialist',
    roleHausa: 'Kwararriyar Furuci ta Duniya',
    avatarUrl: 'sarah',
    bioHausa: 'Tana koya muku bayyanannen furucin Turanci na duniya cikin nutsuwa da hikima.',
    voiceGender: 'female',
    speakingRate: 0.88,
    pitch: 1.15,
  }
];

export const REAL_WORLD_MISSIONS: RealWorldMission[] = [
  {
    id: 'mission_greeting',
    title: 'The Golden Morning Greeting',
    titleHausa: 'Gaisuwar Zinariya ta Safe',
    instruction: 'Say "Good Morning" to three people or shopkeepers in your neighborhood today.',
    instructionHausa: 'Gaisa da mutane uku ko masu shago da "Good Morning" a yau.',
    verificationType: 'voice_report',
    rewardXp: 150,
    rewardCoins: 20,
  },
  {
    id: 'mission_water',
    title: 'The Thirsty Customer',
    titleHausa: 'Neman Ruwan Sha da Turanci',
    instruction: 'Ask for water in English: "Please give me water."',
    instructionHausa: 'Nemi ruwan sha da Turanci: "Please give me water."',
    verificationType: 'roleplay',
    rewardXp: 180,
    rewardCoins: 25,
  },
  {
    id: 'mission_name_intro',
    title: 'Proud Self-Introduction',
    titleHausa: 'Gabatar Da Kai Cikin Alfahari',
    instruction: 'Tell someone your name in English: "Hello, my name is [Your Name]."',
    instructionHausa: 'Fada wa wani sunanka da Turanci: "Hello, my name is [Sunanka]."',
    verificationType: 'voice_report',
    rewardXp: 200,
    rewardCoins: 30,
  },
  {
    id: 'mission_market_price',
    title: 'Market Bargaining Master',
    titleHausa: 'Tambayar Farashin Kasuwa',
    instruction: 'Ask the price of any item: "Excuse me, how much is this?"',
    instructionHausa: 'Tambayi kudin kaya a shago: "Excuse me, how much is this?"',
    verificationType: 'roleplay',
    rewardXp: 250,
    rewardCoins: 35,
  },
  {
    id: 'mission_clinic_help',
    title: 'Health & Symptom Assistant',
    titleHausa: 'Bayyana Lafiya a Asibiti',
    instruction: 'Practice reporting a health issue: "I have a headache and fever."',
    instructionHausa: 'Koyon bayyana ciwo: "I have a headache and fever."',
    verificationType: 'roleplay',
    rewardXp: 300,
    rewardCoins: 40,
  }
];

export const BADGES: Badge[] = [
  {
    id: 'first_word',
    title: 'First Vocal Awakening',
    titleHausa: 'Bude Murya Ta Farko',
    description: 'You articulated your very first English sound into the microphone!',
    descriptionHausa: 'Ka fadi sautin Turanci na farko a cikin makirufo!',
    icon: 'Sparkles',
  },
  {
    id: 'streak_3',
    title: '3-Day Fire',
    titleHausa: 'Wutar Kwana Uku',
    description: 'Maintained an active learning streak for 3 consecutive days.',
    descriptionHausa: 'Ka ci gaba da koyo na tsawon kwanaki uku a jere.',
    icon: 'Flame',
  },
  {
    id: 'pronunciation_shield',
    title: 'Pronunciation Shield',
    titleHausa: 'Garkuwan Furuci',
    description: 'Scored 90%+ in 3 consecutive speech accuracy tests.',
    descriptionHausa: 'Ka sami sama da 90% a gwajin furuci sau uku a jere.',
    icon: 'ShieldCheck',
  },
  {
    id: 'market_trader',
    title: 'Market Champion',
    titleHausa: 'Zakaran Kasuwa',
    description: 'Successfully completed the Kano Market bargaining simulation with Musa.',
    descriptionHausa: 'Ka kammala cinikin kasuwa da Turanci tare da Musa!',
    icon: 'ShoppingBag',
  },
  {
    id: 'health_hero',
    title: 'Healthcare Hero',
    titleHausa: 'Jarumin Asibiti',
    description: 'Mastered clinical triage dialogues with Malama Amina.',
    descriptionHausa: 'Ka mallaki zantukan asibiti da neman magani.',
    icon: 'HeartPulse',
  },
  {
    id: 'perfect_quiz',
    title: 'Flawless Mind',
    titleHausa: 'Zuciya marar Kuskure',
    description: 'Scored 100% on any audio quiz on the first attempt.',
    descriptionHausa: 'Ka ci kashi 100% a jarrabawar darasi a karon farko.',
    icon: 'CheckCircle2',
  },
  {
    id: 'premium_scholar',
    title: 'Knowledge Seeker',
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
