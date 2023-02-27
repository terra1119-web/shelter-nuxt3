<template>
	<NuxtLink
		:to="url"
		class="underline hover:no-underline"
	>
		<figure>
			<img
				:src="image || '/images/noimage.gif'"
				:alt="title"
				class="w-full object-cover aspect-video"
			/>
		</figure>
		{{ title }}
		{{ date }}
	</NuxtLink>
</template>

<script setup lang="ts">

type Props = {
	url: string
	image?: string
	title: string
	date?: string
}

const props = defineProps<Props>()
</script>