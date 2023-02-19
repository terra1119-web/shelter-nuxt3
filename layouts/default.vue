<template>
	<Body :class="[useMenuOpen ? 'overflow-hidden' : '', 'text-text-primary', 'bg-background', 'relative']" />
	<TheHeader />
	<slot />
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