import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  const { text, wordCount, tone = "professional" } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });

  try {
    const ai = new GoogleGenAI({ apiKey });

    const wordCountPrompt = wordCount ? ` (approximately ${wordCount} words)` : '';
    const prompt = `Rephrase the following text for fluency and naturalness with a ${tone} tone${wordCountPrompt}:\n${text}`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        temperature: 0.5,
        topP: 0.8,
        topK: 40,
      },
    });

    const rephrased = response.text || "-";
    return NextResponse.json({ rephrased });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ 
      error: `Gemini API error: ${error.message || "Unknown error"}` 
    }, { status: 500 });
  }
} 