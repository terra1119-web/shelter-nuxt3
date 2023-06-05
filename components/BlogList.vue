<template>
	<section>
		<header class="mt-6 mb-6">
			<TheTitle tag-name="h1">BLOG</TheTitle>
		</header>

		<ul>
			<li v-for="(blog, index) in blogs" :key="index" class="mt-6">
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
				/>
			</li>
		</ul>
	</section>

	<nav class="pb-8">
		<ul class="flex mt-6 gap-4 justify-center">
			<li v-for="(page, index) in totalPages" :key="index">
				<Button
					:type="computedButtonType(index + 1)"
					@click="onClickPage(index + 1)"
				>
					{{ index + 1 }}
				</Button>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import { useDateString } from '@/composables/useDateString'
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase
	const router = useRouter()
	const route = useRoute()

	const perPage = 12
	const totalCount = ref<string | null>(null)
	const totalPages = ref(1)
	const currentPage = ref(+route.params.page || 1)

	const { data: blogs } = await useFetch<any>(`/blog`, {
		key: `blog-${Date.now()}`,
		baseURL: apiBase,
		params: {
			_embed: true,
			status: 'publish',
			per_page: perPage,
			page: currentPage,
		},
		onResponse({ response }) {
			totalCount.value = response.headers.get('x-wp-total')
			totalPages.value = totalCount.value
				? Math.ceil(+totalCount.value / perPage)
				: 1
		},
	})

	const onClickPage = (page: number) => {
		if (currentPage.value === page) return

		currentPage.value = page
		const path =
			currentPage.value === 1
				? `/blog/`
				: `/blog/pages/${currentPage.value}/`
		router.push({
			path,
		})
	}

	const computedButtonType = (index: number) => {
		const type: string =
			currentPage.value === index ? 'secondary' : 'primary'
		return type
	}
</script>
