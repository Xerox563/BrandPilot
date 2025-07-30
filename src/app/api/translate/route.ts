import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SUPPORTED_LANGUAGES = {
  en: "English",
  hi: "Hindi",
  es: "Spanish",
  fr: "French",
  de: "German",
  zh: "Chinese",
  ja: "Japanese",
  ar: "Arabic",
  pt: "Portuguese",
  ru: "Russian"
};

export async function POST(req: NextRequest) {
  const { text, targetLanguage } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
  }

  if (!text || !targetLanguage) {
    return NextResponse.json({ error: "Missing text or target language" }, { status: 400 });
  }

  if (!SUPPORTED_LANGUAGES[targetLanguage as keyof typeof SUPPORTED_LANGUAGES]) {
    return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Translate the following text to ${SUPPORTED_LANGUAGES[targetLanguage as keyof typeof SUPPORTED_LANGUAGES]}. Maintain the original formatting, tone, and structure. Only return the translated text without any additional explanations:

${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
      },
    });

    const translatedText = response.text || text;

    return NextResponse.json({ 
      translatedText,
      originalText: text,
      targetLanguage,
      languageName: SUPPORTED_LANGUAGES[targetLanguage as keyof typeof SUPPORTED_LANGUAGES]
    });
  } catch (error: any) {
    console.error("Translation error:", error);
    return NextResponse.json({ 
      error: `Translation failed: ${error.message || "Unknown error"}` 
    }, { status: 500 });
  }
} 