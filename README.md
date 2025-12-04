# Deno Fresh LLM Benchmark

> Evaluating how well different AI models can generate Deno Fresh components

## 📊 About

This project benchmarks Large Language Models (LLMs) on their ability to generate functional Deno Fresh components from natural language descriptions. It's inspired by [svelte-bench](https://github.com/khromov/svelte-bench) but adapted for the Deno Fresh framework.

## 🚀 Features

- **Automated Benchmarking**: Tests multiple LLM providers (OpenAI, Anthropic, etc.)
- **Deno Fresh Components**: Evaluates component generation for Deno Fresh/Preact
- **Daily Updates**: Automated benchmarks run daily via GitHub Actions
- **Results Dashboard**: View benchmark results at `/benchmarks`
- **HumanEval Metrics**: Uses pass@k methodology from OpenAI's paper

## 🧪 Test Cases

The benchmark includes several test cases that evaluate different aspects of Deno Fresh development:

- **hello-world**: Basic component rendering and styling
- **counter**: Interactive state management with Preact hooks
- **props**: Component props and TypeScript interfaces  

## 🛠️ Setup

### Prerequisites

- Node.js 20 or later
- LLM API keys (OpenAI, Anthropic, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/davis9001/deno-fresh-llm-benchmark.git
cd deno-fresh-llm-benchmark

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env and add your API keys
```

### Running Benchmarks

```bash
# Run a single benchmark
npm run benchmark
```

### Viewing Results

```bash
# Start the development server
npm run dev

# Visit http://localhost:4277/benchmarks
```

## 📈 Results

Benchmark results are automatically generated and stored in the `benchmarks/` directory. The dashboard displays:

- Overall performance metrics
- Results by provider
- Results by model
- Results by test case

## 🤖 Supported Providers

- **OpenAI**: GPT-4o, GPT-4o-mini, GPT-4-turbo
- **Anthropic**: Claude 3.5 Sonnet, Claude 3.5 Haiku

## ⚙️ GitHub Actions

The repository includes a GitHub Actions workflow that:

1. Runs benchmarks daily at 2 AM UTC
2. Commits results automatically
3. Can be triggered manually via workflow_dispatch

To set up automated benchmarks, add your API keys as GitHub secrets.

## 🏗️ Project Structure

```
├── benchmark-src/          # Benchmark infrastructure
│   ├── tests/             # Test definitions
│   ├── llms/              # LLM provider integrations
│   └── utils/             # Test runner utilities
├── benchmarks/            # Benchmark results (JSON)
├── src/routes/benchmarks/ # Results dashboard
└── .github/workflows/     # GitHub Actions
```

## 📄 License

MIT License

## 🙏 Acknowledgments

- Inspired by [svelte-bench](https://github.com/khromov/svelte-bench)
- Built with SvelteKit and Cloudflare

---

**Note**: This project is built on top of NebulaKit. See [README-NEBULAKIT.md](./README-NEBULAKIT.md) for the original template documentation.
