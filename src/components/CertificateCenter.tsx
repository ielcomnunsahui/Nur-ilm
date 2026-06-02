/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Printer, Download, Eye, ShieldCheck, QrCode } from 'lucide-react';
import { motion } from 'motion/react';
import { UserProgress } from '../types';
import { speakText } from './AudioVoiceHelper';

interface CertificateCenterProps {
  progress: UserProgress;
  onGoBack: () => void;
}

export const CertificateCenter: React.FC<CertificateCenterProps> = ({
  progress,
  onGoBack
}) => {
  const [studentName, setStudentName] = useState(progress.name || "Musa Ibrahim");
  const [activeCourse, setActiveCourse] = useState("Sadarwa da Lafazi na Turanci (English Conversational Fluency)");
  const [verificationCode, setVerificationCode] = useState(`NUR-ILM-${Math.floor(100000 + Math.random() * 900000)}`);
  const [isVerified, setIsVerified] = useState(true);

  const triggerVocalGuide = () => {
    speakText(`Wannan shine dandalin Shaidar Karatu. Sunanka shine: ${studentName}. An baka wannan shaida domin ka cika dukkan sharuɗa na dandalin Nur al-Ilm. Barka da ƙoƙari!`, 'ha-NG');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="certificate-center-container" className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header controls toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-900/5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-emerald-950 font-sans">Shaidar Karatu (Verification & Certificates)</h2>
          <p className="text-xs text-gray-500">Zafin shaidar karatu don bajintar da ka nuna</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-cert-voice-guide"
            onClick={triggerVocalGuide}
            className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border"
            title="Read Guide Out Loud"
          >
            🔊 Saurari Jagora
          </button>
          <button
            id="btn-cert-back"
            onClick={onGoBack}
            className="px-4 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all"
          >
            Koma Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customize panel */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-900/5 shadow-sm space-y-4 h-fit">
          <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            Shirya Sunanka (Enter Name)
          </h3>
          <p className="text-xs text-gray-400">Tabbatar da cewa sunanka ya yi daidai da na katin shaidar kasa domin dacewa.</p>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600">Sunan Mai Karatu (Student Name):</label>
            <input 
              id="cert-name-input"
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-250 focus:outline-none focus:ring-2 focus:ring-[#0F6B4B] text-sm"
              placeholder="E.g., Musa Ibrahim Bello"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 font-sans">Darasin da Kaji (Select Certificate Level):</label>
            <select
              id="cert-level-select"
              value={activeCourse}
              onChange={(e) => setActiveCourse(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-250 focus:outline-none focus:ring-2 focus:ring-[#0F6B4B] text-sm bg-white font-medium"
            >
              <option value="Sadarwa da Lafazi na Turanci (English Conversational Fluency)">Mataki na Intermediate (Level 3 - everyday conversation)</option>
              <option value="Matakin Fari na Harshhen Turanci (English Beginner Fundamentals)">Mataki na Filiz (Level 0/1 - sounded sounds & ABC)</option>
              <option value="Kwarewa ta Musamman don Kasuwanci (Business Fluency)">Mataki na Advanced (Level 5 - Job interviews & professional)</option>
            </select>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              id="btn-print-certificate"
              onClick={handlePrint}
              className="w-full py-3 bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <Printer className="w-4 h-4 text-[#D4A017]" />
              Buga Shaida (Print / Save PDF)
            </button>
            <button
              id="btn-regen-serial"
              onClick={() => setVerificationCode(`NUR-ILM-${Math.floor(100000 + Math.random() * 900000)}`)}
              className="w-full py-2.5 text-xs bg-gray-50 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-100 font-bold"
            >
              Canza Lambar Tabbatarwa (Regen Token)
            </button>
          </div>
        </div>

        {/* Certificate Display Layout */}
        <div className="lg:col-span-2">
          {/* Printable container */}
          <div 
            id="printable-certificate-card" 
            className="w-full aspect-[1.414/1] bg-[#F8F6F0] rounded-2xl border-8 border-double border-[#0F6B4B] p-8 md:p-12 shadow-md relative overflow-hidden flex flex-col justify-between print:border-8 print:p-10 print:bg-white print:shadow-none"
          >
            {/* Islamic decorative corner patterns styled cleanly */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#D4A017]/50 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[#D4A017]/50 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[#D4A017]/50 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#D4A017]/50 rounded-br-lg pointer-events-none" />

            {/* Background geometric emblem badge watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none text-9xl">
              نور العلم
            </div>

            {/* Cert Header Section */}
            <div className="text-center space-y-1 z-10">
              <div className="flex justify-center mb-1">
                <span className="text-5xl">⭐️</span>
              </div>
              <h1 className="text-xl md:text-3xl font-serif font-black tracking-normal text-emerald-950 uppercase">Nur al-Ilm Certificate</h1>
              <p className="text-[#D4A017] text-xs font-bold tracking-widest font-sans">نور العلم — SHAIDAR KARATU TA MUSAMMAN</p>
            </div>

            {/* Cert Body contents */}
            <div className="text-center space-y-4 my-auto z-10">
              <p className="text-[11px] md:text-xs text-gray-500 uppercase font-sans tracking-wide">Da yardar Allah, wannan murna tana tabbatar da cewa:</p>
              
              <div className="space-y-1 border-b border-gray-200/60 pb-2 max-w-md mx-auto">
                <h2 className="text-2xl md:text-4xl font-serif font-black text-emerald-900 border-none capitalize my-1 pr-0 pl-0">
                  {studentName}
                </h2>
              </div>

              <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed max-w-lg mx-auto font-sans">
                Ya yi nasarar cika dukkan darussan koyo, jarrabawa da lafazin sauti a matakin makarantar <strong>NUR AL-ILM</strong> kuma ya nuna kwarewar muryar baki a dandalin:
              </p>

              <h4 className="text-sm md:text-base font-bold text-emerald-950 uppercase tracking-wide bg-emerald-900/5 py-1 px-4 rounded-full max-w-md mx-auto border border-emerald-900/10">
                {activeCourse}
              </h4>
            </div>

            {/* Cert Footer metadata and verification tools */}
            <div className="flex items-end justify-between border-t border-gray-200/40 pt-4 z-10 mt-auto">
              <div className="text-left">
                <p className="text-[9px] text-gray-400 font-semibold uppercase leading-tight">Ranar Karba:</p>
                <p className="text-[11px] md:text-xs font-bold text-gray-700 font-mono">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-[9px] text-gray-400 mt-2 font-semibold uppercase leading-tight font-mono">Shugaba:</p>
                <p className="text-xs font-serif italic text-emerald-900">Ustaz Nur al-Ilm</p>
              </div>

              {/* Dynamic QR block */}
              <div className="text-right flex items-center gap-3">
                <div className="text-left hidden sm:block">
                  <p className="text-[8px] text-gray-400 uppercase font-semibold">Tabbatarwa (Verify):</p>
                  <p className="text-[10px] font-mono font-bold text-gray-800">{verificationCode}</p>
                  <p className="text-[8px] text-green-600 flex items-center gap-0.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                    Verified Online
                  </p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200/60 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-emerald-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
