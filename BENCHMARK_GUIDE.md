# Deno Fresh LLM Benchmark Guide

## Overview

This document explains how the Deno Fresh LLM benchmark works and how to use it.

## Architecture

The benchmark system consists of several components:

### 1. Test Definitions (`benchmark-src/tests/`)

Each test case has three files:

- **prompt.md**: Natural language description of what the LLM should generate
- **test.ts**: Automated tests to validate the generated component
- **Reference.tsx**: A reference implementation showing the expected output

### 2. LLM Providers (`benchmark-src/llms/`)

Provider integrations for different LLM APIs:

- **OpenAI**: GPT-4o, GPT-4o-mini, GPT-4-turbo
- **Anthropic**: Claude 3.5 Sonnet, Claude 3.5 Haiku

Each provider implements the `LLMProvider` interface with a `generate()` method.

### 3. Benchmark Runner (`benchmark-src/index.ts`)

The main script that:

1. Loads all test definitions
2. Iterates through all providers and models
3. For each test, generates N samples (default: 3)
4. Runs tests on each generated sample
5. Calculates pass@k metrics using HumanEval methodology
6. Saves results as JSON

### 4. Results Dashboard (`src/routes/benchmarks/`)

A SvelteKit page that displays:

- Overall performance statistics
- Results by provider
- Results by model
- Results by test case

## Running Benchmarks

### Prerequisites

1. Node.js 20+
2. API keys for LLM providers

### Setup

```bash
# Install dependencies
npm install

# Configure API keys
cp .env.example .env
# Edit .env and add your API keys
```

### Running

```bash
# Run benchmarks
npm run benchmark

# Results are saved to:
# - benchmarks/benchmark-results-{timestamp}.json
# - benchmarks/benchmark-results-latest.json
```

### Viewing Results

```bash
# Start dev server
npm run dev

# Visit http://localhost:4277/benchmarks
```

## Test Cases

### hello-world

Tests basic component rendering and styling:
- Renders "Hello, World!" text
- Applies CSS styling
- Uses proper data-testid attributes

### counter

Tests interactive state management:
- Uses Preact's useState hook
- Implements increment/decrement buttons
- Maintains state correctly

### props

Tests component props and TypeScript:
- Accepts typed props (name, age)
- Renders prop values correctly
- Uses TypeScript interfaces

## Adding New Tests

1. Create a directory in `benchmark-src/tests/your-test-name/`

2. Add three files:

**prompt.md**:
```markdown
# Your Test Task

Description of what the LLM should generate...

## Requirements:
- Requirement 1
- Requirement 2
```

**test.ts**:
```typescript
import { expect } from "vitest";

export function testYourTest(ComponentModule: any) {
  const { default: Component } = ComponentModule;
  
  return {
    name: "YourTest",
    tests: [
      {
        name: "test 1",
        test: () => {
          expect(Component).toBeDefined();
        }
      }
    ]
  };
}
```

**Reference.tsx**:
```tsx
export default function YourComponent() {
  return <div>Reference implementation</div>;
}
```

3. The benchmark will automatically discover and run the new test!

## GitHub Actions Automation

The repository includes a workflow that runs benchmarks daily.

### Setup

1. Go to repository Settings → Secrets and variables → Actions
2. Add secrets:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`

3. The workflow will:
   - Run at 2 AM UTC daily
   - Can be manually triggered
   - Commits results automatically

### Workflow File

`.github/workflows/daily-benchmark.yml`

## Metrics

The benchmark uses the **pass@k** metric from HumanEval:

- **pass@1**: Probability that a single sample passes all tests
- Calculated as: `1 - C(n-c, k) / C(n, k)`
  - n = total samples
  - c = passing samples
  - k = 1 (for pass@1)

## Results Format

Results are saved as JSON:

```json
[
  {
    "provider": "openai",
    "model": "gpt-4o",
    "test": "hello-world",
    "passed": 3,
    "total": 3,
    "pass_at_1": 1.0,
    "timestamp": "2024-12-04T00:00:00.000Z"
  }
]
```

## Troubleshooting

### Build Errors

If you see "Cannot use fs" errors:
- The benchmark loader uses static JSON imports for Cloudflare compatibility
- Results are bundled at build time

### API Rate Limits

If you hit rate limits:
- Reduce the number of samples in `benchmark-src/index.ts`
- Add delays between requests
- Use fewer models

### Test Failures

If tests consistently fail:
- Check the prompt clarity
- Verify test assertions are reasonable
- Review generated code in error messages

## Contributing

To improve the benchmark:

1. Add more diverse test cases
2. Implement additional provider integrations
3. Enhance the results dashboard
4. Improve test reliability

## References

- [svelte-bench](https://github.com/khromov/svelte-bench) - Original inspiration
- [HumanEval Paper](https://arxiv.org/abs/2107.03374) - Methodology
- [Deno Fresh Docs](https://fresh.deno.dev/) - Framework documentation
