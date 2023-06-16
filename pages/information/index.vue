<template>
	<div class="md:fixed md:z-0 md:top-0 md:left-0 md:right-0 md:bottom-0">
		<SlideShow :slides="slides" size="pt-[61.875%]" />
	</div>

	<div
		class="relative z-1 bg-background md:text-lg md:mt-[100vh] md:py-10 md:px-[calc((100%-960px)/2)]"
	>
		<header class="mt-6 md:mt-0 mb-6">
			<TheTitle tag-name="h1" type="primary">INFORMATION</TheTitle>
		</header>

		<article class="px-6 md:px-0 pb-8 md:pb-10">
			<p>
				SHeLTeRは東京の西端、八王子で四半世紀に渡り営業している、純度の高い音質と美味しいお酒を提供しているDJバーです。<br />
				ディスコ、クラブ、サロン、スタジオ、ラボ、など、様々な名称や既存のイメージに捕らわれない、常に革新的かつ居心地の良い自由な空間を目指しています。
			</p>
			<p class="mt-6">
				SHeLTeR is a DJ bar, located in Hachiouji-Tokyo. We are highly
				focused on providing both quality of music and tasty alcohol to
				our customer since 1989.<br />
				Our aim is to create a space where is innovative, cozy and
				openminded without captured by any existing name nor image such
				as disco, club, salon, studio, lab, etc&#8230;
			</p>
			<p class="mt-6">
				東京都八王子市八日町1-1 NKビルB1F<br />
				B1F NK bldg. 1-1 Yokamachi Hachioji Tokyo<br />
				#192-0071
			</p>
			<ul>
				<li class="mt-6">
					<NuxtLink to="tel:0426253213" class="flex items-center">
						<FontAwesomeIcon
							icon="fa-solid fa-phone"
							class="text-2xl mr-4"
						/>
						<span class="text-xl">042-625-3213</span>
					</NuxtLink>
				</li>
				<li class="mt-4">
					<NuxtLink
						to="https://www.at-shelter.com/"
						target="_blank"
						class="flex items-center"
					>
						<FontAwesomeIcon
							icon="fa-solid fa-house"
							class="text-2xl mr-4"
						/>
						<span class="text-xl">https://www.at-shelter.com/</span>
					</NuxtLink>
				</li>
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

			<header class="mt-8 md:mt-10">
				<TheTitle tag-name="h2" type="primary">ACCESS</TheTitle>
			</header>

			<p class="mt-6">
				【JR八王子駅から】<br />
				北口階段を降り、すぐ左手に沿っていき（富士そばを通過し）横断歩道へ。アーケードが目印の放射線通りをしばらく直進（ドン・キホーテを右手にさらに直進）。右手にローソンストア100がある信号をななめ左へ。一個目の信号（国道16号線）を渡ってホルモン屋の隣ビルのB1です。
			</p>
			<p class="mt-6">
				【京王八王子駅から】<br />
				京王八王子駅中央口を出て、ロータリーの右奥方向にある交差点へ進み、左手にタクシー会社がある角を左折。左折してすぐ左側にファミリーマート、右側に公園があることを確認して、国道16号線までそのままひたすら直進。国道16号線を渡ってすぐ右手のビルのB1です。
			</p>
			<div
				class="w-full h-auto mt-6 relative overflow-hidden pb-[56.25%] md:mt-8"
			>
				<iframe
					class="block absolute left-0 top-0 w-full h-full z-10"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7199225201102!2d139.33045597574596!3d35.659271531179996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60191e78440d1a87%3A0x47730680edb567bb!2zU0hlTFRlUiDjgrfjgqfjg6vjgr_jg7w!5e0!3m2!1sja!2sjp!4v1684334373817!5m2!1sja!2sjp"
					width="100%"
					height="100%"
					style="border: 0"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				/>
			</div>
		</article>
	</div>
</template>

<script setup lang="ts">
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase

	useHead({
		title: `INFORMATION | SHeLTeR`,
	})

	const { data: information } = await useFetch<any>(`/pages/4`, {
		baseURL: apiBase,
		params: {
			_embed: true,
		},
	})

	const slides: any = ref([])
	const informationImageFields: any =
		information.value?.acf.information_image_field
	informationImageFields.forEach((field: any) => {
		slides.value.push({
			imagePath: field.information_image,
		})
	})
</script>
