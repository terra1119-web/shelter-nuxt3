<template>
	<header
		class="flex justify-center md:justify-start items-center bg-surface-nuetral-overlay fixed top-0 pl-4 md:pl-10 pr-4 md:pr-10 h-[40px] md:h-[64px] w-full transition-[top] duration-300 ease-out delay-300 z-40"
		:class="[isScrollDown ? 'top-[-40px] md:top-[-64px]' : '']"
	>
		<h1 class="md:flex-grow">
			<NuxtLink
				:to="`/`"
				class="block w-[77px] h-[20px] bg-[url('/images/logo.svg')]"
			/>
		</h1>
		<nav class="hidden md:block">
			<ul class="flex gap-10 text-xl">
				<li>
					<NuxtLink :to="`/`">TOP</NuxtLink>
				</li>
				<li>
					<NuxtLink :to="`/schedule/`">SCHEDULE</NuxtLink>
				</li>
				<li>
					<NuxtLink to="https://store.at-shelter.com/" target="_blank"
						>STORE</NuxtLink
					>
				</li>
				<li>
					<NuxtLink :to="`/information/`">INFORMATION</NuxtLink>
				</li>
				<li>
					<NuxtLink :to="`/blog/`">BLOG</NuxtLink>
				</li>
			</ul>
		</nav>

		<nav
			:class="[
				useMenuOpen ? [
					'block',
					'fixed',
					'top-[40px]',
					'bg-surface-nuetral-overlay',
					'w-full',
					'h-[calc(100vh_-_40px)]',
					'overscroll-y-none',
					'text-center'

				] : ['h-0', 'w-0', 'hidden'], 'md:hidden', 'transition'
			]"

		>
			<ul class="text-xl">
				<li>
					<NuxtLink :to="`/`" class="block pt-4 pb-4">TOP</NuxtLink>
				</li>
				<li>
					<NuxtLink :to="`/schedule/`" class="block pt-4 pb-4">SCHEDULE</NuxtLink>
				</li>
				<li>
					<NuxtLink to="https://store.at-shelter.com/" class="block pt-4 pb-4" target="_blank"
						>STORE</NuxtLink
					>
				</li>
				<li>
					<NuxtLink :to="`/information/`" class="block pt-4 pb-4">INFORMATION</NuxtLink>
				</li>
				<li>
					<NuxtLink :to="`/blog/`" class="block pt-4 pb-4">BLOG</NuxtLink>
				</li>
			</ul>
		</nav>
		<div class="md:hidden absolute left-4">
			<button @click="onMenuClick">
				<FontAwesomeIcon icon="fa-solid fa-bars" />
			</button>
		</div>
	</header>
</template>

<script setup lang="ts">
const scrollState = useScroll()

const isScrollDown = computed(() => {
	return scrollState.isDown.value
})

const onMenuClick = (e: MouseEvent) => {
	useMenuOpen.value = !useMenuOpen.value
}
</script>