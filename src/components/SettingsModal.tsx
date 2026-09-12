/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, Volume2, Mic, EyeOff, Sparkles, Check, Sliders, Shield, VolumeX, RotateCcw, Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserProgress, VoicePersonaId, VoicePersona } from '../types';
import { VOICE_PERSONAS } from '../data';
import { speakText, stopAllSpeech, playSoundEffect } from './AudioVoiceHelper';

interface SettingsModalProps {
  isOpen: boolean;
  progress: UserProgress;
  onClose: () => void;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  progress,
  onClose,
  onUpdateProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'accessibility' | 'account'>('voice');
  const [selectedPersonaId, setSelectedPersonaId] = useState<VoicePersonaId>(
    progress.preferredVoicePersona || 'ustaz'
  );
  const [voiceOnly, setVoiceOnly] = useState<boolean>(progress.voiceOnlyMode ?? false);
  const [zeroLiteracy, setZeroLiteracy] = useState<boolean>(progress.zeroLiteracyMode ?? true);
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPersona = VOICE_PERSONAS.find(p => p.id === selectedPersonaId) || VOICE_PERSONAS[0];

  const handlePreviewVoice = (persona: VoicePersona) => {
    setPreviewingVoiceId(persona.id);
    stopAllSpeech();
    playSoundEffect('chime');
    
    const samplePhrases: Record<string, string> = {
      ustaz: "Assalamu Alaikum! Ni ne Ustaz Nur. A hankali zamu bi kowane sauti da ma'ana don ka kware.",
      amina: "Barka da yini! Ni ce Malama Amina. Zan taimake ka da furucin Turanci a bayyane.",
      musa: "Sannu abokina! Ni ne Musa dan kasuwa. Bari mu koyi ciniki da kiran kudi cikin sauri!",
      ibrahim: "Barka! Ni ne Dr. Ibrahim. Zan koya maka yadda ake bayyana ciwo da neman taimakon lafiya.",
      hafsat: "Sannu dana ko yata! Hajiya Hafsat ce. Kar ka ji kunya ko tsoro, Turanci abu ne mai sauki.",
      bello: "Sannu! Ni ne Brother Bello. Mu koyi Turancin mota, hanya da wayar salula cikin hanzari!",
      sarah: "Hello! Ni ce Sister Sarah. Zan nuna muku daddadan lafazi na Turancin duniya a saukake."
    };

    const textToSpeak = samplePhrases[persona.id] || `Barka da zuwa! Ni ne ${persona.name}.`;
    speakText(textToSpeak, 'ha-NG', {
      rate: persona.speakingRate * (speechRate / 0.9),
      pitch: persona.pitch,
      gender: persona.voiceGender
    });

    setTimeout(() => {
      setPreviewingVoiceId(null);
    }, 4500);
  };

  const handleSaveSettings = () => {
    playSoundEffect('success');
    onUpdateProgress({
      voiceOnlyMode: voiceOnly,
      zeroLiteracyMode: zeroLiteracy,
      preferredVoicePersona: selectedPersonaId,
    });
    speakText(
      `An adana saitunan ku cikin nasara. ${voiceOnly ? 'Yanayin sauti kawai (Voice-Only Mode) ya kunna.' : ''}`, 
      'ha-NG'
    );
    onClose();
  };

  const explainVoiceOnlyMode = () => {
    speakText(
      "Yanayin Sauti Kawai ko Voice-Only Mode yana boye dukkan rubutun Turanci a cikin darussa. Wannan yana tilasta wa kwakwalwarka dogara kacokam kan sauraro da kunnenka kamar yadda yaro ke koyon yarensa na asali.",
      'ha-NG'
    );
  };

  return (
    <div 
      id="settings-modal-backdrop" 
      className="fixed inset-0 z-50 bg-emerald-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
    >
      <motion.div 
        id="settings-modal-content"
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="bg-[#FBF9F5] w-full max-w-2xl rounded-3xl border-2 border-emerald-900/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[#0D5C3A] text-white p-5 px-6 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 border border-amber-400 flex items-center justify-center text-xl shadow">
              ⚙️
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide text-emerald-50">
                Saitunan Murya da Koyo (Voice & Learning Settings)
              </h3>
              <p className="text-xs text-emerald-200">Daidaita muryar malamai da yanayin sauraro</p>
            </div>
          </div>

          <button
            id="close-settings-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-all"
            title="Rufe (Close)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-emerald-950/10 px-6 pt-3 flex items-center gap-2 border-b border-emerald-900/10 overflow-x-auto">
          <button
            id="tab-voice-personas"
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'voice'
                ? 'bg-[#FBF9F5] text-emerald-950 border-[#0D5C3A] shadow-sm'
                : 'text-gray-600 hover:text-emerald-900 border-transparent'
            }`}
          >
            <Volume2 className="w-4 h-4 text-[#D4A017]" />
            <span>Muryar Malamai (Voice Selection)</span>
          </button>

          <button
            id="tab-accessibility"
            onClick={() => setActiveTab('accessibility')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'accessibility'
                ? 'bg-[#FBF9F5] text-emerald-950 border-[#0D5C3A] shadow-sm'
                : 'text-gray-600 hover:text-emerald-900 border-transparent'
            }`}
          >
            <EyeOff className="w-4 h-4 text-emerald-700" />
            <span>Yanayin Sauti Kawai (Voice-Only)</span>
          </button>

          <button
            id="tab-account"
            onClick={() => setActiveTab('account')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'account'
                ? 'bg-[#FBF9F5] text-emerald-950 border-[#0D5C3A] shadow-sm'
                : 'text-gray-600 hover:text-emerald-900 border-transparent'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-600" />
            <span>Bayanin Dalibi (Profile)</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: VOICE SELECTION */}
          {activeTab === 'voice' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-emerald-950">Zabi Muryar Jagoran Koyo (Primary Voice Tutor)</h4>
                  <p className="text-xs text-gray-500 font-sans">
                    Zabi malamin da kake son jin muryarsa a darussa da hirarraki:
                  </p>
                </div>
                <button
                  onClick={() => speakText("Zabi malamin da kake son sauraron muryarsa a dukkan darussa.", 'ha-NG')}
                  className="p-1.5 text-[#0D5C3A] hover:bg-emerald-100 rounded-full"
                  title="Saurari Bayani"
                >
                  <Volume2 className="w-4 h-4 text-[#D4A017]" />
                </button>
              </div>

              {/* Personas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VOICE_PERSONAS.map((persona) => {
                  const isSelected = selectedPersonaId === persona.id;
                  const isPreviewing = previewingVoiceId === persona.id;

                  return (
                    <div
                      key={persona.id}
                      onClick={() => setSelectedPersonaId(persona.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 relative ${
                        isSelected
                          ? 'bg-emerald-50/80 border-[#0D5C3A] shadow-sm ring-1 ring-[#0D5C3A]'
                          : 'bg-white border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-11 h-11 rounded-full bg-white border border-emerald-200 flex items-center justify-center text-xl shadow-sm">
                            {persona.id === 'ustaz' && '👳‍♂️'}
                            {persona.id === 'amina' && '👩‍🏫'}
                            {persona.id === 'musa' && '🛒'}
                            {persona.id === 'ibrahim' && '👨‍⚕️'}
                            {persona.id === 'hafsat' && '🧕'}
                            {persona.id === 'bello' && '🚗'}
                            {persona.id === 'sarah' && '👩‍💼'}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h5 className="text-xs font-black text-emerald-950">{persona.name}</h5>
                              {isSelected && (
                                <span className="p-0.5 bg-[#0D5C3A] text-white rounded-full">
                                  <Check className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-gray-500 font-semibold">{persona.roleHausa}</p>
                          </div>
                        </div>

                        <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                          {persona.voiceGender}
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-600 font-sans leading-snug">
                        {persona.bioHausa}
                      </p>

                      <div className="pt-1 flex items-center justify-between border-t border-gray-150/70">
                        <span className="text-[10px] text-gray-400 font-mono">
                          Sauri: {persona.speakingRate}x
                        </span>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreviewVoice(persona);
                          }}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                            isPreviewing
                              ? 'bg-amber-400 text-emerald-950 animate-pulse'
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                          }`}
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>{isPreviewing ? 'Yana Fadi...' : 'Gwada Murya'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Speed Adjustment */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gray-700 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#D4A017]" />
                    Saurin Furucin Muryoyi (Speech Speed):
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-850">
                    {speechRate.toFixed(2)}x
                  </span>
                </div>
                <input
                  id="speech-rate-slider"
                  type="range"
                  min="0.7"
                  max="1.2"
                  step="0.05"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-full accent-[#0D5C3A] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-gray-400 font-bold uppercase">
                  <span>A Hankali (0.7x)</span>
                  <span>Daidai (0.9x)</span>
                  <span>Sauri (1.2x)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOICE-ONLY ACCESSIBILITY MODE */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              
              {/* Highlighted Voice-Only Mode Toggle Card */}
              <div className="bg-gradient-to-br from-amber-500/15 via-emerald-50 to-emerald-100/40 p-5 rounded-2xl border-2 border-[#D4A017] shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#D4A017] text-white flex items-center justify-center text-2xl shrink-0 shadow">
                      <EyeOff className="w-6 h-6 text-emerald-950" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-emerald-950">
                          Yanayin Sauti Kawai (Voice-Only Mode)
                        </h4>
                        <span className="text-[10px] bg-[#D4A017] text-[#1A1A1A] font-extrabold px-2 py-0.5 rounded-full uppercase">
                          Sabon Tsari
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 font-sans leading-relaxed">
                        Wannan tsari yana saukaka shafin karatu ta hanyar <strong>boye rubutun Turanci</strong> a darussa, yana tilasta wa dalibi dogaro 100% kan <strong>sauraron kunne</strong> ba tare da tsoron karanta haruffa ba.
                      </p>
                    </div>
                  </div>

                  {/* Big Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-1">
                    <input
                      id="voice-only-mode-toggle"
                      type="checkbox"
                      checked={voiceOnly}
                      onChange={(e) => {
                        setVoiceOnly(e.target.checked);
                        playSoundEffect(e.target.checked ? 'coin' : 'chime');
                        if (e.target.checked) {
                          speakText("An kunna yanayin Sauti Kawai. Yanzu zaka dogara ne kacokam kan sauraron kunnenka.", 'ha-NG');
                        }
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-[#0D5C3A]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between border-t border-amber-200/60 pt-3 text-xs">
                  <span className="text-gray-600 font-medium">
                    Matsayin Yanayi: <strong className={voiceOnly ? 'text-emerald-800 font-black' : 'text-gray-500'}>
                      {voiceOnly ? 'KUNNE (Active - Text Hidden)' : 'KASHE (Standard Text + Audio)'}
                    </strong>
                  </span>
                  <button
                    type="button"
                    onClick={explainVoiceOnlyMode}
                    className="text-[#9A6E1A] hover:underline font-bold flex items-center gap-1 text-[11px]"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Saurari Bayanin Tsarin
                  </button>
                </div>
              </div>

              {/* Zero Literacy Voice Prompting Toggle */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-150 flex items-center justify-center text-lg shrink-0">
                    🔊
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-emerald-950">
                      Karanta Kowace Umarni da Murya (Zero-Literacy Auto-Speech)
                    </h5>
                    <p className="text-[11px] text-gray-500 font-sans">
                      App din zai rika karanta dukkan tambayoyi da maɓallai da Hausa kai tsaye don masu karancin karatu.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    id="zero-literacy-mode-toggle"
                    type="checkbox"
                    checked={zeroLiteracy}
                    onChange={(e) => setZeroLiteracy(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D5C3A]"></div>
                </label>
              </div>

              {/* Pedagogical info box */}
              <div className="p-4 bg-emerald-900/5 rounded-2xl border border-emerald-900/10 flex items-start gap-3 text-xs text-gray-700">
                <Info className="w-5 h-5 text-[#0D5C3A] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-emerald-950">Hikimar Harshe (Linguistic Natural Method):</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    Yaro ba ya fara koyon yare ta hanyar rubutu ko ka'idojin nahawu (grammar). Yana fara ji ne, ya fahimta, sannan ya maimaita. Voice-Only Mode yana cire tsoron karatu domin kwakwalwarka ta maida hankali kacokam kan kunne.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PROFILE & ACCOUNT */}
          {activeTab === 'account' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-3">
                <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wider">Bayanan Dalibi</h5>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 block text-[10px]">Suna:</span>
                    <span className="font-bold text-gray-800">{progress.name}</span>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 block text-[10px]">Maki (XP):</span>
                    <span className="font-bold text-emerald-800">{progress.xp} XP</span>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 block text-[10px]">Tsabar Kudi (Coins):</span>
                    <span className="font-bold text-amber-600">{progress.coins} Coins</span>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 block text-[10px]">Kwanaki Jere:</span>
                    <span className="font-bold text-red-500">{progress.streak} Kwanaki 🔥</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/70 text-xs text-amber-900 space-y-2">
                <p className="font-bold">Malamin da aka fi so: {currentPersona.name}</p>
                <p className="text-[11px] text-gray-600">
                  Wannan zai zama malamin ku na dindindin lokacin darussa, kuma yana dacewa da sautin da kuka zaba.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-white p-4 px-6 border-t border-gray-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all"
          >
            Soke (Cancel)
          </button>

          <button
            id="save-settings-btn"
            type="button"
            onClick={handleSaveSettings}
            className="bg-[#0D5C3A] hover:bg-emerald-800 text-white px-6 py-2.5 rounded-full font-black text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 text-amber-400" />
            <span>Ajiye Saituna (Save Settings)</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
