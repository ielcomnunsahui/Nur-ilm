/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Flame, BookOpen, Volume2, Mic, Users, HelpCircle, ArrowRight, ShieldCheck, Zap, Globe 
} from 'lucide-react';
import { motion } from 'motion/react';
import { speakText } from './AudioVoiceHelper';

interface LandingPageProps {
  onStart: () => void;
  onSelectRole: (role: 'parent' | 'admin' | 'student') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onSelectRole
}) => {

  const listenToSampleLesson = () => {
    const text = "Barka da zuwa Nur al-Ilm! Darasin farko na gaggawa: Hello. 'Hello' shine hanyar gaisuwa ta asali a harshen Turanci, wato Sannu. Maimaita bayana daki-daki: Heh-loh. Sannu da kokari!";
    speakText(text, 'ha-NG');
  };

  return (
    <div id="landing-page-wrapper" className="min-h-screen bg-[#F8F6F0] text-gray-800 flex flex-col justify-between">
      
      {/* Upper Navigation Bar */}
      <header className="max-w-7xl mx-auto w-full px-6 py-5 flex items-center justify-between border-b border-emerald-900/5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🕌</span>
          <div>
            <span className="font-extrabold text-lg md:text-xl text-[#0F6B4B] tracking-tight">Nur al-Ilm</span>
            <span className="text-[10px] text-[#D4A017] block font-mono tracking-widest leading-none font-bold uppercase">نور العلم</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            id="btn-nav-parent"
            onClick={() => onSelectRole('parent')} 
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-full hover:bg-emerald-50"
          >
            Iyaye (Parents)
          </button>
          <button 
            id="btn-nav-admin"
            onClick={() => onSelectRole('admin')} 
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-full"
          >
            Gudanarwa (Admin)
          </button>
          <button
            id="btn-header-cta"
            onClick={onStart}
            className="hidden sm:block bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] px-5 py-2 rounded-full font-bold text-xs shadow tracking-wide capitalize"
          >
            Start Learning
          </button>
        </div>
      </header>

      {/* Hero section screen */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left column copywriting copy */}
        <div className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/30 px-3 py-1 rounded-full text-xs font-bold leading-none uppercase tracking-wide">
            <Flame className="w-4 h-4 animate-bounce" />
            Voice-First learning platform
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold text-emerald-950 tracking-tight leading-none">
              Koyi Turanci Cikin Sauki Ta Saurare <span className="text-[#0F6B4B]">(Learn English Through Hausa)</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              Ko da ba ka jin Turanci ko karatun boko, Nur al-Ilm (نور العلم) zai koya maka daki-daki ta hanyar saurare, furtawa da gogewa ta muryar baki tare da <strong>Ustaz Nur</strong>.
            </p>
          </div>

          {/* Action boxes buttons flow */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              id="btn-hero-start"
              onClick={onStart}
              className="px-8 py-4 bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] rounded-full shadow-lg font-bold text-sm text-center flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              Fara Koyo Kyauta (Start Learning Free)
              <ArrowRight className="w-4 h-4 text-[#D4A017]" />
            </button>

            <button
              id="btn-hero-sample"
              onClick={listenToSampleLesson}
              className="px-6 py-4 bg-white hover:bg-emerald-50/20 text-emerald-800 border border-emerald-800/20 rounded-full font-bold text-xs shadow-sm flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-[#D4A017] animate-pulse" />
              Saurari Samfurin Darasi (Sample audio)
            </button>
          </div>

          {/* Micro analytics banners */}
          <div className="flex items-center gap-4 pt-4 border-t border-emerald-900/5">
            <div className="text-center sm:text-left">
              <p className="text-lg font-black text-emerald-950">15,000+</p>
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Active learners in Africa</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center sm:text-left">
              <p className="text-lg font-black text-emerald-900">98%</p>
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Fluency improvement rates</p>
            </div>
          </div>
        </div>

        {/* Right column graphic visuals */}
        <div className="relative flex justify-center items-center">
          {/* Islamic geometric radial background styling */}
          <div className="absolute inset-0 bg-[#0F6B4B]/5 rounded-full blur-3xl -z-10 aspect-square max-w-md mx-auto" />
          
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-xl max-w-sm w-full space-y-4 relative">
            {/* Quick overview widget card representation */}
            <div className="flex items-center gap-3 border-b pb-3 border-gray-100">
              <div className="h-10 w-10 shrink-0 bg-[#D4A017]/10 text-[#D4A017] rounded-xl flex items-center justify-center text-lg">
                👳‍♂️
              </div>
              <div>
                <h4 className="font-bold text-xs text-emerald-950 uppercase tracking-widest">Ustaz Nur AI Tutor</h4>
                <p className="text-[10px] text-emerald-800 italic">"Ina son ruwa shine: I want water."</p>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex gap-2.5 items-start p-2 rounded-lg bg-gray-50 border">
                <span className="text-lg">🔊</span>
                <div>
                  <p className="font-bold text-gray-800">Saurari (Listen)</p>
                  <p className="text-[10px] text-gray-400">Hear correct accent vocalized slowly and syllable by syllable.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start p-2 rounded-lg bg-gray-50 border">
                <span className="text-lg">🎙️</span>
                <div>
                  <p className="font-bold text-gray-800">Fadi Muryarka (Repeat & Grade)</p>
                  <p className="text-[10px] text-gray-400">PWA evaluates your accent, fluency and correctness immediately.</p>
                </div>
              </div>
            </div>

            <button
              id="card-cta-landing"
              onClick={onStart}
              className="w-full py-3 bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-1.5"
            >
              <span>Shiga Dandalin Koyo (Open App)</span>
            </button>
          </div>
        </div>
      </main>

      {/* Trust elements feature icons summaries lists */}
      <section className="bg-white py-12 border-t border-emerald-900/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <span className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-lg">🎙️</span>
            <h4 className="font-bold text-sm text-emerald-950">Muryar Taimako (Zero Literacy Mode)</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Ba kwa bukatar karanta haruffan Hausa ko Turanci. Rumbun makirufo zai gaya muku dukkan shafuka da murya a bayyane.</p>
          </div>

          <div className="space-y-2">
            <span className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-lg">🏅</span>
            <h4 className="font-bold text-sm text-emerald-950">Shaidar Karatu da Satifiket</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Sami shaidar musamman bayan ka kammala dukkan darussa, tare da lambar tabbatarwa na sirri da QR Code don neman aiki.</p>
          </div>

          <div className="space-y-2">
            <span className="h-10 w-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-lg">🌐</span>
            <h4 className="font-bold text-sm text-emerald-950">Aiki Offline (Offline Learning)</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">Koyon Turanci kowane lokaci ba tare da internet ba. Saukar da darussa cikin sauki don guje wa asarar data na 3G network.</p>
          </div>
        </div>
      </section>

      {/* Footer copyright and license declarations */}
      <footer className="bg-emerald-950 text-emerald-100 py-6 border-t border-[#D4A017]/20 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕌</span>
            <span>© 2026 Nur al-Ilm Inc. All Knowledge is light.</span>
          </div>

          <div className="flex gap-4">
            <button onClick={() => onSelectRole('parent')} className="hover:text-white">Iyaye Dashboard</button>
            <button onClick={() => onSelectRole('admin')} className="hover:text-white">CMS Gudanarwa</button>
            <button onClick={onStart} className="hover:text-[#D4A017] font-bold">Fara Darasi</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
