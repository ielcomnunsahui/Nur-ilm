/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, Award, Flame, Coins, Eye, ShieldCheck, CheckCircle2, User, Trophy, Download, LucideIcon 
} from 'lucide-react';
import * as Icons from 'lucide-react'; // Allow dynamic rendering of Lucide icons
import { motion } from 'motion/react';
import { UserProgress, Badge } from '../types';
import { BADGES } from '../data';
import { speakText } from './AudioVoiceHelper';

interface ParentDashboardProps {
  progress: UserProgress;
  onUpdateRole: (role: 'student' | 'parent' | 'admin') => void;
  onGoBack: () => void;
  onOpenCertificate: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  progress,
  onUpdateRole,
  onGoBack,
  onOpenCertificate
}) => {
  const [selectedChild, setSelectedChild] = useState("Amina Musa");
  const [restrictZeroLiteracy, setRestrictZeroLiteracy] = useState(progress.zeroLiteracyMode);

  const getDynamicIcon = (name: string): LucideIcon => {
    return (Icons as any)[name] || Icons.HelpCircle;
  };

  const triggerVocalSupportLanguage = () => {
    speakText(`Sannun ku iyaye da manyan gida. Anan zaku iya duba kokarin Amina Musa, maki dake rumbunta, da dukkan alamun nasara da ta samu. Danna koren hoton domin samun shaidar karatu.`, 'ha-NG');
  };

  return (
    <div id="parent-dashboard-container" className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Control Navigation Header */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-900/5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-emerald-950 font-sans flex items-center gap-2">
            👨‍👩‍👧‍👦 Dandalin Iyaye (Parent Dashboard)
          </h2>
          <p className="text-xs text-gray-500">Saka idanu kan yaro, duba ci-gaba, da karfafa gwiwar ku</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-parent-voice-guide"
            onClick={triggerVocalSupportLanguage}
            className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border"
            title="Saurari Guide"
          >
            🔊 Saurari Muryar Taimako
          </button>
          <button
            id="btn-parent-retstudent"
            onClick={() => onUpdateRole('student')}
            className="px-4 py-2 text-xs font-bold bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] rounded-full shadow"
          >
            Koma Wajen Yaro (Student Mode)
          </button>
        </div>
      </div>

      {/* Children switch overlay and streak panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-emerald-900/5 shadow-sm flex items-center justify-between gap-3 relative group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl">
              👧
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase leading-tight">Yaro (Selected Child):</p>
              <p className="text-sm font-bold text-emerald-950">{selectedChild}</p>
            </div>
          </div>
          <button 
            onClick={() => speakText(`Sunan yaro, ${selectedChild}`, 'ha-NG')}
            className="p-1.5 text-[#0F6B4B] hover:bg-emerald-50 rounded-full"
            title="Saurari Sauti"
          >
            <Icons.Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-900/5 shadow-sm flex items-center justify-between gap-3 relative group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-150 flex items-center justify-center text-yellow-600">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase leading-tight">Maki (XP Balance):</p>
              <p className="text-sm font-bold text-emerald-950">{progress.xp} XP</p>
            </div>
          </div>
          <button 
            onClick={() => speakText(`Maki kwanan nan, ${progress.xp} maki`, 'ha-NG')}
            className="p-1.5 text-[#0F6B4B] hover:bg-emerald-50 rounded-full"
            title="Saurari Sauti"
          >
            <Icons.Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-900/5 shadow-sm flex items-center justify-between gap-3 relative group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase leading-tight">Kwanaki jere (Streak):</p>
              <p className="text-sm font-bold text-emerald-950">{progress.streak} Days</p>
            </div>
          </div>
          <button 
            onClick={() => speakText(`Kwanaki jere darasi, kwana ${progress.streak}`, 'ha-NG')}
            className="p-1.5 text-[#0F6B4B] hover:bg-emerald-50 rounded-full"
            title="Saurari Sauti"
          >
            <Icons.Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-900/5 shadow-sm flex items-center justify-between gap-3 relative group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center text-yellow-600">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase leading-tight">Kuɗi (Coins Shop):</p>
              <p className="text-sm font-bold text-emerald-950">{progress.coins} Coins</p>
            </div>
          </div>
          <button 
            onClick={() => speakText(`Adadin tsabar kudi kuɗi, ${progress.coins} kudin shiga`, 'ha-NG')}
            className="p-1.5 text-[#0F6B4B] hover:bg-emerald-50 rounded-full"
            title="Saurari Sauti"
          >
            <Icons.Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core statistics section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Lesson Cards Progress */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-700" />
              Sakamakon Darussa da Maki (Academic Scorecard)
            </h3>

            {/* Simulated progress reports */}
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-gray-600">Hanyar Karatu da Gaishe-gaishe ( greetings - Level 1)</span>
                  <span className="font-bold text-emerald-800">100% Correct</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#0F6B4B] h-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-gray-600">Kalmomi da furci (Basic Sentences - Level 2)</span>
                  <span className="font-bold text-emerald-800">80% Competence</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#0F6B4B] h-full w-4/5" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-gray-600">Ciniki a Kasuwa (Market Vocabulary - Level 3)</span>
                  <span className="font-bold text-amber-600">45% In Progress</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#D4A017] h-full w-[45%]" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-900/5 border border-emerald-900/10 rounded-xl flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs font-bold text-emerald-950">Certificate is Ready!</p>
                <p className="text-[10px] text-gray-500">Muna taya ka murna, Amina ta cika jarabawar matakin farko.</p>
              </div>
              <button
                id="btn-parent-certificates-claim"
                onClick={onOpenCertificate}
                className="px-4 py-2 bg-[#D4A017] hover:bg-yellow-600 text-[#1A1A1A] font-bold text-xs rounded-full shadow flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-[#1A1A1A]" />
                Duba Shaidar Karatu (Claim Certificate)
              </button>
            </div>
          </div>

          {/* Badge Locker Collection */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4A017]" />
              Lambobin Nasara Masu Kyau (Earned Badges locker)
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BADGES.map((badge) => {
                const IconComponent = getDynamicIcon(badge.icon);
                const isUnlocked = progress.xp > 150 || badge.id === 'first_word' || badge.id === 'chat_expert';

                return (
                  <div 
                    key={badge.id}
                    className={`p-3 rounded-xl border text-center space-y-1.5 flex flex-col items-center justify-center transition-all ${
                      isUnlocked 
                        ? 'bg-gradient-to-b from-white to-emerald-50/20 border-emerald-100' 
                        : 'bg-gray-50 border-gray-150 grayscale opacity-45'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${isUnlocked ? 'bg-[#D4A017]/20 text-yellow-600' : 'bg-gray-200 text-gray-400'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-800 leading-tight">{badge.titleHausa}</h4>
                      <p className="text-[9px] text-gray-400 leading-none">{badge.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Parental restriction sliders */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-sm space-y-4 h-fit">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              Tsarukan Kariya (Parental Controls)
            </h3>

            <div className="divide-y divide-gray-100 text-xs">
              <div className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-gray-700">Muryar Taimako Kaurace (Lock Zero Literacy Mode)</p>
                  <p className="text-[10px] text-gray-400">Forces Amina to learn primarily via voice hints.</p>
                </div>
                <input 
                  id="lock-zero-literacy-check"
                  type="checkbox" 
                  checked={restrictZeroLiteracy} 
                  onChange={(e) => setRestrictZeroLiteracy(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded focus:ring-emerald-800"
                />
              </div>

              <div className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-gray-700">Yarjejeniyar Makaranta (School Sync)</p>
                  <p className="text-[10px] text-gray-400">Sends Amina's homework outcomes directly to teacher email.</p>
                </div>
                <input 
                  id="school-sync-check"
                  type="checkbox" 
                  defaultChecked 
                  className="w-4 h-4 text-emerald-700 rounded"
                />
              </div>

              <div className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-gray-700">Iyakar Lokaci (Daily Screen Limit)</p>
                  <p className="text-[10px] text-gray-400">Restricts app usage to 60 minutes max hourly intervals.</p>
                </div>
                <select 
                  id="screen-limit-select"
                  className="bg-white border rounded p-1 text-[11px] font-semibold text-gray-700"
                >
                  <option>30 Mins</option>
                  <option selected>60 Mins</option>
                  <option>120 Mins</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="p_report_read_text"
                onClick={() => speakText("An daidaita dukkan bayanan sirri na yaronku. An riga an ajiye tsarukan kariya cikin sauki.", 'ha-NG')}
                className="w-full py-2.5 text-center text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl transition-all font-bold"
              >
                Ajiye Tsarukan (Save configurations)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
