import { OpenAIProvider } from "./openai";
import { AnthropicProvider } from "./anthropic";
import type { LLMProvider } from "./types";

export function getAvailableProviders(): LLMProvider[] {
  const providers: LLMProvider[] = [];

  if (process.env.OPENAI_API_KEY) {
    try {
      providers.push(new OpenAIProvider());
    } catch (error) {
      console.warn("OpenAI provider failed to initialize:", error);
    }
  }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      providers.push(new AnthropicProvider());
    } catch (error) {
      console.warn("Anthropic provider failed to initialize:", error);
    }
  }

  return providers;
}
