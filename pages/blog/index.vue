<template>
<div>
	<h2>Schedule</h2>
	<ul>
		<li v-for="(item, index) in data" :key="index">
			<NuxtLink
				:to="`/blog/${getDate(item)}`"
			>
				<div>
					<img
						:src="item._embedded['wp:featuredmedia'][0].source_url"
						alt=""
					/>
				</div>
				{{ item.title.rendered }}
				{{ item.date }}
			</NuxtLink>
		</li>
	</ul>
</div>
</template>

<script setup lang="ts">
const { data } = await useFetch<any>(`https://www.at-shelter.com/wp-json/wp/v2/blog?_embed&status=publish&per_page=12`)

const getDate = (item) => {
	return '20220907'
}
</script>

<style scoped>
img {
	width: 50%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}
</style>