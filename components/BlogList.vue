<template>
	<section class="md:max-w-5xl md:mx-auto">
		<header class="mt-6 mb-6">
			<TheTitle tag-name="h1" type="primary">BLOG</TheTitle>
		</header>

		<ul class="md:grid gap-6 grid-cols-3">
			<li
				v-for="(blog, index) in blogs"
				:key="index"
				class="mt-6 md:mt-0"
			>
				<Card
					:url="`/blog/${useDateString({
						date: blog.date,
						format: 'YYYYMMDD',
					})}/`"
					:image="getSourceUrl(blog)"
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
	</section>

	<nav class="pb-8 md:pb-10">
		<ul class="flex flex-wrap mt-6 gap-4 justify-center">
			<li v-if="currentPage !== 1">
				<Button
					type="primary"
					class="py-3"
					@click="onClickPage(currentPage - 1)"
				>
					<FontAwesomeIcon icon="fa-solid fa-chevron-left" />
				</Button>
			</li>
			<li v-for="(page, index) in totalPages" :key="index">
				<Button
					:type="computedButtonType(index + 1)"
					@click="onClickPage(index + 1)"
				>
					{{ index + 1 }}
				</Button>
			</li>
			<li v-if="currentPage !== totalPages">
				<Button
					type="primary"
					class="py-3"
					@click="onClickPage(currentPage + 1)"
				>
					<FontAwesomeIcon icon="fa-solid fa-chevron-right" />
				</Button>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase
	const router = useRouter()
	const route = useRoute()

	const perPage = 21
	const totalCount = ref<string | null>(null)
	const totalPages = ref(1)
	const currentPage = ref(+route.params.page || 1)

	useHead({
		title: `BLOG | SHeLTeR`,
	})

	const { data: blogs, refresh } = await useFetch<any>(`/blog`, {
		key: `blog-${Date.now()}`,
		baseURL: apiBase,
		params: {
			_embed: true,
			status: 'publish',
			per_page: perPage,
			page: currentPage,
			initialCache: false,
		},
		onResponse({ response }: { response: any }) {
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

	const getSourceUrl = (blog: any) => {
		const sourceUrl: string | undefined = blog._embedded
			? blog._embedded['wp:featuredmedia'][0]?.source_url
			: ''
		return sourceUrl
	}

	watch(
		() => currentPage.value,
		async () => {
			window.scrollTo(0, 0)
			await refresh()
		}
	)
</script>
