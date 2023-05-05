<template>
	<SlideShow :slides="slides" />

	<article v-html="information.content.rendered"></article>
</template>

<script setup lang="ts">
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase

	const { data: information } = await useFetch<any>(`/pages/4`, {
		baseURL: apiBase,
		params: {
			_embed: true,
		},
	})

	const slides: any = ref([])
	const informationImageFields = information.value.acf.information_image_field
	informationImageFields.forEach((field: any) => {
		slides.value.push({
			imagePath: field.information_image,
		})
	})
</script>
