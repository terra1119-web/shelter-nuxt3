<template>
	<Html lang="ja" />
	<Body
		:class="[
			useMenuOpen ? 'overflow-hidden' : '',
			'text-text-primary',
			'bg-background',
			'relative',
			'pt-[40px]',
			'md:pt-[64px]',
		]"
	/>
	<TheHeader />
	<main class="bg-background">
		<slot />
	</main>
	<TheFooter />
</template>

<style>
	#__nuxt {
		@apply grid min-h-[calc(100vh_-_40px)] md:min-h-[calc(100vh_-_64px)] grid-cols-[1fr] grid-rows-[1fr_auto];
	}
</style>
