<template>
<div>
	<h1>
		<NuxtLink
			:to="`/`"
		>
			SHeLTeR
		</NuxtLink>
	</h1>
	<ul>
		<li v-for="(item, index) in data" :key="index">
			<div>
				<img
					:src="item._embedded['wp:featuredmedia'][0].source_url"
					alt=""
				/>
			</div>
			{{ item.title.rendered }}
			{{ getDate(item.date) }}
		</li>
	</ul>
</div>
</template>

<script setup>
import dayjs from 'dayjs'

const route = useRoute()
const year = dayjs(route.params.date).year()
const month = dayjs(route.params.date).month() + 1
const date = dayjs(route.params.date).date()
const dateString = new Date(`${year}/${month}/${date}`).toISOString()
const { data } = await useFetch(
	`https://www.at-shelter.com/wp-json/wp/v2/posts?_embed&order=asc&per_page=1&after=${dateString}`,
	{
		initialCache: false
	}
)

const getDate = dateString => {
	return dayjs(dateString).format('YYYY/MM/DD')
}
</script>

<style scoped>
img {
	width: 100%;
}
</style>