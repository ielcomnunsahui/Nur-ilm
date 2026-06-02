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
  // --- LEVEL 0: No English Knowledge ---
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
    id: 'l0_3',
    level: LearningLevel.LEVEL_0,
    title: 'English Vowels: A, E, I, O, U',
    titleHausa: 'Wasulan Turanci (A, E, I, O, U)',
    description: 'Learn the short vowel sounds that form the base of all English vocabulary.',
    descriptionHausa: 'Koyi gajerun sautukan wasula guda biyar da ke gina kusan kowace kalma ta Turanci.',
    points: 130,
    vocabulary: [
      {
        id: 'v_cat',
        english: 'Cat',
        hausa: 'Kyanwa / Mage',
        pronunciationHint: 'Kyat',
        hausaHint: 'Mage da ke gida',
        imageUrl: '🐱',
        category: 'Vowel Sounds'
      },
      {
        id: 'v_bed',
        english: 'Bed',
        hausa: 'Gado',
        pronunciationHint: 'Bedd',
        hausaHint: 'Babban gado na barci',
        imageUrl: '🛏️',
        category: 'Vowel Sounds'
      },
      {
        id: 'v_dog',
        english: 'Dog',
        hausa: 'Kare',
        pronunciationHint: 'Dogg',
        hausaHint: 'Dabba mai gadin gida',
        imageUrl: '🐕',
        category: 'Vowel Sounds'
      }
    ],
    quiz: [
      {
        id: 'q0_3_1',
        questionText: 'Which short vowel sound is found in the word "Bed"?',
        questionAudioText: 'Wane wasali ne ke cikin kalmar Bed (ko Gado)?',
        options: ['A sound', 'E sound', 'I sound', 'O sound'],
        correctOptionIndex: 1,
        explanation: '"Bed" contains the short sound of the vowel letter "E".'
      }
    ]
  },
  {
    id: 'l0_4',
    level: LearningLevel.LEVEL_0,
    title: 'Numbers: One to Five',
    titleHausa: 'Lambobin Turanci na Asali (1 zuwa 5)',
    description: 'Learn to count and pronounce numbers from one to five.',
    descriptionHausa: 'Koyi yadda zaka kirga lambobi daga daya zuwa biyar a Turanci.',
    points: 140,
    vocabulary: [
      {
        id: 'v_one',
        english: 'One',
        hausa: 'Ɗaya',
        pronunciationHint: 'Wan',
        hausaHint: 'Lamba ɗaya',
        imageUrl: '1️⃣',
        category: 'Numbers'
      },
      {
        id: 'v_two',
        english: 'Two',
        hausa: 'Biyu',
        pronunciationHint: 'Too',
        hausaHint: 'Lamba biyu',
        imageUrl: '2️⃣',
        category: 'Numbers'
      },
      {
        id: 'v_three',
        english: 'Three',
        hausa: 'Uku',
        pronunciationHint: 'Th-ree',
        hausaHint: 'Lamba uku',
        imageUrl: '3️⃣',
        category: 'Numbers'
      }
    ],
    quiz: [
      {
        id: 'q0_4_1',
        questionText: 'What is the English word for "Uku"?',
        questionAudioText: 'Macece kalmar Turanci ta lambar "Uku"?',
        options: ['One', 'Two', 'Three', 'Four'],
        correctOptionIndex: 2,
        explanation: '"Three" stands for Uku in English.'
      }
    ]
  },

  // --- LEVEL 1: First Words ---
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
    id: 'l1_3',
    level: LearningLevel.LEVEL_1,
    title: 'Nouns: Animals Around Us',
    titleHausa: 'Suna: Dabbobi (Common Nouns)',
    description: 'Learn simple naming words (nouns) for popular animals in Northern Nigeria.',
    descriptionHausa: 'Koyi sanannun sunayen dabbobi da muke gani yau da kullum a Turanci.',
    points: 160,
    vocabulary: [
      {
        id: 'v_cow',
        english: 'Cow',
        hausa: 'Saniya',
        pronunciationHint: 'Kauw',
        hausaHint: 'Saniya mai bada nono',
        imageUrl: '🐄',
        category: 'Nouns'
      },
      {
        id: 'v_goat',
        english: 'Goat',
        hausa: 'Akwiya / Buzuwa',
        pronunciationHint: 'Goht',
        hausaHint: 'Akuya ko bunsuru',
        imageUrl: '🐐',
        category: 'Nouns'
      },
      {
        id: 'v_horse',
        english: 'Horse',
        hausa: 'Doki',
        pronunciationHint: 'Hohss',
        hausaHint: 'Doki na hawa ko taro',
        imageUrl: '🐎',
        category: 'Nouns'
      }
    ],
    quiz: [
      {
        id: 'q1_3_1',
        questionText: 'What is the English name for "Saniya"?',
        questionAudioText: 'Mene ne sunan Saniya a harshen Turanci?',
        options: ['Goat', 'Horse', 'Cow', 'Bed'],
        correctOptionIndex: 2,
        explanation: 'The word "Cow" means Saniya in Hausa.'
      }
    ]
  },
  {
    id: 'l1_4',
    level: LearningLevel.LEVEL_1,
    title: 'Nouns: Foods & Crops',
    titleHausa: 'Suna: Abinci da Kayan Gona',
    description: 'Familiarize yourself with names of staple food crops.',
    descriptionHausa: 'Koyi kalmomin abinci da kayan marmari da muke amfani da su kullum.',
    points: 160,
    vocabulary: [
      {
        id: 'v_rice',
        english: 'Rice',
        hausa: 'Shinkafa',
        pronunciationHint: 'Raiss',
        hausaHint: 'Danyar shinkafa ko dafaffiya',
        imageUrl: '🍚',
        category: 'Nouns - Food'
      },
      {
        id: 'v_meat',
        english: 'Meat',
        hausa: 'Nama',
        pronunciationHint: 'Meet',
        hausaHint: 'Naman saniya ko rago',
        imageUrl: '🍖',
        category: 'Nouns - Food'
      }
    ],
    quiz: [
      {
        id: 'q1_4_1',
        questionText: 'Which word means "Shinkafa" in English?',
        questionAudioText: 'Wace kalma ce take nufin Shinkafa a Turanci?',
        options: ['Meat', 'Rice', 'Apple', 'Water'],
        correctOptionIndex: 1,
        explanation: '"Rice" is the English noun for Shinkafa.'
      }
    ]
  },

  // --- LEVEL 2: Basic Sentences ---
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
        explanation: '"I want water" translates directly to "Ina son ruwa".'
      }
    ]
  },
  {
    id: 'l2_2',
    level: LearningLevel.LEVEL_2,
    title: 'Verbs: Active Movements',
    titleHausa: 'Aikatau (Verbs): Ayyukan Kullum',
    description: 'Understand verbs, which are action words representing active doing.',
    descriptionHausa: 'Mafi yawancin jimloli na bukatar Kalmar aikatau (Verbs) don nuna motsi ko aiki.',
    points: 210,
    vocabulary: [
      {
        id: 'v_go',
        english: 'Go',
        hausa: 'Tafi',
        pronunciationHint: 'Goh',
        hausaHint: 'Motsi zuwa gaba',
        imageUrl: '🚶',
        category: 'Verbs'
      },
      {
        id: 'v_come',
        english: 'Come',
        hausa: 'Zo',
        pronunciationHint: 'Kam',
        hausaHint: 'Garin kusanci',
        imageUrl: '🏃',
        category: 'Verbs'
      },
      {
        id: 'v_eat',
        english: 'Eat',
        hausa: 'Ci (Abinci)',
        pronunciationHint: 'Eet',
        hausaHint: 'Sanya abinci a baki',
        imageUrl: '🍽️',
        category: 'Verbs'
      }
    ],
    quiz: [
      {
        id: 'q2_2_1',
        questionText: 'What is the action word for "Zo" in English?',
        questionAudioText: 'Wace kalmar aikatau ce ke nufin "Zo" a Turanci?',
        options: ['Go', 'Come', 'Eat', 'Bed'],
        correctOptionIndex: 1,
        explanation: 'The verb "Come" means "Zo" or "Kusanto".'
      }
    ]
  },
  {
    id: 'l2_3',
    level: LearningLevel.LEVEL_2,
    title: 'Verbs: Custom Action Sentences',
    titleHausa: 'Kera Ƙananan Jimloli na Aikatau',
    description: 'Construct active commands and personal expressions.',
    descriptionHausa: 'Koyi haɗa kalmomin aikatau tare da sunaye don gina jimloli masu ma\'ana.',
    points: 220,
    vocabulary: [
      {
        id: 'v_go_home',
        english: 'Go home',
        hausa: 'Tafi gida / Koma gida',
        pronunciationHint: 'Goh hohm',
        hausaHint: 'Komawa gida',
        imageUrl: '🏠',
        category: 'Action Sentences'
      },
      {
        id: 'v_eat_rice',
        english: 'Eat rice',
        hausa: 'Ci shinkafa',
        pronunciationHint: 'Eet raiss',
        hausaHint: 'Cin abinci musamman shinkafa',
        imageUrl: '🍚',
        category: 'Action Sentences'
      }
    ],
    quiz: [
      {
        id: 'q2_3_1',
        questionText: 'How do you say "Tafi gida" to someone in English?',
        questionAudioText: 'Idan kana biyawa wani "Tafi gida", yaya zaka ce a Turanci?',
        options: ['I want book', 'Go home', 'Come water', 'Nice father'],
        correctOptionIndex: 1,
        explanation: '"Go home" strictly stands for Tafi gida.'
      }
    ]
  },

  // --- LEVEL 3: Everyday Conversations ---
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
    id: 'l3_2',
    level: LearningLevel.LEVEL_3,
    title: 'Adjectives: Colors & Properties',
    titleHausa: 'Sifofi (Adjectives): Launi da Sura',
    description: 'Adjectives describe a noun. Learn standard colors.',
    descriptionHausa: 'Sifofin Turanci suna bayyana yadda abu yake, kamar launoni na siffantawa.',
    points: 260,
    vocabulary: [
      {
        id: 'v_red',
        english: 'Red',
        hausa: 'Ja',
        pronunciationHint: 'Redd',
        hausaHint: 'Launi mai dan ja',
        imageUrl: '🔴',
        category: 'Adjectives'
      },
      {
        id: 'v_white',
        english: 'White',
        hausa: 'Fari',
        pronunciationHint: 'Wait',
        hausaHint: 'Farin launi na tsarki',
        imageUrl: '⚪',
        category: 'Adjectives'
      },
      {
        id: 'v_green',
        english: 'Green',
        hausa: 'Kore / Koriyya',
        pronunciationHint: 'Gree-n',
        hausaHint: 'Launin ganye ko lafiyar noma',
        imageUrl: '🟢',
        category: 'Adjectives'
      }
    ],
    quiz: [
      {
        id: 'q3_2_1',
        questionText: 'What is the Hausa translation for the adjective "Red"?',
        questionAudioText: 'Mecece sifar "Red" a harshen Hausa?',
        options: ['Ja', 'Fari', 'Baki', 'Kore'],
        correctOptionIndex: 0,
        explanation: 'The color "Red" translates as "Ja" in Hausa.'
      }
    ]
  },
  {
    id: 'l3_3',
    level: LearningLevel.LEVEL_3,
    title: 'Adjectives: Sizes & Quality',
    titleHausa: 'Sifofin Girman Abu (Big & Small)',
    description: 'Describe whether things are big, small, good, or bad.',
    descriptionHausa: 'Koyi yadda zaka siffanta girma ko ingancin abubuwa da muke sarrafawa.',
    points: 270,
    vocabulary: [
      {
        id: 'v_big',
        english: 'Big',
        hausa: 'Babba',
        pronunciationHint: 'Bigg',
        hausaHint: 'Abu mai fadin girma',
        imageUrl: '🐘',
        category: 'Sizes'
      },
      {
        id: 'v_small',
        english: 'Small',
        hausa: 'Ƙanƙanin abu / Kaka',
        pronunciationHint: 'S-moll',
        hausaHint: 'Dan kankani',
        imageUrl: '🐜',
        category: 'Sizes'
      },
      {
        id: 'v_good',
        english: 'Good',
        hausa: 'Mai kyau',
        pronunciationHint: 'Gudd',
        hausaHint: 'Kwalisa ko abun farin ciki',
        imageUrl: '👍',
        category: 'Quality'
      }
    ],
    quiz: [
      {
        id: 'q3_3_1',
        questionText: 'If you want to describe a large object as "Babba", what is the word?',
        questionAudioText: 'Idan kana son siffanta babban abu, wace kalma zaka yi amfani da ita?',
        options: ['Small', 'Red', 'Big', 'No'],
        correctOptionIndex: 2,
        explanation: '"Big" represents size Babba.'
      }
    ]
  },

  // --- LEVEL 4: Reading & Writing ---
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
    id: 'l4_2',
    level: LearningLevel.LEVEL_4,
    title: 'Pronouns: He, She, and We',
    titleHausa: 'Wakilan Suna: He (Shi), She (Ita), We (Mu)',
    description: 'Use pronouns to refer to men, women, and groups without repeating names.',
    descriptionHausa: 'Koyi yadda ake madadin sunaye don fadar magana cikin sauki ba tare da ambata suna barkatai ba.',
    points: 310,
    vocabulary: [
      {
        id: 'v_he',
        english: 'He',
        hausa: 'Shi (Na miji)',
        pronunciationHint: 'Hee',
        hausaHint: 'Ambatar mutum guda daya namiji',
        imageUrl: '👦',
        category: 'Pronouns'
      },
      {
        id: 'v_she',
        english: 'She',
        hausa: 'Ita (Ta mace)',
        pronunciationHint: 'Shee',
        hausaHint: 'Ambatar mutum guda daya mace',
        imageUrl: '👧',
        category: 'Pronouns'
      },
      {
        id: 'v_we',
        english: 'We',
        hausa: 'Mu (Gamayya)',
        pronunciationHint: 'Wee',
        hausaHint: 'Hadaka ko mutane da yawa',
        imageUrl: '👥',
        category: 'Pronouns'
      }
    ],
    quiz: [
      {
        id: 'q4_2_1',
        questionText: 'Which pronoun represents an individual female (Ita)?',
        questionAudioText: 'Wane wakilin suna ne ke nufin mace guda daya, wato Ita?',
        options: ['He', 'She', 'We', 'Yes'],
        correctOptionIndex: 1,
        explanation: '"She" is the third-person singular pronoun for females.'
      }
    ]
  },
  {
    id: 'l4_3',
    level: LearningLevel.LEVEL_4,
    title: 'Question Words: What & Where',
    titleHausa: 'Tambayoyi: Mene ne (What) & Ina (Where)',
    description: 'Learn the basic triggers used to craft queries in English.',
    descriptionHausa: 'Hanyar neman karin bayani ta hanyar amfani da kalmomin tambaya na asali.',
    points: 320,
    vocabulary: [
      {
        id: 'v_what',
        english: 'What is this',
        hausa: 'Mene ne wannan?',
        pronunciationHint: 'Wat is this',
        hausaHint: 'Tambaya kan wani abu kusa',
        imageUrl: '❓',
        category: 'Question Words'
      },
      {
        id: 'v_where',
        english: 'Where is the market',
        hausa: 'Ina kasuwar take?',
        pronunciationHint: 'Wea is the mah-ket',
        hausaHint: 'Sake neman gurin kasuwa',
        imageUrl: '🗺️',
        category: 'Question Words'
      }
    ],
    quiz: [
      {
        id: 'q4_3_1',
        questionText: 'How do you ask someone "Ina kasuwar take?" in English?',
        questionAudioText: 'Yaya ake cewa "Ina kasuwar take" a Turanci?',
        options: ['Where is the market', 'What is this market', 'Go home market', 'Hello father market'],
        correctOptionIndex: 0,
        explanation: '"Where is the market" literally asks for location of market.'
      }
    ]
  },

  // --- LEVEL 5: Fluent Communication ---
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
  },
  {
    id: 'l5_2',
    level: LearningLevel.LEVEL_5,
    title: 'Polite Community & Doctor Dialogues',
    titleHausa: 'Hira ta Girmamawa a Asibiti (Polite Dialogues)',
    description: 'Communicate smoothly with medical practitioners or authorities.',
    descriptionHausa: 'Koyi jimlolin girmamawa lokacin neman taimakon likitoci ko gwamnati a Turanci.',
    points: 360,
    vocabulary: [
      {
        id: 'v_please_help',
        english: 'Please help me',
        hausa: 'Don Allah taimake ni',
        pronunciationHint: 'Pleess help mee',
        hausaHint: 'Neman agaji cikin kyautatawa',
        imageUrl: '🆘',
        category: 'Polite Dialogue'
      },
      {
        id: 'v_headache',
        english: 'I have a headache',
        hausa: 'Ina jin ciwon kai',
        pronunciationHint: 'Ai hav ah hed-eyk',
        hausaHint: 'Fadin yadda kake ji',
        imageUrl: '🤕',
        category: 'Polite Dialogue'
      }
    ],
    quiz: [
      {
        id: 'q5_2_1',
        questionText: 'What is the best way to request healthcare assistance politely?',
        questionAudioText: 'Ina mafi kyawun hanyar neman taimakon lafiya cikin ladabi?',
        options: ['No correct apple', 'Please help me', 'I want money', 'Nice to meet goat'],
        correctOptionIndex: 1,
        explanation: '"Please help me" is standard, universally polite, and elegant.'
      }
    ]
  }
];
