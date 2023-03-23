<template>
	<div
		class="relative w-full h-0 pt-[61.875%] overflow-hidden bg-no-repeat bg-center bg-cover"
		:style="{
			backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%), url(${
				image || '/images/noimage.gif'
			})`,
		}"
	>
		<NuxtLink
			:to="url"
			:target="target"
			class="block absolute left-0 top-0 w-full h-full"
		>
			<div
				class="absolute left-0 bottom-0 w-full p-4 flex flex-col text-center"
			>
				<h2 class="order-2 text-xl font-light">
					{{ title }}
				</h2>
				<p class="order1 text-base font-light">
					<time>{{ date }}</time>
				</p>
			</div>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
	type Props = {
		url: string
		image?: string | boolean
		title: string
		date?: string
		target?: string
	}

	defineProps<Props>()
</script>
