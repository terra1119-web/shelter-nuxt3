<template>
	<footer
		class="bg-surface-nuetral-secondary p-6 z-3 relative md:p-8 md:flex md:flex-row md:flex-wrap"
	>
		<figure class="md:order-2">
			<NuxtLink
				to="https://goo.gl/maps/7LnBL2g488abwDHMA"
				target="_blank"
			>
				<img src="/images/map.svg" alt="MAP" class="w-full" />
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
						to="m&#97;i&#108;t&#111;:&#106;&#97;&#109;&#98;&#111;@&#97;&#116;&#45;&#115;&#104;&#101;l&#116;&#101;&#114;&#46;&#99;&#111;&#109;"
						class="flex items-center"
					>
						<FontAwesomeIcon
							icon="fa-regular fa-envelope"
							class="text-2xl mr-4"
						/>
						<span class="text-xl"
							>&#106;&#97;&#109;&#98;&#111;@&#97;&#116;&#45;&#115;&#104;&#101;l&#116;&#101;&#114;&#46;&#99;&#111;&#109;</span
						>
					</NuxtLink>
				</li>
				<li class="mt-4">
					<NuxtLink
						to="https://www.instagram.com/shelter_japan/"
						target="_blank"
						class="flex items-center"
					>
						<FontAwesomeIcon
							icon="fa-brands fa-instagram"
							class="text-2xl mr-4"
						/>
						<span class="text-xl">Instagram</span>
					</NuxtLink>
				</li>
				<li class="mt-4">
					<NuxtLink
						to="https://www.facebook.com/pages/SHeLTeR/136886743120572"
						target="_blank"
						class="flex items-center"
					>
						<FontAwesomeIcon
							icon="fa-brands fa-facebook-f"
							class="text-2xl mr-4"
						/>
						<span class="text-xl">facebook page</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
		<p class="text-center mt-6 w-full md:order-3">
			&copy;
			{{
				useDateString({
					date: new Date().toLocaleString(),
					format: 'YYYY',
				})
			}}
			SHeLTeR All rights reserved.
		</p>
	</footer>
</template>
