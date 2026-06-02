/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningLevel, Lesson, Badge } from './types';

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
    titleHausa: 'Gwarzon Mataki na Filiz',
    description: 'Mastered English basic sounds and pronunciation foundations.',
    descriptionHausa: 'Ka mallaki sautukan asali na Turanci.',
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

export const LESSONS: Lesson[] = [
  {
    id: 'l0_1',
    level: LearningLevel.LEVEL_0,
    title: 'Welcome to English',
    titleHausa: 'Barka da Shigowa Turanci',
    description: 'Understand what English is, how it sounds, and how to start learning by listing.',
    descriptionHausa: 'Fahimci menene Turanci, yadda yake fita, da yadda zaka fara koyo ta hanyar saurare.',
    points: 100,
    vocabulary: [
      {
        id: 'v_yes',
        english: 'Yes',
        hausa: 'Kwarai / Eh',
        pronunciationHint: 'Yess',
        hausaHint: 'Eh',
        imageUrl: '✨',
        category: 'Foundations'
      },
      {
        id: 'v_no',
        english: 'No',
        hausa: 'A\'a',
        pronunciationHint: 'Noh',
        hausaHint: 'A\'a',
        imageUrl: '❌',
        category: 'Foundations'
      }
    ],
    quiz: [
      {
        id: 'q0_1_1',
        questionText: 'Which word means "Eh/Kwarai" in English?',
        questionAudioText: 'Wace kalma ce ke nufin Eh ko Kwarai a Turanci?',
        options: ['No', 'Yes', 'Hello', 'Water'],
        correctOptionIndex: 1,
        explanation: '"Yes" shines as "Eh" or "Kwarai".'
      },
      {
        id: 'q0_1_2',
        questionText: 'When Ustaz Nur says "No", what does it mean in Hausa?',
        questionAudioText: 'Idan Ustaz Nur yace "No", me hakan yake nufi a harshen Hausa?',
        options: ['Zaki', 'Ruwa', 'A\'a', 'Lafiya'],
        correctOptionIndex: 2,
        explanation: '"No" is translated as "A\'a" in Hausa.'
      }
    ]
  },
  {
    id: 'l0_2',
    level: LearningLevel.LEVEL_0,
    title: 'Basic Sounds & ABC',
    titleHausa: 'Sautukan Haruffa da Haruffan Turanci',
    description: 'Practice repeating basic vowel sounds (A, E, I, O, U) and letter structures.',
    descriptionHausa: 'Koyon furta sautukan wasula na asali (A, E, I, O, U) da haruffan Turanci.',
    points: 120,
    vocabulary: [
      {
        id: 'v_apple',
        english: 'Apple',
        hausa: 'Tuffa',
        pronunciationHint: 'Ah-pul',
        hausaHint: 'Tuffa',
        imageUrl: '🍎',
        category: 'ABC Sounds'
      },
      {
        id: 'v_book',
        english: 'Book',
        hausa: 'Littafi',
        pronunciationHint: 'Buk',
        hausaHint: 'Littafi',
        imageUrl: '📖',
        category: 'ABC Sounds'
      }
    ],
    quiz: [
      {
        id: 'q0_2_1',
        questionText: 'What is the starting sound of the word "Apple"?',
        questionAudioText: 'Wane sauti ne yake fara kalmar Apple?',
        options: ['B sound', 'A sound', 'T sound', 'S sound'],
        correctOptionIndex: 1,
        explanation: '"Apple" begins with the letter "A" sound.'
      }
    ]
  },
  {
    id: 'l1_1',
    level: LearningLevel.LEVEL_1,
    title: 'Greetings & Human Connections',
    titleHausa: 'Gaisuwa da Sadarwar Dan Adam',
    description: 'Learn how to greet people at any time of day in English.',
    descriptionHausa: 'Koyi yadda zaka gaishe da mutane a kowane lokaci na rana a Turanci.',
    points: 150,
    vocabulary: [
      {
        id: 'v_hello',
        english: 'Hello',
        hausa: 'Sannu / Ina kwana',
        pronunciationHint: 'Heh-loh',
        hausaHint: 'Sannu',
        imageUrl: '👋',
        category: 'Greetings'
      },
      {
        id: 'v_thanks',
        english: 'Thank you',
        hausa: 'Na gode',
        pronunciationHint: 'Thangk yoo',
        hausaHint: 'Na gode',
        imageUrl: '🙏',
        category: 'Greetings'
      },
      {
        id: 'v_morning',
        english: 'Good morning',
        hausa: 'Ina kwana / Ina kwananku',
        pronunciationHint: 'Gud mor-ning',
        hausaHint: 'Gaisuwa ta safe',
        imageUrl: '🌅',
        category: 'Greetings'
      }
    ],
    quiz: [
      {
        id: 'q1_1_1',
        questionText: 'If you want to say "Na gode" in English, what do you say?',
        questionAudioText: 'Idan kana son kace "Na gode" a Turanci, me zaka ce?',
        options: ['Hello', 'No', 'Thank you', 'Apple'],
        correctOptionIndex: 2,
        explanation: '"Thank you" means "Na gode" in English.'
      },
      {
        id: 'q1_1_2',
        questionText: 'What greeting is suitable in the morning?',
        questionAudioText: 'Wace gaisuwa ce ta dace da safe?',
        options: ['Good morning', 'Good night', 'Goodbye', 'Book'],
        correctOptionIndex: 0,
        explanation: 'We greet with "Good morning" during early daily hours.'
      }
    ]
  },
  {
    id: 'l1_2',
    level: LearningLevel.LEVEL_1,
    title: 'Family & Loved Ones',
    titleHausa: 'Iyali da Na Kusa da Kai',
    description: 'Learn words for father, mother, brother, and sister.',
    descriptionHausa: 'Koyi kalmomi don mahaifi, mahaifiyar, dangi, da abokan rayuwa.',
    points: 150,
    vocabulary: [
      {
        id: 'v_father',
        english: 'Father',
        hausa: 'Mahaifi / Baba',
        pronunciationHint: 'Fah-thur',
        hausaHint: 'Baba',
        imageUrl: '👨',
        category: 'Family'
      },
      {
        id: 'v_mother',
        english: 'Mother',
        hausa: 'Mahaifiyar / Mama',
        pronunciationHint: 'Muh-thur',
        hausaHint: 'Mama',
        imageUrl: '👩',
        category: 'Family'
      }
    ],
    quiz: [
      {
        id: 'q1_2_1',
        questionText: 'Who is a "Mother" in your family?',
        questionAudioText: 'Wacece ake kira da "Mother" a cikin iyalinka?',
        options: ['Baba / Uba', 'Mama / Mahaifiya', 'Kanen miji', 'Yayen uba'],
        correctOptionIndex: 1,
        explanation: '"Mother" is the mother figure/mama.'
      }
    ]
  },
  {
    id: 'l2_1',
    level: LearningLevel.LEVEL_2,
    title: 'Expressing What You Want',
    titleHausa: 'Bayyana Abinda Kake Bukata',
    description: 'Join words into starter sentence builders like "I want" and "I need".',
    descriptionHausa: 'Koyon hada kalmomi don kace "Ina so" ko "Ina bukata".',
    points: 200,
    vocabulary: [
      {
        id: 'v_water',
        english: 'Water',
        hausa: 'Ruwa',
        pronunciationHint: 'Wah-tur',
        hausaHint: 'Ruwa da muke sha',
        imageUrl: '💧',
        category: 'Essentials'
      },
      {
        id: 'v_food',
        english: 'Food',
        hausa: 'Abinci',
        pronunciationHint: 'Fud',
        hausaHint: 'Abinci',
        imageUrl: '🍲',
        category: 'Essentials'
      },
      {
        id: 'v_iwant',
        english: 'I want water',
        hausa: 'Ina son ruwa',
        pronunciationHint: 'Ai want wah-tur',
        hausaHint: 'Ina son ruwa',
        imageUrl: '🥛',
        category: 'Sentences'
      }
    ],
    quiz: [
      {
        id: 'q2_1_1',
        questionText: 'How do you say "Ina son ruwa" in English?',
        questionAudioText: 'Yaya ake cewa "Ina son ruwa" a Turanci?',
        options: ['I want Apple', 'I want water', 'Good morning water', 'My Father water'],
        correctOptionIndex: 1,
        explanation: '"I want water" literally translates to "Ina son ruwa".'
      }
    ]
  },
  {
    id: 'l3_1',
    level: LearningLevel.LEVEL_3,
    title: 'At the Local Market (Kasuwa)',
    titleHausa: 'A Kasuwa',
    description: 'Ask for prices, interact with shopkeepers, and request discounts.',
    descriptionHausa: 'Koyi yadda zaka tambayi farashin kaya a kasuwa da kuma gudanar da ciniki.',
    points: 250,
    vocabulary: [
      {
        id: 'v_howmuch',
        english: 'How much',
        hausa: 'Nawa ne?',
        pronunciationHint: 'Hau machh',
        hausaHint: 'Nawa',
        imageUrl: '💰',
        category: 'Market'
      },
      {
        id: 'v_buy',
        english: 'I want to buy',
        hausa: 'Ina son in saya',
        pronunciationHint: 'Ai want too bai',
        hausaHint: 'Saya',
        imageUrl: '🛍️',
        category: 'Market'
      },
      {
        id: 'v_money',
        english: 'Money',
        hausa: 'Kudi',
        pronunciationHint: 'Muh-nee',
        hausaHint: 'Kudi',
        imageUrl: '💵',
        category: 'Market'
      }
    ],
    quiz: [
      {
        id: 'q3_1_1',
        questionText: 'When you ask "How much?", what are you looking for?',
        questionAudioText: 'Idan kayi tambaya "How much?", me kake nema?',
        options: ['Sunan mutum', 'Farashin abu key', 'Karin bayani', 'Sallama'],
        correctOptionIndex: 1,
        explanation: '"How much?" asks for the cost/price.'
      }
    ]
  },
  {
    id: 'l4_1',
    level: LearningLevel.LEVEL_4,
    title: 'Reading Sentences step-by-step',
    titleHausa: 'Karantawa Sannu-sannu',
    description: 'Structure subject-verb-object relationships and build literacy skills.',
    descriptionHausa: 'Fahimtar yadda ake gina cikakkiyar jumla don karantawa da rubutu.',
    points: 300,
    vocabulary: [
      {
        id: 'v_read',
        english: 'I read this book',
        hausa: 'Ina karanta wannan littafi',
        pronunciationHint: 'Ai reed this buk',
        hausaHint: 'Littafi',
        imageUrl: '📖',
        category: 'Literacy'
      },
      {
        id: 'v_write',
        english: 'I write my name',
        hausa: 'Ina rubuta suna na',
        pronunciationHint: 'Ai rait mai neym',
        hausaHint: 'Rubutu',
        imageUrl: '✏️',
        category: 'Literacy'
      }
    ],
    quiz: [
      {
        id: 'q4_1_1',
        questionText: 'What does "write" mean?',
        questionAudioText: 'Mecece kalmar "write" take nufi?',
        options: ['Karatu', 'Rubutu', 'Saurare', 'Kallon hoto'],
        correctOptionIndex: 1,
        explanation: '"Write" represents the act of putting words down on paper, which means "Rubutu".'
      }
    ]
  },
  {
    id: 'l5_1',
    level: LearningLevel.LEVEL_5,
    title: 'Job Interview & Business Fluency',
    titleHausa: 'Tattaunawa ta Neman Aiki da Kasuwanci',
    description: 'Learn how to describe your skills and communicate in dynamic professional settings.',
    descriptionHausa: 'Koyi yadda zaka gabatar da kanka yayin neman aiki da hira da manajoji a Turanci.',
    points: 350,
    vocabulary: [
      {
        id: 'v_skills',
        english: 'I have experience',
        hausa: 'Ina da kwarewa',
        pronunciationHint: 'Ai hav ek-spee-ree-ens',
        hausaHint: 'Kwarewa ta aiki',
        imageUrl: '💼',
        category: 'Job Skills'
      },
      {
        id: 'v_hire',
        english: 'Nice to meet you',
        hausa: 'Na ji dadin haduwa da kai',
        pronunciationHint: 'Nais too meet yoo',
        hausaHint: 'Gaisuwa ta girmamawa',
        imageUrl: '🤝',
        category: 'Job Skills'
      }
    ],
    quiz: [
      {
        id: 'q5_1_1',
        questionText: 'In a professional interview, how do you greet politely at the beginning?',
        questionAudioText: 'A wajen hirar neman aiki, yaya kake mika gaisuwa ta girmamawa da Turanci?',
        options: ['Goodbye', 'No, thank you', 'Nice to meet you', 'How much father'],
        correctOptionIndex: 2,
        explanation: '"Nice to meet you" expresses standard polite greetings upon meeting supervisors.'
      }
    ]
  }
];
