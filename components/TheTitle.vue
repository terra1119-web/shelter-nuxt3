<script setup lang="ts">
	type Props = {
		tagName: string
		type: string
	}

	withDefaults(defineProps<Props>(), {
		tagName: 'h2',
		type: 'primary',
	})
</script>

<template>
	<Component
		:is="tagName"
		:class="[
			'text-4xl',
			'md:text-5xl',
			'text-center',
			type === 'primary'
				? [`font-['Roboto']`, 'font-thin']
				: type === 'secondary'
				? [`font-['Roboto_Condensed']`, 'font-light']
				: '',
		]"
	>
		<slot />
	</Component>
</template>
