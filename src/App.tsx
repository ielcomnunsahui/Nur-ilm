/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Flame, Award, Sparkles, BookOpen, Volume2, Crown, MessageSquareText, ShieldAlert, Download, Check, Trash2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Models, views, databases and assets
import { LearningLevel, Lesson, UserProgress } from './types';
import { LESSONS, BADGES } from './data';
import { speakText } from './components/AudioVoiceHelper';
import { downloadLessonForOffline, getDownloadedLessonIds, deleteDownloadedLesson } from './utils/offlineHelper';

// Modular learning components
import { LandingPage } from './components/LandingPage';
import { ZeroLiteracyToggle } from './components/ZeroLiteracyToggle';
import { UstazNurChat } from './components/UstazNurChat';
import { LessonPractice } from './components/LessonPractice';
import { CertificateCenter } from './components/CertificateCenter';
import { ParentDashboard } from './components/ParentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CheckoutPortal } from './components/CheckoutPortal';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'dashboard' | 'chat' | 'certificate' | 'parent' | 'admin'>('landing');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [downloadedLessonIds, setDownloadedLessonIds] = useState<string[]>([]);

  // Load downloaded offline lessons list on startup
  useEffect(() => {
    setDownloadedLessonIds(getDownloadedLessonIds());
  }, []);

  const handleDownloadLesson = async (lesson: Lesson) => {
    speakText("Ana sauke wannan darasin yanzu domin amfani ko da babu haɗin yanar gizo. Domin sauƙaƙawa, don Allah ka ɗan jira.", 'ha-NG');
    const success = await downloadLessonForOffline(lesson);
    if (success) {
      setDownloadedLessonIds(getDownloadedLessonIds());
      speakText("An yi nasarar saukar da wannan darasi. Yanzu za ka iya karantawa juri ko da babu internet.", 'ha-NG');
    } else {
      speakText("An samu matsala wajen sauke darasi. Don Allah sake gwadawa.", 'ha-NG');
    }
  };

  const handleRemoveDownload = async (lessonId: string) => {
    const success = await deleteDownloadedLesson(lessonId);
    if (success) {
      setDownloadedLessonIds(getDownloadedLessonIds());
      speakText("An goge wannan darasin da aka sauke domin samun fili lafiya.", 'ha-NG');
    }
  };

  // Core user progress state persisted in localStorage for offline-first support
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('nuralilm_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    return {
      xp: 40,
      coins: 10,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedLessons: [],
      unlockedLevels: [LearningLevel.LEVEL_0, LearningLevel.LEVEL_1],
      badges: ['first_word'],
      isPremium: false,
      name: "Amina Musa",
      role: 'student',
      zeroLiteracyMode: false
    };
  });

  // Save to localStorage whenever progress updates
  useEffect(() => {
    localStorage.setItem('nuralilm_progress', JSON.stringify(progress));
  }, [progress]);

  // Handle addition of points and coins
  const handleAddXp = (xpAward: number, coinAward: number, completedLessonId?: string) => {
    setProgress(prev => {
      const nextXp = prev.xp + xpAward;
      const nextCoins = prev.coins + coinAward;
      const updatedLessons = completedLessonId && !prev.completedLessons.includes(completedLessonId) 
        ? [...prev.completedLessons, completedLessonId]
        : prev.completedLessons;

      // Handle unlocking of next level boundaries as XP expands
      const levels = [...prev.unlockedLevels];
      if (nextXp >= 100 && !levels.includes(LearningLevel.LEVEL_2)) levels.push(LearningLevel.LEVEL_2);
      if (nextXp >= 250 && !levels.includes(LearningLevel.LEVEL_3)) levels.push(LearningLevel.LEVEL_3);
      if (nextXp >= 400 && !levels.includes(LearningLevel.LEVEL_4)) levels.push(LearningLevel.LEVEL_4);
      if (nextXp >= 600 && !levels.includes(LearningLevel.LEVEL_5)) levels.push(LearningLevel.LEVEL_5);

      return {
        ...prev,
        xp: nextXp,
        coins: nextCoins,
        completedLessons: updatedLessons,
        unlockedLevels: levels
      };
    });
  };

  const handleToggleZeroLiteracy = (val: boolean) => {
    setProgress(prev => ({
      ...prev,
      zeroLiteracyMode: val
    }));
  };

  const handlePremiumUpgrade = () => {
    setProgress(prev => ({
      ...prev,
      isPremium: true
    }));
    setShowCheckout(false);
  };

  // Launch lesson or prompt premium gate if it is a locked level
  const handleSelectLesson = (lesson: Lesson) => {
    const freeLevels = [LearningLevel.LEVEL_0, LearningLevel.LEVEL_1];
    if (!progress.isPremium && !freeLevels.includes(lesson.level)) {
      setShowCheckout(true);
      speakText("Wannan matakin na manya ne kadai. Kuna bukatar zama mamba na rukunin Premium don shiga.", 'ha-NG');
    } else {
      setActiveLesson(lesson);
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#F8F6F0] flex flex-col justify-between">
      
      {/* Dynamic Header toolbar inside dashboard screens */}
      {activeView !== 'landing' && (
        <nav className="bg-[#0F6B4B] p-4 text-[#F8F6F0] shadow-md border-b border-[#D4A017]/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div 
              onClick={() => {
                setActiveView('landing');
                setActiveLesson(null);
              }}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90"
            >
              <span className="text-2xl">🕌</span>
              <div>
                <span className="font-black text-sm md:text-base leading-none block font-sans text-white">Nur al-Ilm</span>
                <span className="text-[9px] text-[#D4A017] uppercase tracking-widest font-mono font-bold leading-none">نور العلم</span>
              </div>
            </div>

            {/* Micro score balance and profiles */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 bg-emerald-800 px-3 py-1.5 rounded-full border border-emerald-700/60 font-mono">
                <span className="text-[#D4A017]">🏆</span>
                <span className="font-bold">{progress.xp} XP</span>
              </div>

              <div className="flex items-center gap-1 bg-emerald-800 px-3 py-1.5 rounded-full border border-emerald-700/60 font-mono">
                <span className="text-yellow-400">🪙</span>
                <span className="font-bold">{progress.coins}</span>
              </div>

              <div className="flex items-center gap-1 bg-emerald-800 px-3 py-1.5 rounded-full border border-emerald-700/60 font-mono">
                <span className="text-red-400">🔥</span>
                <span className="font-bold">{progress.streak}</span>
              </div>

              {progress.isPremium && (
                <span className="hidden sm:inline-flex items-center gap-1 bg-[#D4A017] text-[#1A1A1A] px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                  <Crown className="w-3.5 h-3.5 animate-bounce" />
                  Premium Scholar
                </span>
              )}

              {/* Roles Quick-Switch widget */}
              <select
                id="header-role-switcher"
                value={progress.role}
                onChange={(e) => {
                  const role = e.target.value as 'student' | 'parent' | 'admin';
                  setProgress(prev => ({ ...prev, role }));
                  if (role === 'parent') {
                    setActiveView('parent');
                    setActiveLesson(null);
                  } else if (role === 'admin') {
                    setActiveView('admin');
                    setActiveLesson(null);
                  } else {
                    setActiveView('dashboard');
                    setActiveLesson(null);
                  }
                }}
                className="bg-emerald-850 text-[#F8F6F0] p-1 px-2.5 rounded-full border border-emerald-700/50 font-bold text-[11px] focus:outline-none"
              >
                <option value="student">Dalibi (Student)</option>
                <option value="parent">Iyaye (Parent)</option>
                <option value="admin">Gudanarwa (Admin)</option>
              </select>
            </div>
          </div>
        </nav>
      )}

      {/* Primary view routers */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-10">
        <AnimatePresence mode="wait">
          
          {activeView === 'landing' && (
            <motion.div 
              key="landing" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <LandingPage 
                onStart={() => setActiveView('dashboard')}
                onSelectRole={(role) => {
                  setProgress(prev => ({ ...prev, role }));
                  if (role === 'parent') setActiveView('parent');
                  if (role === 'admin') setActiveView('admin');
                  if (role === 'student') setActiveView('dashboard');
                }}
              />
            </motion.div>
          )}

          {activeView === 'dashboard' && !activeLesson && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Student Greetings Board */}
              <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 p-6 md:p-8 rounded-2xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 z-10 text-center md:text-left">
                  <span className="text-yellow-400 text-3xl">👳‍♂️</span>
                  <h2 className="text-xl md:text-3xl font-bold tracking-tight">Barka da safiya, {progress.name}!</h2>
                  <p className="text-emerald-200 text-xs md:text-sm max-w-md font-sans leading-relaxed">
                    Ka sani cewa ilimi haske ne. Ustaz Nur yana nan don tattaunawa da kai a kowane kuskure.
                  </p>
                </div>

                <div className="flex gap-3 z-10 flex-wrap justify-center">
                  <button
                    id="btn-goto-ai-tutor"
                    onClick={() => {
                      setActiveView('chat');
                    }}
                    className="flex items-center gap-1.5 bg-[#D4A017] hover:bg-yellow-600 text-[#1A1A1A] px-5 py-3 rounded-full font-black text-xs tracking-wider uppercase shadow-md transition-all hover:scale-105"
                  >
                    <MessageSquareText className="w-4 h-4" />
                    Hira da Ustaz Nur (AI Tutor)
                  </button>
                  <button
                    id="btn-dashboard-scertificate"
                    onClick={() => setActiveView('certificate')}
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-5 py-3 rounded-full font-bold text-xs"
                  >
                    Shaidar Karatu (Certificates)
                  </button>
                </div>
              </div>

              {/* Levels road blocks mapping */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Levels checklist on the left */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-extrabold text-sm uppercase tracking-widest text-[#0F6B4B]">Dandalin darussa (Learning Path)</h3>
                  
                  <div className="space-y-3">
                    {LESSONS.map((lesson) => {
                      const isCompleted = progress.completedLessons.includes(lesson.id);
                      const isFree = [LearningLevel.LEVEL_0, LearningLevel.LEVEL_1].includes(lesson.level);
                      const isLocked = !progress.isPremium && !isFree;

                      return (
                        <div 
                          key={lesson.id}
                          className="bg-white p-5 rounded-xl border border-emerald-900/5 shadow-sm hover:shadow-md transition-all flex items-start justify-between gap-4"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                              isCompleted ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-amber-50 text-[#D4A017] border border-amber-100'
                            }`}>
                              {lesson.vocabulary[0]?.imageUrl || '📖'}
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] bg-emerald-50 text-[#0F6B4B] font-bold px-2 py-0.5 rounded-full border border-[#0F6B4B]/20">
                                  {lesson.level}
                                </span>
                                {isLocked && (
                                  <span className="text-[9px] bg-amber-50 text-[#D4A017] font-black px-1.5 py-0.5 rounded uppercase border border-[#D4A017]/30 flex items-center gap-1">
                                    <Crown className="w-3 h-3 text-[#D4A017]" /> Locked
                                  </span>
                                )}
                                {isCompleted && (
                                  <span className="text-[10px] bg-green-50 text-green-600 font-bold px-1.5 py-0.5 rounded leading-none">Completed</span>
                                )}
                              </div>
                              <h4 className="font-bold text-sm text-emerald-950 font-sans">{lesson.title}</h4>
                              <p className="text-xs text-gray-400 font-medium">{lesson.titleHausa}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Download Action Handler */}
                            {downloadedLessonIds.includes(lesson.id) ? (
                              <div className="flex items-center gap-1 bg-green-50/50 border border-green-100 p-1.5 rounded-full" title="Darasi a shirye yake don amfani offline (Ready offline)">
                                <Check className="w-3.5 h-3.5 text-green-600" />
                                <span className="text-[10px] text-green-600 font-bold pr-1 hidden sm:inline">Sauke</span>
                                <button
                                  id={`btn-remove-download-${lesson.id}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveDownload(lesson.id);
                                  }}
                                  className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-all"
                                  title="Goge darasin da aka zazzage"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                id={`btn-download-lesson-${lesson.id}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownloadLesson(lesson);
                                }}
                                className="p-2 bg-[#D4A017]/10 hover:bg-[#D4A017]/20 text-[#D4A017] rounded-full transition-all border border-[#D4A017]/20 flex items-center gap-1.5"
                                title="Zazzage wannan darasi don amfani offline"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-extrabold hidden sm:inline">Sauke (Download)</span>
                              </button>
                            )}

                            <button
                              id={`btn-select-lesson-${lesson.id}`}
                              onClick={() => handleSelectLesson(lesson)}
                              className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${
                                isCompleted 
                                  ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' 
                                  : 'bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] shadow-sm'
                              }`}
                            >
                              {isCompleted ? 'Maimaita (Repeat)' : 'Farawa (Start)'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Badges and milestones overview on the right */}
                <div className="space-y-6">
                  {/* Premium subscription push */}
                  {!progress.isPremium && (
                    <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-[#D4A017]/40 p-5 rounded-xl space-y-4">
                      <div className="flex gap-2.5 items-start">
                        <Crown className="w-6 h-6 text-[#D4A017] animate-pulse shrink-0" />
                        <div>
                          <h4 className="font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Murna Ta Tabbata (Get Premium)</h4>
                          <p className="text-xs text-gray-550 leading-relaxed">Bude rukunoni na 3, 4 da 5 don sadarwa na kwararru, zazzage satifiket da karin maki.</p>
                        </div>
                      </div>
                      <button
                        id="btn-trigger-checkout-premium"
                        onClick={() => setShowCheckout(true)}
                        className="w-full py-2.5 bg-[#D4A017] hover:bg-[#b08412] text-white rounded-lg font-bold text-xs tracking-wider uppercase transition-all"
                      >
                        Bude Komai NGN 1500
                      </button>
                    </div>
                  )}

                  {/* Quick badges cabinet */}
                  <div className="bg-white p-5 rounded-xl border border-emerald-900/5 shadow-sm space-y-4">
                    <h4 className="font-bold text-xs uppercase text-[#0F6B4B]">Lambobin Nasara (My Badges)</h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {BADGES.slice(0, 4).map((badge) => {
                        const isUnlocked = progress.badges.includes(badge.id) || progress.xp > 150;
                        return (
                          <div 
                            key={badge.id}
                            className={`p-2.5 rounded-lg border text-center space-y-1 ${
                              isUnlocked ? 'bg-orange-50/20 border-orange-100' : 'bg-gray-50 border-gray-150 grayscale opacity-45'
                            }`}
                          >
                            <span className="text-xl">🏆</span>
                            <h5 className="text-[10px] font-bold text-gray-800 truncate">{badge.titleHausa}</h5>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Interactive Lesson Active state overlay */}
          {activeLesson && (
            <motion.div 
              key="lesson"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <LessonPractice 
                lesson={activeLesson}
                progress={progress}
                isDownloaded={downloadedLessonIds.includes(activeLesson.id)}
                onDownload={() => handleDownloadLesson(activeLesson)}
                onAddXp={handleAddXp}
                onClose={() => setActiveLesson(null)}
              />
            </motion.div>
          )}

          {/* AI Tutor Chat view */}
          {activeView === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UstazNurChat 
                progress={progress}
                onAddXp={handleAddXp}
                onGoBack={() => {
                  setActiveView('dashboard');
                  speakText("An dawo babban shafin jarrabawa da dandalin koyo.", 'ha-NG');
                }}
              />
            </motion.div>
          )}

          {/* Certificate View */}
          {activeView === 'certificate' && (
            <motion.div 
              key="certificate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CertificateCenter 
                progress={progress}
                onGoBack={() => setActiveView('dashboard')}
              />
            </motion.div>
          )}

          {/* Parents Dashboard */}
          {activeView === 'parent' && (
            <motion.div 
              key="parent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ParentDashboard 
                progress={progress}
                onUpdateRole={(role) => {
                  setProgress(prev => ({ ...prev, role }));
                  setActiveView(role === 'student' ? 'dashboard' : 'parent');
                }}
                onOpenCertificate={() => setActiveView('certificate')}
                onGoBack={() => setActiveView('dashboard')}
              />
            </motion.div>
          )}

          {/* Administrative view panels */}
          {activeView === 'admin' && (
            <motion.div 
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminDashboard 
                onGoBack={() => setActiveView('dashboard')}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Persistent floating Voice Helper guide */}
      {activeView !== 'landing' && (
        <ZeroLiteracyToggle 
          enabled={progress.zeroLiteracyMode}
          onToggle={handleToggleZeroLiteracy}
          currentPageContext={activeView}
        />
      )}

      {/* Paywall simulated portal overlay */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckoutPortal 
              onSuccessPay={handlePremiumUpgrade}
              onClose={() => setShowCheckout(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
