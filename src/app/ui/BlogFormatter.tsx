"use client";
import { useState } from "react";

const FORMATS = [
  { value: "linkedin", label: "LinkedIn Post", icon: "💼" },
  { value: "twitter", label: "Twitter Thread", icon: "🐦" },
  { value: "medium", label: "Medium Draft", icon: "📝" },
];

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "witty", label: "Witty" },
];

interface BlogFormatterProps {
  blogContent: string;
}

export default function BlogFormatter({ blogContent }: BlogFormatterProps) {
  const [selectedFormat, setSelectedFormat] = useState("linkedin");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleFormat() {
    if (!blogContent) return;
    
    setLoading(true);
    setResult(null);
    setError("");
    
    try {
      const res = await fetch("/app/api/format-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          blog: blogContent, 
          format: selectedFormat, 
          tone: selectedTone 
        }),
      });
      
      if (!res.ok) throw new Error("API error");
      setResult(await res.json());
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Blog-to-Post Formatter</h3>
      
      <div className="space-y-4">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Platform:</label>
          <div className="grid grid-cols-3 gap-2">
            {FORMATS.map((format) => (
              <button
                key={format.value}
                onClick={() => setSelectedFormat(format.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedFormat === format.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">{format.icon}</div>
                <div className="text-sm font-medium">{format.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Tone:</label>
          <div className="flex gap-2">
            {TONES.map((tone) => (
              <button
                key={tone.value}
                onClick={() => setSelectedTone(tone.value)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedTone === tone.value
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        {/* Format Button */}
        <button
          onClick={handleFormat}
          disabled={loading || !blogContent}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Thinking...
            </div>
          ) : (
            `Format for ${FORMATS.find(f => f.value === selectedFormat)?.label}`
          )}
        </button>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold text-lg">Formatted Content:</h4>
            
            {result.format === "twitter" && result.tweets ? (
              <div className="space-y-3">
                {result.tweets.map((tweet: string, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Tweet {index + 1}</div>
                    <div className="text-sm">{tweet}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {tweet.length}/280 characters
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="whitespace-pre-wrap text-sm">{result.formattedContent}</div>
              </div>
            )}
            
            <button
              onClick={() => {
                const content = result.format === "twitter" 
                  ? result.tweets.join('\n\n') 
                  : result.formattedContent;
                navigator.clipboard.writeText(content);
              }}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 