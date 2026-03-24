import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ProjectRequirements } from "../types";

const SYSTEM_INSTRUCTION = `You are a professional prompt engineering expert. 
Your task is to convert structured project requirements into a clean, balanced, token-efficient AI build prompt for coding platforms like Google AI Studio, Lovable.dev, or Bolt.new.

The output prompt MUST follow this strict format:
PROJECT OVERVIEW
TECH STACK
FEATURES
PAGES
DESIGN
ARCHITECTURE
CONSTRAINTS
DELIVERABLES
BUILD STEPS

Rules for the generated prompt:
- No fluff, no meta-commentary, no AI explanations.
- Clear, concise, and structured language.
- Instruct the coding AI to build the full app, not ask questions, and make reasonable defaults.
- Provide a clear file structure and setup steps.
- Only include the features, integrations, and architecture rules that were explicitly selected or enabled in the requirements.
- Use bullet points for lists to maintain clarity and token efficiency.
- Ensure the prompt is complete and ready to be pasted into a coding AI tool.`;

export async function generatePrompt(apiKey: string, requirements: ProjectRequirements): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Generate a comprehensive build prompt based on these requirements:
  ${JSON.stringify(requirements, null, 2)}`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        topP: 0.95,
      },
    });

    return response.text || "Failed to generate prompt.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("API_KEY_INVALID")) {
      throw new Error("Invalid API Key. Please check your Gemini API key.");
    }
    throw new Error(error.message || "Failed to generate prompt. Please try again.");
  }
}
