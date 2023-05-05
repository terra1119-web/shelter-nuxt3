<template>
	<div class="relative h-0 pt-[61.875%]">
		<div
			v-for="(slide, i) in slides"
			:key="slide.date"
			class="absolute left-0 top-0 w-full opacity-0 z-[0] animate-[fade]"
			:class="``"
			:style="{
				'animation-iteration-count': 'infinite',
				'animation-delay': `${i * fadeSecons}s`,
				'animation-duration': `${slides.length * fadeSecons}s`,
			}"
		>
			<Card
				:url="slide.url"
				:image="slide.imagePath"
				:title="slide.title"
				:date="slide.date"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	type Slide = {
		url: string
		imagePath: string
		title: string
		date: string
	}

	type Props = {
		slides: Slide[]
	}

	defineProps<Props>()

	const fadeSecons = 8
</script>

<style scoped></style>
