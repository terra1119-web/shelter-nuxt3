<template>
	<h2>Featured</h2>
	<ul>
		<li v-for="(field, index) in topImageFields" :key="index" class="mt-12">
			<NuxtLink
				:to="`/schedule/${useDateString({
					date: field.top_image_field_date,
					format: 'YYYYMMDD'
				})}/`"
				class="underline hover:no-underline"
			>
				<div v-if="field.top_image_field_image">
					<img
						:src="field.top_image_field_image"
						:alt="field.top_image_field_text"
						class="w-full object-cover aspect-video"
					/>
				</div>
				{{ field.top_image_field_text }}
				{{ field.top_image_field_date }}
			</NuxtLink>
		</li>
	</ul>

	<h2>Store</h2>
	<ul>
		<li v-for="(item, index) in topStoreItems" :key="index" class="mt-12">
			<NuxtLink :to="item.store_item_url" target="_blank">
				<div v-if="item.store_item_img">
					<img
						:src="item.store_item_img"
						:alt="item.store_item_name"
						class="w-full object-cover aspect-video"
					/>
				</div>
				{{ item.store_item_name }}
			</NuxtLink>
		</li>
	</ul>

	<h2>
		<NuxtLink :to="`/blog/`"> Blog </NuxtLink>
	</h2>
	<ul>
		<li v-for="(blog, index) in blogs" :key="index" class="mt-12">
			<NuxtLink
				:to="`/blog/${useDateString({
					date: blog.date,
					format: 'YYYYMMDD'
				})}/`"
			>
				<div v-if="blog._embedded['wp:featuredmedia']">
					<img
						:src="blog._embedded['wp:featuredmedia'][0].source_url"
						alt=""
						class="w-full object-cover aspect-video"
					/>
				</div>
				{{ blog.title.rendered }}
				{{
					useDateString({
						date: blog.date,
						format: 'YYYY/MM/DD'
					})
				}}
			</NuxtLink>
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
