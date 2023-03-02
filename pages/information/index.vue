<template>
	<ul>
		<li
			v-for="(field, index) in informationImageFields"
			:key="index"
			class="mt-12"
		>
			<div v-if="field.information_image">
				<img
					:src="field.information_image"
					:alt="`SHeLTeR Image ${index + 1}`"
					class="w-full object-cover aspect-video"
				/>
			</div>
		</li>
	</ul>

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

	const informationImageFields = information.value.acf.information_image_field
</script>
