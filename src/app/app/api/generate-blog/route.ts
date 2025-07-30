import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  const { transcript, wordCount = 200, tone = "professional" } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Generate blog content
    const blogResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Write a detailed, engaging, ${wordCount}-word blog post with a ${tone} tone. Include a catchy introduction and conclusion about the following topic. Make it sound like a real blog, not a summary:\n\n${transcript}`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const blogContent = blogResponse.text;

    // Generate summary
    const summaryResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Create a concise 2-3 sentence summary of the following blog post:\n\n${blogContent}`,
      config: {
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
      },
    });

    const summary = summaryResponse.text;

    return NextResponse.json({ 
      summary: blogContent,
      blogSummary: summary 
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ 
      error: `Gemini API error: ${error.message || "Unknown error"}` 
    }, { status: 500 });
  }
} 