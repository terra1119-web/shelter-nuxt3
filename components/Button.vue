<template>
	<button
		class="inline-flex items-center border border-border-primary text-xl px-4 py-2"
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
	}

	type Emits = {
		(e: 'click'): void
	}

	defineProps<Props>()

	const emit = defineEmits<Emits>()
	const onClick = () => {
		emit('click')
	}
</script>
