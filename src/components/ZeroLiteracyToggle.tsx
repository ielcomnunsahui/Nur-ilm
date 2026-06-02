/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { Volume2, HelpCircle, Eye, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { speakText } from './AudioVoiceHelper';

interface ZeroLiteracyToggleProps {
  enabled: boolean;
  onToggle: (val: boolean) => void;
  currentPageContext?: string; // Guidance context
}

export const ZeroLiteracyToggle: React.FC<ZeroLiteracyToggleProps> = ({
  enabled,
  onToggle,
  currentPageContext = 'home'
}) => {

  const justEnabledRef = useRef(false);

  const triggerAudioHelp = () => {
    let textToSpeak = "";
    if (currentPageContext === 'home' || currentPageContext === 'dashboard' || currentPageContext === 'landing') {
      textToSpeak = "Barka da zuwa dandalin Nur al-Ilm! Wannan shi ne dandalin koyon harshen Turanci cikin sauƙi ta hynhar saurare da furtawa. Domin farawa, zaɓi ɗaya daga cikin darussan da ke ƙasa, ko kuma ka danna maɓallin hira don tattaunawa kai-tsaye da Ustaz Nur.";
    } else if (currentPageContext === 'lesson') {
      textToSpeak = "Barka da zuwa darasinmu! Domin jin yadda ake furta kalma a Turanci, danna maɓallin lasifikar zinariya. Idan kuma kana son gwada furucin muryarka, danna jan maɓallin makirufo ka yi magana cikin sauti mai bayyana.";
    } else if (currentPageContext === 'chat') {
      textToSpeak = "Wannan shi ne dandalin tattaunawa da Ustaz Nur. Ustaz Nur zai yi maka bayani da harshen Hausa sannan ya ba ka kalmomin Turanci da za ka furta. Danna lasifika don saurare, ko kuma danna jan makirufo don yi masa magana.";
    } else if (currentPageContext === 'parent') {
      textToSpeak = "Barka da zuwa dandalin iyaye. A nan za ku iya duba ƙoƙari da ci-gaban karatun yaronku, duba makin da ya samu, sannan ku zazzage masa takardar shaidar karatu, wato satifikeet.";
    } else if (currentPageContext === 'admin') {
      textToSpeak = "Wannan shi ne sashen gudanarwa. A nan ne ake tsara sababbin darussa da duba ci-gaban dandalin gabaɗaya.";
    } else {
      textToSpeak = "Nur al-Ilm yana tare da kai koyaushe don koya maka Turanci cikin sauƙi da sauri. Danna kowane hoto ko maɓalli domin jin sautinsa a bayyane.";
    }
    speakText(textToSpeak, 'ha-NG');
  };

  useEffect(() => {
    if (enabled) {
      if (justEnabledRef.current) {
        // Skip playing the welcome message immediately on enabling to let the activation message speak fully in the gorgeous female voice.
        justEnabledRef.current = false;
        return;
      }
      // Short delay for natural transition
      const timer = setTimeout(() => {
        triggerAudioHelp();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentPageContext, enabled]);

  return (
    <div id="zero-literacy-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {enabled && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-[#0F6B4B] text-[#F8F6F0] p-4 rounded-xl shadow-xl max-w-xs border border-[#D4A017] flex items-start gap-3 text-xs mb-2 cursor-pointer"
          onClick={triggerAudioHelp}
          id="zero-literacy-speech-bubble"
        >
          <Info className="w-5 h-5 text-[#D4A017] shrink-0 animate-pulse" />
          <div>
            <p className="font-bold text-[#D4A017] mb-1">Muryar Taimako Kunna Take (Audio Guide On)</p>
            <p className="leading-relaxed">Danna babban lasifikar rawayya don sake jin bayanin wannan shafin ta sautin murya.</p>
          </div>
        </motion.div>
      )}

      <div className="flex items-center gap-2">
        <button
          id="btn-trigger-speech"
          onClick={triggerAudioHelp}
          className={`p-3.5 rounded-full shadow-lg border flex items-center justify-center transition-all ${
            enabled 
              ? 'bg-[#D4A017] text-[#1A1A1A] border-[#D4A017] hover:scale-105' 
              : 'bg-gray-200 text-gray-500 border-gray-300 hover:bg-gray-300'
          }`}
          title="Saurari Bayanan Shafi (Listen to Page Guide)"
        >
          <Volume2 className="w-6 h-6 animate-bounce" />
        </button>

        <button
          id="btn-toggle-zero-literacy"
          onClick={() => {
            const nextVal = !enabled;
            onToggle(nextVal);
            if (nextVal) {
              justEnabledRef.current = true;
              speakText("An kunna muryar taimako ta Hausa. Ba kwa bukatar karatu.", 'ha-NG');
            } else {
              speakText("Voice guide disabled.", 'en-US');
            }
          }}
          className={`px-4 py-3 rounded-full shadow-lg font-bold border flex items-center gap-2 text-sm transition-all uppercase tracking-wider ${
            enabled 
              ? 'bg-[#0F6B4B] text-[#F8F6F0] border-[#0F6B4B] ring-2 ring-[#D4A017]' 
              : 'bg-white text-[#0F6B4B] border-[#0F6B4B] hover:bg-gray-50'
          }`}
        >
          <Eye className="w-4 h-4" />
          {enabled ? 'Kashe Murya (Mute)' : 'Kunna Muryar Taimako (Voice On)'}
        </button>
      </div>
    </div>
  );
};
