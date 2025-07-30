import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  const { blog, format, tone } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });

  try {
    const ai = new GoogleGenAI({ apiKey });

    let prompt = "";
    let wordCount = 150;

    switch (format) {
      case "linkedin":
        prompt = `Convert this blog post into a professional LinkedIn post with a ${tone} tone. Make it engaging, include relevant hashtags, and keep it under 1300 characters:\n\n${blog}`;
        wordCount = 200;
        break;
      case "twitter":
        prompt = `Convert this blog post into a Twitter thread (3-5 tweets) with a ${tone} tone. Each tweet should be under 280 characters and form a coherent story:\n\n${blog}`;
        wordCount = 300;
        break;
      case "medium":
        prompt = `Convert this blog post into a Medium-ready draft with a ${tone} tone. Add a compelling headline, subheadings, and maintain the same key points but with Medium's style:\n\n${blog}`;
        wordCount = 500;
        break;
      default:
        return NextResponse.json({ error: "Invalid format specified" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const formattedContent = response.text || "";

    // For Twitter, split into individual tweets
    let tweets: string[] = [];
    if (format === "twitter") {
      tweets = formattedContent
        .split('\n')
        .filter(tweet => tweet.trim().length > 0 && tweet.trim().length <= 280)
        .slice(0, 5);
    }

    return NextResponse.json({ 
      formattedContent,
      tweets,
      format,
      tone
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ 
      error: `Gemini API error: ${error.message || "Unknown error"}` 
    }, { status: 500 });
  }
} 