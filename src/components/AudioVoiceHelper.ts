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

export function speakText(
  text: string, 
  lang: 'en-US' | 'ha-NG' = 'en-US',
  personaOptions?: { rate?: number; pitch?: number; gender?: 'male' | 'female' }
) {
  if (typeof window === 'undefined') return;

  // Stop any ongoing local speech or active playing audio playlists
  stopAllSpeech();

  if (lang.startsWith('ha')) {
    // ELEGANT: For Hausa, ALWAYS prefer our streamed native Hausa TTS proxy as the primary strategy.
    try {
      const chunks = splitTextIntoChunks(text, 140);
      if (chunks.length > 0) {
        activePlaylist = chunks;
        playlistIndex = 0;
        playlistLang = 'ha';
        playNextChunk();
      }
    } catch (e) {
      console.error("Failed to construct audio stream for Hausa, falling back:", e);
      playLocalBackupTTS(text, lang, personaOptions);
    }
  } else {
    // English speech synthesis with persona tuning
    playLocalBackupTTS(text, lang, personaOptions);
  }
}

/**
 * Play gentle auditory cues (chime, success ding, error tone)
 */
export function playSoundEffect(type: 'success' | 'chime' | 'coin' | 'encouragement') {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success' || type === 'coin') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(392, ctx.currentTime); // G4
      osc.frequency.setValueAtTime(523.25, ctx.currentTime + 0.12); // C5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch {
    // AudioContext fallback ignored safely
  }
}

/**
 * Persona-aware local speech synthesis
 */
function playLocalBackupTTS(
  text: string, 
  lang: string, 
  personaOptions?: { rate?: number; pitch?: number; gender?: 'male' | 'female' }
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  const voices = window.speechSynthesis.getVoices();

  const isMalePreferred = personaOptions?.gender === 'male';

  if (lang.startsWith('ha')) {
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
      const targetVoices = isMalePreferred 
        ? ['david', 'george', 'mark', 'richard', 'male'] 
        : ['zira', 'samantha', 'jenny', 'aria', 'sara', 'female'];
      
      let backupVoice = null;
      for (const nameKey of targetVoices) {
        backupVoice = voices.find(v => v.name.toLowerCase().includes(nameKey.toLowerCase()));
        if (backupVoice) break;
      }
      if (backupVoice) {
        utterance.voice = backupVoice;
      }
    }
    utterance.rate = personaOptions?.rate || 0.81;
    utterance.pitch = personaOptions?.pitch || (isMalePreferred ? 0.95 : 1.1);
  } else {
    // English speech synthesis
    const targetVoices = isMalePreferred
      ? ['david', 'george', 'mark', 'richard', 'daniel', 'male']
      : ['zira', 'samantha', 'jenny', 'aria', 'sara', 'amber', 'female'];
    
    let foundVoice = null;
    const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    
    for (const nameKey of targetVoices) {
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
    utterance.rate = personaOptions?.rate || 0.82;
    utterance.pitch = personaOptions?.pitch || (isMalePreferred ? 0.95 : 1.05);
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
