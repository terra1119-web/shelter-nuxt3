<template>
	<header
		class="flex items-center bg-surface-nuetral-overlay sticky top-0 pl-4 md:pl-10 pr-10 h-[40px] md:h-[64px]"
	>
		<h1 class="flex-grow">
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
	</header>
</template>
