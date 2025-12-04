<script lang="ts">
import type { PageData } from './$types';

export let data: PageData;

function formatDate(timestamp: string) {
return new Date(timestamp).toLocaleString();
}

function formatPercent(value: number) {
return `${(value * 100).toFixed(1)}%`;
}
</script>

<svelte:head>
<title>Deno Fresh LLM Benchmark Results</title>
<meta name="description" content="Benchmark results for LLM-generated Deno Fresh components" />
</svelte:head>

<div class="benchmark-page">
<div class="container">
<header class="page-header">
<h1>�� Deno Fresh LLM Benchmark</h1>
<p class="subtitle">
Evaluating how well different AI models can generate Deno Fresh components
</p>
{#if data.aggregated.lastUpdated}
<p class="last-updated">Last updated: {formatDate(data.aggregated.lastUpdated)}</p>
{/if}
</header>

<section class="stats-section">
<h2>📊 Overall Performance</h2>
<div class="stats-grid">
<div class="stat-card">
<div class="stat-value">{formatPercent(data.aggregated.overall.passRate)}</div>
<div class="stat-label">Average Pass Rate</div>
</div>
<div class="stat-card">
<div class="stat-value">{data.aggregated.overall.totalTests}</div>
<div class="stat-label">Total Test Runs</div>
</div>
</div>
</section>

<section class="about-section">
<h2>ℹ️ About</h2>
<p>
This benchmark evaluates how well different LLMs can generate functional Deno Fresh
components. Results are updated automatically.
</p>
</section>
</div>
</div>

<style>
.benchmark-page {
min-height: 100vh;
background: linear-gradient(180deg, var(--color-surface) 0%, var(--color-background) 100%);
padding: var(--spacing-4xl) var(--spacing-md);
}

.container {
max-width: 1200px;
margin: 0 auto;
}

.page-header {
text-align: center;
margin-bottom: var(--spacing-4xl);
}

.page-header h1 {
font-size: 3rem;
font-weight: 700;
color: var(--color-text);
margin-bottom: var(--spacing-md);
}

.subtitle {
font-size: 1.25rem;
color: var(--color-text-secondary);
margin-bottom: var(--spacing-sm);
}

.last-updated {
font-size: 0.875rem;
color: var(--color-text-secondary);
font-style: italic;
}

.stats-section,
.about-section {
margin-bottom: var(--spacing-4xl);
}

.stats-section h2,
.about-section h2 {
font-size: 1.75rem;
font-weight: 700;
color: var(--color-text);
margin-bottom: var(--spacing-xl);
}

.stats-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: var(--spacing-lg);
}

.stat-card {
background: var(--color-surface);
border: 1px solid var(--color-border);
border-radius: var(--radius-lg);
padding: var(--spacing-xl);
text-align: center;
}

.stat-value {
font-size: 2.5rem;
font-weight: 700;
color: var(--color-primary);
margin-bottom: var(--spacing-sm);
}

.stat-label {
font-size: 0.875rem;
color: var(--color-text-secondary);
}

.about-section {
background: var(--color-surface);
border: 1px solid var(--color-border);
border-radius: var(--radius-lg);
padding: var(--spacing-2xl);
}

.about-section p {
color: var(--color-text-secondary);
line-height: 1.7;
}
</style>
