<script lang="ts">
	import { fade } from 'svelte/transition';

	let eventInfo: EventInfo | null = null;
	let socket: WebSocket | null = null;
	let leaderboardData: PlayerInfo[] = [];
	let showEventInfo = false;
	let eventEnd = false;
	import { onMount } from 'svelte';
	import { type EventInfo, type PlayerInfo, VaderState } from '../types';
	import PlayerBar from './PlayerBar.svelte';
   
const VITE_API_URL=import.meta.env.VITE_API_URL;

	onMount(async () => {
		const eventResponse = await fetch(`https://${VITE_API_URL}/event/info`);
		if (eventResponse.ok) {
			eventInfo = await eventResponse.json();
			socket = new WebSocket(`ws://${VITE_API_URL}/vaderboard`);
			socket.onmessage = (event) => {
				leaderboardData = JSON.parse(event.data);
			};
			socket.onclose = () => {
				eventEnd = true;
			};
		}
	});
</script>

<svelte:head>
	<title>VaderBoard</title>
	<meta name="description" content="VaderBoard leaderboard page" />
</svelte:head>

<body>
	<div class="nes-container is-dark is-centered">
		<h1>VaderBoard</h1>
	</div>
	<section class="nes-container is-dark info-container">
		{#if eventInfo}
			<button class="nes-btn is-primary" on:click={() => (showEventInfo = !showEventInfo)}>
				{#if showEventInfo}
					Hide Event Info
				{:else}
					Show Event Info
				{/if}
			</button>

			{#if showEventInfo}
				<div class="nes-container is-dark">
					{#if eventInfo.event_type === 'UserEvent'}
						<ul class="nes-list is-circle is-dark">
							<li>Event Name: {eventInfo.name}</li>
							<li>Event Id: {eventInfo.id}</li>
							<li>Event Type: {eventInfo.event_type}</li>
						</ul>
					{:else}
						<div class="lists">
							<ul class="nes-list is-circle is-dark">
								<li>Event Id: {eventInfo.id}</li>
								<li>Event Type : Team Event</li>
								<li>Team size : {eventInfo.event_type.TeamEvent.team_size}</li>
							</ul>
						</div>
					{/if}
				</div>
			{/if}
			{#if !showEventInfo}
				<i class="nes-icon star is-medium" />
				<i class="nes-mario" />
				<i class="nes-icon star is-medium" />
			{/if}
			{#if eventInfo.state === VaderState.Added}
				<div class="nes-container with-title is-dark">
					<p class="title">{eventInfo.name}</p>
					<p>{eventInfo.name} has Not Started !</p>
				</div>
			{/if}
		{:else}
			<button class="nes-btn is-error"> No Event </button>
		{/if}
	</section>
	{#if eventInfo && leaderboardData && leaderboardData.length > 0}
		<section class="nes-container is-dark is-centered vboard-container">
			<div class="nes-table-responsive">
				<table class="nes-table is-bordered is-dark">
					<thead>
						<tr>
							<th>Pos</th>
							{#if eventInfo.event_type === 'UserEvent'}
								<th>User Name</th>
							{:else}
								<th>Team Name</th>
							{/if}
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{#each leaderboardData as entry, index (entry.id)}
							<tr transition:fade={{ duration: 300 }}>
								<td>{index + 1}</td>
								<td>{entry.name}</td>
								<td>{entry.score}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			{#if eventInfo.event_type === 'UserEvent'}
				<PlayerBar {leaderboardData} xLabel={'UserName ♔'} />
			{:else}
				<PlayerBar {leaderboardData} xLabel={'TeamName ♖'} />
			{/if}
			{#if leaderboardData[0].score > 0 && eventEnd}
				<div class="nes-container is-dark winners-container with-title">
					<div class="win-container" id="w1">
						<i class="nes-icon trophy is-large" />
						<p>Winner: {leaderboardData[0].name}</p>
					</div>
					<div class="win-container" id="w2">
						<i class="nes-icon coin is-medium" />
						<p>2nd Place: {leaderboardData[1].name}</p>
					</div>
					<div class="win-container" id="w3">
						<i class="nes-icon star is-medium" />
						<p>3rd Place: {leaderboardData[2].name}</p>
					</div>
				</div>
			{/if}
		</section>
	{/if}

	<style>
		.info-container {
			display: flex;
			justify-content: space-between;
		}

		i {
			align-items: center;
		}

		tr {
			will-change: opacity, transform;
		}

		.vboard-container {
			display: flex;
			justify-content: space-between;
		}

		.winners-container {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			align-items: center;
		}

		.win-container {
			display: flex;
			flex-direction: row;
			gap: 1.2rem;
			align-items: flex-end;
		}

		.win-container p {
			margin-bottom: 0;
			font-size: large;
		}
	</style>
</body>
