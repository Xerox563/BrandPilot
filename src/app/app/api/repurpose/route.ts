import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  const { text, style, emojis, wordCount = 150 } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Compose prompt for style and emojis
    let prompt = text;
    if (style === "catchy") {
      prompt = `Rewrite this content in a catchy, attention-grabbing style (${wordCount} words): ${text}`;
    } else if (style === "hot") {
      prompt = `Rewrite this content in a hot, trending, viral style (${wordCount} words): ${text}`;
    } else {
      prompt = `Rewrite this content in a clear, engaging style (${wordCount} words): ${text}`;
    }
    
    if (emojis) {
      prompt += "\nAdd relevant emojis to make it more engaging.";
    }

    // Generate repurposed content
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const repurposedContent = response.text;

    // Generate summary
    const summaryResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Create a brief 1-2 sentence summary of this content:\n\n${repurposedContent}`,
      config: {
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
      },
    });

    const summary = summaryResponse.text;

    // Generate tweet thread (3 tweets)
    const tweetResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Create 3 engaging tweets from this content. Each tweet should be under 280 characters and form a coherent thread:\n\n${repurposedContent}`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const tweetText = tweetResponse.text || '';
    const tweets = tweetText.split('\n').filter(tweet => tweet.trim().length > 0).slice(0, 3);

    // Generate Instagram caption
    const instagramResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Create an engaging Instagram caption (under 120 characters) from this content:\n\n${repurposedContent}`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const instagram = instagramResponse.text;

    return NextResponse.json({ 
      summary, 
      tweets, 
      instagram,
      repurposedContent 
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ 
      error: `Gemini API error: ${error.message || "Unknown error"}` 
    }, { status: 500 });
  }
}
