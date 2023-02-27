<template>
	<h2 class="font-['Roboto'] font-thin text-4xl text-center mt-4">FEATURED</h2>
	<ul class="relative mt-4">
		<li v-for="(field, index) in topImageFields" :key="index" class="">
			<Card
				:url="`/schedule/${useDateString({
					date: field.top_image_field_date,
					format: 'YYYYMMDD'
				})}/`"
				:image="field.top_image_field_image"
				:title="field.top_image_field_text"
				:date="field.top_image_field_date"
			/>
		</li>
	</ul>

	<h2 class="font-['Roboto'] font-thin text-4xl text-center mt-4">STORE</h2>
	<ul>
		<li v-for="(item, index) in topStoreItems" :key="index" class="mt-12">
			<Card
				:url="item.store_item_url"
				:image="item.store_item_img"
				:title="item.store_item_name"
			/>
		</li>
	</ul>

	<h2 class="font-['Roboto'] font-thin text-4xl text-center mt-4">BLOG</h2>
	<ul>
		<li v-for="(blog, index) in blogs" :key="index" class="mt-12">
			<Card
				:url="`/blog/${useDateString({
					date: blog.date,
					format: 'YYYYMMDD'
				})}/`"
				:image="blog._embedded['wp:featuredmedia'][0].source_url"
				:title="blog.title.rendered"
				:date="useDateString({
					date: blog.date,
					format: 'YYYY/MM/DD'
				})"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase

	const [{ data: schedules }, { data: blogs }] = await Promise.all([
		useFetch<any>(`/pages/2`, {
			baseURL: apiBase,
			params: {
				_embed: true
			}
		}),
		useFetch<any>(`/blog`, {
			baseURL: apiBase,
			params: {
				_embed: true,
				per_page: 3
			}
		})
	])

	const topImageFields = schedules.value.acf.top_image_field
	const topStoreItems = schedules.value.acf.store_item
</script>

<style scoped></style>
