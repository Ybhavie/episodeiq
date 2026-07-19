import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateSceneImage(prompt: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: "4:3" },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        const mimeType = part.inlineData.mimeType ?? "image/png";
        return `data:${mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (err) {
    console.error("Gemini scene image generation failed:", err);
    return null;
  }
}
