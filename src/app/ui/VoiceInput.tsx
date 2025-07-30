"use client";
import { useState, useEffect } from "react";

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  placeholder?: string;
}

export default function VoiceInput({ onTranscript, placeholder = "Click to start speaking..." }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      setIsSupported(false);
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      setIsListening(true);
      setError("");
      console.log('Speech recognition started');
    };

    recognitionInstance.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const fullTranscript = finalTranscript + interimTranscript;
      setTranscript(fullTranscript);
      onTranscript(fullTranscript);
    };

        recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      
      // Handle specific error types
      switch (event.error) {
        case 'network':
          setError("Network error. Please check your internet connection and try again.");
          break;
        case 'not-allowed':
          setError("Microphone access denied. Please allow microphone permissions and try again.");
          break;
        case 'no-speech':
          setError("No speech detected. Please speak clearly and try again.");
          break;
        case 'audio-capture':
          setError("Audio capture error. Please check your microphone and try again.");
          break;
        case 'service-not-allowed':
          setError("Speech recognition service not available. Please try again later.");
          break;
        case 'aborted':
          // This is normal when stopping recognition
          break;
        default:
          setError(`Speech recognition error: ${event.error}. Please try again.`);
      }
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      console.log('Speech recognition ended');
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition || !isSupported || isProcessing) return;

    setIsProcessing(true);
    
    if (isListening) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    } else {
      try {
        // Start recognition directly - let the browser handle state
        recognition.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        if (error instanceof Error && error.message.includes('already started')) {
          setError("Speech recognition is already running. Please stop it first.");
        } else {
          setError("Failed to start speech recognition. Please try again.");
        }
      }
    }
    
    // Reset processing state after a short delay
    setTimeout(() => setIsProcessing(false), 500);
  };

  const clearTranscript = () => {
    setTranscript("");
    onTranscript("");
    setError("");
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          className="w-full min-h-[120px] p-3 border rounded-xl bg-gray-50 dark:bg-gray-800 resize-none pr-12"
          placeholder={placeholder}
          value={transcript}
          onChange={(e) => {
            setTranscript(e.target.value);
            onTranscript(e.target.value);
          }}
        />

        {/* Voice Button */}
        <button
          onClick={toggleListening}
          disabled={!isSupported || isProcessing}
          className={`absolute top-3 right-3 p-2 rounded-lg transition-all ${
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } ${!isSupported || isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          title={isListening ? "Stop recording" : "Start voice input"}
        >
          {isListening ? (
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></div>
              <span className="text-xs">●</span>
            </div>
          ) : isProcessing ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <span className="text-lg">🎤</span>
          )}
        </button>
      </div>

      {/* Status and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isListening && (
            <div className="flex items-center text-sm text-red-500">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
              Listening...
            </div>
          )}
          {error && (
            <div className="text-sm text-red-500 max-w-xs">{error}</div>
          )}
        </div>

        {transcript && (
          <button
            onClick={clearTranscript}
            className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
          >
            Clear
          </button>
        )}
      </div>

      {/* Instructions */}
      {!isSupported && (
        <div className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <div className="font-medium mb-1">Voice input not supported</div>
          <div>Please type your idea manually or use a supported browser (Chrome, Edge, Safari).</div>
        </div>
      )}

      {/* Help Text */}
      {isSupported && !isListening && !transcript && (
        <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="font-medium mb-1">💡 Tips for better voice recognition:</div>
          <ul className="text-xs space-y-1">
            <li>• Speak clearly and at a normal pace</li>
            <li>• Ensure your microphone is working</li>
            <li>• Allow microphone permissions when prompted</li>
            <li>• Use a quiet environment for best results</li>
          </ul>
        </div>
      )}
    </div>
  );
} 