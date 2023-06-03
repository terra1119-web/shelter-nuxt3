<template>
	<section>
		<header class="mt-4 mb-4">
			<TheTitle tag-name="h2">FEATURED</TheTitle>
		</header>

		<SlideShow :slides="slides" />

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
		<header class="mt-4">
			<TheTitle tag-name="h2">STORE</TheTitle>
		</header>

		<ul>
			<li
				v-for="(item, index) in topStoreItems"
				:key="index"
				class="mt-4"
			>
				<Card
					:url="item.store_item_url"
					:image="item.store_item_img"
					:title="item.store_item_name"
					:target="`_blank`"
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
		<header class="mt-4">
			<TheTitle tag-name="h2">BLOG</TheTitle>
		</header>

		<ul>
			<li v-for="(blog, index) in blogs" :key="index" class="mt-4">
				<Card
					:url="`/blog/${getDate(blog.date, 'YYYYMMDD')}/`"
					:image="blog._embedded['wp:featuredmedia'][0].source_url"
					:title="blog.title.rendered"
					:date="getDate(blog.date, 'YYYY/MM/DD')"
				/>
			</li>
		</ul>

		<div class="mt-6 flex justify-center">
			<Button icon-right="fa-solid fa-chevron-right" @click="onBlogClick">
				VIEW MORE BLOG
			</Button>
		</div>
	</section>

	<section></section>
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
	const topImageFields = schedules.value.acf.top_image_field
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

	const topStoreItems = schedules.value.acf.store_item

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

	const getDate = (date: string, format: string) => {
		return useDateString({
			date,
			format,
		})
	}
</script>

<style scoped></style>
