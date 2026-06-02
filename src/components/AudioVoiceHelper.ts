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

  // Detect if a native Hausa voice is locally available on the learner's browser
  let hasLocalHausaVoice = false;
  if ('speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    const found = voices.find(v => {
      const vLang = v.lang.toLowerCase();
      const vName = v.name.toLowerCase();
      return vLang === 'ha-ng' || vLang === 'ha' || vName.includes('hausa') || vName.includes('ha_ng');
    });
    if (found) {
      hasLocalHausaVoice = true;
    }
  }

  // If the browser natively supports Hausa voices, or if we are speaking English, use local SpeechSynthesis
  if (lang.startsWith('en') || hasLocalHausaVoice) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      const voices = window.speechSynthesis.getVoices();

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
        }
        utterance.rate = 0.81; // Soft and clear tutor rate
        utterance.pitch = 1.0;
      } else {
        let englishVoice = voices.find(v => v.lang.toLowerCase() === 'en-us' && v.name.toLowerCase().includes('google'));
        if (!englishVoice) {
          englishVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
        }
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
        utterance.rate = 0.82; // Safe beginner rate
        utterance.pitch = 1.05;
      }

      window.speechSynthesis.speak(utterance);
    }
  } else {
    // Elegant fallback: Stream fluent native-speaker Hausa audio from our server proxy
    try {
      const audioUrl = `/api/tts?lang=ha&text=${encodeURIComponent(text)}`;
      const audio = new Audio(audioUrl);
      activeAudioElement = audio;
      audio.play().catch((err) => {
        console.warn("Audio stream playback failed, running core browser TTS fallback:", err);
        // Desperate system fallback: read anyway (will sound robotic if voice pack is missing, but guarantees compliance)
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ha-NG';
          utterance.rate = 0.80;
          window.speechSynthesis.speak(utterance);
        }
      });
    } catch (e) {
      console.error("Failed to play streamed voice guide, falling back:", e);
    }
  }
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
