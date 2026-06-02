/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, BarChart3, LineChart, Plus, Trash2, ArrowUpRight, ShieldAlert, Award, FileSpreadsheet, PlusCircle, BookOpen, Search, Download, Clipboard, Compass 
} from 'lucide-react';
import { motion } from 'motion/react';
import { LearningLevel, Lesson } from '../types';
import { LESSONS } from '../data';
import { speakText } from './AudioVoiceHelper';
import curriculumData from '../curriculum.json';

interface AdminDashboardProps {
  onGoBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onGoBack
}) => {
  const [lessons, setLessons] = useState<Lesson[]>(LESSONS);
  const [activeTab, setActiveTab] = useState<'operations' | 'curriculum'>('operations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('ALL');
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const [copiedStatus, setCopiedStatus] = useState(false);

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
  const [newLevel, setNewLevel] = useState<LearningLevel>(LearningLevel.STAGE_1);
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
          imageUrl: "book",
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

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('operations')}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'operations'
              ? 'border-[#0F6B4B] text-[#0F6B4B]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          Gudanar da Tsari (Operations & CMS)
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'curriculum'
              ? 'border-[#0F6B4B] text-[#0F6B4B]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          📚 Tsarin Karatu: Nur al-Ilm Explorer
        </button>
      </div>

      {activeTab === 'operations' ? (
        <>
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
                        <option value={LearningLevel.STAGE_0}>Stage 0 (Orientation)</option>
                        <option value={LearningLevel.STAGE_1}>Stage 1 (Listening Awareness)</option>
                        <option value={LearningLevel.STAGE_2}>Stage 2 (First Spoken Words)</option>
                        <option value={LearningLevel.STAGE_3}>Stage 3 (Survival English)</option>
                        <option value={LearningLevel.STAGE_4}>Stage 4 (Everyday Conversations)</option>
                        <option value={LearningLevel.STAGE_5}>Stage 5 (Reading Introduction)</option>
                        <option value={LearningLevel.STAGE_6}>Stage 6 (Writing Basics)</option>
                        <option value={LearningLevel.STAGE_7}>Stage 7 (Functional English)</option>
                        <option value={LearningLevel.STAGE_8}>Stage 8 (Workplace English)</option>
                        <option value={LearningLevel.STAGE_9}>Stage 9 (English Thinking)</option>
                        <option value={LearningLevel.STAGE_10}>Stage 10 (Fluency Mastery)</option>
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
                <h3 className="font-bold text-sm text-emerald-950 font-sans">Active Lessons currently on Nur al-Ilm ({lessons.length})</h3>

                <div className="divide-y divide-gray-100">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-sm text-gray-800 font-sans">{lesson.title}</h4>
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
                <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2 font-sans">
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
                    <line x1="20" y1="20" x2="280" y2="20" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="20" y1="60" x2="280" y2="60" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="20" y1="100" x2="280" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="20" y1="130" x2="280" y2="130" stroke="#cccccc" strokeWidth="1" />

                    <path 
                      d="M 20 130 Q 80 100 130 80 T 220 50 T 280 30 L 280 130 Z" 
                      fill="url(#chartGradient)" 
                    />

                    <path 
                      d="M 20 130 Q 80 100 130 80 T 220 50 T 280 30" 
                      fill="none" 
                      stroke="#0F6B4B" 
                      strokeWidth="3.5" 
                      strokeLinecap="round"
                    />

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
                <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2 font-sans">
                  <ShieldAlert className="w-5 h-5 text-[#D4A017]" />
                  System Status Core
                </h3>
                <div className="space-y-2 text-xs divide-y divide-gray-100">
                  <div className="py-2 flex justify-between">
                    <span className="text-gray-500">Database Engine</span>
                    <span className="text-green-600 font-bold font-mono">FIRESTORE CORE</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-gray-500">Gemini Proxy Core</span>
                    <span className="text-green-600 font-bold font-mono">ONLINE</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-gray-500">Port Listening Configuration</span>
                    <span className="text-gray-700 font-mono font-bold">0.0.0.0:3000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div id="curriculum-explorer-module" className="space-y-6">
          {/* Curriculum Explorer Header & Controls */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-emerald-950 font-sans flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#D4A017]" />
                  Nur al-Ilm Master Curriculum Explorer & Export Hub
                </h3>
                <p className="text-xs text-gray-500 font-sans">
                  Kalli cikakken tsarin karatun koyon Turanci daga Sifiri zuwa Kwarewa (Levels 0 – 6) kamili
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-copy-curriculum-json"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(curriculumData, null, 2));
                    setCopiedStatus(true);
                    setTimeout(() => setCopiedStatus(false), 2000);
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-[#D4A017] border border-amber-200/50 rounded-lg transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  {copiedStatus ? 'Copied JSON!' : 'Copy Full JSON'}
                </button>

                <button
                  id="btn-download-curriculum-json"
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curriculumData, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", "nur_al_ilm_master_curriculum.json");
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-[#0F6B4B] border border-emerald-200/50 rounded-lg transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Schema
                </button>
              </div>
            </div>

            {/* Micro Dashboard Statistics on the Curriculum */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-center md:text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Levels</p>
                <p className="text-lg font-black text-emerald-950 font-mono">7 Levels</p>
              </div>
              <div className="text-center md:text-left border-l border-gray-200 pl-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Modules</p>
                <p className="text-lg font-black text-emerald-950 font-mono">8 Modules</p>
              </div>
              <div className="text-center md:text-left border-l border-gray-200 pl-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Structured Vocabulary</p>
                <p className="text-lg font-black text-[#D4A017] font-mono">100% Comprehensive</p>
              </div>
              <div className="text-center md:text-left border-l border-gray-200 pl-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Listen → Speak Approach</p>
                <p className="text-lg font-black text-green-600 font-mono">Active</p>
              </div>
            </div>

            {/* Filters bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  id="inp-curriculum-search"
                  type="text"
                  placeholder="Bincika kalma ko darasi (Search word)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
                {['ALL', 'LEVEL_0', 'LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEVEL_4', 'LEVEL_5', 'LEVEL_6'].map((lvl) => (
                  <button
                    key={lvl}
                    id={`btn-filter-level-${lvl}`}
                    onClick={() => {
                      setSelectedLevelFilter(lvl);
                      setExpandedLessonId(null);
                    }}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all shrink-0 uppercase font-mono ${
                      selectedLevelFilter === lvl
                        ? 'bg-[#0F6B4B] text-white shadow-sm'
                        : 'bg-gray-150 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {lvl === 'ALL' ? 'Duka (All)' : lvl.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Render Curriculum Items */}
          <div className="space-y-6">
            {curriculumData
              .filter(levelGroup => selectedLevelFilter === 'ALL' || levelGroup.level === selectedLevelFilter)
              .map((levelGroup) => {
                const filteredModules = levelGroup.modules.map(mod => {
                  const filteredLessons = mod.lessons.filter(les => {
                    const searchLower = searchQuery.toLowerCase();
                    const matchesTitle = les.title.toLowerCase().includes(searchLower);
                    const matchesObjective = les.learningObjective.toLowerCase().includes(searchLower);
                    const matchesVocab = les.vocabulary.some(v => v.word.toLowerCase().includes(searchLower) || v.hausa.toLowerCase().includes(searchLower));
                    return searchQuery === '' || matchesTitle || matchesObjective || matchesVocab;
                  });

                  return { ...mod, lessons: filteredLessons };
                }).filter(mod => mod.lessons.length > 0);

                if (filteredModules.length === 0) return null;

                return (
                  <div key={levelGroup.level} className="space-y-4">
                    <div className="flex items-center gap-2 border-l-4 border-[#D4A017] pl-3 py-1">
                      <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wide font-sans">
                        {levelGroup.levelTitle || levelGroup.levelTitle}
                      </h4>
                      <span className="text-[10px] bg-emerald-50 text-[#0F6B4B] font-bold font-sans px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {levelGroup.levelTitleHausa}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {filteredModules.map((module) => (
                        <div key={module.id} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-3">
                          <p className="text-[10px] text-[#0F6B4B] font-bold uppercase tracking-wider font-mono">
                            MODULE • {module.titleHausa}
                          </p>
                          <h5 className="text-sm font-black text-emerald-900 font-sans">{module.title}</h5>

                          <div className="grid grid-cols-1 gap-3.5">
                            {module.lessons.map((lesson) => {
                              const uniqueId = `${levelGroup.level}_${module.id}_${lesson.lessonNumber}`;
                              const isExpanded = expandedLessonId === uniqueId;

                              return (
                                <div 
                                  key={uniqueId}
                                  className="border border-gray-150 rounded-xl overflow-hidden hover:border-emerald-950/15 transition-all bg-gray-50/50"
                                >
                                  {/* Lesson Header Row */}
                                  <div 
                                    id={`lesson-header-${uniqueId}`}
                                    onClick={() => setExpandedLessonId(isExpanded ? null : uniqueId)}
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-50/15 gap-4"
                                  >
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[9px] font-mono bg-[#D4A017] text-white uppercase font-bold px-1.5 py-0.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                                          Lesson {lesson.lessonNumber}
                                        </span>
                                        <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 uppercase font-bold px-1.5 py-0.5 rounded">
                                          ⏱ {lesson.estimatedDuration || '20 Mins'}
                                        </span>
                                        <span className="text-[9px] font-mono bg-gray-200 text-gray-700 uppercase font-bold px-1.5 py-0.5 rounded">
                                          Diff: {lesson.difficultyRating || 'Beginner'}
                                        </span>
                                      </div>
                                      <h6 className="text-xs font-black text-gray-800 font-sans">{lesson.title}</h6>
                                      <p className="text-[11px] text-gray-500 font-medium">{lesson.learningObjective}</p>
                                    </div>

                                    <div className="text-right shrink-0">
                                      <span className="text-[10px] font-bold bg-white hover:bg-gray-50 border border-gray-200 shadow-xs rounded-lg px-2.5 py-1.5 font-sans transition-all">
                                        {isExpanded ? 'Bude (Collapse)' : 'Budewa (Expand Details)'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Expanded PDF-like view */}
                                  {isExpanded && (
                                    <div className="p-5 bg-white border-t border-gray-150 text-xs space-y-6 divide-y divide-gray-150">
                                      {/* Explanations */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                        <div className="space-y-1">
                                          <p className="font-black text-emerald-950 font-sans">1. Bayani Da Harshen Hausa (Hausa Explanation)</p>
                                          <p className="text-gray-600 leading-relaxed bg-amber-50/15 p-3.5 rounded-xl border border-amber-900/5 font-medium">
                                            {lesson.hausaExplanation}
                                          </p>
                                        </div>
                                        <div className="space-y-1">
                                          <p className="font-black text-emerald-950 font-sans">2. English Concept Definition</p>
                                          <p className="text-gray-650 leading-relaxed bg-emerald-50/10 p-3.5 rounded-xl border border-emerald-900/5 font-medium">
                                            {lesson.englishExplanation}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Vocabulary Table with IPA */}
                                      <div className="pt-5 space-y-3">
                                        <p className="font-black text-emerald-950 font-sans">Vocabularies & Specialized Speech Phonics</p>
                                        <div className="overflow-x-auto border border-gray-150 rounded-xl shadow-xs">
                                          <table className="w-full text-left font-sans text-xs border-collapse bg-white">
                                            <thead>
                                              <tr className="bg-gray-100 border-b border-gray-150 text-gray-500 font-bold text-[10px] uppercase">
                                                <th className="p-3 border-r border-gray-150">English Word</th>
                                                <th className="p-3 border-r border-gray-150">Hausa Meaning</th>
                                                <th className="p-3 border-r border-gray-150">IPA Script</th>
                                                <th className="p-3 border-r border-gray-150">Syllables</th>
                                                <th className="p-3">Pronunciation Drill & Correcting Mistakes</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-150">
                                              {lesson.vocabulary.map((v, i) => (
                                                <tr key={i} className="hover:bg-gray-50/50">
                                                  <td className="p-3 border-r border-gray-150 font-black text-[#0F6B4B] text-xs">{v.word}</td>
                                                  <td className="p-3 border-r border-gray-150 font-bold text-gray-800 text-xs">{v.hausa}</td>
                                                  <td className="p-3 border-r border-gray-150 font-mono text-[#D4A017] font-bold text-[11px]">{v.ipa}</td>
                                                  <td className="p-3 border-r border-gray-150 font-mono text-gray-550 text-[11px]">{v.syllableBreakdown}</td>
                                                  <td className="p-3 space-y-1.5 text-gray-650 leading-relaxed text-[11px]">
                                                    <div className="flex items-start gap-1"><span className="font-black text-red-600 shrink-0">Kuskure:</span> {v.commonHausaMistake}</div>
                                                    <div className="flex items-start gap-1"><span className="font-black text-emerald-700 shrink-0">Gyara:</span> {v.correctionTip}</div>
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>

                                      {/* AI Tutor Script Section */}
                                      <div className="pt-5 space-y-3">
                                        <p className="font-black text-emerald-950 font-sans">Ustaz Nur patient AI Voice Tutor Content (Sautunan Malami)</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div className="p-4 bg-emerald-50/20 rounded-xl border border-emerald-100 space-y-1.5">
                                            <p className="font-black text-emerald-950 font-mono text-[10px] uppercase tracking-wide">1. Gabatarwa (Introduction)</p>
                                            <p className="text-gray-700 italic font-medium leading-relaxed">"{lesson.aiTutorScript.introduction}"</p>
                                          </div>
                                          <div className="p-4 bg-emerald-50/20 rounded-xl border border-emerald-100 space-y-1.5">
                                            <p className="font-black text-emerald-950 font-mono text-[10px] uppercase tracking-wide">2. Kwadaitarwa (Encouragement)</p>
                                            <p className="text-gray-700 italic font-medium leading-relaxed">"{lesson.aiTutorScript.encouragement}"</p>
                                          </div>
                                          <div className="p-4 bg-amber-50/20 rounded-xl border border-amber-100 space-y-1.5">
                                            <p className="font-black text-amber-950 font-mono text-[10px] uppercase tracking-wide">3. Gyaran Kuskure (Corrections)</p>
                                            <p className="text-gray-700 italic font-medium leading-relaxed flex-initial">"{lesson.aiTutorScript.corrections}"</p>
                                          </div>
                                          <div className="p-4 bg-amber-50/20 rounded-xl border border-amber-100 space-y-1.5">
                                            <p className="font-black text-amber-950 font-mono text-[10px] uppercase tracking-wide">4. Kyauta & Yabo (Achievements)</p>
                                            <p className="text-gray-700 italic font-medium leading-relaxed">"{lesson.aiTutorScript.achievements}"</p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Activities and Drills */}
                                      <div className="pt-5 space-y-3">
                                        <p className="font-black text-emerald-950 font-sans">Listen → Understand → Repeat Drill Activities</p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                          <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-1 bg-gradient-to-br from-white to-gray-50/50">
                                            <p className="font-bold text-gray-800 flex items-center gap-1">👂 Listening Practice</p>
                                            <p className="text-gray-600 text-xs leading-relaxed font-semibold">{lesson.listeningExercise}</p>
                                          </div>
                                          <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-1 bg-gradient-to-br from-white to-gray-50/50">
                                            <p className="font-bold text-gray-800 flex items-center gap-1">🗣️ Repeat After Me Module</p>
                                            <p className="text-gray-600 text-xs leading-relaxed font-semibold">{lesson.repeatAfterMeExercise}</p>
                                          </div>
                                          <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-1 bg-gradient-to-br from-white to-gray-50/50">
                                            <p className="font-bold text-gray-800 flex items-center gap-1">📱 Spoken Conversation Action</p>
                                            <p className="text-gray-600 text-xs leading-relaxed font-semibold">{lesson.speakingPractice}</p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Interactive Quizzes */}
                                      <div className="pt-5 space-y-3">
                                        <p className="font-black text-emerald-950 font-sans">Dynamic Evaluative Quizzes (Tambayoyin Jarrabawa)</p>
                                        <div className="space-y-3">
                                          {lesson.quiz.map((q, qidx) => (
                                            <div key={qidx} className="p-4 bg-amber-50/10 border border-amber-200/50 rounded-xl space-y-2">
                                              <p className="font-bold text-gray-800 text-xs font-sans">Q{qidx + 1}: {q.question}</p>
                                              <p className="text-[11px] text-[#0F6B4B] font-bold font-sans">{q.hausaQuestion}</p>
                                              <div className="flex flex-wrap gap-2.5 pt-1">
                                                {q.options.map((opt, optidx) => (
                                                  <span 
                                                    key={optidx} 
                                                    className={`px-3 py-1 text-xs font-bold rounded-lg font-mono border ${
                                                      optidx === q.answerIndex
                                                        ? 'bg-emerald-58 border-green-200 text-green-700 font-bold'
                                                        : 'bg-white text-gray-500 border-gray-150'
                                                    }`}
                                                  >
                                                    {opt} {optidx === q.answerIndex ? '✓ Correct Option' : ''}
                                                  </span>
                                                ))}
                                              </div>
                                              <p className="text-[10px] text-gray-500 pt-1.5 italic font-sans border-t border-gray-200/50">
                                                Explication: {q.explanation}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Homework and criteria */}
                                      <div className="pt-5 grid grid-cols-1 md:grid-cols-3 gap-4 pb-1">
                                        <div className="bg-emerald-50/10 p-4 rounded-xl border border-emerald-950/5 space-y-1 bg-gradient-to-b from-white to-emerald-50/10">
                                          <p className="font-black text-emerald-900 font-sans">📚 Homework Assignment (Aiki Gida)</p>
                                          <p className="text-gray-650 text-xs leading-relaxed">{lesson.homework}</p>
                                        </div>
                                        <div className="bg-emerald-50/10 p-4 rounded-xl border border-emerald-950/5 space-y-1 bg-gradient-to-b from-white to-emerald-50/10">
                                          <p className="font-black text-emerald-900 font-sans">🎓 Performance Assessment</p>
                                          <p className="text-gray-650 text-xs leading-relaxed">{lesson.assessment}</p>
                                        </div>
                                        <div className="bg-amber-50/10 p-4 rounded-xl border border-amber-950/5 space-y-1 bg-gradient-to-b from-white to-amber-50/10">
                                          <p className="font-black text-[#D4A017] font-sans">🏆 Lesson Mastery Standard</p>
                                          <p className="text-gray-650 text-xs leading-relaxed">{lesson.masteryCriteria}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
