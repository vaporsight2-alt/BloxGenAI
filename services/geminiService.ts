
import { GoogleGenAI, Type } from "@google/genai";

const ROBLOX_SYSTEM_INSTRUCTION = `
You are a World-Class Roblox Developer and Luau Scripting Expert.
Your goal is to generate high-performance, secure, and clean Roblox Luau scripts.

SECURITY FOCUS (ADMIN COMMANDS):
- When generating Admin Commands, always verify permissions on the SERVER.
- Never trust client-sent arguments without validation.
- For command parsing, use efficient string manipulation (string.split, string.lower, string.sub).
- Use 'Player.Chatted' event for chat-based commands.
- Suggest using Group Ranks (GetRankInGroup) or a hardcoded Admin List for permissions.

GENERAL RULES:
1. Always use modern Roblox practices (task library instead of wait(), Instance.new second argument is deprecated, etc.).
2. Always use clear variable names and follow PascalCase for objects and camelCase for variables.
3. Provide comments explaining complex parts of the code.
4. Distinguish between 'Script' (Server), 'LocalScript' (Client), and 'ModuleScript'.
5. Output MUST be valid JSON matching the schema provided.
6. The explanation should be concise and focused on how to implement the script in Roblox Studio.
7. Use 'Type' from @google/genai for schemas.
`;

export async function generateRobloxScript(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: ROBLOX_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy title for the script" },
            code: { type: Type.STRING, description: "The actual Luau code block" },
            explanation: { type: Type.STRING, description: "Step-by-step instructions for Roblox Studio" },
            type: { 
              type: Type.STRING, 
              description: "Must be 'Script', 'LocalScript', or 'ModuleScript'" 
            }
          },
          required: ["title", "code", "explanation", "type"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}
