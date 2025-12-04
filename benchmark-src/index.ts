import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { getAvailableProviders } from "./llms/index";
import { loadTestDefinitions, extractCode, runTest, calculatePassAtK, saveBenchmarkResults } from "./utils/test-runner";
import type { BenchmarkResult } from "./llms/types";

async function main() {
  console.log("🚀 Starting Deno Fresh LLM Benchmark...\n");

  // Get available providers
  const providers = getAvailableProviders();
  
  if (providers.length === 0) {
    console.error("❌ No LLM providers configured. Please set API keys in .env file.");
    process.exit(1);
  }

  console.log(`📝 Found ${providers.length} provider(s):`);
  providers.forEach(p => {
    console.log(`   - ${p.name}: ${p.models.length} model(s)`);
  });
  console.log();

  // Load test definitions
  const tests = await loadTestDefinitions();
  console.log(`🧪 Loaded ${tests.length} test(s):`);
  tests.forEach(t => console.log(`   - ${t.name}`));
  console.log();

  const allResults: BenchmarkResult[] = [];

  // Run benchmarks for each provider and model
  for (const provider of providers) {
    for (const model of provider.models) {
      console.log(`\n🤖 Testing ${provider.name}/${model}...\n`);

      for (const test of tests) {
        console.log(`   📋 Test: ${test.name}`);

        try {
          // Read the prompt
          const prompt = await fs.readFile(test.promptPath, "utf-8");

          // Generate N samples (simplified to 3 for faster execution)
          const numSamples = 3;
          const sampleResults: { passed: boolean }[] = [];

          for (let i = 0; i < numSamples; i++) {
            console.log(`      Sample ${i + 1}/${numSamples}...`);

            try {
              // Generate component code
              const response = await provider.generate(prompt, model);
              const componentCode = await extractCode(response);

              // Load the test module
              const testModule = await import(test.testPath);

              // Run the test
              const { passed, total } = await runTest(testModule, componentCode);

              sampleResults.push({ passed: passed === total && total > 0 });
              console.log(`         ${passed}/${total} tests passed`);
            } catch (error) {
              console.error(`         Error: ${error.message}`);
              sampleResults.push({ passed: false });
            }
          }

          // Calculate pass@k metrics
          const passAt1 = calculatePassAtK(sampleResults, 1);
          const passedCount = sampleResults.filter(r => r.passed).length;

          console.log(`      ✅ pass@1: ${(passAt1 * 100).toFixed(1)}% (${passedCount}/${numSamples} passed)\n`);

          // Store results
          allResults.push({
            provider: provider.name,
            model,
            test: test.name,
            passed: passedCount,
            total: numSamples,
            pass_at_1: passAt1,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error(`      ❌ Error running test: ${error.message}\n`);
          allResults.push({
            provider: provider.name,
            model,
            test: test.name,
            passed: 0,
            total: 0,
            pass_at_1: 0,
            timestamp: new Date().toISOString()
          });
        }
      }
    }
  }

  // Save results
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const resultsPath = path.join(process.cwd(), "benchmarks", `benchmark-results-${timestamp}.json`);
  await saveBenchmarkResults(allResults, resultsPath);

  // Also save as latest
  const latestPath = path.join(process.cwd(), "benchmarks", "benchmark-results-latest.json");
  await saveBenchmarkResults(allResults, latestPath);

  console.log("\n✨ Benchmark complete!");
  console.log(`\n📊 Results saved to:`);
  console.log(`   - ${resultsPath}`);
  console.log(`   - ${latestPath}`);
}

main().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
