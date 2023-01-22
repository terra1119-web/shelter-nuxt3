<template>
	<div class="flex">
		<h1 class="text-3xl text-red-700 font-bold flex-grow">
			<NuxtLink :to="`/`"> SHeLTeR </NuxtLink>
		</h1>
		<nav>
			<ul class="flex gap-4">
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
					<NuxtLink :to="`/blog/`">SCHEDULE</NuxtLink>
				</li>
			</ul>
		</nav>
	</div>
</template>
