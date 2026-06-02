/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Voice Text-To-Speech (TTS) using standard SpeechSynthesis with robust language/voice selection
let voicesPreloaded = false;
let activeAudioElement: HTMLAudioElement | null = null;
let activePlaylist: string[] = [];
let playlistIndex = 0;
let playlistLang = 'ha';

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    voicesPreloaded = true;
  };
}

/**
 * Splits a long string into clauses or sentences of max length, preserving full words.
 * Comfortably under Google TTS 200 character limit to avoid API rejection.
 */
export function splitTextIntoChunks(text: string, maxLength: number = 140): string[] {
  const chunks: string[] = [];
  
  // First split by sentence end punctuation, preserving them
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  
  for (let sentence of sentences) {
    sentence = sentence.trim();
    if (!sentence) continue;
    
    if (sentence.length <= maxLength) {
      chunks.push(sentence);
    } else {
      // If a single sentence is longer than maxLength, split by commas or semi-colons
      const parts = sentence.split(/([,;:]+)/);
      let currentChunk = "";
      
      for (const part of parts) {
        if (!part) continue;
        if ((currentChunk + part).length <= maxLength) {
          currentChunk += part;
        } else {
          if (currentChunk.trim()) {
            chunks.push(currentChunk.trim());
          }
          currentChunk = part;
        }
      }
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
    }
  }
  
  // Further safeguard: if any chunk is still somehow > maxLength, split it by spaces
  const finalChunks: string[] = [];
  for (const chunk of chunks) {
    if (chunk.length <= maxLength) {
      finalChunks.push(chunk);
    } else {
      const words = chunk.split(" ");
      let current = "";
      for (const word of words) {
        if ((current + " " + word).length <= maxLength) {
          current = current ? current + " " + word : word;
        } else {
          if (current) finalChunks.push(current);
          current = word;
        }
      }
      if (current) finalChunks.push(current);
    }
  }
  
  return finalChunks;
}

/**
 * Stop any ongoing local speech or audio playback to avoid overlapping voices.
 */
export function stopAllSpeech() {
  if (typeof window === 'undefined') return;
  
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.onended = null;
      activeAudioElement.onerror = null;
    } catch {
      // Ignored
    }
    activeAudioElement = null;
  }
  
  activePlaylist = [];
  playlistIndex = 0;
}

/**
 * Process the active playlist sequentially
 */
function playNextChunk() {
  if (playlistIndex >= activePlaylist.length) {
    activeAudioElement = null;
    activePlaylist = [];
    playlistIndex = 0;
    return;
  }

  const textChunk = activePlaylist[playlistIndex];
  const audioUrl = `/api/tts?lang=${playlistLang}&text=${encodeURIComponent(textChunk)}`;
  const audio = new Audio(audioUrl);
  activeAudioElement = audio;

  audio.onended = () => {
    playlistIndex++;
    playNextChunk();
  };

  audio.onerror = (err) => {
    console.warn("TTS chunk playback error, falling back to local TTS for residual text:", err);
    const remainingText = activePlaylist.slice(playlistIndex).join(" ");
    playLocalBackupTTS(remainingText, playlistLang === 'en' ? 'en-US' : 'ha-NG');
    activeAudioElement = null;
    activePlaylist = [];
    playlistIndex = 0;
  };

  audio.play().catch((res) => {
    console.warn("Hausa audio chunk stream playback failed/prevented. Falling back to browser local TTS:", res);
    const remainingText = activePlaylist.slice(playlistIndex).join(" ");
    playLocalBackupTTS(remainingText, playlistLang === 'en' ? 'en-US' : 'ha-NG');
    activeAudioElement = null;
    activePlaylist = [];
    playlistIndex = 0;
  });
}

export function speakText(text: string, lang: 'en-US' | 'ha-NG' = 'en-US') {
  if (typeof window === 'undefined') return;

  // Stopper any ongoing local speech or active playing audio playlists
  stopAllSpeech();

  if (lang.startsWith('ha')) {
    // ELEGANT: For Hausa, ALWAYS prefer our streamed female native Hausa TTS proxy as the primary strategy.
    // This streams a gorgeous, crystal-clear, native-speaking female voice that is highly clear, fluent, and professional.
    try {
      // Chunk the text to prevent Google Translate character length errors (max 200)
      const chunks = splitTextIntoChunks(text, 140);
      if (chunks.length > 0) {
        activePlaylist = chunks;
        playlistIndex = 0;
        playlistLang = 'ha';
        playNextChunk();
      }
    } catch (e) {
      console.error("Failed to construct audio stream for Hausa, falling back:", e);
      playLocalBackupTTS(text, lang);
    }
  } else {
    // English speech synthesis
    playLocalBackupTTS(text, lang);
  }
}

/**
 * High-quality female-first local speech synthesis fallback
 */
function playLocalBackupTTS(text: string, lang: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  const voices = window.speechSynthesis.getVoices();

  if (lang.startsWith('ha')) {
    // Find dynamic local Hausa voice
    let hausaVoice = voices.find(v => {
      const vLang = v.lang.toLowerCase();
      const vName = v.name.toLowerCase();
      return vLang === 'ha-ng' || vLang === 'ha' || vName.includes('hausa') || vName.includes('ha_ng');
    });
    if (!hausaVoice) {
      hausaVoice = voices.find(v => v.lang.toLowerCase().startsWith('ha'));
    }
    if (hausaVoice) {
      utterance.voice = hausaVoice;
    } else {
      // If no local Hausa voice is found, DO NOT speak in default (often male) robotic voice.
      // Fallback to a high quality female voice with slightly slower rate and adjusted pitch for a clear tutor feel.
      const femaleVoiceNames = [
        'zira',               // Microsoft Zira
        'samantha',           // MacOS Samantha
        'jenny',              // Microsoft Jenny / Edge
        'aria',               // Microsoft Aria / Edge
        'sara',               // Microsoft Sara / Edge
        'amber',              // Microsoft Amber / Edge
        'zari',               // Android Zari
        'daria',              // Android Daria / Edge
        'karen',              // Australian Female
        'hazel',              // UK Female
        'susan',              // Windows Susan
        'victoria',           // MacOS Victoria
        'kate',               // MacOS/iOS Kate
        'serena',             // MacOS/iOS Serena
        'veena',              // Mac/iOS Veena
        'fiona',              // Mac Fiona
        'moira',              // Irish Moira
        'tessa',              // South African Tessa
        'female',             // Name includes female
        'en-us-x-sfg',        // Android high-quality female
        'en-us-x-tpf',        // Android high-quality female
        'en-us-x-iol',        // Android high-quality female
        'en-us-x-knd'         // Android high-quality female
      ];
      let backupFemaleVoice = null;
      for (const nameKey of femaleVoiceNames) {
        backupFemaleVoice = voices.find(v => v.name.toLowerCase().includes(nameKey.toLowerCase()));
        if (backupFemaleVoice) break;
      }
      if (backupFemaleVoice) {
        utterance.voice = backupFemaleVoice;
      }
    }
    utterance.rate = 0.81; // Slow, comprehensible beginner rate
    utterance.pitch = 1.1; // Slightly pleasant pitch shift for female voice emulation
  } else {
    // English speech synthesis: prioritize clear female-sounding voices
    const femaleVoiceNames = [
      'zira',               // Microsoft Zira Desktop (crystal clear Windows female voice)
      'samantha',           // MacOS/iOS Samantha (clear, crisp female voice)
      'jenny',              // Edge Jenny (clear, human-sounding)
      'aria',               // Edge Aria (human-like female voice)
      'sara',               // Edge Sara
      'amber',              // Edge Amber
      'zari',               // Android Zari
      'daria',              // Edge Daria
      'karen',              // Australian female English
      'hazel',              // UK female English
      'susan',              // Windows Susan
      'victoria',           // MacOS Victoria
      'kate',               // MacOS Kate
      'serena',             // MacOS Serena
      'female',             // Explicitly contains 'female'
      'google us english',  // Standard Google US English
      'en-us-x-sfg',        // Android high-quality female
      'en-us-x-tpf',        // Android high-quality female
      'en-us-x-iol',        // Android high-quality female
      'en-us-x-knd'         // Android high-quality female
    ];
    
    let foundVoice = null;
    const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    
    for (const nameKey of femaleVoiceNames) {
      foundVoice = englishVoices.find(v => v.name.toLowerCase().includes(nameKey.toLowerCase()));
      if (foundVoice) break;
    }
    
    if (!foundVoice) {
      foundVoice = englishVoices.find(v => v.lang.toLowerCase() === 'en-us' && v.name.toLowerCase().includes('google'));
    }
    if (!foundVoice) {
      foundVoice = englishVoices.find(v => v.lang.toLowerCase().startsWith('en'));
    }
    
    if (foundVoice) {
      utterance.voice = foundVoice;
    }
    utterance.rate = 0.82; // Warm tutor rate
    utterance.pitch = 1.05; // Slightly pleasant pitch shift
  }

  window.speechSynthesis.speak(utterance);
}

// Check voice recognition support
export function isSpeechRecognitionSupported(): boolean {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

// Start browser Speech Recognition
export function startSpeechRecognition(
  onResult: (transcript: string) => void,
  onEnd: () => void,
  onError: (err: any) => void,
  lang: 'en-US' | 'ha-NG' = 'en-US'
): any {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    onError(new Error('Speech recognition not supported in this browser.'));
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = lang;

  recognition.onresult = (event: any) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    }
  };

  recognition.onerror = (event: any) => {
    onError(event);
  };

  recognition.onend = () => {
    onEnd();
  };

  try {
    recognition.start();
    return recognition;
  } catch (err) {
    onError(err);
    return null;
  }
}
