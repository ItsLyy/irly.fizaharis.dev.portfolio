import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import {
  aiMemory,
  buildAiSystemPrompt,
  queryOfflineAiMemory,
} from "@/app/_data/ai-memory";

const chatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "model", "assistant"]),
        text: z.string(),
      }),
    )
    .optional(),
});

export async function GET() {
  return NextResponse.json({
    name: aiMemory.profile.name,
    title: aiMemory.profile.title,
    suggestedQuestions: aiMemory.suggestedQuestions,
    hasApiKey: Boolean(
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GOOGLE_API_KEY,
    ),
  });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parseResult = chatRequestSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parseResult.error.issues },
        { status: 400 },
      );
    }

    const { message, history = [] } = parseResult.data;
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    // If API key is available, leverage Gemini 2.5 Flash
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = buildAiSystemPrompt();

        // Format history for Google GenAI SDK
        const contents = [
          ...history.slice(-6).map((h) => ({
            role: h.role === "assistant" ? "model" : h.role,
            parts: [{ text: h.text }],
          })),
          {
            role: "user" as const,
            parts: [{ text: message }],
          },
        ];

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        });

        const replyText = response.text || "";

        if (replyText.trim()) {
          return NextResponse.json({
            reply: replyText,
            mode: "gemini",
          });
        }
      } catch (geminiError) {
        console.warn(
          "Gemini API call failed, falling back to centralized offline memory:",
          geminiError,
        );
      }
    }

    // Fallback or default: Knowledge memory response
    const offlineReply = queryOfflineAiMemory(message);
    return NextResponse.json({
      reply: offlineReply,
      mode: apiKey ? "fallback" : "knowledge-base",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error processing chat message",
        reply: queryOfflineAiMemory(""),
      },
      { status: 500 },
    );
  }
}
