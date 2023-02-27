<template>
	<h2 class="font-['Roboto'] font-thin text-4xl text-center mt-4">BLOG</h2>
	<ul>
		<li v-for="(blog, index) in blogs" :key="index">
			<Card
				:url="`/blog/${useDateString({
					date: blog.date,
					format: 'YYYYMMDD'
				})}/`"
				:image="blog._embedded['wp:featuredmedia'][0].source_url"
				:title="blog.title.rendered"
				:date="useDateString({
					date: blog.date,
					format: 'YYYY/MM/DD'
				})"
			/>
		</li>
	</ul>

	<nav>
		<ul>
			<li v-for="(page, index) in totalPages" :key="index">
				<button @click.prevent="onClickPage(index + 1)">
					{{ index + 1 }}
				</button>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
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
			page: currentPage
		},
		onResponse({ response }) {
			totalCount.value = response.headers.get('x-wp-total')
			totalPages.value = totalCount.value
				? Math.ceil(+totalCount.value / perPage)
				: 1
		}
	})

	const onClickPage = (page: number) => {
		currentPage.value = page
		const path =
			currentPage.value === 1
				? `/blog/`
				: `/blog/pages/${currentPage.value}/`
		router.push({
			path
		})
	}
</script>
