<template>
	<footer class="bg-surface-nuetral-secondary p-6 md:p-8 md:flex md:flex-row md:flex-wrap">
		<figure class="md:order-2">
			<NuxtLink
				to="https://goo.gl/maps/7LnBL2g488abwDHMA"
				target="_blank"
			>
				<img src="/images/map.svg" alt="MAP" class="w-full">
			</NuxtLink>
		</figure>
		<div class="mt-6 md:mt-0 md:order-1 md:flex-grow">
			<figure>
				<NuxtLink
					:to="`/`"
					class="block w-[77px] h-[20px] bg-[url('/images/logo.svg')]"
				/>
			</figure>
			<ul>
				<li class="mt-4">
					<NuxtLink
						to="mailto:jambo@at-shelter.com"
						class="flex items-center"
					>
						<FontAwesomeIcon icon="fa-regular fa-envelope" class="text-2xl mr-4" />
						<span class="text-xl">jambo@at-shelter.com</span>
					</NuxtLink>
				</li>
				<li class="mt-4">
					<NuxtLink
						to="https://www.facebook.com/pages/SHeLTeR/136886743120572"
						target="_blank"
						class="flex items-center"
					>
						<FontAwesomeIcon icon="fa-brands fa-square-facebook" class="text-2xl mr-4" />
						<span class="text-xl">facebook page</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
		<p class="text-center mt-6 w-full md:order-3">&copy; {{ useDateString({date: new Date().toLocaleString(), format: 'YYYY'}) }} SHeLTeR All rights reserved.</p>
	</footer>
</template>
