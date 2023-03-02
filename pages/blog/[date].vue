<template>
	<article v-for="(blog, index) in blogs" :key="index">
		<figure v-if="blog._embedded['wp:featuredmedia']">
			<img
				:src="blog._embedded['wp:featuredmedia'][0].source_url"
				alt=""
			/>
		</figure>
		<h1 v-html="blog.title.rendered" />

		<time
			:datetime="
				useDateString({
					date: blog.date,
					format: 'YYYY-MM-DD',
				})
			"
		>
			{{
				useDateString({
					date: blog.date,
					format: 'YYYY/MM/DD ddd',
				})
			}}
		</time>

		<div v-html="blog.content.rendered" />
	</article>
</template>

<script setup lang="ts">
	const blogs = await useSinglePost({ postType: 'blog' })
</script>

<style scoped>
	img {
		width: 100%;
	}
</style>
