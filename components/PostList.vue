<template>
	<h2>Featured</h2>
	<ul>
		<li v-for="(field, index) in topImageFields">
			<div v-if="field.top_image_field_image">
				<img :src="field.top_image_field_image" :alt="field.top_image_field_text" />
			</div>
			{{ field.top_image_field_text }}
			{{ field.top_image_field_date }}
		</li>
	</ul>

	<h2>Store</h2>
	<ul>
		<li v-for="(item, index) in topStoreItems">
			<a :href="item.store_item_url" target="_blank">
				<div v-if="item.store_item_img">
					<img :src="item.store_item_img" :alt="item.store_item_name" />
				</div>
				{{ item.store_item_name }}
			</a>
		</li>
	</ul>
</template>

<script setup>
const { data } = await useFetch(`https://www.at-shelter.com/wp-json/wp/v2/pages/?_embed`)
const topData = data.value.filter(page => page.id === 2)[0]
const topImageFields = topData.acf.top_image_field
const topStoreItems = topData.acf.store_item
// const images = topData.acf.top_image_field.map(post => {
// 	const featuredmedia = post._embedded[`wp:featuredmedia`]
// 	return featuredmedia !== undefined
// 		? featuredmedia[0].source_url
// 		: ''
// })
</script>

<style scoped>
img {
	width: 50%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}
</style>