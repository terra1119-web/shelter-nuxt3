<template>
	<article
		v-for="(blog, index) in blogs"
		:key="index"
		class="pb-8 md:pb-10 md:max-w-5xl md:mx-auto"
	>
		<figure v-if="blog._embedded['wp:featuredmedia']">
			<img
				:src="blog._embedded['wp:featuredmedia'][0].source_url"
				class="w-full"
			/>
		</figure>

		<header class="mt-6 md:mt-8 mb-6 md:mb-8 px-6 md:px-0">
			<TheTitle tag-name="h1" type="secondary">
				<span v-html="blog.title.rendered" />
			</TheTitle>
		</header>

		<time
			:datetime="
				useDateString({
					date: blog.date,
					format: 'YYYY-MM-DD',
				})
			"
			class="block mt-6 md:mt-8 text-center px-6 md:px-0 text-2xl"
			v-html="
				useDateString({
					date: blog.date,
					format: 'YYYY/MM/DD ddd',
				})
			"
		>
		</time>

		<div
			class="mt-6 md:mt-8 px-6 md:px-0 text-base md:text-xl break-all"
			v-html="blog.content.rendered"
		/>
	</article>
</template>

<script setup lang="ts">
	const blogs: any = await useSinglePost({ postType: 'blog' })
</script>
