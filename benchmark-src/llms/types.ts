export interface LLMProvider {
  name: string;
  models: string[];
  generate(prompt: string, model: string): Promise<string>;
}

export interface BenchmarkResult {
  provider: string;
  model: string;
  test: string;
  passed: number;
  total: number;
  pass_at_1: number;
  timestamp: string;
}
