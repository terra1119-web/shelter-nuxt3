<template>
	<div v-for="(blog, index) in blogs" :key="index">
		<div v-if="blog._embedded['wp:featuredmedia']">
			<img
				:src="blog._embedded['wp:featuredmedia'][0].source_url"
				alt=""
			/>
		</div>
		{{ blog.title.rendered }}
		{{ getDate(blog.date) }}
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
	const { data: blogs } = await useFetch<any>(`/blog`, {
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
