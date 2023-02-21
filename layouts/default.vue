<template>
	<Body :class="[useMenuOpen ? 'overflow-hidden' : '', 'text-text-primary', 'bg-background', 'relative', 'pt-[40px]', 'md:pt-[64px]']" />
	<TheHeader />
	<main>
		<slot />
	</main>
	<TheFooter />
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const currentBreakpoint = useBreakpoints(breakpointsTailwind)
const route = useRoute()

watch(() => route.path, () => {
	useMenuOpen.value = false
})

watchEffect(() => {
	if (currentBreakpoint.between('md', '2xl').value) useMenuOpen.value = false
})
</script>

<style>
#__nuxt {
	@apply grid min-h-[calc(100vh_-_40px)] md:min-h-[calc(100vh_-_64px)] grid-cols-[1fr] grid-rows-[1fr_auto]
}
</style>