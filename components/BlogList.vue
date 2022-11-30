<template>
	<h2>Blog</h2>
	<ul>
		<li v-for="(blog, index) in blogs" :key="index">
			<NuxtLink
				:to="`/blog/${getBlogDateUrl(blog.date)}/`"
			>
				<div v-if="blog._embedded">
					<img
						:src="blog._embedded['wp:featuredmedia'][0].source_url"
						alt=""
					/>
				</div>
				{{ blog.title.rendered }}
				{{ getBlogDate(blog.date) }}
			</NuxtLink>
		</li>
	</ul>

	<nav>
		<ul>
			<li v-for="(page, index) in totalPages">
				<button @click.prevent="onClickPage(index + 1)">{{ index + 1 }}</button>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const router = useRouter()
const route = useRoute()

const perPage: number = 12
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
	async onResponse({ response }) {
		totalCount.value = response.headers.get('x-wp-total')
		totalPages.value = totalCount.value ? Math.ceil(+totalCount.value / perPage) : 1
	}
})

const onClickPage = (page: number) => {
	currentPage.value = page
	const path = currentPage.value === 1 ? `/blog/` : `/blog/pages/${currentPage.value}/`
	router.push({
		path
	})
}

const getBlogDateUrl = (date: string): string => {
	return dayjs(date).format('YYYYMMDD')
}

const getBlogDate = (date: string): string => {
	return dayjs(date).format('YYYY/MM/DD')
}

</script>

<style scoped>
img {
	width: 50%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}
</style>