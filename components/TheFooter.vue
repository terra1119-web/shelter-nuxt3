<template>
	<footer class="bg-surface-nuetral-secondary p-4">
		<figure>
			<NuxtLink
				:to="`/`"
				class="block w-[77px] h-[20px] bg-[url('/images/logo.svg')]"
			/>
		</figure>
		<p class="text-center mt-4">&copy; {{ useDateString({date: new Date().toLocaleString(), format: 'YYYY'}) }} SHeLTeR All rights reserved.</p>
	</footer>
</template>
