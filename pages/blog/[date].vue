<template>
	<article v-for="(blog, index) in blogs" :key="index">
		<figure v-if="blog._embedded['wp:featuredmedia']">
			<img
				:src="blog._embedded['wp:featuredmedia'][0].source_url"
				alt=""
			/>
		</figure>

		<header class="mt-4 mb-4">
			<TheTitle tag-name="h1" type="secondary">{{
				blog.title.rendered
			}}</TheTitle>
		</header>

		<time
			:datetime="getDate(blog.date, 'YYYY-MM-DD')"
			class="block mt-4 text-center px-4 text-2xl"
		>
			{{ getDate(blog.date, 'YYYY/MM/DD ddd') }}
		</time>

		<div class="mt-4 px-4 text-base" v-html="blog.content.rendered" />
	</article>
</template>

<script setup lang="ts">
	const blogs = await useSinglePost({ postType: 'blog' })

	const getDate = (date: string, format: string) => {
		return useDateString({
			date,
			format,
		})
	}
</script>

<style scoped>
	img {
		width: 100%;
	}
</style>
