<template>
	<button
		:class="[
			'inline-flex',
			'items-center',
			'text-xl',
			'px-4',
			'py-2',
			'border',
			'transition-all',
			'duration-300',
			'ease-out',
			type === 'primary'
				? [
						'border-border-primary',
						'hover:border-border-accent',
						'hover:text-text-accent',
				  ]
				: type === 'secondary'
				? ['bg-white', 'cursor-default', 'text-text-secondary']
				: '',
			disabled ? ['opacity-50', 'pointer-events-none'] : '',
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
		disabled: boolean
	}

	type Emits = {
		(e: 'click'): void
	}

	withDefaults(defineProps<Props>(), {
		iconLeft: undefined,
		iconRight: undefined,
		type: 'primary',
		disabled: false,
	})

	const emit = defineEmits<Emits>()
	const onClick = () => {
		emit('click')
	}
</script>
