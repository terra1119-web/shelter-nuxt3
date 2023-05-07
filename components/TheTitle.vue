<template>
	<Component
		:is="tagName"
		:class="[
			'text-4xl',
			'text-center',
			type === 'primary'
				? [`font-['Roboto']`, 'font-thin']
				: type === 'secondary'
				? [`font-['Roboto_Condensed']`]
				: '',
		]"
	>
		<slot />
	</Component>
</template>

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
