<template>
<div>
	<h1>
		<NuxtLink
			:to="`/`"
		>
			SHeLTeR
		</NuxtLink>
	</h1>
	<div v-for="(item, index) in data" :key="index">
		<div v-if="item._embedded['wp:featuredmedia']">
			<img
				:src="item._embedded['wp:featuredmedia'][0].source_url"
				alt=""
			/>
		</div>
		{{ item.title.rendered }}
		{{ getDate(item.date) }}
	</div>
</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const route = useRoute()
const paramsDateString: string = route.params.date as string
const year: number = dayjs(paramsDateString).year()
const month: number = dayjs(paramsDateString).month() + 1
const date: number = dayjs(paramsDateString).date()
const dateString: string = dayjs(`${year}/${month}/${date}`).toISOString()
const { data } = await useFetch<any>(
	`https://www.at-shelter.com/wp-json/wp/v2/posts?_embed&order=asc&per_page=1&after=${dateString}`
)

const getDate = (dateString: string): string => {
	return dayjs(dateString).format('YYYY/MM/DD')
}
</script>

<style scoped>
img {
	width: 100%;
}
</style>