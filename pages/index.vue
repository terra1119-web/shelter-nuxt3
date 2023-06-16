<template>
	<section>
		<header class="mt-6 mb-6">
			<TheTitle tag-name="h2" type="primary">FEATURED</TheTitle>
		</header>

		<SlideShow :slides="slides" size="pt-[61.875%] md:pt-[480px]" />

		<div class="mt-6 flex justify-center">
			<Button
				icon-right="fa-solid fa-chevron-right"
				@click="onScheduleClick"
			>
				VIEW MORE SCHEDULE
			</Button>
		</div>
	</section>

	<section>
		<header class="mt-8 md:mt-10">
			<TheTitle tag-name="h2" type="primary">STORE</TheTitle>
		</header>

		<ul>
			<li
				v-for="(item, index) in topStoreItems"
				:key="index"
				class="mt-6 flex"
			>
				<Card
					:url="item.store_item_url"
					:image="item.store_item_img"
					:title="item.store_item_name"
					:target="`_blank`"
					size="pt-[61.875%] md:pt-[480px]"
				/>
			</li>
		</ul>

		<div class="mt-6 flex justify-center">
			<Button
				icon-right="fa-solid fa-chevron-right"
				@click="onStoreClick"
			>
				VIEW MORE STORE
			</Button>
		</div>
	</section>

	<section>
		<header class="mt-8 md:mt-10">
			<TheTitle tag-name="h2" type="primary">BLOG</TheTitle>
		</header>

		<ul class="md:grid gap-6 grid-cols-3">
			<li
				v-for="(blog, index) in blogs"
				:key="index"
				class="mt-6 relative"
			>
				<Card
					:url="`/blog/${useDateString({
						date: blog.date,
						format: 'YYYYMMDD',
					})}/`"
					:image="blog._embedded['wp:featuredmedia'][0].source_url"
					:title="blog.title.rendered"
					:date="
						useDateString({
							date: blog.date,
							format: 'YYYY/MM/DD',
						})
					"
					size="pt-[61.875%] md:pt-[320px]"
				/>
			</li>
		</ul>

		<div class="mt-6 flex justify-center">
			<Button icon-right="fa-solid fa-chevron-right" @click="onBlogClick">
				VIEW MORE BLOG
			</Button>
		</div>
	</section>

	<section class="pb-8 md:pb-10">
		<header class="mt-8 md:mt-10">
			<TheTitle tag-name="h2" type="primary">INFORMATION</TheTitle>
		</header>

		<div class="md:grid gap-6 grid-cols-2">
			<figure class="mt-6">
				<img
					src="/images/top_image.jpg"
					alt="Image shot at SHeLTeR"
					class="w-full"
				/>
			</figure>

			<div>
				<p class="mt-6 px-6">
					SHeLTeRは東京の西端、八王子で四半世紀に渡り営業している、純度の高い音質と美味しいお酒を提供しているDJバーです。<br />
					ディスコ、クラブ、サロン、スタジオ、ラボ、など、様々な名称や既存のイメージに捕らわれない、常に革新的かつ居心地の良い自由な空間を目指しています。
				</p>
				<p class="mt-6 px-6">
					SHeLTeR is a DJ bar, located in Hachiouji-Tokyo. We are
					highly focused on providing both quality of music and tasty
					alcohol to our customer since 1989.<br />
					Our aim is to create a space where is innovative, cozy and
					openminded without captured by any existing name nor image
					such as disco, club, salon, studio, lab, etc&#8230;
				</p>
				<div class="mt-6 flex justify-center">
					<Button
						icon-right="fa-solid fa-chevron-right"
						@click="onInformationClick"
					>
						VIEW MORE INFORMATION
					</Button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const router = useRouter()
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase

	const [{ data: schedules }, { data: blogs }] = await Promise.all([
		useFetch<any>(`/pages/2`, {
			baseURL: apiBase,
			params: {
				_embed: true,
			},
		}),
		useFetch<any>(`/blog`, {
			baseURL: apiBase,
			params: {
				_embed: true,
				per_page: 3,
			},
		}),
	])

	const slides: any = ref([])
	const topImageFields = schedules.value?.acf.top_image_field
	topImageFields.forEach((field: any) => {
		slides.value.push({
			url: `/schedule/${useDateString({
				date: field.top_image_field_date,
				format: 'YYYYMMDD',
			})}/`,
			imagePath: field.top_image_field_image,
			title: field.top_image_field_text,
			date: useDateString({
				date: field.top_image_field_date,
				format: 'YYYY/MM/DD ddd',
			}),
		})
	})

	const topStoreItems = schedules.value?.acf.store_item

	const onScheduleClick = () => {
		router.push('/schedule/')
	}

	const onStoreClick = () => {
		const url = 'https://store.at-shelter.com/'
		window.open(url)
	}

	const onBlogClick = () => {
		router.push('/blog/')
	}

	const onInformationClick = () => {
		router.push('/information/')
	}
</script>
