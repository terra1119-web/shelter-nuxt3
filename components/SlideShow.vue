<template>
	<div class="relative h-0" :class="size">
		<div
			v-for="(slide, i) in slides"
			:key="slide.date"
			class="absolute left-0 top-0 w-full opacity-0 z-[0] animate-[fade]"
			:class="``"
			:style="{
				'animation-iteration-count': 'infinite',
				'animation-delay': `${i * fadeSecondTime}s`,
				'animation-duration': `${slides.length * fadeSecondTime}s`,
			}"
		>
			<Card
				:url="slide.url"
				:image="slide.imagePath"
				:title="slide.title"
				:date="slide.date"
				:size="size"
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
		size: string
	}

	type Props = {
		slides: Slide[]
		size: string
	}

	defineProps<Props>()

	const fadeSecondTime = 8
</script>
