/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Voice Text-To-Speech (TTS) using standard SpeechSynthesis with robust language/voice selection
let voicesPreloaded = false;
let activeAudioElement: HTMLAudioElement | null = null;

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    voicesPreloaded = true;
  };
}

export function speakText(text: string, lang: 'en-US' | 'ha-NG' = 'en-US') {
  if (typeof window === 'undefined') return;

  // Cancel any ongoing local speech to avoid overlap
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // Stop any ongoing proxy background audio playback
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement = null;
    } catch {
      // Ignored
    }
  }

  if (lang.startsWith('ha')) {
    // ELEGANT: For Hausa, ALWAYS prefer our streamed female native Hausa TTS proxy as the primary strategy.
    // This streams a gorgeous, crystal-clear, native-speaking female voice that is highly clear, fluent, and professional.
    try {
      const audioUrl = `/api/tts?lang=ha&text=${encodeURIComponent(text)}`;
      const audio = new Audio(audioUrl);
      activeAudioElement = audio;
      
      audio.play().catch((res) => {
        console.warn("Hausa audio stream playback failed/prevented. Falling back to browser local TTS:", res);
        playLocalBackupTTS(text, lang);
      });
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
        'karen',              // Australian Female
        'hazel',              // UK Female
        'susan',              // Windows Susan
        'female',             // Name includes female
        'en-us-x-sfg',        // Android high-quality female
        'en-us-x-tpf'         // Android high-quality female
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
      'karen',              // Australian female English
      'hazel',              // UK female English
      'susan',              // Windows Susan
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
