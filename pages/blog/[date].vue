<template>
	<article v-for="(blog, index) in blogs" :key="index" class="pb-8">
		<figure v-if="blog._embedded['wp:featuredmedia']">
			<img
				:src="blog._embedded['wp:featuredmedia'][0].source_url"
				alt=""
			/>
		</figure>

		<header class="mt-6 mb-6">
			<TheTitle tag-name="h1" type="secondary">{{
				blog.title.rendered
			}}</TheTitle>
		</header>

		<time
			:datetime="
				useDateString({
					date: blog.date,
					format: 'YYYY-MM-DD',
				})
			"
			class="block mt-4 text-center px-4 text-2xl"
		>
			{{
				useDateString({
					date: blog.date,
					format: 'YYYY/MM/DD ddd',
				})
			}}
		</time>

		<div class="mt-6 px-6 text-base" v-html="blog.content.rendered" />
	</article>
</template>

<script setup lang="ts">
	import { useDateString } from '@/composables/useDateString'
	const blogs = await useSinglePost({ postType: 'blog' })
</script>

<style scoped>
	img {
		width: 100%;
	}
</style>
