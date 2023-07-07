<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3';
	import type { PlayerInfo } from '../types';
	export let leaderboardData: Array<PlayerInfo>;
	export let xLabel: string;
	const width = 800;
	const height = 400;
	const padding = 40;
	const yLabel = '↑ Score';
	const color = '#209cee';

	$: sortedLb = [...leaderboardData].sort((a, b) => a.name.localeCompare(b.name));
	$: xScale = scaleBand(
		sortedLb.map((entry) => entry.name),
		[padding, width - padding]
	).paddingInner(0.1);
	// no need for max , leaderboardData already sorted by score, 1st entry has highest score : )
	$: yScale = scaleLinear([0, leaderboardData[0].score], [height - padding, padding]);

	const getAbbr = (name: string): string =>
		name.includes(' ')
			? name
					.split(' ')
					.map((w) => w.slice(0, 2))
					.join('.')
			: name.slice(0, 3);
</script>

<div class="nes-container is-dark is-centered">
	<svg {width} {height} viewBox="0 0 {width} {height}">
		<g>
			{#each sortedLb as entry (entry.id)}
				<rect
					x={xScale(entry.name)}
					y={yScale(entry.score)}
					width={xScale.bandwidth()}
					height={height - padding - yScale(entry.score)}
					fill={color}
				/>
				<text
					x={xScale(entry.name) + xScale.bandwidth() / 2}
					y={height - padding + 16}
					text-anchor="middle"
					fill="white"
					font-size="12px"
				>
					{getAbbr(entry.name)}
				</text>
			{/each}
		</g>
		<text x={width / 2} y={height - 4} text-anchor="middle" fill="white" font-size="14px">
			{xLabel}
		</text>
		<text
			x={-height / 2}
			y={padding - 20}
			text-anchor="middle"
			fill="white"
			font-size="14px"
			transform="rotate(-90)"
		>
			{yLabel}
		</text>
	</svg>
</div>
