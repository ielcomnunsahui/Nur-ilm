/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, MicOff, Send, MessageSquareText, Sparkles, Volume2, ArrowLeft, RotateCcw, Award, Users 
} from 'lucide-react';
import { motion } from 'motion/react';
import { speakText, isSpeechRecognitionSupported, startSpeechRecognition } from './AudioVoiceHelper';
import { ChatMessage, UserProgress, VoicePersona } from '../types';
import { VOICE_PERSONAS } from '../data';

interface UstazNurChatProps {
  progress: UserProgress;
  onAddXp: (xp: number, coins: number) => void;
  onGoBack: () => void;
}

export const UstazNurChat: React.FC<UstazNurChatProps> = ({
  progress,
  onAddXp,
  onGoBack
}) => {
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(() => {
    if (progress.preferredVoicePersona) {
      const found = VOICE_PERSONAS.find(p => p.id === progress.preferredVoicePersona);
      if (found) return found;
    }
    return VOICE_PERSONAS[0];
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'ustaz',
      text: "Masha Allah! Barka da zuwa dandalin hira da Ustaz Nur. Ni ne malamin ku na Turanci. Tambaye ni komai ko mu gwada gaisuwa na ranar yau!",
      translation: "Welcome to chat with Ustaz Nur! I am your English teacher. Ask me anything or let's practice greetings!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [activeRecognition, setActiveRecognition] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<string>("Hello");
  const [currentPronunciationHint, setCurrentPronunciationHint] = useState<string>("Heh-loh");

  // Multi-dimensional scores from pronunciation evaluations
  const [lastScore, setLastScore] = useState<{
    accuracy: number;
    pronunciation: number;
    fluency: number;
    coachingTip: string;
    studentSaidText?: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech helper to auto-run on zero literacy
  const autoPlaySpeech = (text: string) => {
    speakText(text, 'ha-NG', {
      rate: selectedPersona.speakingRate,
      pitch: selectedPersona.pitch,
      gender: selectedPersona.voiceGender
    });
  };

  const handleSelectPersona = (persona: VoicePersona) => {
    setSelectedPersona(persona);
    const welcomeByPersona: Record<string, string> = {
      ustaz: "Assalamu Alaikum! Ni ne Ustaz Nur. A hankali zamu bi kowane sauti da ma'ana.",
      amina: "Barka da yini! Ni ce Malama Amina. Zan taimake ka da furuci a bayyane da Turancin asibiti.",
      musa: "Sannu abokina! Ni ne Musa dan kasuwar Kurmi. Bari mu koyi ciniki da lissafin kudi!",
      ibrahim: "Barka! Ni ne Dr. Ibrahim. Zan koya maka yadda ake bayyana ciwo da neman magani a asibiti.",
      hafsat: "Sannu dana/yata! Hajiya Hafsat ce. Kar ka ji tsoro ko kunya, Turanci abu ne mai sauki.",
      bello: "Sannu! Ni ne Brother Bello. Mu koyi Turancin mota, hanya da wayar salula cikin hanzari!",
      sarah: "Hello! Ni ce Sister Sarah. Zan nuna muku daddadan lafazi na Turancin duniya a saukake."
    };
    const newMsg: ChatMessage = {
      id: `p_switch_${Date.now()}`,
      sender: 'ustaz',
      text: welcomeByPersona[persona.id] || `Barka da zuwa! Ni ne ${persona.name}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    speakText(newMsg.text, 'ha-NG', {
      rate: persona.speakingRate,
      pitch: persona.pitch,
      gender: persona.voiceGender
    });
  };

  useEffect(() => {
    if (progress.zeroLiteracyMode && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'ustaz') {
        autoPlaySpeech(lastMsg.text);
      }
    }
  }, [messages, progress.zeroLiteracyMode]);

  // Handle typing messages
  const handleSendMessage = async (customText?: string) => {
    const messageContent = customText || textInput;
    if (!messageContent.trim()) return;

    const studentMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'student',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, studentMsg]);
    setTextInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, studentMsg],
          userProfile: progress,
          personaId: selectedPersona.id
        })
      });

      const data = await response.json();
      if (data && data.result) {
        const ustazMsg: ChatMessage = {
          id: `m_${Date.now() + 1}`,
          sender: 'ustaz',
          text: data.result.text,
          translation: data.result.hausaExplanation,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        if (data.result.englishTarget) {
          setCurrentTarget(data.result.englishTarget);
          setCurrentPronunciationHint(data.result.pronunciationHint || "");
        }

        setMessages(prev => [...prev, ustazMsg]);
        speakText(data.result.text, 'ha-NG', {
          rate: selectedPersona.speakingRate,
          pitch: selectedPersona.pitch,
          gender: selectedPersona.voiceGender
        });
      }
    } catch (error) {
      console.error("Error talking to AI Tutor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Recording audio voice input
  const toggleRecording = () => {
    if (isRecording) {
      if (activeRecognition) {
        activeRecognition.stop();
      }
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setLastScore(null);
      
      // Determine language based on if we are practicing English pronunciation or asking questions in Hausa
      const recognitionLang = currentTarget ? 'en-US' : 'ha-NG';
      
      const rec = startSpeechRecognition(
        async (transcript) => {
          if (!transcript.trim()) return;

          // If currentTarget practice is set, run evaluation!
          if (currentTarget) {
            setIsLoading(true);
            try {
              const evalRes = await fetch("/api/gemini/pronunciation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  studentSpeech: transcript,
                  targetPhrase: currentTarget
                })
              });
              const evalData = await evalRes.json();
              if (evalData && evalData.result) {
                setLastScore({
                  accuracy: evalData.result.accuracy,
                  pronunciation: evalData.result.pronunciation,
                  fluency: evalData.result.fluency,
                  coachingTip: evalData.result.coachingTip,
                  studentSaidText: transcript
                });

                // Award points and coins based on pronunciation score
                const averageScore = Math.floor((evalData.result.accuracy + evalData.result.pronunciation + evalData.result.fluency) / 3);
                if (averageScore >= 60) {
                  const xpAward = Math.floor(averageScore / 5);
                  const coinAward = Math.floor(averageScore / 20);
                  onAddXp(xpAward, coinAward);
                }

                // Add to chat history
                const spokenMessage: ChatMessage = {
                  id: `m_sp_${Date.now()}`,
                  sender: 'student',
                  text: `🗣️ [Spoke]: "${transcript}" (Target: "${currentTarget}")`,
                  pronunciationScore: {
                    accuracy: evalData.result.accuracy,
                    pronunciation: evalData.result.pronunciation,
                    fluency: evalData.result.fluency
                  },
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, spokenMessage]);

                // Prompt feedback through speech Synthesis
                speakText(evalData.result.coachingTip, 'ha-NG');
              }
            } catch (err) {
              console.error("Failed to evaluate pronunciation:", err);
            } finally {
              setIsLoading(false);
            }
          } else {
            // General question in Hausa
            handleSendMessage(transcript);
          }
        },
        () => {
          setIsRecording(false);
        },
        (error) => {
          console.error("Speech recognition error:", error);
          setIsRecording(false);
        },
        recognitionLang
      );

      setActiveRecognition(rec);
    }
  };

  return (
    <div id="ustaz-nur-chat-container" className="flex flex-col h-[680px] bg-[#F8F6F0] rounded-2xl shadow-lg border border-emerald-900/10 overflow-hidden">
      {/* Upper header */}
      <div className="bg-[#0F6B4B] p-4 flex items-center justify-between text-[#F8F6F0] border-b border-[#D4A017]/30">
        <div className="flex items-center gap-3">
          <button 
            id="chat-back-button"
            onClick={onGoBack}
            className="p-1.5 hover:bg-emerald-800/60 rounded-full transition-all text-[#D4A017]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          {/* Persona Avatar */}
          <div className="relative">
            <div className="w-11 h-11 bg-white border-2 border-[#D4A017] rounded-full flex items-center justify-center text-xl overflow-hidden shadow">
              {selectedPersona.id === 'ustaz' && '👳‍♂️'}
              {selectedPersona.id === 'amina' && '👩‍🏫'}
              {selectedPersona.id === 'musa' && '🛒'}
              {selectedPersona.id === 'ibrahim' && '👨‍⚕️'}
              {selectedPersona.id === 'hafsat' && '🧕'}
            </div>
            {isRecording && (
              <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
              </span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-base tracking-wide flex items-center gap-1.5 uppercase">
              {selectedPersona.name} <span className="text-[11px] bg-emerald-800 text-[#D4A017] px-2 py-0.5 rounded-full border border-[#D4A017]/50 font-normal">AI Malam</span>
            </h3>
            <p className="text-xs text-emerald-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse inline-block"></span>
              {selectedPersona.roleHausa}
            </p>
          </div>
        </div>

        <button 
          id="toggle-speak-instantly"
          onClick={() => autoPlaySpeech(`Barka da kokari! Ni ne ${selectedPersona.name}. Ina ji da ku.`)}
          className="p-2 text-yellow-400 hover:text-yellow-350 rounded-full hover:bg-emerald-800/40"
          title="Play Introduction Voice"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>

      {/* Multi-Persona Selector Bar */}
      <div id="persona-selector-bar" className="bg-emerald-950/80 px-4 py-2 flex items-center gap-2 overflow-x-auto border-b border-[#D4A017]/20 scrollbar-none">
        <span className="text-[10px] uppercase font-bold text-[#D4A017] flex items-center gap-1 shrink-0">
          <Users className="w-3.5 h-3.5" />
          Zabi Malam:
        </span>
        {VOICE_PERSONAS.map((p) => {
          const isSelected = p.id === selectedPersona.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPersona(p)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected 
                  ? 'bg-[#D4A017] text-[#1A1A1A] shadow font-bold scale-105' 
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800/80 border border-emerald-700/40'
              }`}
            >
              <span>
                {p.id === 'ustaz' && '👳‍♂️'}
                {p.id === 'amina' && '👩‍🏫'}
                {p.id === 'musa' && '🛒'}
                {p.id === 'ibrahim' && '👨‍⚕️'}
                {p.id === 'hafsat' && '🧕'}
              </span>
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Target homework panel */}
      {currentTarget && (
        <div id="pronunciation-homework-panel" className="bg-amber-50 border-b border-amber-200/60 p-3 px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
          <div className="flex items-start gap-2.5">
            <div className="bg-[#D4A017]/20 text-[#1A1A1A] p-1.5 rounded-lg mt-0.5 font-bold text-xs shrink-0 border border-[#D4A017]/40">
              GARE KA!
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Fadi wannan kalma a Turanci (Speak this phrase):</p>
              <p className="text-lg font-bold tracking-wide text-emerald-900 select-all">{currentTarget}</p>
              {currentPronunciationHint && (
                <p className="text-xs text-gray-400">Yadda ake fada: <span className="font-mono bg-amber-100 px-1 py-0.5 rounded text-gray-600">{currentPronunciationHint}</span></p>
              )}
            </div>
          </div>
          <button 
            id="btn-speak-target"
            onClick={() => speakText(currentTarget, 'en-US')}
            className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-all font-medium"
          >
            <Volume2 className="w-4 h-4 text-[#D4A017]" />
            Ji Furcin Malam
          </button>
        </div>
      )}

      {/* Main chats output log */}
      <div id="chat-messages-scroll" className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all ${
                msg.sender === 'student'
                  ? 'bg-emerald-900 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-emerald-900/5 rounded-tl-none'
              }`}
            >
              <div className="text-sm font-sans leading-relaxed whitespace-pre-line">
                {msg.text}
              </div>
              
              {/* Optional translations and tools */}
              {msg.translation && (
                <p className={`text-xs mt-2 pt-2 border-t ${
                  msg.sender === 'student' ? 'border-emerald-800 text-emerald-200' : 'border-emerald-50 text-gray-400 italic'
                }`}>
                  {msg.translation}
                </p>
              )}

              {/* Display scorecards for pronunciation homework */}
              {msg.pronunciationScore && (
                <div className="mt-3 p-2 bg-emerald-950/60 rounded-xl space-y-2 border border-[#D4A017]/30 text-xs">
                  <div className="flex items-center gap-1.5 text-[#D4A017] font-bold">
                    <Award className="w-4 h-4 text-[#D4A017]" />
                    Sakamakon Furri (Scorecard)
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="bg-emerald-900/60 p-1 rounded border border-emerald-800">
                      <p className="text-gray-300">Daidai (Acc)</p>
                      <p className={`font-bold text-sm ${msg.pronunciationScore.accuracy >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {msg.pronunciationScore.accuracy}%
                      </p>
                    </div>
                    <div className="bg-emerald-900/60 p-1 rounded border border-emerald-800">
                      <p className="text-gray-300">Fita (Pron)</p>
                      <p className={`font-bold text-sm ${msg.pronunciationScore.pronunciation >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {msg.pronunciationScore.pronunciation}%
                      </p>
                    </div>
                    <div className="bg-emerald-900/60 p-1 rounded border border-emerald-800">
                      <p className="text-gray-300">Zaƙi (Fluency)</p>
                      <p className={`font-bold text-sm ${msg.pronunciationScore.fluency >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {msg.pronunciationScore.fluency}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Play specific message voice */}
              {msg.sender === 'ustaz' && (
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => speakText(msg.text, 'ha-NG')}
                    className="p-1 rounded-full text-emerald-800 hover:bg-emerald-50"
                    title="Speak Message"
                  >
                    <Volume2 className="w-4 h-4 text-[#D4A017]" />
                  </button>
                </div>
              )}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2 text-gray-400 text-xs italic animate-pulse">
            <span className="flex gap-1 items-center bg-gray-100 px-3 py-2 rounded-full border">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce delay-200"></span>
              Ustaz Nur yana kan rubutu...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Micro feedback panel if student just finished recording */}
      {lastScore && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="m-4 mt-0 p-4 rounded-xl border border-[#D4A017]/40 bg-white shadow-md flex items-start gap-3"
        >
          <div className="h-10 w-10 shrink-0 rounded-full bg-[#D4A017]/10 flex items-center justify-center text-lg shadow-sm">
            ⭐
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-xs text-gray-400">Abu na ƙarshe da ka karanta: <span className="font-semibold text-gray-700 italic select-all">"{lastScore.studentSaidText}"</span></p>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Lafazin Baki: {lastScore.pronunciation}%
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
                XP ta ninka! +20 XP 🚀
              </span>
            </div>
            <p className="text-sm font-sans text-emerald-950 font-medium leading-relaxed mt-2 p-2 rounded-lg bg-[#F8F6F0] border border-emerald-900/5">
              💡 {lastScore.coachingTip}
            </p>
          </div>
          <button 
            id="lastScore-clear"
            onClick={() => setLastScore(null)}
            className="text-gray-400 hover:text-gray-650 text-xs shrink-0"
          >
            Soke
          </button>
        </motion.div>
      )}

      {/* Input panel at bottom */}
      <div id="chat-input-toolbar" className="p-4 bg-white border-t border-emerald-900/10 flex items-center gap-3">
        <button
          id="btn-voice-practice-chat"
          onClick={toggleRecording}
          className={`h-14 w-14 shrink-0 rounded-full flex items-center justify-center shadow-md border transition-all ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-500 border-red-500 text-white animate-pulse'
              : 'bg-[#0F6B4B] hover:bg-emerald-800 border-emerald-850 text-[#F8F6F0]'
          }`}
          title={isRecording ? 'Stop Recording' : 'Start Voice Input'}
        >
          {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <div className="flex-1 relative">
          <input
            id="chat-input-text"
            type="text"
            placeholder={isRecording ? 'Muna sauraronka, magana kawai...' : 'Tambayi Ustaz Nur yadda ake fada...'}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            disabled={isRecording}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="w-full pl-4 pr-12 py-3.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6B4B] text-sm bg-gray-50 disabled:bg-red-50"
          />
          <button
            id="btn-send-message-chat"
            onClick={() => handleSendMessage()}
            disabled={isRecording || !textInput.trim()}
            className="absolute right-2.5 top-2 p-2 rounded-full text-[#0F6B4B] hover:bg-emerald-50 transition-all disabled:text-gray-300 disabled:hover:bg-transparent"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
