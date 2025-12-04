// Import the benchmark results directly as a static JSON module
import benchmarkResults from '../../../benchmarks/benchmark-results-latest.json';

export interface BenchmarkResult {
	provider: string;
	model: string;
	test: string;
	passed: number;
	total: number;
	pass_at_1: number;
	timestamp: string;
}

export interface AggregatedResults {
	byProvider: Record<string, { passRate: number; tests: number }>;
	byModel: Record<string, { passRate: number; tests: number }>;
	byTest: Record<string, { passRate: number; providers: number }>;
	overall: { passRate: number; totalTests: number };
	lastUpdated: string;
}

export async function loadBenchmarkResults(): Promise<BenchmarkResult[]> {
	try {
		return benchmarkResults as BenchmarkResult[];
	} catch (error) {
		console.error('Error loading benchmark results:', error);
		return [];
	}
}

export function aggregateResults(results: BenchmarkResult[]): AggregatedResults {
	const byProvider: Record<string, { passRate: number; tests: number }> = {};
	const byModel: Record<string, { passRate: number; tests: number }> = {};
	const byTest: Record<string, { passRate: number; providers: number }> = {};

	let totalTests = 0;
	let totalPassed = 0;
	let lastUpdated = '';

	for (const result of results) {
		// By provider
		if (!byProvider[result.provider]) {
			byProvider[result.provider] = { passRate: 0, tests: 0 };
		}
		byProvider[result.provider].passRate += result.pass_at_1;
		byProvider[result.provider].tests += 1;

		// By model
		const modelKey = `${result.provider}/${result.model}`;
		if (!byModel[modelKey]) {
			byModel[modelKey] = { passRate: 0, tests: 0 };
		}
		byModel[modelKey].passRate += result.pass_at_1;
		byModel[modelKey].tests += 1;

		// By test
		if (!byTest[result.test]) {
			byTest[result.test] = { passRate: 0, providers: 0 };
		}
		byTest[result.test].passRate += result.pass_at_1;
		byTest[result.test].providers += 1;

		// Overall
		totalTests += 1;
		totalPassed += result.pass_at_1;

		// Track latest timestamp
		if (result.timestamp > lastUpdated) {
			lastUpdated = result.timestamp;
		}
	}

	// Calculate averages
	for (const provider in byProvider) {
		byProvider[provider].passRate /= byProvider[provider].tests;
	}
	for (const model in byModel) {
		byModel[model].passRate /= byModel[model].tests;
	}
	for (const test in byTest) {
		byTest[test].passRate /= byTest[test].providers;
	}

	return {
		byProvider,
		byModel,
		byTest,
		overall: { passRate: totalTests > 0 ? totalPassed / totalTests : 0, totalTests },
		lastUpdated
	};
}
