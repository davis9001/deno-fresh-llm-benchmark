import fs from "fs/promises";
import path from "path";
import type { BenchmarkResult } from "../llms/types";

export interface TestDefinition {
  name: string;
  promptPath: string;
  testPath: string;
  referencePath: string;
}

export async function loadTestDefinitions(): Promise<TestDefinition[]> {
  const testsDir = path.join(process.cwd(), "benchmark-src", "tests");
  const testDirs = await fs.readdir(testsDir);
  
  const tests: TestDefinition[] = [];
  
  for (const dir of testDirs) {
    const testPath = path.join(testsDir, dir);
    const stats = await fs.stat(testPath);
    
    if (stats.isDirectory()) {
      tests.push({
        name: dir,
        promptPath: path.join(testPath, "prompt.md"),
        testPath: path.join(testPath, "test.ts"),
        referencePath: path.join(testPath, "Reference.tsx")
      });
    }
  }
  
  return tests;
}

export async function extractCode(response: string): Promise<string> {
  // Remove markdown code blocks if present
  let code = response.trim();
  
  // Remove ```tsx or ```typescript or ``` code blocks
  const codeBlockRegex = /```(?:tsx|typescript|ts|jsx|js)?\n([\s\S]*?)\n```/;
  const match = code.match(codeBlockRegex);
  
  if (match) {
    code = match[1];
  }
  
  return code.trim();
}

export async function runTest(testModule: any, componentCode: string): Promise<{ passed: number; total: number }> {
  try {
    // Create a temporary module from the component code
    const moduleCode = componentCode;
    
    // Use dynamic eval to create the module (simplified for now)
    // In a real implementation, you'd want to use a proper module loader
    const tempModule = eval(`(function() { ${moduleCode}; return { default: typeof Component !== 'undefined' ? Component : (typeof Greeting !== 'undefined' ? Greeting : (typeof HelloWorld !== 'undefined' ? HelloWorld : (typeof Counter !== 'undefined' ? Counter : undefined))) }; })()`);
    
    const testResult = testModule.testHelloWorld?.(tempModule) || 
                       testModule.testCounter?.(tempModule) ||
                       testModule.testProps?.(tempModule);
    
    if (!testResult) {
      return { passed: 0, total: 0 };
    }
    
    let passed = 0;
    let total = testResult.tests.length;
    
    for (const test of testResult.tests) {
      try {
        test.test();
        passed++;
      } catch (error) {
        // Test failed
        console.error(`Test "${test.name}" failed:`, error.message);
      }
    }
    
    return { passed, total };
  } catch (error) {
    console.error("Error running test:", error);
    return { passed: 0, total: 1 };
  }
}

export function calculatePassAtK(results: { passed: boolean }[], k: number): number {
  if (results.length === 0) return 0;
  
  const n = results.length;
  const c = results.filter(r => r.passed).length;
  
  if (c === 0) return 0;
  if (c === n) return 1;
  
  // Calculate pass@k using the HumanEval methodology
  // pass@k = 1 - (n-c choose k) / (n choose k)
  const nCk = binomialCoefficient(n, Math.min(k, n));
  const nMinusCk = binomialCoefficient(n - c, Math.min(k, n - c));
  
  return 1 - (nMinusCk / nCk);
}

function binomialCoefficient(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  
  return result;
}

export async function saveBenchmarkResults(results: BenchmarkResult[], outputPath: string): Promise<void> {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
  console.log(`Results saved to ${outputPath}`);
}
