import Anthropic from "@anthropic-ai/sdk";
import type { LLMProvider } from "./types";

export class AnthropicProvider implements LLMProvider {
  name = "anthropic";
  models = ["claude-3-5-sonnet-20241022", "claude-3-5-haiku-20241022"];
  private client: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY environment variable is required");
    }
    this.client = new Anthropic({ apiKey });
  }

  async generate(prompt: string, model: string): Promise<string> {
    const response = await this.client.messages.create({
      model,
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `You are an expert at writing Deno Fresh components. Return only the TSX component code without any markdown formatting or explanation.\n\n${prompt}`
        }
      ],
    });

    const content = response.content[0];
    return content.type === "text" ? content.text : "";
  }
}
