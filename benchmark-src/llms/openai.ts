import OpenAI from "openai";
import type { LLMProvider } from "./types";

export class OpenAIProvider implements LLMProvider {
  name = "openai";
  models = ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"];
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }
    this.client = new OpenAI({ apiKey });
  }

  async generate(prompt: string, model: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are an expert at writing Deno Fresh components. Return only the TSX component code without any markdown formatting or explanation."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "";
  }
}
