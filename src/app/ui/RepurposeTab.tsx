"use client";
import { useState } from "react";

const STYLES = [
  { value: "default", label: "Default" },
  { value: "catchy", label: "Catchy" },
  { value: "hot", label: "Hot" },
];

const WORD_COUNTS = [
  { value: 100, label: "100 words" },
  { value: 150, label: "150 words" },
  { value: 200, label: "200 words" },
  { value: 300, label: "300 words" },
  { value: 500, label: "500 words" },
];

export default function RepurposeTab() {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("default");
  const [emojis, setEmojis] = useState(false);
  const [wordCount, setWordCount] = useState(150);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/app/api/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, style, emojis, wordCount }),
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
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-3 border rounded-lg mb-2 min-h-[100px]"
          placeholder="Paste your blog post or newsletter text..."
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <div className="flex flex-wrap gap-4 mb-2 items-center">
          <div className="flex gap-2 items-center">
            <span className="font-medium">Style:</span>
            {STYLES.map((s) => (
              <label key={s.value} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="style"
                  value={s.value}
                  checked={style === s.value}
                  onChange={() => setStyle(s.value)}
                />
                {s.label}
              </label>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-medium">Word Count:</span>
            <select
              className="border rounded px-2 py-1"
              value={wordCount}
              onChange={e => setWordCount(Number(e.target.value))}
            >
              {WORD_COUNTS.map((wc) => (
                <option key={wc.value} value={wc.value}>{wc.label}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={emojis}
              onChange={() => setEmojis((v) => !v)}
            />
            <span>Emojis</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? "Repurposing..." : "Repurpose Content"}
        </button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {result && (
        <div className="bg-white rounded-2xl shadow-md p-4 mt-4">
          <div className="mb-4">
            <h3 className="font-bold mb-2">Repurposed Content:</h3>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">{result.repurposedContent}</div>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Summary:</h3>
            <div className="bg-blue-50 p-3 rounded-lg text-sm">{result.summary}</div>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Tweet Thread:</h3>
            <ul className="list-disc ml-6 space-y-1">
              {result.tweets?.map((t: string, i: number) => (
                <li key={i} className="text-sm bg-gray-50 p-2 rounded">{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Instagram Caption:</h3>
            <div className="bg-green-50 p-3 rounded-lg text-sm">{result.instagram}</div>
          </div>
        </div>
      )}
    </div>
  );
} 