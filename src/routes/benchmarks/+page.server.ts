import { loadBenchmarkResults, aggregateResults } from '$lib/utils/benchmark-loader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
const results = await loadBenchmarkResults();
const aggregated = aggregateResults(results);

return {
results,
aggregated
};
};
