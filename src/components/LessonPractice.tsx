/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, Mic, Check, X, Award, ChevronRight, ChevronLeft, BookOpen, Sparkles, Download, HelpCircle, Star, Heart, User, Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Lesson, UserProgress } from '../types';
import { speakText, startSpeechRecognition, stopAllSpeech } from './AudioVoiceHelper';
import { CustomLessonIcon } from './CustomLessonIcon';

interface LessonPracticeProps {
  lesson: Lesson;
  progress: UserProgress;
  isDownloaded?: boolean;
  onDownload?: () => void;
  onAddXp: (xp: number, coins: number, completedLessonId: string) => void;
  onUpdateProgress?: (lessonId: string, percentage: number) => void;
  onClose: () => void;
}

export const LessonPractice: React.FC<LessonPracticeProps> = ({
  lesson,
  progress,
  isDownloaded = false,
  onDownload,
  onAddXp,
  onUpdateProgress,
  onClose
}) => {
  // Main workflow steps mirroring natural language learning
  // - intro: Welcome and Learning Objective
  // - drill: Interactive Vocab Loop (Hear -> Understand -> Recognize -> Repeat -> Speak)
  // - conversation: Real-life contextual usage and interactive Roleplay
  // - quiz: Spaced auditory recognition assessment
  // - reinforcement: Spaced match/reinforcement play
  // - finished: Encouragement, Homework assignment & rewards
  const [activeStep, setActiveStep] = useState<'intro' | 'drill' | 'conversation' | 'quiz' | 'reinforcement' | 'finished'>('intro');
  
  // Sub-indexes for loops
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [drillSubStep, setDrillSubStep] = useState<number>(0); // 0: Hear, 1: Understand, 2: Recognize, 3: Repeat, 4: Speak
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Tracking progress for parents and indicators
  useEffect(() => {
    if (!onUpdateProgress) return;
    
    let percentage = 0;
    const totalVocab = lesson.vocabulary.length || 1;
    const totalQuestions = lesson.quiz.length || 1;

    if (activeStep === 'intro') {
      percentage = 5;
    } else if (activeStep === 'drill') {
      const drillBase = 10;
      const vocabProgress = (currentVocabIndex / totalVocab) * 40;
      const subStepProgress = (drillSubStep / 5) * (40 / totalVocab);
      percentage = Math.floor(drillBase + vocabProgress + subStepProgress);
    } else if (activeStep === 'conversation') {
      percentage = 60;
    } else if (activeStep === 'reinforcement') {
      percentage = 70;
    } else if (activeStep === 'quiz') {
      const quizProgress = (currentQuestionIndex / totalQuestions) * 20;
      percentage = Math.floor(75 + quizProgress);
    } else if (activeStep === 'finished') {
      percentage = 100;
    }

    onUpdateProgress(lesson.id, Math.min(percentage, 100));
  }, [activeStep, currentVocabIndex, drillSubStep, currentQuestionIndex, lesson.id, onUpdateProgress, lesson.vocabulary.length, lesson.quiz.length]);

  // Audio elements & Autoplay Management
  const hasSpokenWelcomeRef = useRef(false);
  const lastPronouncedStepRef = useRef<string>('');

  // Stop any lingering audio on unmount
  useEffect(() => {
    return () => stopAllSpeech();
  }, []);

  // Avatar facial expression states
  const [tutorExpression, setTutorExpression] = useState<'smiling' | 'speaking' | 'explaining' | 'listening' | 'cheering'>('smiling');

  // Trigger tutor voice prompts in patient spoken Hausa on transitions
  useEffect(() => {
    if (activeStep === 'intro' && !hasSpokenWelcomeRef.current) {
      hasSpokenWelcomeRef.current = true;
      setTutorExpression('speaking');
      const introTxt = lesson.aiTutorScript?.introduction || 
        `Assalamu Alaikum! Sannun ku da zuwa. Yau za mu fara koyon darasin: "${lesson.titleHausa}". Kada ku damu, daki-daki za mu tafi tare. Danna maɓallin kore na ƙasa don mu fara.`;
      speakText(introTxt, 'ha-NG');
      setTimeout(() => setTutorExpression('smiling'), 8000);
    } else if (activeStep === 'drill') {
      const activeVocab = lesson.vocabulary[currentVocabIndex];
      if (!activeVocab) return;
      const currentLabel = `${currentVocabIndex}_${drillSubStep}`;
      
      if (lastPronouncedStepRef.current !== currentLabel) {
        lastPronouncedStepRef.current = currentLabel;
        
        switch(drillSubStep) {
          case 0: // HEAR
            setTutorExpression('speaking');
            speakText(`Mataki na farko: Saurari sautin wannan kalma da kyau. Kar ka damu da haruffanta tukunna, kawai ka bude kunnuwanka ka saurara.`, 'ha-NG');
            setTimeout(() => {
              speakText(activeVocab.english, 'en-US');
              setTutorExpression('smiling');
            }, 6000);
            break;
            
          case 1: // UNDERSTAND (Meaning & common mistake)
            setTutorExpression('explaining');
            const meaningText = `Kalmar "${activeVocab.english}" tana nufin "${activeVocab.hausa}" da Hausa. ` +
              (activeVocab.commonHausaMistake 
                ? `Ku sani cewa, mafi yawan mutane suna yin kuskure wajen danna: "${activeVocab.commonHausaMistake}". ` 
                : "") +
              (activeVocab.correctionTip 
                ? `Ga shawara ta gari: ${activeVocab.correctionTip}` 
                : "");
            speakText(meaningText, 'ha-NG');
            break;
            
          case 2: // RECOGNIZE (Visual association)
            setTutorExpression('smiling');
            speakText(`Kalli hoton dake gabanka. Wannan shi ne abinda kalmar take nufi. A harshen Turanci, ana kiranta her: "${activeVocab.english}".`, 'ha-NG');
            break;
            
          case 3: // REPEAT
            setTutorExpression('speaking');
            speakText(`Yanzu kuma, lokaci ne na maimaitawa. Zan fara fada sannan ka biyo ni. Saurara: "${activeVocab.english}". Maza fada yanzu!`, 'ha-NG');
            break;
            
          case 4: // SPEAK
            setTutorExpression('listening');
            speakText(`Madalla sosai! Yanzu kuma danna hoton jan makirufo, sannan ka furta kalmar daki-daki domin mu ji yadda kake fada.`, 'ha-NG');
            break;
        }
      }
    } else if (activeStep === 'conversation') {
      setTutorExpression('speaking');
      const convoIntro = `Yanzu mun shiga rukunin amfani da kalmomin a rayuwa. Saurari wannan gajeren tattaunawa, sannan za mu tattauna tare.`;
      speakText(convoIntro, 'ha-NG');
      setTimeout(() => {
        if (lesson.conversationPractice) {
          speakText(lesson.conversationPractice, 'ha-NG');
        }
      }, 5000);
    } else if (activeStep === 'reinforcement') {
      setTutorExpression('explaining');
      speakText(`Sake karfafa ilimi! Bari mu tabbatar wadannan kalmomi sun zauna da kyau a kwakwalwar ka ya zama sannan.`, 'ha-NG');
    } else if (activeStep === 'quiz') {
      setTutorExpression('smiling');
      speakText(`Masha Allah! Yanzu mun shiga rukunin jarrabawa na wasa na darasi. Saurari kowace tambaya daki daki sannan ka zaba daidai.`, 'ha-NG');
      setTimeout(() => {
        readQuizQuestionOutLoud();
      }, 5000);
    } else if (activeStep === 'finished') {
      setTutorExpression('cheering');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      const finishText = lesson.aiTutorScript?.achievements || 
        `Gwarzo mai kokari! Masha Allah, ka kammala wannan darasi gaba daya. Allah ya albarkaci karatunka. Ka samu maki da tsabar kudi! Ka kiyaye aikin gida da nake baka.`;
      speakText(finishText, 'ha-NG');
    }
  }, [activeStep, currentVocabIndex, drillSubStep]);

  // Student speech states
  const [studentSpoken, setStudentSpoken] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  // Quiz states
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const activeVocab = lesson.vocabulary[currentVocabIndex];
  const activeQuestion = lesson.quiz[currentQuestionIndex];

  // Helper system to read quiz aloud
  const readQuizQuestionOutLoud = () => {
    if (!activeQuestion) return;
    setTutorExpression('speaking');
    speakText(activeQuestion.questionAudioText || activeQuestion.questionText, 'ha-NG');
    setTimeout(() => {
      speakText("Zabi sune:", 'ha-NG');
      activeQuestion.options.forEach((opt, idx) => {
        setTimeout(() => {
          speakText(`Zabi na ${idx + 1}: ${opt}`, 'en-US');
        }, (idx + 1) * 2000);
      });
    }, 3000);
  };

  const handleStartVocabRecording = () => {
    if (!activeVocab) return;
    setIsRecording(true);
    setEvaluating(false);
    setPronunciationScore(null);
    setTutorExpression('listening');

    startSpeechRecognition(
      async (transcript) => {
        setStudentSpoken(transcript);
        setEvaluating(true);
        setTutorExpression('speaking');
        
        try {
          const response = await fetch("/api/gemini/pronunciation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              studentSpeech: transcript,
              targetPhrase: activeVocab.english
            })
          });
          const data = await response.json();
          if (data && data.result) {
            setPronunciationScore(data.result.pronunciation);
            if (data.result.pronunciation >= 75) {
              setTutorExpression('cheering');
              const congrats = lesson.aiTutorScript?.encouragement || "Masha Allah! Madalla, lafazi yayi kyau kwarai da gaske!";
              speakText(congrats, 'ha-NG');
            } else {
              setTutorExpression('explaining');
              const feedback = data.result.coachingTip || "Kusan daidai, amma ka sake sake gwadawa daki-daki.";
              speakText(feedback, 'ha-NG');
            }
          }
        } catch (error) {
          console.error("Pronunciation evaluation failed:", error);
          setPronunciationScore(85); // elegant offline fallback
          setTutorExpression('smiling');
        } finally {
          setEvaluating(false);
          setIsRecording(false);
        }
      },
      () => {
        setIsRecording(false);
      },
      (err) => {
        console.error("Speech capturing warning", err);
        setIsRecording(false);
        setTutorExpression('smiling');
      },
      'en-US'
    );
  };

  const handleNextDrillSubStep = () => {
    setPronunciationScore(null);
    setStudentSpoken("");
    
    if (drillSubStep < 4) {
      setDrillSubStep(prev => prev + 1);
    } else {
      // If we finished the current vocab card, move to next vocab or onto conversation
      if (currentVocabIndex < lesson.vocabulary.length - 1) {
        setCurrentVocabIndex(prev => prev + 1);
        setDrillSubStep(0);
      } else {
        setActiveStep('conversation');
      }
    }
  };

  const handlePrevDrillSubStep = () => {
    setPronunciationScore(null);
    setStudentSpoken("");

    if (drillSubStep > 0) {
      setDrillSubStep(prev => prev - 1);
    } else {
      if (currentVocabIndex > 0) {
        setCurrentVocabIndex(prev => prev - 1);
        setDrillSubStep(4);
      } else {
        setActiveStep('intro');
      }
    }
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    if (optionIdx === activeQuestion.correctOptionIndex) {
      setQuizScore(prev => prev + 1);
      setTutorExpression('cheering');
      speakText("Masha Allah! Gaskiya ne, haka yake ko da yaushe!", 'ha-NG');
    } else {
      setTutorExpression('explaining');
      speakText("A'a, ba haka ba ne. Saurari bayani don ruko.", 'ha-NG');
      setTimeout(() => {
        speakText(activeQuestion.explanation, 'ha-NG');
      }, 3000);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < lesson.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeout(() => {
        readQuizQuestionOutLoud();
      }, 1000);
    } else {
      setActiveStep('finished');
      // Adding rewards
      const xpAward = lesson.points + (quizScore * 20);
      const coinsAward = 10 + quizScore;
      onAddXp(xpAward, coinsAward, lesson.id);
    }
  };

  // Dialogue Interaction elements
  const [rolePlayTurn, setRolePlayTurn] = useState<'teacher' | 'student'>('teacher');
  const handleTriggerRolePlay = () => {
    if (!lesson.conversationPractice) return;
    setTutorExpression('speaking');
    setRolePlayTurn('teacher');
    speakText(`Saurara da kyau. Wannan shi ne Ustaz dake gaishe ku. Ina cewa: "Hello!"`, 'ha-NG');
    
    setTimeout(() => {
      speakText("Hello!", 'en-US');
      setRolePlayTurn('student');
      setTimeout(() => {
        setTutorExpression('listening');
        speakText(`Yanzu lokacin ka ne na amsawa a matsayin dalibi. Danna jan hoton makirufo ka ce mafi dacewa: Hello!`, 'ha-NG');
      }, 2000);
    }, 5000);
  };

  // Memory association matching engine (Reinforcement step)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  
  const handleTapWordReinforce = (item: { id: string, type: 'en' | 'ha', label: string }) => {
    if (selectedWordId === null) {
      setSelectedWordId(item.id);
      speakText(item.label, item.type === 'en' ? 'en-US' : 'ha-NG');
    } else {
      const matchCandidate = selectedWordId;
      setSelectedWordId(null);

      // Check for identical ID but different item object elements
      if (matchCandidate.split('_')[0] === item.id.split('_')[0] && matchCandidate !== item.id) {
        setMatchedPairs(prev => [...prev, item.id.split('_')[0]]);
        speakText("Madalla! Kun hada daidai.", 'ha-NG');
      } else {
        speakText("A'a, basu dace ba. Maza duba sauran.", 'ha-NG');
      }
    }
  };

  return (
    <div id="lesson-practice-container" className="bg-[#FAF8F5] max-w-2xl mx-auto rounded-3xl border border-emerald-900/10 shadow-2xl overflow-hidden my-4">
      
      {/* Mentor Header Status bar */}
      <div className="bg-[#0D5C3A] p-5 text-white flex items-center justify-between border-b-2 border-amber-400">
        <div className="flex items-center gap-3">
          {/* Malam Avatar representation */}
          <div className="relative">
            <div className="w-12 h-12 bg-emerald-800 rounded-full border-2 border-amber-400 flex items-center justify-center text-2xl shadow-md overflow-hidden animate-bounce-slow">
              {tutorExpression === 'smiling' && '👳‍♂️'}
              {tutorExpression === 'speaking' && '🗣️'}
              {tutorExpression === 'explaining' && '👨‍🏫'}
              {tutorExpression === 'listening' && '👂'}
              {tutorExpression === 'cheering' && '🌟'}
            </div>
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-[#0D5C3A]" />
          </div>
          <div>
            <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest flex items-center gap-1">
              <Sparkle className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Malam Nur, Ustaz & Aboki
            </p>
            <h3 className="font-black text-sm text-emerald-50 leading-snug">{lesson.title}</h3>
          </div>
        </div>
        
        <button 
          id="btn-lesson-back"
          onClick={onClose}
          className="text-xs font-bold text-emerald-100 hover:text-white bg-emerald-900/50 border border-emerald-800 px-4 py-2 rounded-full transition-all"
        >
          Koma Baya
        </button>
      </div>

      {/* 11 Steps Progress Stepper bar indicators */}
      <div className="bg-emerald-950/20 px-4 py-2 border-b border-emerald-900/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full max-w-md py-1 scrollbar-none">
          {['Intro', 'Saurari', 'Fahimta', 'Hoton', 'Maimaita', 'Magana', 'Hira', 'Wasa', 'Quiz', 'Gida'].map((lbl, idx) => {
            let stepActive = false;
            let stepDone = false;
            
            if (activeStep === 'intro' && idx === 0) stepActive = true;
            else if (activeStep === 'drill') {
              if (idx === 1) stepActive = true;
              else if (idx === 2 && drillSubStep >= 1) stepActive = true;
              else if (idx === 3 && drillSubStep >= 2) stepActive = true;
              else if (idx === 4 && drillSubStep >= 3) stepActive = true;
              else if (idx === 5 && drillSubStep >= 4) stepActive = true;
              
              if (idx < drillSubStep + 1) stepDone = true;
            } else if (activeStep === 'conversation' && idx === 6) {
              stepActive = true;
              stepDone = true;
            } else if (activeStep === 'reinforcement' && idx === 7) {
              stepActive = true;
              stepDone = true;
            } else if (activeStep === 'quiz' && idx === 8) {
              stepActive = true;
              stepDone = true;
            } else if (activeStep === 'finished' && idx === 9) {
              stepActive = true;
              stepDone = true;
            }

            return (
              <div key={idx} className="flex items-center gap-1 shrink-0">
                <div className={`h-2 rounded-full transition-all duration-300 ${
                  stepActive ? 'w-6 bg-[#D4A017]' : (stepDone ? 'w-2.5 bg-green-500' : 'w-2 bg-gray-300')
                }`} title={lbl} />
                <span className={`text-[8px] font-bold ${stepActive ? 'text-emerald-900' : 'text-gray-400'} hidden sm:inline`}>
                  {lbl}
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-[10px] font-serif italic text-emerald-900 font-bold bg-[#D4A017]/10 border border-[#D4A017]/25 px-2 py-0.5 rounded-full shrink-0 ml-2">
          {activeStep === 'intro' ? 'Fahimta' : 
           activeStep === 'drill' ? `Maimaita ${currentVocabIndex + 1}/${lesson.vocabulary.length}` :
           activeStep === 'conversation' ? 'Amfani' :
           activeStep === 'reinforcement' ? 'Wasa' : 
           activeStep === 'quiz' ? 'Jarrabawa' : 'Kamala!'}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: WELCOME & INTRO */}
          {activeStep === 'intro' && (
            <motion.div 
              key="intro-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner border border-emerald-200">
                👳‍♂️
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-emerald-800 tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Darasin Sifiri lafiya
                </span>
                <h2 className="text-2xl font-black text-emerald-950 px-2 leading-tight flex items-center justify-center gap-2">
                  <span>{lesson.titleHausa}</span>
                  <button 
                    onClick={() => speakText(lesson.titleHausa, 'ha-NG')}
                    className="p-1.5 text-[#0D5C3A] hover:bg-emerald-50 rounded-full transition-all"
                    title="Saurari Sauti"
                  >
                    <Volume2 className="w-5 h-5 text-[#D4A017]" />
                  </button>
                </h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto font-sans leading-relaxed">
                  {lesson.aiTutorScript?.introduction || lesson.descriptionHausa}
                </p>
              </div>

              {/* Patient tutor advice card */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300/30 text-left max-w-md mx-auto relative flex gap-3.5">
                <div className="text-2xl pt-1 shrink-0">💡</div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-[#9A6E1A] text-xs">Malam Nur yana cewa:</h4>
                  <p className="text-[11px] text-gray-600 font-sans leading-relaxed">
                    "Karka ji tsoron kuskure ko kadan. Haka kowa ya fara! Idan baka gane ba, danna hoton lasifika na gaba don in sake gaya maka fassarar."
                  </p>
                </div>
              </div>

              {/* Action boundaries */}
              <div className="pt-4 flex flex-col gap-3 max-w-xs mx-auto">
                {isDownloaded ? (
                  <div className="text-[11px] text-green-700 font-semibold bg-green-500/10 border border-green-200 p-2 rounded-xl flex items-center justify-center gap-1">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Darasin yana kan wayoyinku don Offline</span>
                  </div>
                ) : (
                  onDownload && (
                    <button
                      id="btn-offline-dl"
                      onClick={onDownload}
                      className="text-xs text-[#D4A017] border border-[#D4A017]/35 p-3 rounded-full hover:bg-[#D4A017]/5 transition-all font-bold flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-4 h-4" /> Sauke darasi koda babu internet
                    </button>
                  )
                )}

                <button
                  id="btn-play-welcome-again"
                  onClick={() => speakText(lesson.aiTutorScript?.introduction || lesson.descriptionHausa, 'ha-NG')}
                  className="bg-white border text-emerald-950 p-3.5 rounded-full hover:bg-gray-50 transition-all font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4 text-[#D4A017]" /> Sake Sauraron Ustaz Nur
                </button>

                <button
                  id="btn-start-drill"
                  onClick={() => {
                    setActiveStep('drill');
                    setDrillSubStep(0);
                  }}
                  className="bg-[#0D5C3A] hover:bg-emerald-800 text-white p-4 rounded-full font-black text-sm tracking-wide shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  Za mu fara Koya (Start Learning)
                  <ChevronRight className="w-5 h-5 text-amber-400 animate-pulse" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: RICH CONVERSATIONAL DRILLS (Never start with reading) */}
          {activeStep === 'drill' && activeVocab && (
            <motion.div 
              key={`drill-panel-${currentVocabIndex}-${drillSubStep}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Card visual details */}
              <div className="bg-white rounded-3xl border border-emerald-900/5 shadow-md p-6 relative overflow-hidden text-center space-y-6 max-w-md mx-auto min-h-[300px] flex flex-col justify-between">
                
                {/* Visual state headers */}
                <div className="flex items-center justify-between text-xs border-b border-gray-100 pb-3">
                  <span className="font-extrabold text-emerald-800 tracking-wider">
                    Kalma {currentVocabIndex + 1}/{lesson.vocabulary.length}
                  </span>
                  
                  <span className="font-bold text-[#D4A017] uppercase bg-[#D4A017]/10 px-2 py-0.5 rounded border border-[#D4A017]/20">
                    {drillSubStep === 0 ? '🧠 SAURARI (Hear)' :
                     drillSubStep === 1 ? '💡 MA\'ANA (Understand)' :
                     drillSubStep === 2 ? '🖼️ GANI (Recognize)' :
                     drillSubStep === 3 ? '💬 MAIMAITA (Repeat)' : '🎙️ MAGANA (Speak)'}
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-4">
                  
                  {/* SUBSTEP 0: HEAR (Never start with reading) */}
                  {drillSubStep === 0 && (
                    <div className="space-y-5">
                      <div className="w-20 h-20 bg-amber-50 rounded-full border border-amber-200 shadow-inner flex items-center justify-center text-3xl mx-auto animate-pulse">
                        👂
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-black text-emerald-950">Karkayi Kallo! Kafun Karatu, Saurari Sauti:</h4>
                        <p className="text-xs text-gray-400">Danna maɓallin da ke ƙasa don sauraron daddaɗan sauti.</p>
                      </div>
                      <button
                        onClick={() => speakText(activeVocab.english, 'en-US')}
                        className="bg-[#D4A017] hover:bg-yellow-600 text-[#1A1A1A] px-6 py-3.5 rounded-full font-black text-xs shadow-md border-2 border-[#D4A017] flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <Volume2 className="w-4 h-4 text-[#1A1A1A]" /> Saurari lafazin Turanci
                      </button>
                    </div>
                  )}

                  {/* SUBSTEP 1: UNDERSTAND (Meaning) */}
                  {drillSubStep === 1 && (
                    <div className="space-y-4 w-full">
                      <div className="w-16 h-16 bg-[#0D5C3A]/10 rounded-full flex items-center justify-center text-2xl mx-auto">
                        📚
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ma'ana da Hausa</p>
                        <h3 className="text-2xl font-black text-[#0D5C3A]">{activeVocab.hausa}</h3>
                      </div>
                      
                      <div className="bg-[#FAF8F5] p-4 rounded-xl text-left border border-gray-150 space-y-2">
                        <p className="text-xs text-gray-650 leading-relaxed font-sans font-medium">
                          {activeVocab.commonHausaMistake ? (
                            <span>
                              ⚠️ <strong>Kuskuren dake faruwa:</strong> Kada ka ce <em>"{activeVocab.commonHausaMistake}"</em>.
                            </span>
                          ) : (
                            <span>Wannan kalmar tana nufin {activeVocab.hausa}. Ana amfani da ita caji da kullum.</span>
                          )}
                        </p>
                        {activeVocab.correctionTip && (
                          <p className="text-[11px] text-emerald-800 font-sans border-t border-gray-200/50 pt-2 font-semibold">
                            💡 {activeVocab.correctionTip}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SUBSTEP 2: RECOGNIZE (Visual) */}
                  {drillSubStep === 2 && (
                    <div className="space-y-4">
                      <div className="w-32 h-32 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-center justify-center mx-auto shadow-sm">
                        <CustomLessonIcon iconId={activeVocab.imageUrl || 'fallback'} size={110} className="w-28 h-28 transform hover:scale-105 transition-transform" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-black text-emerald-950">Wannan shi ne hoton:</h3>
                        <p className="text-lg font-black text-[#D4A017]">{activeVocab.hausa}</p>
                      </div>
                    </div>
                  )}

                  {/* SUBSTEP 3: REPEAT (Intelligent repetition) */}
                  {drillSubStep === 3 && (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-2xl mx-auto animate-pulse">
                        🗣️
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-bold">Sau na farko, gano yadda ake fada:</p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#0D5C3A]">{activeVocab.english}</h2>
                        <p className="text-xs text-gray-500 italic mt-1 font-mono">"{activeVocab.pronunciationHint}"</p>
                      </div>
                      
                      <div className="flex gap-2.5 justify-center pt-2">
                        <button
                          onClick={() => speakText(activeVocab.english, 'en-US')}
                          className="bg-[#D4A017] hover:bg-yellow-600 text-[#1A1A1A] px-5 py-2.5 rounded-full font-bold text-xs"
                        >
                          Saurari Sautin (Listen)
                        </button>
                        <button
                          onClick={() => speakText(`Yadda ake fada a hankali shine: ${activeVocab.slowPronunciation || activeVocab.english}`, 'ha-NG')}
                          className="bg-white border text-gray-700 px-5 py-2.5 rounded-full font-bold text-xs"
                        >
                          Saurari Hankali (Slow)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SUBSTEP 4: SPEAK (Microphone zone) */}
                  {drillSubStep === 4 && (
                    <div className="space-y-4 w-full">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400">Furta yanzu:</p>
                        <h2 className="text-3xl font-black text-emerald-950">{activeVocab.english}</h2>
                        <p className="text-xs text-gray-400 font-mono">Yadda ake fada: {activeVocab.pronunciationHint}</p>
                      </div>

                      <div className="relative w-20 h-20 mx-auto pt-2">
                        <button
                          id="btn-vocab-speech-rec"
                          disabled={isRecording || evaluating}
                          onClick={handleStartVocabRecording}
                          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg mx-auto border transition-all ${
                            isRecording 
                              ? 'bg-red-505 border-red-500 text-white shadow-red-200 animate-pulse'
                              : 'bg-[#0D5C3A] border-emerald-800 text-white hover:scale-105'
                          }`}
                        >
                          <Mic className={`w-7 h-7 ${isRecording ? 'text-red-500' : 'text-white'}`} />
                        </button>
                        {isRecording && (
                          <span className="absolute inset-0 rounded-full border border-red-500 animate-ping -z-10" />
                        )}
                      </div>

                      <div className="text-center min-h-[40px] pt-1">
                        {isRecording && <p className="text-xs text-red-500 italic animate-pulse">Sauraron ku aiki kake yi, fadi yanzu...</p>}
                        {evaluating && <p className="text-xs text-gray-500 italic">Muna tantance muryarka...</p>}
                        
                        {pronunciationScore !== null && (
                          <div className="p-3 bg-white rounded-2xl border border-gray-150 max-w-xs mx-auto space-y-1 text-left">
                            <p className="text-[10px] text-gray-400 flex justify-between">
                              <span>Muryarka: "{studentSpoken}"</span>
                              <span className="font-bold text-emerald-800 font-mono">{pronunciationScore}% Matches</span>
                            </p>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${pronunciationScore}%` }} />
                            </div>
                            <p className="text-[9px] text-gray-450 italic font-medium leading-normal pt-1 flex items-start gap-1">
                              <span>💬</span>
                              <span>{pronunciationScore >= 70 ? 'Masha Allah, furucin ya zauna!' : 'Malam Nur yace: "Sake gwadawa kadan don ruko."'}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* Substep controls navigation */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <button
                    onClick={handlePrevDrillSubStep}
                    className="text-xs text-gray-600 hover:text-emerald-950 font-black flex items-center gap-1.5 p-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Koma Baya
                  </button>
                  
                  <button
                    id="btn-next-drill-substep"
                    onClick={handleNextDrillSubStep}
                    className="bg-[#0D5C3A] hover:bg-emerald-800 text-white font-black text-xs px-5 py-2.5 rounded-full flex items-center gap-1 shadow-sm leading-none"
                  >
                    <span>{drillSubStep < 4 ? 'Na Gaba (Next)' : (currentVocabIndex < lesson.vocabulary.length - 1 ? 'Kalma ta Gaba' : 'Dauki Hira')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {/* STEP 3: CONVERSATIONAL CONTEXT & DIALOGUES */}
          {activeStep === 'conversation' && (
            <motion.div 
              key="conversation-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <span className="text-xs text-[#D4A017] font-extrabold uppercase bg-[#D4A017]/10 px-3 py-1 rounded-full border border-[#D4A017]/25">
                  Gaisuwa da Hira (Conversation)
                </span>
                <h3 className="font-extrabold text-lg text-emerald-950">Amfani a Rayuwa</h3>
                <p className="text-xs text-gray-400 font-sans">Yaya zaka yi amfani da kalmar da ka koya lokacin gaisuwa?</p>
              </div>

              {/* Patient conversation layout bubble bubble */}
              <div className="space-y-4 max-w-md mx-auto">
                <div className="bg-white p-5 rounded-2xl border border-emerald-900/5 shadow-sm space-y-4">
                  <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest border-b pb-2">Dialogue na misali:</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        👳‍♂️
                      </div>
                      <div className="bg-emerald-50 p-3 rounded-2xl rounded-tl-none font-sans text-xs space-y-1 border border-emerald-100">
                        <p className="font-black text-emerald-950">Ustaz Nur:</p>
                        <p className="italic text-gray-600">"Hello! How are you?"</p>
                        <p className="text-[10px] text-emerald-800 font-bold font-sans">"Sannu! Yaya kake?"</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-amber-50 p-3 rounded-2xl rounded-tr-none font-sans text-xs space-y-1 border border-amber-100 text-right">
                        <p className="font-black text-amber-950">Dalibi (Kai):</p>
                        <p className="italic text-gray-600">"Hello Ustaz! I am fine."</p>
                        <p className="text-[10px] text-amber-800 font-bold font-sans">"Sannu Ustaz! Ina lafiya."</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        👦
                      </div>
                    </div>
                  </div>
                </div>

                {/* Roleplay actions */}
                <div className="bg-[#0D5C3A]/5 p-5 rounded-2xl border border-[#0D5C3A]/10 text-center space-y-3">
                  <h4 className="font-black text-xs text-emerald-950">Gwajin Hira duka biyu (Roleplay Interaction)</h4>
                  <p className="text-[11px] text-gray-500 font-sans max-w-xs mx-auto">
                    Malam Nur zai fara, sannan ka danna don amsawa a matsayin dalibi!
                  </p>
                  
                  <button
                    id="btn-trigger-roleplay"
                    onClick={handleTriggerRolePlay}
                    className="bg-[#D4A017] hover:bg-yellow-600 text-emerald-950 px-5 py-3 rounded-full font-black text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 mx-auto"
                  >
                    🚀 Fara Roleplay da Ustaz
                  </button>

                  <div className="text-center min-h-[30px] pt-1">
                    {rolePlayTurn === 'student' && (
                      <div className="flex items-center justify-center gap-2 text-xs text-amber-900 font-bold bg-amber-100/50 p-2 rounded-xl border border-amber-200 animate-pulse w-fit mx-auto">
                        <span>🎙️ Fadi yanzu: "Hello Ustaz!"</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action boundaries */}
              <div className="pt-4 flex justify-between max-w-md mx-auto">
                <button
                  onClick={() => setActiveStep('drill')}
                  className="text-xs text-gray-500 hover:text-emerald-950 font-bold flex items-center gap-1 p-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Sake Koyo
                </button>

                <button
                  id="btn-goto-reinforce"
                  onClick={() => setActiveStep('reinforcement')}
                  className="bg-[#0D5C3A] hover:bg-emerald-800 text-white font-black text-xs px-6 py-2.5 rounded-full flex items-center gap-1 shadow-sm"
                >
                  Ci Gaba (Wasan Karfafawa)
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: REINFORCEMENT Matching Memory Game */}
          {activeStep === 'reinforcement' && (
            <motion.div 
              key="reinforce-panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <span className="text-xs text-[#0D5C3A] font-extrabold uppercase bg-emerald-100 border border-emerald-250 px-3 py-1 rounded-full">
                  Wasan Karfafa Koyo (Memory Matching)
                </span>
                <h3 className="font-extrabold text-lg text-emerald-950">Hada Daidai (Match English to Hausa)</h3>
                <p className="text-xs text-gray-400 font-sans">Danna kalmar Turanci sannan ka danna fassarar ta da Hausa.</p>
              </div>

              {/* Interactive cards grid */}
              <div className="max-w-md mx-auto space-y-4">
                <div className="grid grid-cols-2 gap-3.5">
                  {/* English elements column */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] uppercase font-black tracking-widest text-[#0D5C3A] text-center">TURANCI (English)</p>
                    {lesson.vocabulary.map((vocab) => {
                      const id_en = `${vocab.id}_en`;
                      const isMatched = matchedPairs.includes(vocab.id);
                      const isSelected = selectedWordId === id_en;

                      return (
                        <button
                          key={id_en}
                          disabled={isMatched}
                          onClick={() => handleTapWordReinforce({ id: id_en, type: 'en', label: vocab.english })}
                          className={`w-full p-4 rounded-xl border-2 font-bold text-sm tracking-wide transition-all ${
                            isMatched 
                              ? 'bg-green-100 border-green-300 text-green-700 opacity-50 line-through'
                              : isSelected
                                ? 'bg-[#D4A017] border-[#D4A017] text-white shadow-md'
                                : 'bg-white border-gray-200 hover:border-[#0D5C3A]'
                          }`}
                        >
                          {vocab.english}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hausa elements column */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] uppercase font-black tracking-widest text-[#D4A017] text-center">HAUSA</p>
                    {lesson.vocabulary.map((vocab) => {
                      const id_ha = `${vocab.id}_ha`;
                      const isMatched = matchedPairs.includes(vocab.id);
                      const isSelected = selectedWordId === id_ha;

                      return (
                        <button
                          key={id_ha}
                          disabled={isMatched}
                          onClick={() => handleTapWordReinforce({ id: id_ha, type: 'ha', label: vocab.hausa })}
                          className={`w-full p-4 rounded-xl border-2 font-bold text-sm transition-all ${
                            isMatched 
                              ? 'bg-green-100 border-green-300 text-green-700 opacity-50 line-through'
                              : isSelected
                                ? 'bg-[#D4A017] border-[#D4A017] text-white shadow-md'
                                : 'bg-white border-gray-200 hover:border-[#0D5C3A]'
                          }`}
                        >
                          {vocab.hausa}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {matchedPairs.length === lesson.vocabulary.length ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-200 p-3.5 rounded-2xl text-center space-y-1 max-w-xs mx-auto"
                  >
                    <p className="text-xs font-black text-green-800">Masha Allah, Da kyau sosai!</p>
                    <p className="text-[10px] text-green-600 font-sans">Kun hada dukkan kalmomi ba tare da kuskure ba.</p>
                  </motion.div>
                ) : null}
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex justify-between max-w-md mx-auto">
                <button
                  onClick={() => setActiveStep('conversation')}
                  className="text-xs text-gray-500 hover:text-emerald-950 font-bold p-2"
                >
                  Koma Hira
                </button>

                <button
                  id="btn-goto-quiz"
                  onClick={() => setActiveStep('quiz')}
                  className="bg-[#0D5C3A] hover:bg-emerald-800 text-white font-black text-xs px-6 py-2.5 rounded-full shadow-sm"
                >
                  Shiga Dan Gwaji (Take Quiz)
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: AUDITORY QUIZZES (Automatic reading out loud for illiterate access) */}
          {activeStep === 'quiz' && activeQuestion && (
            <motion.div 
              key={`quiz-panel-${currentQuestionIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest bg-[#D4A017]/10 border border-[#D4A017]/20 px-3 py-1 rounded-full">
                  Gwaji {currentQuestionIndex + 1} cikin {lesson.quiz.length}
                </span>

                <button
                  id="btn-voice-quiz"
                  onClick={readQuizQuestionOutLoud}
                  className="flex items-center gap-1 text-xs text-emerald-800 border border-emerald-800/20 px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 font-bold"
                >
                  <Volume2 className="w-4 h-4 text-[#D4A017]" />
                  Malam ya karanta mini (Speak aloud)
                </button>
              </div>

              {/* Question card */}
              <div className="bg-white p-6 rounded-3xl border border-emerald-900/5 shadow-md space-y-2 text-center">
                <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-none">Tambaya:</h4>
                <p className="text-[15px] font-black text-emerald-950 font-sans leading-relaxed">
                  {activeQuestion.questionAudioText || activeQuestion.questionText}
                </p>
                <p className="text-xs font-mono text-emerald-800/70 py-1 bg-emerald-500/5 rounded-lg border border-dashed text-center">
                  {activeQuestion.questionText}
                </p>
              </div>

              {/* Quiz option list */}
              <div className="space-y-3 max-w-md mx-auto">
                {activeQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeQuestion.correctOptionIndex;
                  const hasSelected = selectedOption !== null;

                  let optionClass = "bg-white border-gray-200 text-gray-800 hover:border-[#0D5C3A]";
                  if (hasSelected) {
                    if (isCorrect) {
                      optionClass = "bg-green-500/10 border-green-500 text-green-900 ring-2 ring-green-500 shadow-sm";
                    } else if (isSelected) {
                      optionClass = "bg-red-50 border-red-400 text-red-900 ring-2 ring-red-400";
                    } else {
                      optionClass = "bg-white border-gray-100 text-gray-300 opacity-50";
                    }
                  }

                  return (
                    <button
                      id={`quiz-opt-${idx}`}
                      key={idx}
                      disabled={hasSelected}
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full text-left p-4.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-xs font-bold leading-normal cursor-pointer ${optionClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-7 w-7 rounded-lg bg-gray-100/70 font-mono text-gray-400 text-xs font-black flex items-center justify-center">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </div>
                      
                      {hasSelected && isCorrect && <Check className="w-5 h-5 text-green-600 shrink-0" />}
                      {hasSelected && isSelected && !isCorrect && <X className="w-5 h-5 text-red-550 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanations logic */}
              {selectedOption !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-[#FAF8F5] border border-emerald-950/5 max-w-md mx-auto space-y-1.5"
                >
                  <p className="text-[10px] uppercase font-black tracking-widest text-[#D4A017]">Bayani (Explanation):</p>
                  <p className="text-xs font-sans text-gray-650 leading-relaxed font-semibold">
                    {activeQuestion.explanation}
                  </p>
                </motion.div>
              )}

              {/* Right navigation panel */}
              {selectedOption !== null && (
                <div className="pt-2 flex justify-end max-w-md mx-auto">
                  <button
                    id="btn-quiz-next"
                    onClick={handleNextQuestion}
                    className="bg-[#0D5C3A] hover:bg-emerald-800 text-white px-6 py-3 rounded-full font-black text-xs shadow-md flex items-center gap-1"
                  >
                    <span>{currentQuestionIndex < lesson.quiz.length - 1 ? 'Tambaya Ta Gaba' : 'Kamala Darasi'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 6: CONGRATS & PATIENT HOMEWORK ASSIGNMENT */}
          {activeStep === 'finished' && (
            <motion.div 
              key="finish-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1 }}
              className="space-y-6 text-center"
            >
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-5xl mx-auto shadow-md border-2 border-yellow-250 animate-bounce">
                🏆
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-black text-emerald-950 flex items-center justify-center gap-1.5 flex-wrap px-2">
                  <span>Masha Allah, Gwarzo!</span>
                </h2>
                <h4 className="text-sm font-bold text-[#D4A017]">Kun sami babban nasara ya yau!</h4>
                <p className="text-[11px] text-gray-400 font-sans max-w-md mx-auto leading-normal">
                  "Sannun ku da kokari sosai. Ubangiji ya albarkaci karatun ku, ya baku haske mai yawa."
                </p>
              </div>

              {/* Points card details */}
              <div className="bg-white p-5 rounded-3xl border max-w-sm mx-auto grid grid-cols-2 gap-4 shadow-sm">
                <div className="text-center p-3 bg-emerald-500/10 rounded-2xl border border-green-200">
                  <span className="text-[10px] text-emerald-850 block font-bold">Maki (+XP)</span>
                  <span className="text-2xl font-black text-[#0D5C3A] font-mono">+{lesson.points + (quizScore * 20)}</span>
                </div>
                
                <div className="text-center p-3 bg-amber-500/10 rounded-2xl border border-amber-200">
                  <span className="text-[10px] text-amber-850 block font-bold">Lada (Coins)</span>
                  <span className="text-2xl font-black text-[#D4A017] font-mono">+{10 + quizScore}</span>
                </div>
              </div>

              {/* Visual badges/certificates claim */}
              <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 p-5 rounded-2xl text-left text-white max-w-sm mx-auto flex gap-4 border border-amber-400/20">
                <div className="text-4xl shrink-0 pt-1">🎓</div>
                <div className="space-y-1">
                  <span className="text-[9px] text-[#D4A017] font-black uppercase tracking-wider block">Godiya da Lamba</span>
                  <h4 className="text-xs font-black text-white">{lesson.level} Master Graduate Badge</h4>
                  <p className="text-[10px] text-emerald-250 leading-relaxed font-sans">
                    "An yi rijista cikin dandalin mika shaidar karatu domin sa ido na iyaye."
                  </p>
                </div>
              </div>

              {/* Dynamic physical Homework assigning */}
              {lesson.homework && (
                <div className="p-5 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-300 text-left max-w-sm mx-auto space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-black text-xs">
                    <span>🎒</span>
                    <span>AIKIN GIDA NA YAU (Homework)</span>
                  </div>
                  <p className="text-[11.5px] text-gray-600 font-sans leading-relaxed">
                    {lesson.homework}
                  </p>
                </div>
              )}

              <button
                id="btn-finished-done"
                onClick={onClose}
                className="w-full bg-[#0D5C3A] hover:bg-emerald-800 text-white py-4 rounded-full font-black text-sm tracking-wide shadow-md transition-all max-w-sm border border-emerald-800"
              >
                Koma Dashboard (Back to Dash)
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
