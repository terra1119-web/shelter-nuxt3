<template>
	<div v-for="(blog, index) in blogs" :key="index">
		<div v-if="blog._embedded['wp:featuredmedia']">
			<img
				:src="blog._embedded['wp:featuredmedia'][0].source_url"
				alt=""
			/>
		</div>
		<h1 v-html="blog.title.rendered" />
		{{
			useDateString({
				date: blog.date,
				format: 'YYYY/MM/DD ddd'
			})
		}}

		<div v-html="blog.content.rendered" />
	</div>
</template>

<script setup lang="ts">
	const blogs = await useSinglePost({postType: 'blog'})
</script>

<style scoped>
	img {
		width: 100%;
	}
</style>
