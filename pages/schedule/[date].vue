<template>
	<div v-for="(schedule, index) in schedules" :key="index">
		<div v-if="schedule._embedded['wp:featuredmedia']">
			<img
				:src="schedule._embedded['wp:featuredmedia'][0].source_url"
				alt=""
			/>
		</div>
		{{ schedule.title.rendered }}
		{{ getDate(schedule.date) }}
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

const getDate = (dateString: string): string => {
	return dayjs(dateString).format('YYYY/MM/DD')
}
</script>

<style scoped>
img {
	width: 100%;
}
</style>