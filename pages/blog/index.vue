<template>
<div>
	<h2>Blog</h2>
	<ul>
		<li v-for="(blog, index) in blogs" :key="index">
			<NuxtLink
				:to="`/blog/${getBlogDateUrl(blog)}`"
			>
				<div>
					<img
						:src="blog._embedded['wp:featuredmedia'][0].source_url"
						alt=""
					/>
				</div>
				{{ blog.title.rendered }}
				{{ getBlogDate(blog) }}
			</NuxtLink>
		</li>
	</ul>
</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: blogs } = await useFetch<any>(`/blog`, {
	baseURL: apiBase,
	params: {
		_embed: true,
		status: 'publish',
		per_page: 12
	}
})

const getBlogDateUrl = (blogData: any): string => {
	return dayjs(blogData.date).format('YYYYMMDD')
}

const getBlogDate = (blogData: any): string => {
	return dayjs(blogData.date).format('YYYY/MM/DD')
}

</script>

<style scoped>
img {
	width: 50%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}
</style>