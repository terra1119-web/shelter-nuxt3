<script setup lang="ts">
	const route = useRoute()
	const blogs = await useSinglePost({ postType: 'blog' })

	useHead({
		title: `${blogs.value[0].title.rendered} - ${useDateString({
			date: blogs.value[0].date,
			format: 'YYYY/MM/DD',
		})} | SHeLTeR`,
		meta: [
			{
				property: 'og:title',
				content: `${blogs.value[0].title.rendered} - ${useDateString({
					date: blogs.value[0].date,
					format: 'YYYY/MM/DD',
				})} | SHeLTeR`,
			},
			{
				property: 'og:image',
				content: `${
					blogs.value[0]._embedded
						? blogs.value[0]._embedded['wp:featuredmedia'][0]
								.source_url
						: '/images/noimage.gif'
				}`,
			},
			{
				property: 'og:url',
				content: `https://www.at-shelter.com${route.path}`,
			},
		],
	})
</script>

<template>
	<article
		v-for="(blog, index) in blogs"
		:key="index"
		class="pb-8 md:pb-10 md:max-w-5xl md:mx-auto"
	>
		<figure v-if="blog._embedded" class="mt-6 md:mt-10">
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
			class="block mt-6 md:mt-8 text-center px-6 md:px-0 text-2xl leading-9"
			v-html="
				useDateString({
					date: blog.date,
					format: 'YYYY/MM/DD ddd',
				})
			"
		>
		</time>

		<div
			class="mt-6 md:mt-8 px-6 md:px-0 text-base md:text-xl md:leading-8 break-all blog__wrapper"
			v-html="blog.content.rendered"
		/>
	</article>
</template>

<style>
	.blog__wrapper p {
		@apply mt-6 md:mt-8;
	}
</style>
