<template>
	<div v-for="(schedule, index) in schedules" :key="index">
		<div v-if="schedule._embedded['wp:featuredmedia']">
			<img
				:src="schedule._embedded['wp:featuredmedia'][0].source_url"
				alt=""
			/>
		</div>
		<h1>{{ schedule.title.rendered }}</h1>

		<time
			:datetime="`${useDateString({
				date: schedule.date,
				format: 'YYYY/MM/DD ddd'
			})}`"
		>
			{{
				useDateString({
					date: schedule.date,
					format: 'YYYY/MM/DD ddd'
				})
			}}
		</time>

		<p v-if="schedule.acf.party_genre">{{ schedule.acf.party_genre }}</p>
		<p v-if="schedule.acf.party_open">{{ schedule.acf.party_open }}</p>
		<p v-if="schedule.acf.party_charge">{{ schedule.acf.party_charge }}</p>
		<p
			v-if="schedule.acf.party_guest"
			v-html="schedule.acf.party_guest"
		></p>
		<p v-if="schedule.acf.party_dj" v-html="schedule.acf.party_dj"></p>

		<ul>
			<li v-if="schedule.previous">
				<NuxtLink
					:to="`/schedule/${useDateString({
						date: schedule.previous.date,
						format: 'YYYYMMDD'
					})}/`"
					class="underline hover:no-underline"
				>
					{{
						useDateString({
							date: schedule.previous.date,
							format: 'YYYY/MM/DD'
						})
					}}
				</NuxtLink>
			</li>
			<li v-if="schedule.next">
				<NuxtLink
					:to="`/schedule/${useDateString({
						date: schedule.next.date,
						format: 'YYYYMMDD'
					})}/`"
					class="underline hover:no-underline"
				>
					{{
						useDateString({
							date: schedule.next.date,
							format: 'YYYY/MM/DD'
						})
					}}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import dayjs from 'dayjs'

	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase

	const route = useRoute()
	const paramsDateString: string = route.params.date as string
	const year: number = dayjs(paramsDateString).year()
	const month: number = dayjs(paramsDateString).month() + 1
	const date: number = dayjs(paramsDateString).date()
	const dateString: string = dayjs(`${year}/${month}/${date}`).toISOString()
	const { data: schedules } = await useFetch<any>(`/posts`, {
		baseURL: apiBase,
		params: {
			_embed: true,
			order: 'asc',
			per_page: 1,
			after: dateString
		}
	})
</script>

<style scoped>
	img {
		width: 100%;
	}
</style>
