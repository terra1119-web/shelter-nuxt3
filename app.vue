<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
	import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

	const currentBreakpoint = useBreakpoints(breakpointsTailwind)
	const route = useRoute()

	watch(
		() => route.path,
		() => {
			useMenuOpen.value = false
		}
	)

	watchEffect(() => {
		if (currentBreakpoint.between('md', '2xl').value)
			useMenuOpen.value = false
	})
</script>
