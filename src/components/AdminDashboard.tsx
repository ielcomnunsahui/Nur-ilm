/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, BarChart3, LineChart, Plus, Trash2, ArrowUpRight, ShieldAlert, Award, FileSpreadsheet, PlusCircle 
} from 'lucide-react';
import { motion } from 'motion/react';
import { LearningLevel, Lesson } from '../types';
import { LESSONS } from '../data';
import { speakText } from './AudioVoiceHelper';

interface AdminDashboardProps {
  onGoBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onGoBack
}) => {
  const [lessons, setLessons] = useState<Lesson[]>(LESSONS);
  const [analytics, setAnalytics] = useState<any>({
    dau: 2450,
    mau: 18200,
    completionRate: 84.1,
    revenue: 5120,
    retention: 92.5
  });

  // CMS state helpers
  const [newTitle, setNewTitle] = useState("");
  const [newTitleHausa, setNewTitleHausa] = useState("");
  const [newLevel, setNewLevel] = useState<LearningLevel>(LearningLevel.LEVEL_1);
  const [newPoints, setNewPoints] = useState(150);
  const [newVocabWord, setNewVocabWord] = useState("");
  const [newVocabHausa, setNewVocabHausa] = useState("");
  const [newVocabHint, setNewVocabHint] = useState("");

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTitleHausa.trim()) return;

    const created: Lesson = {
      id: `lesson_added_${Date.now()}`,
      title: newTitle,
      titleHausa: newTitleHausa,
      level: newLevel,
      description: "Added via dynamic Admin CMS Control Builder",
      descriptionHausa: "Darasin da aka kirkira ta dandalin gudanarwa",
      points: newPoints,
      vocabulary: newVocabWord ? [
        {
          id: `v_new_${Date.now()}`,
          english: newVocabWord,
          hausa: newVocabHausa,
          pronunciationHint: newVocabHint || newVocabWord,
          hausaHint: newVocabHausa,
          imageUrl: "📚",
          category: "Added vocabulary"
        }
      ] : [],
      quiz: [
        {
          id: `q_new_${Date.now()}`,
          questionText: `Which represents the meaning of "${newVocabWord || 'Book'}"?`,
          questionAudioText: `Zabi fassarar kalmar ${newVocabWord || 'Book'} a Hausa.`,
          options: [newVocabHausa || 'A\'a', 'Lafiya', 'Morning', 'Sannu'],
          correctOptionIndex: 0,
          explanation: `Correct translation of ${newVocabWord} is indeed ${newVocabHausa}.`
        }
      ]
    };

    setLessons(prev => [created, ...prev]);
    setNewTitle("");
    setNewTitleHausa("");
    setNewVocabWord("");
    setNewVocabHausa("");
    setNewVocabHint("");

    speakText("An yi nasarar ƙirƙirar sabon darasi cikin tsari.", 'ha-NG');
  };

  const handleDeleteLesson = (id: string) => {
    setLessons(prev => prev.filter(l => l.id !== id));
    speakText("An kankare wannan darasin.", 'ha-NG');
  };

  return (
    <div id="admin-dashboard-container" className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Upper header */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-900/5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-emerald-950 font-sans flex items-center gap-2">
            🛡️ Dandalin Gudanarwa (Admin Dashboard & CMS)
          </h2>
          <p className="text-xs text-gray-500">Muna lura da kudaden shiga, gudanar da darussa da CMS daki-daki</p>
        </div>

        <button
          id="btn-admin-go-back"
          onClick={onGoBack}
          className="px-4 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all"
        >
          Koma Dashboard
        </button>
      </div>

      {/* Analytics scorecard grids */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-emerald-900/5 shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mambobi yau (DAU)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl md:text-2xl font-black text-emerald-950">{analytics.dau}</span>
            <span className="text-[11px] text-green-600 font-semibold flex items-center">
              +14.2% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-900/5 shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Masu amfani a wata (MAU)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl md:text-2xl font-black text-emerald-950">{analytics.mau}</span>
            <span className="text-[11px] text-green-600 font-semibold flex items-center">
              +18.5% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-900/5 shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Masu cin jarrabawa (% rate)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl md:text-2xl font-black text-emerald-950">{analytics.completionRate}%</span>
            <span className="text-[11px] text-green-600 font-semibold flex items-center">
              +2.3% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D4A017]/30 shadow-sm bg-gradient-to-tr from-amber-500/5 to-white">
          <p className="text-[10px] text-[#D4A017] font-bold uppercase tracking-wider">Kudaden Shiga (Revenue)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl md:text-2xl font-black text-emerald-950">${analytics.revenue}</span>
            <span className="text-[11px] text-[#D4A017] font-semibold flex items-center">
              +32.6% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course creator CMS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-sm space-y-5">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-700" />
              Gina Sabon Darasi a CMS (Dynamic Content Creator)
            </h3>

            <form onSubmit={handleAddLesson} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-600">English Title:</label>
                  <input 
                    id="admin-new-title"
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="E.g., Talking in the School"
                    className="w-full p-2.5 rounded-xl border border-gray-250 font-medium"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-600">Hausa Title (Sunan darasin a Hausa):</label>
                  <input 
                    id="admin-new-title-hausa"
                    type="text" 
                    value={newTitleHausa}
                    onChange={(e) => setNewTitleHausa(e.target.value)}
                    placeholder="E.g., Tattaunawa a wajen Makaranta"
                    className="w-full p-2.5 rounded-xl border border-gray-250 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-600">Select Level (Zaɓi Mataki):</label>
                  <select 
                    id="admin-level-select"
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as LearningLevel)}
                    className="w-full p-2.5 rounded-xl border border-gray-250 font-medium bg-white"
                  >
                    <option value={LearningLevel.LEVEL_0}>Level 0 (No english knowledge)</option>
                    <option value={LearningLevel.LEVEL_1}>Level 1 (First words)</option>
                    <option value={LearningLevel.LEVEL_2}>Level 2 (Basic sentences)</option>
                    <option value={LearningLevel.LEVEL_3}>Level 3 (Everyday conversations)</option>
                    <option value={LearningLevel.LEVEL_4}>Level 4 (Reading & writing)</option>
                    <option value={LearningLevel.LEVEL_5}>Level 5 (Fluent communication)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-600">XP Points Award value:</label>
                  <input 
                    id="admin-points-input"
                    type="number" 
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-250 font-medium"
                  />
                </div>
              </div>

              {/* Add primary vocabulary item */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/60 space-y-3">
                <p className="font-bold text-gray-700">Vocabulary Pack Item</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-gray-500">English Word:</label>
                    <input 
                      id="admin-vocab-word"
                      type="text" 
                      value={newVocabWord}
                      onChange={(e) => setNewVocabWord(e.target.value)}
                      placeholder="E.g., Teacher"
                      className="w-full p-2 rounded-lg border bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500">Hausa Meaning:</label>
                    <input 
                      id="admin-vocab-hausa"
                      type="text" 
                      value={newVocabHausa}
                      onChange={(e) => setNewVocabHausa(e.target.value)}
                      placeholder="E.g., Malami"
                      className="w-full p-2 rounded-lg border bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500">Phonetic guide hint:</label>
                    <input 
                      id="admin-vocab-hint"
                      type="text" 
                      value={newVocabHint}
                      onChange={(e) => setNewVocabHint(e.target.value)}
                      placeholder="E.g., Tee-cher"
                      className="w-full p-2 rounded-lg border bg-white"
                    />
                  </div>
                </div>
              </div>

              <button
                id="btn-admin-submit-lesson"
                type="submit"
                className="w-full py-3 bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] rounded-xl font-bold transition-all shadow-sm"
              >
                Tura Lesun da Bude a Doron Koyo (Publish Lesson Now)
              </button>
            </form>
          </div>

          {/* List of active lessons */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-emerald-950">Active Lessons currently on Nur al-Ilm ({lessons.length})</h3>

            <div className="divide-y divide-gray-100">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">{lesson.title}</h4>
                    <p className="text-xs text-[#0F6B4B]">{lesson.titleHausa} • <span className="bg-amber-100 text-[#D4A017] px-1.5 py-0.5 rounded text-[10px] uppercase font-mono">{lesson.level}</span></p>
                  </div>
                  <button
                    id={`btn-delete-lesson-${lesson.id}`}
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    title="Cire Lesson"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Revenue and retention charts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-sm space-y-4 h-fit">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-emerald-700" />
              Yanayin Kudaden Shiga (Revenue Curve)
            </h3>

            {/* Premium, pixel-perfect custom SVG chart */}
            <div className="w-full bg-gray-50 p-2 rounded-xl border border-gray-100">
              <svg viewBox="0 0 300 150" className="w-full h-auto">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F6B4B" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0F6B4B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal reference lines */}
                <line x1="20" y1="20" x2="280" y2="20" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="20" y1="60" x2="280" y2="60" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="20" y1="100" x2="280" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="20" y1="130" x2="280" y2="130" stroke="#cccccc" strokeWidth="1" />

                {/* Shaded Area */}
                <path 
                  d="M 20 130 Q 80 100 130 80 T 220 50 T 280 30 L 280 130 Z" 
                  fill="url(#chartGradient)" 
                />

                {/* Core curve line */}
                <path 
                  d="M 20 130 Q 80 100 130 80 T 220 50 T 280 30" 
                  fill="none" 
                  stroke="#0F6B4B" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />

                {/* Key coordinate node points */}
                <circle cx="20" cy="130" r="4.5" fill="#D4A017" />
                <text x="20" y="145" fontSize="8" textAnchor="middle" fill="#999999" fontFamily="sans-serif">Jan</text>

                <circle cx="80" cy="100" r="4.5" fill="#D4A017" />
                <text x="80" y="145" fontSize="8" textAnchor="middle" fill="#999999" fontFamily="sans-serif">Feb</text>

                <circle cx="130" cy="80" r="4.5" fill="#D4A017" />
                <text x="130" y="145" fontSize="8" textAnchor="middle" fill="#999999" fontFamily="sans-serif">Mar</text>

                <circle cx="220" cy="50" r="4.5" fill="#D4A017" />
                <text x="220" y="145" fontSize="8" textAnchor="middle" fill="#999999" fontFamily="sans-serif">Apr</text>

                <circle cx="280" cy="30" r="4.5" fill="#D4A017" />
                <text x="280" y="145" fontSize="8" textAnchor="middle" fill="#999999" fontFamily="sans-serif">May</text>
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>Kuɗin Shiga: +$5,120</span>
              <span className="text-green-600 font-bold">+189% Year-on-Year</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-sm space-y-4 h-fit">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#D4A017]" />
              System Status Core
            </h3>
            <div className="space-y-2 text-xs divide-y divide-gray-100">
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Database Engine</span>
                <span className="text-green-600 font-bold">SQLITE ACTIVE</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Gemini Proxy Core</span>
                <span className="text-green-600 font-bold">ONLINE</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Port Listening Configuration</span>
                <span className="text-gray-700 font-mono font-bold">0.0.0.0:3000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
