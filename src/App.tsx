/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Flame, Award, Sparkles, BookOpen, Volume2, Crown, MessageSquareText, ShieldAlert, Download, Check, Trash2, Wifi, WifiOff, Smartphone,
  ChevronDown, ChevronUp, Lock, Play, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// Models, views, databases and assets
import { LearningLevel, Lesson, UserProgress } from './types';
import { LESSONS, BADGES } from './data';
import { speakText } from './components/AudioVoiceHelper';
import { downloadLessonForOffline, getDownloadedLessonIds, deleteDownloadedLesson } from './utils/offlineHelper';

const LEVEL_METADATA: Record<LearningLevel, {
  title: string;
  hausaTitle: string;
  desc: string;
  hausaDesc: string;
  audioExplain: string;
  emoji: string;
}> = {
  [LearningLevel.STAGE_0]: {
    title: "Stage 0: Orientation",
    hausaTitle: "Mataki na 0: Neman Tabbaci",
    desc: "Build self-confidence, overcome learning fears, and make your first voice response.",
    hausaDesc: "Tabbatar da zuciya, rage tsoro, da fara fito da muryoyi lafiya.",
    audioExplain: "A wannan mataki na farko na gidauniya, za mu cire tsoron cewa Turanci yana da wahala. Za mu san yadda za mu yi magana da danna kore na microphone.",
    emoji: "🧘‍♂️"
  },
  [LearningLevel.STAGE_1]: {
    title: "Stage 1: Listening Awareness",
    hausaTitle: "Mataki na 1: Gane Sauti da Kunne",
    desc: "Train the ear to recognize common verbal cues like greetings and polite words.",
    hausaDesc: "Horar da kunne da gane sautuka cikin aminci ba tare da rubutu ba.",
    audioExplain: "Hanyar samun nasara tana farawa da sauraro kamar yara kanana. Za mu gane sautukan gaisuwa da jinjina kowane lokaci.",
    emoji: "👂"
  },
  [LearningLevel.STAGE_2]: {
    title: "Stage 2: First Spoken Words",
    hausaTitle: "Mataki na 2: Fara Kiran Sunaye",
    desc: "Connect physical objects and real things to direct English audio names.",
    hausaDesc: "Kiran sunayen manyan abubuwa na rayuwar yau da kullum da dadi.",
    audioExplain: "Yanzu za mu shiga kicin mu fadi kalmomi kamar ruwa da shinkafa da sauran abinci na kusa.",
    emoji: "🍎"
  },
  [LearningLevel.STAGE_3]: {
    title: "Stage 3: Survival English",
    hausaTitle: "Mataki na 3: Gajerun Jimloli",
    desc: "Combine words into short survival phrases to request water, help, or state your identity.",
    hausaDesc: "Hada kananan jimlolin da kake son bukata cikin sauki ba tare da shakku ba.",
    audioExplain: "Wannan babban lokaci ne na fara magana da cikakken bayani, kamar 'I want water' ko 'taimaka min'.",
    emoji: "💬"
  },
  [LearningLevel.STAGE_4]: {
    title: "Stage 4: Everyday Conversations",
    hausaTitle: "Mataki na 4: Tattaunawar Kasuwa",
    desc: "Practice realistic voice simulations representing market trades and local road encounters.",
    hausaDesc: "Gudanar da gajeriyar hira lokacin gaisawa ko a cikin jama'a.",
    audioExplain: "Za mu gudanar da wasan kwaikwayo: yadda za ka yi ciniki a kasuwa ka tambayi kudin kaya.",
    emoji: "🛒"
  },
  [LearningLevel.STAGE_5]: {
    title: "Stage 5: Reading Introduction",
    hausaTitle: "Mataki na 5: Fara Gane Rubutu",
    desc: "Map the words you already speak fluently to written letters and sign boards.",
    hausaDesc: "Ganin haruffa da danganta su da saututan da baki ya saba fada.",
    audioExplain: "Karatu yana da dadi idan ka riga ka san kalmar! Za mu nuna ka kalmar 'Water' da aka rubuta, mu karanta ta.",
    emoji: "📖"
  },
  [LearningLevel.STAGE_6]: {
    title: "Stage 6: Writing Basics",
    hausaTitle: "Mataki na 6: Fara Karatun Rubutu",
    desc: "Develop typing and basic handwriting skills to copy and log short daily needs.",
    hausaDesc: "Kofiyan kalmomi da danna keyboard don ajiye abin dake cikin zuciya.",
    audioExplain: "Yanzu zaka riki fensiri ko keyboard don ka rubuta abin da baka taba zata ba!",
    emoji: "✍️"
  },
  [LearningLevel.STAGE_7]: {
    title: "Stage 7: Functional English",
    hausaTitle: "Mataki na 7: Asibiti & Manyan Gurare",
    desc: "Navigate clinics, banks, and transport hubs with specialized high-needs English.",
    hausaDesc: "Neman taimakon lafiya ko amfani da canaji a gurare kamar asibitoci.",
    audioExplain: "Za mu koyi yadda za mu yi tattaunawa lokacin rashin lafiya: 'I feel sick', don samun taimakon likita cikin sauri.",
    emoji: "🏥"
  },
  [LearningLevel.STAGE_8]: {
    title: "Stage 8: Workplace English",
    hausaTitle: "Mataki na 8: Turanci a Wajen Aiki",
    desc: "Acquire business presentation formats, customer care greetings, and interview self-introductions.",
    hausaDesc: "Sadarwa cikin ofisoshi da manyan kantuna don samun aminci da daukaka.",
    audioExplain: "Babban lokaci ne na mutuncinku: za mu koyi gudanar da interview don neman aiki.",
    emoji: "💼"
  },
  [LearningLevel.STAGE_9]: {
    title: "Stage 9: English Thinking",
    hausaTitle: "Mataki na 9: Tunani kai tsaye",
    desc: "Bypass inner translations from Hausa and express fluid descriptions of pictures or tell stories.",
    hausaDesc: "Cire jinkiri dake faruwa yayan fassara sannan a yi magana cikin sauki.",
    audioExplain: "A nan, duk siffar da ka gani zaka fadi ta kai tsaye ba tare da ka tsaya kana fassara ta a zuciya ba.",
    emoji: "⚡"
  },
  [LearningLevel.STAGE_10]: {
    title: "Stage 10: Fluency Mastery",
    hausaTitle: "Mataki na 10: Fluency & Gwaninta",
    desc: "Converse, read, and write independently at school, work, or hospital with supreme confidence.",
    hausaDesc: "Kammala dukan zangon hasken ilimi da samun babban shaidar karatu.",
    audioExplain: "Alhamdulillah! Wannan shi ne kololuwar gwanancewa inda zaku zama zakaru, masu tattaunawa kamar ruwa!",
    emoji: "👑"
  }
};

// Modular learning components
import { LandingPage } from './components/LandingPage';
import { ZeroLiteracyToggle } from './components/ZeroLiteracyToggle';
import { UstazNurChat } from './components/UstazNurChat';
import { LessonPractice } from './components/LessonPractice';
import { CertificateCenter } from './components/CertificateCenter';
import { ParentDashboard } from './components/ParentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CheckoutPortal } from './components/CheckoutPortal';
import { CustomLessonIcon } from './components/CustomLessonIcon';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'dashboard' | 'chat' | 'certificate' | 'parent' | 'admin'>('landing');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [downloadedLessonIds, setDownloadedLessonIds] = useState<string[]>([]);
  const [swStatus, setSwStatus] = useState<'active' | 'registered' | 'registering' | 'unsupported'>('registering');
  const [isOffline, setIsOffline] = useState(() => typeof navigator !== 'undefined' ? !navigator.onLine : false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [expandedLevel, setExpandedLevel] = useState<string | null>(LearningLevel.STAGE_0);

  // Load downloaded offline lessons list, connectivity, and SW status
  useEffect(() => {
    setDownloadedLessonIds(getDownloadedLessonIds());

    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      setSwStatus('unsupported');
      return;
    }

    const checkServiceWorker = async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        if (registrations.length > 0) {
          const hasActive = registrations.some(r => r.active);
          setSwStatus(hasActive ? 'active' : 'registered');
        } else {
          setSwStatus('registering');
        }
      } catch (err) {
        console.error("SW status check failed:", err);
      }
    };

    checkServiceWorker();

    navigator.serviceWorker.ready.then(() => {
      setSwStatus('active');
    });

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
      console.log('Nur al-Ilm app was successfully installed!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check for potential installed PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
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

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      speakText("Ana gudanar da girkawa ta asali, don Allah danna 'Install' a kan allonku.", 'ha-NG');
      deferredPrompt.prompt();
      try {
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setDeferredPrompt(null);
          setIsInstallable(false);
        }
      } catch (err) {
        console.error("Installation choice error:", err);
      }
    } else {
      setShowPwaModal(true);
      speakText("Don girka wannan app a kan wayarka: idan kana amfani da Chrome ko Android, danna dige guda uku a saman shafin sannan ka zaɓi Girka ko Install App. Idan kuma a kan iPhone kake, danna maɓallin raba ko Share a kasan allonku na Safari, sannan ka danna maɓallin Add to Home Screen.", 'ha-NG');
    }
  };

  const [levelUpAward, setLevelUpAward] = useState<string | null>(null);
  const [lastLevelCount, setLastLevelCount] = useState<number>(0);

  // Core user progress state persisted in localStorage for offline-first support
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('nuralilm_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.lessonProgress) {
          parsed.lessonProgress = {};
        }
        return parsed;
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
      lessonProgress: {},
      unlockedLevels: [LearningLevel.STAGE_0, LearningLevel.STAGE_1],
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

  // Expand the highest unlocked level on mount/update
  useEffect(() => {
    if (progress.unlockedLevels && progress.unlockedLevels.length > 0) {
      const highest = progress.unlockedLevels[progress.unlockedLevels.length - 1];
      setExpandedLevel(highest);
    }
  }, [progress.unlockedLevels]);

  // Detect level up and trigger grand confetti celebration
  useEffect(() => {
    if (!progress.unlockedLevels || progress.unlockedLevels.length === 0) return;
    
    // Set initial count so it doesn't trigger immediately on first load
    if (lastLevelCount === 0) {
      setLastLevelCount(progress.unlockedLevels.length);
      return;
    }
    
    if (progress.unlockedLevels.length > lastLevelCount) {
      const newLevel = progress.unlockedLevels[progress.unlockedLevels.length - 1];
      setLevelUpAward(newLevel);
      setLastLevelCount(progress.unlockedLevels.length);
      
      // Grand celebration confetti
      const duration = 4 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.8 },
          colors: ['#0F6B4B', '#D4A017', '#FFFFFF', '#10B981']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.8 },
          colors: ['#0F6B4B', '#D4A017', '#FFFFFF', '#10B981']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();
      speakText(`Masha Allah! Ka samu sabon matakin karatu, wato ${newLevel}! Matse gaba domin samun nasara!`, 'ha-NG');
    }
  }, [progress.unlockedLevels, lastLevelCount]);

  // Handle addition of points and coins
  const handleAddXp = (xpAward: number, coinAward: number, completedLessonId?: string) => {
    setProgress(prev => {
      const nextXp = prev.xp + xpAward;
      const nextCoins = prev.coins + coinAward;
      const updatedLessons = completedLessonId && !prev.completedLessons.includes(completedLessonId) 
        ? [...prev.completedLessons, completedLessonId]
        : prev.completedLessons;

      const currentProgress = prev.lessonProgress || {};
      const updatedProgress = { ...currentProgress };
      if (completedLessonId) {
        updatedProgress[completedLessonId] = 100;
      }

      // Handle unlocking of next level boundaries as XP expands
      const levels = [...prev.unlockedLevels];
      if (nextXp >= 80 && !levels.includes(LearningLevel.STAGE_2)) levels.push(LearningLevel.STAGE_2);
      if (nextXp >= 150 && !levels.includes(LearningLevel.STAGE_3)) levels.push(LearningLevel.STAGE_3);
      if (nextXp >= 250 && !levels.includes(LearningLevel.STAGE_4)) levels.push(LearningLevel.STAGE_4);
      if (nextXp >= 400 && !levels.includes(LearningLevel.STAGE_5)) levels.push(LearningLevel.STAGE_5);
      if (nextXp >= 550 && !levels.includes(LearningLevel.STAGE_6)) levels.push(LearningLevel.STAGE_6);
      if (nextXp >= 700 && !levels.includes(LearningLevel.STAGE_7)) levels.push(LearningLevel.STAGE_7);
      if (nextXp >= 900 && !levels.includes(LearningLevel.STAGE_8)) levels.push(LearningLevel.STAGE_8);
      if (nextXp >= 1100 && !levels.includes(LearningLevel.STAGE_9)) levels.push(LearningLevel.STAGE_9);
      if (nextXp >= 1300 && !levels.includes(LearningLevel.STAGE_10)) levels.push(LearningLevel.STAGE_10);

      return {
        ...prev,
        xp: nextXp,
        coins: nextCoins,
        completedLessons: updatedLessons,
        lessonProgress: updatedProgress,
        unlockedLevels: levels
      };
    });
  };

  const handleUpdateLessonProgress = (lessonId: string, percentage: number) => {
    setProgress(prev => {
      const currentProgress = prev.lessonProgress || {};
      const currentVal = currentProgress[lessonId] || 0;
      if (currentVal < percentage) {
        return {
          ...prev,
          lessonProgress: {
            ...currentProgress,
            [lessonId]: Math.min(percentage, 100)
          }
        };
      }
      return prev;
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
    const freeLevels = [LearningLevel.STAGE_0, LearningLevel.STAGE_1];
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
              
              {/* Service Worker (Offline Ready) & Network Connectivity Indicator */}
              <div 
                id="offline-sw-status-indicator"
                onClick={() => {
                  if (isOffline) {
                    speakText("Kuna yin amfani da dandalin ne ba tare da haɗin yanar gizo ba. Tsarin service worker yana aiki don kiyaye dukkan darasinku.", 'ha-NG');
                  } else {
                    speakText(`Kuna da haɗin yanar gizo. Kuma tsarin service worker yana kunna don tallafawa offline kowane lokaci.`, 'ha-NG');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-help transition-all shadow-sm ${
                  isOffline 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                  : 'bg-emerald-800/85 text-emerald-300 border-emerald-700/60'
                }`}
                title={`Koneksyon: ${isOffline ? 'Offline' : 'Online'} | Service Worker: ${swStatus}`}
              >
                {isOffline ? (
                  <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                ) : (
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span className="font-bold tracking-wide hidden md:inline">
                  {isOffline ? 'Yanayin Offline (SW Active)' : 'Kan Gizo (SW Active)'}
                </span>
                <span className="font-bold tracking-wide md:hidden">
                  {isOffline ? 'Offline' : 'Online'}
                </span>
              </div>

              {/* Install PWA Button */}
              <button 
                id="pwa-install-header-btn"
                onClick={handleInstallApp}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-emerald-950 border border-amber-400 cursor-pointer transition-all shadow-sm font-bold font-sans text-xs animate-pulse"
                title="Girka App a kan Waya (Install App on Phone)"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-950" />
                <span className="hidden lg:inline font-bold">Girka App</span>
                <span className="lg:hidden font-bold">Girka</span>
              </button>

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
                onInstall={handleInstallApp}
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

              {/* Refined and Enhanced Dandalin darussa (Learning Path) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Levels road blocks map trail on the left */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                    <div>
                      <h3 className="font-extrabold text-base md:text-lg text-[#0F6B4B]">Dandalin darussa (Learning Road)</h3>
                      <p className="text-xs text-gray-500 font-sans">Zaɓi matakin da kake so ka koya daki-daki</p>
                    </div>

                    <div className="text-[10px] font-bold text-emerald-850 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-900/10 flex items-center gap-1">
                      <span>🚀</span> Unlocked: {progress.unlockedLevels.length} Matakai
                    </div>
                  </div>

                  {/* Winding road structure of collapsible levels */}
                  <div className="space-y-4">
                    {Object.entries(LEVEL_METADATA).map(([levelKey, meta]) => {
                      const level = levelKey as LearningLevel;
                      const levelLessons = LESSONS.filter(l => l.level === level);
                      if (levelLessons.length === 0) return null;

                      const isUnlocked = progress.unlockedLevels.includes(level);
                      const doneL = levelLessons.filter(l => progress.completedLessons.includes(l.id)).length;
                      const totalL = levelLessons.length;
                      const isCompleted = doneL === totalL && totalL > 0;
                      const levelPct = totalL > 0 ? Math.round((doneL / totalL) * 100) : 0;
                      const isExpanded = expandedLevel === level;

                      return (
                        <div 
                          key={level}
                          className={`bg-white rounded-2xl border transition-all duration-305 overflow-hidden ${
                            isExpanded 
                              ? 'border-emerald-800/20 shadow-md ring-1 ring-emerald-800/10' 
                              : 'border-emerald-900/5 shadow-sm hover:border-emerald-800/10'
                          }`}
                        >
                          {/* LEVEL HEADER CLICK ZONE */}
                          <div 
                            id={`level-header-${level}`}
                            onClick={() => {
                              if (isUnlocked) {
                                setExpandedLevel(isExpanded ? null : level);
                              } else {
                                speakText("Wannan mataki a rufe yake. Don Allah ka kammala darussan baya don ka bude shi, ko ka sayi Premium.", "ha-NG");
                              }
                            }}
                            className={`p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer select-none transition-all ${
                              isExpanded ? 'bg-emerald-50/20' : 'hover:bg-gray-50/50'
                            } ${!isUnlocked ? 'opacity-70' : ''}`}
                          >
                            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border shadow-sm transition-transform ${
                                isExpanded ? 'scale-105' : ''
                              } ${
                                isCompleted 
                                  ? 'bg-green-100 border-green-200 text-green-700' 
                                  : isUnlocked 
                                    ? 'bg-amber-50 border-amber-200 text-amber-700' 
                                    : 'bg-gray-150 border-gray-200 text-gray-400'
                              }`}>
                                {isUnlocked ? meta.emoji : <Lock className="w-5 h-5 text-gray-400" />}
                              </div>

                              <div className="min-w-0 flex-1 text-left">
                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#D4A017] font-mono">
                                    {level.replace(/_/g, ' ')}
                                  </span>
                                  {!isUnlocked && (
                                    <span className="text-[8px] bg-red-50 text-red-600 font-extrabold px-1.5 py-0.5 rounded border border-red-200 uppercase tracking-widest leading-none">
                                      A Rufe
                                    </span>
                                  )}
                                  {isCompleted && (
                                    <span className="text-[8px] bg-green-500 text-white font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest leading-none">
                                      Kammalawa!
                                    </span>
                                  )}
                                  {isUnlocked && !isCompleted && doneL > 0 && (
                                    <span className="text-[8px] bg-amber-500 text-[#1A1A1A] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest leading-none">
                                      Aiki yana Tafiya
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-extrabold text-sm md:text-base text-emerald-950 truncate leading-tight">
                                  {meta.hausaTitle}
                                </h4>
                                <p className="text-xs text-gray-400 truncate font-sans">
                                  {meta.title}
                                </p>
                              </div>
                            </div>

                            {/* RIGHT ACTION: NARRATION PLAY & MINI PROGRESS CIRCLE / EXPAND */}
                            <div className="flex items-center gap-3 shrink-0">
                              {/* Malam Nur warm explanation play button */}
                              {isUnlocked && (
                                <button
                                  type="button"
                                  id={`btn-level-explain-${level}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakText(meta.audioExplain, "ha-NG");
                                  }}
                                  className="w-8 h-8 rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 text-[#0F6B4B] flex items-center justify-center border border-emerald-500/20 transition-all hover:scale-105"
                                  title="Saurari Bayanin Malam Nur akan wannan matakin"
                                >
                                  <Volume2 className="w-4 h-4 text-[#D4A017]" />
                                </button>
                              )}

                              {/* Progress bar info */}
                              {isUnlocked && (
                                <div className="hidden sm:flex flex-col items-end text-right">
                                  <span className="text-[9px] font-bold text-gray-455 uppercase tracking-wide leading-none mb-1">Kammalawa:</span>
                                  <span className="text-xs font-black text-emerald-950 font-mono leading-none">{doneL}/{totalL} Darussa</span>
                                </div>
                              )}

                              <div className="text-gray-400">
                                {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-900" /> : <ChevronDown className="w-5 h-5" />}
                              </div>
                            </div>
                          </div>

                          {/* EXPANDED LESSONS LIST (PATHWAY WINDING ROAD) */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="border-t border-emerald-900/5 bg-[#FAFAF9]"
                              >
                                <div className="p-4 md:p-6 space-y-4 relative">
                                  {/* Malam level guide intro speech Bubble banner */}
                                  <div className="bg-emerald-900 text-emerald-50 p-4 rounded-xl border-l-4 border-amber-400 relative flex gap-3.5 shadow-sm text-left">
                                    <span className="text-2xl pt-0.5 shrink-0 select-none">👳‍♂️</span>
                                    <div className="space-y-1">
                                      <h5 className="font-extrabold text-[9px] text-amber-300 uppercase tracking-wider">Malam Nur yana muku jagoranci:</h5>
                                      <p className="text-xs leading-relaxed font-sans font-medium text-emerald-100">
                                        &quot;{meta.audioExplain}&quot;
                                      </p>
                                      <button
                                        type="button"
                                        id={`btn-malam-lessons-intro-${level}`}
                                        onClick={() => speakText(`Darasoshin dake cikin ${meta.hausaTitle} sune kamar haka. Danna farawa domin mu soma!`, "ha-NG")}
                                        className="text-[10px] text-amber-300 hover:text-amber-400 hover:underline font-bold flex items-center gap-1 pt-1 ml-0"
                                      >
                                        <Volume2 className="w-3.5 h-3.5" />
                                        <span>Danna nan don jin fassarar duka darussa (Play Intro)</span>
                                      </button>
                                    </div>
                                  </div>

                                  {/* Lessons listing matching winding road connector line */}
                                  <div className="space-y-4 relative pl-4 sm:pl-6">
                                    {/* Connecting path line on the left side of cards */}
                                    <div className="absolute top-2 bottom-6 left-1.5 sm:left-3.5 w-[2px] border-l-2 border-dashed border-emerald-900/15" />

                                    {levelLessons.map((lesson, idx) => {
                                      const isLessonCompleted = progress.completedLessons.includes(lesson.id);
                                      const isFreeLesson = [LearningLevel.STAGE_0, LearningLevel.STAGE_1].includes(lesson.level);
                                      const isLessonLocked = !progress.isPremium && !isFreeLesson;
                                      const lessonPct = isLessonCompleted ? 100 : (progress.lessonProgress?.[lesson.id] || 0);

                                      return (
                                        <div 
                                          key={lesson.id}
                                          className={`relative bg-white p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transition-all hover:shadow-md ${
                                            isLessonCompleted 
                                              ? 'border-green-150 bg-green-50/5' 
                                              : 'border-emerald-900/5'
                                          }`}
                                        >
                                          {/* Stepping stone circle indicator */}
                                          <div className={`absolute -left-[25px] sm:-left-[29px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black font-mono shadow-sm z-10 transition-colors ${
                                            isLessonCompleted 
                                              ? 'bg-green-500 border-white text-white' 
                                              : 'bg-white border-[#D4A017] text-[#D4A017]'
                                          }`}>
                                            {idx + 1}
                                          </div>

                                          {/* Content Left visual layout */}
                                          <div className="flex items-center gap-3.5 flex-1 min-w-0 text-left">
                                            <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border shadow-inner ${
                                              isLessonCompleted ? 'bg-green-50/70 border-green-200' : 'bg-amber-50/50 border-amber-200'
                                            }`}>
                                              <CustomLessonIcon iconId={lesson.vocabulary[0]?.imageUrl || 'fallback'} size={36} className="w-9 h-9 shrink-0 transform hover:scale-105 transition-transform" />
                                            </div>

                                            <div className="space-y-1 min-w-0 flex-1">
                                              <div className="flex items-center gap-1.5 flex-wrap">
                                                {isLessonLocked && (
                                                  <span className="text-[8px] bg-amber-100 text-[#D4A017] font-black px-1.5 py-0.5 rounded uppercase border border-[#D4A017]/30 flex items-center gap-0.5">
                                                    <Crown className="w-2.5 h-2.5 text-[#D4A017]" /> Locked
                                                  </span>
                                                )}
                                                {isLessonCompleted && (
                                                  <span className="text-[8px] bg-green-100 text-green-750 font-extrabold px-1.5 py-0.5 rounded leading-none uppercase tracking-wide">
                                                    Na Gama (Done)
                                                  </span>
                                                )}
                                                <button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    speakText(lesson.aiTutorScript?.introduction || lesson.descriptionHausa, "ha-NG");
                                                  }}
                                                  className="p-1 text-[#0D5C3A] hover:bg-emerald-50 rounded-full transition-all flex items-center gap-1"
                                                  title="Saurari bayanin darasi kafin farawa"
                                                >
                                                  <Volume2 className="w-3.5 h-3.5 text-[#D4A017]" />
                                                  <span className="text-[9px] text-gray-500 font-bold hidden sm:inline">Saurari bita (Intro)</span>
                                                </button>
                                              </div>
                                              <h4 className="font-extrabold text-sm text-emerald-950 font-sans truncate pr-2">
                                                {lesson.title}
                                              </h4>
                                              <p className="text-xs text-gray-400 font-semibold truncate leading-none">
                                                {lesson.titleHausa}
                                              </p>

                                              {/* Custom nested micro progress meter */}
                                              <div className="pt-2 w-36 sm:w-48 space-y-1">
                                                <div className="flex justify-between items-center text-[8px] font-extrabold">
                                                  <span className="text-gray-400 uppercase tracking-wider">Gwanancewa level (Progress)</span>
                                                  <span className={isLessonCompleted || lessonPct === 100 ? 'text-green-650 font-bold' : 'text-[#D4A017]'}>
                                                    {lessonPct}%
                                                  </span>
                                                </div>
                                                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-250/20">
                                                  <div 
                                                    className={`h-full rounded-full transition-all duration-350 ${
                                                      isLessonCompleted || lessonPct === 100 ? 'bg-green-500' : 'bg-[#D4A017]'
                                                    }`}
                                                    style={{ width: `${lessonPct}%` }}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Actions right panel */}
                                          <div className="flex items-center justify-end gap-2 border-t sm:border-0 border-gray-100 pt-3 sm:pt-0 shrink-0">
                                            {/* Offline support download toggle */}
                                            {downloadedLessonIds.includes(lesson.id) ? (
                                              <div className="flex items-center gap-1 bg-green-50 border border-green-200 p-1.5 rounded-full" title="Darasi a shirye yake don amfani offline (Ready offline)">
                                                <Check className="w-3.5 h-3.5 text-green-600" />
                                                <span className="text-[9px] text-green-650 font-black pr-1 hidden lg:inline">Offline Ready</span>
                                                <button
                                                  id={`btn-remove-download-${lesson.id}`}
                                                  type="button"
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
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleDownloadLesson(lesson);
                                                }}
                                                className="p-2 bg-[#D4A017]/10 hover:bg-[#D4A017]/20 text-[#D4A017] rounded-full transition-all border border-[#D4A017]/20 flex items-center gap-1.5"
                                                title="Zazzage wannan darasi don amfani offline"
                                              >
                                                <Download className="w-3.5 h-3.5" />
                                                <span className="text-[8px] font-black hidden lg:inline">Ajiye (Offline)</span>
                                              </button>
                                            )}

                                            <button
                                              id={`btn-select-lesson-${lesson.id}`}
                                              type="button"
                                              onClick={() => handleSelectLesson(lesson)}
                                              className={`px-4.5 py-2.5 rounded-full font-extrabold text-xs transition-all shadow-sm flex items-center gap-1 cursor-pointer leading-none min-h-[44px] ${
                                                isLessonCompleted 
                                                  ? 'bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200' 
                                                  : 'bg-[#0F6B4B] hover:bg-emerald-850 text-[#F8F6F0]'
                                              }`}
                                            >
                                              <span>{isLessonCompleted ? 'Maimaita (Repeat)' : 'Farawa (Start)'}</span>
                                              <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

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
                onUpdateProgress={handleUpdateLessonProgress}
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
          currentPageContext={showCheckout ? 'checkout' : activeView}
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

      {/* PWA Custom Installation Guide Modal */}
      <AnimatePresence>
        {showPwaModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#F8F6F0] w-full max-w-lg rounded-2xl overflow-hidden border border-[#D4A017] shadow-2xl flex flex-col"
            >
              <div className="bg-[#0F6B4B] p-5 text-white flex items-center justify-between border-b border-[#D4A017]/30">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <h3 className="font-extrabold text-sm sm:text-base tracking-wide">Yadda Ake Girka App (Install Guide)</h3>
                </div>
                <button 
                  onClick={() => speakText("Domin girka wannan app a kan wayarka: idan kana amfani da Chrome ko Android, danna dige guda uku a saman shafin sannan ka zaɓi Girka ko Install App. Idan kuma a kan iPhone kake, danna maɓallin raba ko Share a kasan allonku na Safari, sannan ka danna maɓallin Add to Home Screen.", 'ha-NG')}
                  className="p-1 px-2.5 bg-emerald-800/80 hover:bg-emerald-800 text-amber-300 font-bold rounded-lg text-[10px] flex items-center gap-1 border border-emerald-700"
                  title="Saurari Bayanin Yadda za a shigar"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Saurari Bayani
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh] text-emerald-950">
                <div className="space-y-2">
                  <h4 className="font-black text-sm text-[#0F6B4B] border-b pb-1 flex items-center gap-1.5">
                    🤖 Wayoyin Android (Chrome / Edge / Samsung)
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-700">
                    1. Idan ba ka ga sakon shigarwa ba, danna <strong>dige guda uku (Menu ⋮)</strong> dake babban kusurwar dama na browser dinka.<br />
                    2. Gungura kasa sannan ka zabi <strong>&quot;Add to Home screen&quot;</strong> ko <strong>&quot;Install app&quot;</strong>.<br />
                    3. Danna <strong>&quot;Install&quot;</strong> don girka shi a wayar salularka kyauta.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-black text-sm text-[#0F6B4B] border-b pb-1 flex items-center gap-1.5">
                    🍏 Wayoyin iPhone & iPad (Safari Only)
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-700">
                    1. Tabbatar kana amfani da browser ta asali wato <strong>Safari</strong>.<br />
                    2. Danna maɓallin <strong>Raba (Share button ⎋)</strong> dake kasan allon wayar taka.<br />
                    3. Gungura menu din sannan ka danna <strong>&quot;Add to Home Screen ⊞&quot;</strong>.<br />
                    4. Danna <strong>&quot;Add&quot;</strong> a saman kusurwar dama don kammalawa.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-xs space-y-1">
                  <span className="font-black text-amber-900 block">💡 Me yasa za ka girka application dinmu?</span>
                  <p className="text-gray-600 leading-relaxed">
                    Bayan ka shigar da shi a kan wayarka, zaka rika samun cikakken damar shiga dandalin ko da babu internet, kuma zai kasance yana aiki cikin sauri kowane lokaci ba tare da bude browser ba. Wannan shi ne babban sauki gare ku!
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-4 border-t border-emerald-900/10 flex justify-end gap-3">
                <button 
                  onClick={() => setShowPwaModal(false)}
                  className="px-5 py-2.5 bg-[#0F6B4B] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow"
                >
                  Na Gane (OK)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Reward Celebration Modal */}
      <AnimatePresence>
        {levelUpAward && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-gradient-to-b from-[#FAF8F5] to-[#F3EFE9] w-full max-w-md rounded-3xl overflow-hidden border-2 border-[#D4A017] shadow-2xl p-6 text-center space-y-6 relative"
            >
              <div className="absolute top-2 right-2">
                <button 
                  onClick={() => setLevelUpAward(null)}
                  className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-[#0F6B4B] flex items-center justify-center font-bold absolute top-1.5 right-1.5 cursor-pointer z-20"
                >
                  ✕
                </button>
              </div>

              {/* Glowing Aura Background */}
              <div className="absolute inset-0 bg-radial-gradient from-[#FFD700]/10 to-transparent pointer-events-none" />

              <motion.div 
                animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-28 h-28 bg-gradient-to-tr from-[#FFD700] via-[#D4A017] to-amber-300 rounded-full flex items-center justify-center text-6xl mx-auto shadow-lg border-4 border-white relative z-10"
              >
                👑
              </motion.div>

              <div className="space-y-2 relative z-10">
                <h3 className="font-extrabold text-2xl text-[#0F6B4B] tracking-tight flex items-center justify-center gap-1.5 font-sans">
                  Mun Taya Ka Murna! 
                  <button 
                    onClick={() => speakText(`Muna taya ka murna da samun sabon mataki na ${levelUpAward}!`, 'ha-NG')}
                    className="p-1 text-[#0F6B4B] hover:text-[#D4A017] rounded cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </button>
                </h3>
                <p className="text-[#D4A017] font-black text-xs uppercase tracking-widest">Sabuwar Nasara (Level Up Achievement)</p>
                <div className="py-2.5 px-4 bg-emerald-800 text-white rounded-2xl font-black text-sm tracking-wide shadow border border-[#D4A017]/45 inline-block capitalize">
                  🔓 Level-Mataki: {levelUpAward.replace(/_/g, ' ')}
                </div>
                <p className="text-xs text-gray-650 leading-relaxed max-w-xs mx-auto">
                  Amina Musa, kokarinka ne ya baka damar buɗe wannan babban matakin koyon Turanci! Ci gaba da karatu don samun ƙarin XP da badges da kofuna na musamman.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border flex items-center justify-around shadow-sm relative z-10 divide-x divide-gray-150">
                <div className="text-center flex-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Matakai Unlocked</span>
                  <span className="text-base font-black text-emerald-950 font-sans">{progress.unlockedLevels.length} Levels</span>
                </div>
                <div className="text-center flex-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Maki XP</span>
                  <span className="text-base font-black text-emerald-950 font-sans">{progress.xp} XP</span>
                </div>
              </div>

              <div className="pt-2 relative z-10">
                <button 
                  id="btn-level-up-close"
                  onClick={() => setLevelUpAward(null)}
                  className="w-full py-3.5 bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] font-bold text-xs rounded-2xl uppercase tracking-wider shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Ci Gaba Da Karatu (Keep Learning)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
