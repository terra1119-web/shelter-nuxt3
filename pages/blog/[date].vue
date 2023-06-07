<template>
	<article v-for="(blog, index) in blogs" :key="index" class="pb-8">
		<figure v-if="blog._embedded['wp:featuredmedia']">
			<img
				:src="blog._embedded['wp:featuredmedia'][0].source_url"
				class="w-full"
			/>
		</figure>

		<header class="mt-6 mb-6 px-6">
			<TheTitle tag-name="h1" type="secondary"
				><span v-html="blog.title.rendered"
			/></TheTitle>
		</header>

		<time
			:datetime="
				useDateString({
					date: blog.date,
					format: 'YYYY-MM-DD',
				})
			"
			class="block mt-4 text-center px-6 text-2xl"
			v-html="
				useDateString({
					date: blog.date,
					format: 'YYYY/MM/DD ddd',
				})
			"
		>
		</time>

		<div
			class="mt-6 px-6 text-base break-all"
			v-html="blog.content.rendered"
		/>
	</article>
</template>

<script setup lang="ts">
	import { useDateString } from '@/composables/useDateString'
	const blogs = await useSinglePost({ postType: 'blog' })
</script>
