<template>
	<button
		:class="[
			'inline-flex',
			'items-center',
			'text-xl',
			'px-4',
			'py-2',
			'border',
			type === 'primary'
				? ['border-border-primary']
				: type === 'secondary'
				? ['bg-white', 'cursor-default']
				: '',
		]"
		@click="onClick"
	>
		<FontAwesomeIcon v-if="iconLeft" :icon="iconLeft" class="mr-2" />
		<slot />
		<FontAwesomeIcon v-if="iconRight" :icon="iconRight" class="ml-2" />
	</button>
</template>

<script setup lang="ts">
	type Props = {
		iconLeft?: string
		iconRight?: string
		type?: string
	}

	type Emits = {
		(e: 'click'): void
	}

	withDefaults(defineProps<Props>(), {
		iconLeft: undefined,
		iconRight: undefined,
		type: 'primary',
	})

	const emit = defineEmits<Emits>()
	const onClick = () => {
		emit('click')
	}
</script>
