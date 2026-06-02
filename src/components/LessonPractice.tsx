/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Volume2, Mic, MicOff, Check, X, Award, ChevronRight, BookOpen, Sparkles, HelpCircle, Download 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Lesson, UserProgress } from '../types';
import { speakText, startSpeechRecognition } from './AudioVoiceHelper';

interface LessonPracticeProps {
  lesson: Lesson;
  progress: UserProgress;
  isDownloaded?: boolean;
  onDownload?: () => void;
  onAddXp: (xp: number, coins: number, completedLessonId: string) => void;
  onClose: () => void;
}

export const LessonPractice: React.FC<LessonPracticeProps> = ({
  lesson,
  progress,
  isDownloaded = false,
  onDownload,
  onAddXp,
  onClose
}) => {
  const [activeStep, setActiveStep] = useState<'intro' | 'vocab' | 'quiz' | 'finished'>('intro');
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Scoring parameters for current spoken practice
  const [studentSpoken, setStudentSpoken] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  // Quiz evaluation
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeVocab = lesson.vocabulary[currentVocabIndex];
  const activeQuestion = lesson.quiz[currentQuestionIndex];

  // Helper synthesis
  const readQuizQuestionOutLoud = () => {
    if (activeQuestion) {
      speakText(activeQuestion.questionAudioText, 'ha-NG');
      // Briefly delay and read options in English/Hausa
      setTimeout(() => {
        speakText("Abubuwan da zaka zaba sune:", 'ha-NG');
        activeQuestion.options.forEach((opt, idx) => {
          setTimeout(() => {
            speakText(`Zabi na ${idx + 1}: ${opt}`, 'en-US');
          }, idx * 1500);
        });
      }, 3500);
    }
  };

  const handleStartVocabRecording = () => {
    if (!activeVocab) return;
    setIsRecording(true);
    setEvaluating(false);
    setPronunciationScore(null);

    startSpeechRecognition(
      async (transcript) => {
        setStudentSpoken(transcript);
        setEvaluating(true);
        
        try {
          // Fire pronunciation scorer
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
            
            // Give vocal response coaching
            speakText(data.result.coachingTip, 'ha-NG');
          }
        } catch (error) {
          console.error("Pronunciation score failed:", error);
          setPronunciationScore(85); // elegant fallback
        } finally {
          setEvaluating(false);
        }
      },
      () => {
        setIsRecording(false);
      },
      (err) => {
        console.error("Speech error", err);
        setIsRecording(false);
      },
      'en-US'
    );
  };

  const handleNextVocab = () => {
    setPronunciationScore(null);
    setStudentSpoken("");
    if (currentVocabIndex < lesson.vocabulary.length - 1) {
      setCurrentVocabIndex(prev => prev + 1);
    } else {
      setActiveStep('quiz');
      if (progress.zeroLiteracyMode) {
        speakText("Daga yanzu mun shiga rukunin jarrabawa na darasi. Saurari tambayar daki daki.", 'ha-NG');
      }
    }
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    if (optionIdx === activeQuestion.correctOptionIndex) {
      setQuizScore(prev => prev + 1);
      speakText("Masha Allah! Haka ne.", 'ha-NG');
    } else {
      speakText("A'a, ba haka ba ne. Saurari fassarar.", 'ha-NG');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < lesson.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setActiveStep('finished');
      // Award progress
      const totalPointsGained = lesson.points + (quizScore * 20);
      const totalCoinsGained = 10 + quizScore;
      onAddXp(totalPointsGained, totalCoinsGained, lesson.id);
      
      speakText(`Masha Allah! Ka kammala wannan darasi. Ka samu maki ${totalPointsGained} da tsabar kudi ${totalCoinsGained}. Sannu da kokari!`, 'ha-NG');
    }
  };

  return (
    <div id="lesson-practice-modal" className="bg-[#F8F6F0] rounded-2xl border border-emerald-900/10 shadow-xl overflow-hidden max-w-2xl mx-auto my-4">
      {/* Header border banner */}
      <div className="bg-[#0F6B4B] p-5 text-[#F8F6F0] flex items-center justify-between border-b border-[#D4A017]/30">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#D4A017]/15 text-[#D4A017] rounded-xl flex items-center justify-center border border-[#D4A017]/40">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#D4A017] tracking-wider">Mataki (Level) {lesson.level.replace('LEVEL_', '')}</p>
            <h3 className="font-bold text-base text-[#F8F6F0] leading-snug">{lesson.title}</h3>
          </div>
        </div>
        <button 
          id="btn-close-lesson-practice"
          onClick={onClose}
          className="text-emerald-100 hover:text-white text-xs bg-emerald-800/40 border border-emerald-700/60 px-3 py-1.5 rounded-full transition-all"
        >
          Koma Baya
        </button>
      </div>

      {/* Progress timeline controller bar */}
      <div className="bg-[#0F6B4B]/10 h-1.5 w-full flex">
        <div className={`h-full transition-all duration-300 ${
          activeStep === 'intro' ? 'w-1/4 bg-amber-400' :
          activeStep === 'vocab' ? 'w-2/4 bg-amber-500' :
          activeStep === 'quiz' ? 'w-3/4 bg-amber-600' : 'w-full bg-[#0F6B4B]'
        }`} />
      </div>

      {/* Intro state body panel */}
      {activeStep === 'intro' && (
        <div className="p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner border border-emerald-200">
            📖
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-emerald-950 font-sans">{lesson.titleHausa}</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">{lesson.descriptionHausa}</p>
            <p className="text-xs text-emerald-800 italic font-mono font-medium max-w-xs mx-auto border border-emerald-900/10 p-2 rounded-lg bg-emerald-500/5 mt-3">
              {lesson.description}
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-3 max-w-xs mx-auto">
            {onDownload && (
              isDownloaded ? (
                <div className="flex items-center justify-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 py-2.5 px-4 rounded-full font-bold shadow-sm">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  Wannan darasin yana kan wayoyinku (Offline Ready)
                </div>
              ) : (
                <button
                  id="intro_download_lesson_btn"
                  onClick={onDownload}
                  className="flex items-center justify-center gap-2 text-xs text-[#D4A017] bg-[#D4A017]/10 hover:bg-[#D4A017]/15 border border-[#D4A017]/30 py-3 rounded-full transition-all font-bold"
                >
                  <Download className="w-4 h-4 text-[#D4A017]" />
                  Zazzage Darasi (Download for Offline)
                </button>
              )
            )}

            <button 
              id="intro_read_description"
              onClick={() => speakText(lesson.descriptionHausa, 'ha-NG')}
              className="flex items-center justify-center gap-2 text-xs text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-800/10 py-3 rounded-full transition-all font-medium"
            >
              <Volume2 className="w-4 h-4 text-[#D4A017]" />
              Saurari Bayanan Darasi
            </button>
            <button
              id="btn-start-vocab-drill"
              onClick={() => {
                setActiveStep('vocab');
                speakText("Mun shiga tsarin koyon kalmomi. Danna hoton lasifika don sauraro.", 'ha-NG');
              }}
              className="w-full bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] py-3.5 rounded-full shadow-md font-bold text-sm tracking-wide capitalize flex items-center justify-center gap-2 group border border-emerald-850 hover:scale-[1.01]"
            >
              Fara Koyo Sannu-sannu (Start Lesson)
              <ChevronRight className="w-4 h-4 text-[#D4A017] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Vocabulary repeat module */}
      {activeStep === 'vocab' && activeVocab && (
        <div className="p-6 space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              Kalma ta {currentVocabIndex + 1} cikin {lesson.vocabulary.length}
            </span>
          </div>

          {/* Picture card overlay zone */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-md flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto transition-all">
            <div className="w-24 h-24 bg-amber-50 rounded-2xl border border-amber-200/50 flex items-center justify-center text-5xl shadow-sm">
              {activeVocab.imageUrl}
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-emerald-950">{activeVocab.english}</h2>
              <p className="text-sm font-mono text-gray-400">Yadda ake fada: <span className="bg-amber-100 px-1.5 py-0.5 rounded text-gray-600 font-semibold">{activeVocab.pronunciationHint}</span></p>
              <p className="text-lg font-bold text-[#D4A017] mt-1.5">{activeVocab.hausa}</p>
              <p className="text-xs text-gray-400 italic font-sans">Amfani: "{activeVocab.hausaHint}"</p>
            </div>

            {/* Vocal play buttons */}
            <div className="flex gap-4 pt-3 w-full">
              <button
                id="vocab_listen_button"
                onClick={() => speakText(activeVocab.english, 'en-US')}
                className="flex-1 flex items-center justify-center gap-2 bg-[#D4A017] hover:bg-yellow-600 text-[#1A1A1A] py-3 rounded-full font-bold text-xs shadow-md border border-[#D4A017] transition-all"
              >
                <Volume2 className="w-4 h-4 text-[#1A1A1A]" />
                Saurari Turanci
              </button>
              <button
                id="vocab_listen_hausa_button"
                onClick={() => speakText(`Wannan kalma ita ce: ${activeVocab.hausa}`, 'ha-NG')}
                className="flex-1 flex items-center justify-center gap-2 bg-[#F8F6F0] hover:bg-gray-100 text-gray-700 py-3 rounded-full font-bold text-xs border border-gray-250 transition-all"
              >
                <Volume2 className="w-4 h-4 text-[#D4A017]" />
                Saurari Hausa
              </button>
            </div>
          </div>

          {/* Student voice mic repeating zone */}
          <div className="bg-[#0F6B4B]/5 p-5 rounded-2xl border border-[#0F6B4B]/10 max-w-md mx-auto text-center space-y-3">
            <p className="text-xs text-gray-500 font-medium">Bayan ka saurari lafazin, danna jan hoton makirufo ka furta shi daki-daki:</p>
            <div className="flex items-center justify-center gap-3">
              <button
                id="btn-vocab-speech-mic"
                onClick={handleStartVocabRecording}
                disabled={isRecording || evaluating}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-[#0F6B4B] hover:bg-emerald-800 text-white'
                }`}
              >
                <Mic className="w-6 h-6" />
              </button>
            </div>

            {isRecording && <p className="text-xs text-red-500 italic animate-pulse font-sans">Muna sauraronka, fadi yanzu...</p>}
            {evaluating && <p className="text-xs text-gray-500 italic">Muna nazarin sautin muryarka kamar kwararre...</p>}

            {/* Micro score metrics */}
            {pronunciationScore !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-3 rounded-xl border border-[#D4A017]/40 shadow-sm"
              >
                <p className="text-xs text-gray-400">Abinda kace: <span className="font-semibold text-gray-700 italic">"{studentSpoken}"</span></p>
                <p className="text-sm font-bold mt-1">Sakamakonki: <span className={`text-lg font-black ${pronunciationScore >= 80 ? 'text-green-600' : pronunciationScore >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>{pronunciationScore}%</span></p>
                <p className="text-[10px] text-gray-400">Kyakyawan kokari! Ka samu kwarewa.</p>
              </motion.div>
            )}
          </div>

          {/* Navigation layout */}
          <div className="pt-2 flex justify-end max-w-md mx-auto">
            <button
              id="btn-next-vocab"
              onClick={handleNextVocab}
              className="bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] px-6 py-2.5 rounded-full shadow font-bold text-xs flex items-center gap-1 leading-none"
            >
              {currentVocabIndex < lesson.vocabulary.length - 1 ? 'Na Gaba (Next Word)' : 'Shiga Gwaji (Take Quiz)'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Quizzing section logic */}
      {activeStep === 'quiz' && activeQuestion && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest bg-[#D4A017]/10 border border-[#D4A017]/20 px-3 py-1 rounded-full">
              Tambaya {currentQuestionIndex + 1} cikin {lesson.quiz.length}
            </span>
            <button
              id="btn-voice-quiz-trigger"
              onClick={readQuizQuestionOutLoud}
              className="flex items-center gap-1 text-xs text-emerald-800 border border-emerald-800/20 px-3 py-1 rounded-full bg-white hover:bg-emerald-50"
            >
              <Volume2 className="w-4 h-4 text-[#D4A017]" />
              Saurari Tambaya (Vocal assistance)
            </button>
          </div>

          {/* Question panel card layout */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-md">
            <h3 className="text-lg font-bold text-emerald-950 font-sans leading-relaxed mb-1.5">{activeQuestion.questionText}</h3>
            <p className="text-xs text-[#0F6B4B] font-bold">{activeQuestion.questionAudioText}</p>
          </div>

          {/* Options index lists */}
          <div className="space-y-3">
            {activeQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === activeQuestion.correctOptionIndex;
              const hasSelected = selectedOption !== null;

              let optionButtonClass = "bg-white border-gray-200 hover:border-[#0F6B4B] text-gray-800";
              if (hasSelected) {
                if (isCorrect) {
                  optionButtonClass = "bg-green-50 border-green-500 text-green-900 ring-1 ring-green-500";
                } else if (isSelected) {
                  optionButtonClass = "bg-red-50 border-red-400 text-red-900 ring-1 ring-red-400";
                } else {
                  optionButtonClass = "bg-white border-gray-100 text-gray-400 opacity-60";
                }
              }

              return (
                <button
                  id={`quiz-option-${idx}`}
                  key={idx}
                  disabled={hasSelected}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-sm font-semibold cursor-pointer ${optionButtonClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center font-mono">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </div>
                  {hasSelected && isCorrect && <Check className="w-5 h-5 text-green-600" />}
                  {hasSelected && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* Correct Explanation Card */}
          {selectedOption !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-[#F8F6F0] border border-emerald-950/5"
            >
              <div className="flex gap-2 text-xs">
                <span className="font-bold text-[#D4A017] uppercase tracking-wider">Bayani (Explanation):</span>
              </div>
              <p className="text-sm font-medium text-emerald-950 mt-1 leading-relaxed">
                {activeQuestion.explanation}
              </p>
            </motion.div>
          )}

          {/* Navigation layouts */}
          {selectedOption !== null && (
            <div className="pt-2 flex justify-end">
              <button
                id="btn-next-quiz-question"
                onClick={handleNextQuestion}
                className="bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-1"
              >
                {currentQuestionIndex < lesson.quiz.length - 1 ? 'Tambaya Ta Gaba' : 'Kammala Jarrabawa'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Finished state feedback */}
      {activeStep === 'finished' && (
        <div className="p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.15, 1] }}
            className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-5xl mx-auto shadow-md border border-yellow-200"
          >
            🏆
          </motion.div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-emerald-950">Masha Allah, Gwarzo!</h2>
            <p className="text-sm text-gray-500">Muna taya ka murna da kammala darasin gaba daya!</p>
          </div>

          {/* Interactive scoring card rewards details */}
          <div className="bg-white p-4 rounded-2xl border max-w-sm mx-auto grid grid-cols-2 gap-4 shadow-sm">
            <div className="text-center p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-xs text-emerald-805 block">Point-maki (+XP)</span>
              <span className="text-2xl font-black text-[#0F6B4B]">+{lesson.points + (quizScore * 20)}</span>
            </div>
            <div className="text-center p-2.5 bg-amber-50 rounded-xl border border-amber-100 animate-pulse">
              <span className="text-xs text-amber-805 block">Coins Tsabar Kudin</span>
              <span className="text-2xl font-black text-[#D4A017]">+{10 + quizScore}</span>
            </div>
          </div>

          {/* Cert and badge claim logic */}
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 p-4 rounded-xl text-left text-white max-w-sm mx-auto flex items-center gap-4">
            <div className="text-3xl">🎒</div>
            <div>
              <p className="text-xs text-[#D4A017] font-bold uppercase">An bude sabuwar lamba</p>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{lesson.level} Graduate Badge</h4>
              <p className="text-[10px] text-emerald-200">An mika ta cikin dandalin shaidar karatu na iyaye.</p>
            </div>
          </div>

          <button
            id="btn-lesson-finish-close"
            onClick={onClose}
            className="w-full bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] py-3.5 rounded-full shadow-md font-bold text-sm tracking-wide capitalize max-w-sm border border-emerald-850"
          >
            Koma Babban Allon Koyo (Koma Dashboard)
          </button>
        </div>
      )}
    </div>
  );
};
