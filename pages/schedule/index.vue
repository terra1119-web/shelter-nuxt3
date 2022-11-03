<template>
<div>
	<h2>Schedule</h2>
	<ul>
		<li v-for="(item, index) in data" :key="index">
			<NuxtLink
				:to="`/schedule/${getDate(item.date)}`"
			>
				<div v-if="item._embedded['wp:featuredmedia']">
					<img
						:src="item._embedded['wp:featuredmedia'][0].source_url"
						alt=""
					/>
				</div>
				{{ item.title.rendered }}
				{{ getDateString(item.date) }}
			</NuxtLink>
		</li>
	</ul>

	<nav>
		<ul>
			<li @click="onClickPrev" v-if="previousData.data.value.length">
				prev
			</li>
			<li @click="onClickNext" v-if="nextData.data.value.length">
				next
			</li>
		</ul>
	</nav>
</div>
</template>

<script setup>
import dayjs from 'dayjs'
const route = useRoute()
const router = useRouter()

const ym = route.query.ym
const yearQuery = ym ? +ym.slice(0, 4) : dayjs().year()
const monthQuery = ym ? +ym.slice(4, 6) : dayjs().month()+1
const year = ref(yearQuery)
const month = ref(monthQuery)
const lastDate = dayjs([year.value, month.value]).endOf('month').date()

const { data, refresh } = await useFetch(`/posts`,
	{
		baseURL: 'https://www.at-shelter.com/wp-json/wp/v2',
		params: {
			_embed: true,
			after: `${year.value}-${dayjs([year.value, month.value]).format('MM')}-01T00:00:00`,
			before: `${year.value}-${dayjs([year.value, month.value]).format('MM')}-${lastDate}T23:59:59`,
			order: 'asc',
			category_name: 'party',
			status: 'publish',
			per_page: 31
		},
		initialCache: false,
		onRequest (ctx) {
			// ctx.options.params = {
			// 	_embed: true,
			// 	after: `${year.value}-${dayjs([year.value, month.value]).format('MM')}-01T00:00:00`,
			// 	before: `${year.value}-${dayjs([year.value, month.value]).format('MM')}-${lastDate}`,
			// 	order: 'asc',
			// 	category_name: 'party',
			// 	status: 'publish',
			// 	per_page: 31
			// }
		}
	}
)

const previousMonthDays = dayjs([year.value, month.value]).subtract(1, 'month')
const previousData = await useFetch(`/posts`,
	{
		baseURL: 'https://www.at-shelter.com/wp-json/wp/v2',
		params: {
			after: `${previousMonthDays.year()}-${dayjs([previousMonthDays.year(), previousMonthDays.month()]).format('MM')}-01T00:00:00`,
			before: `${previousMonthDays.year()}-${dayjs([previousMonthDays.year(), previousMonthDays.month()]).format('MM')}-${lastDate}T23:59:59`,
			category_name: 'party',
			status: 'publish',
			per_page: 31
		}
	}
)

const nextMonthDays = dayjs([year.value, month.value]).add(1, 'month')
const nextData = await useFetch(`/posts`,
	{
		baseURL: 'https://www.at-shelter.com/wp-json/wp/v2',
		params: {
			after: `${nextMonthDays.year()}-${dayjs([nextMonthDays.year(), nextMonthDays.month() + 1]).format('MM')}-01T00:00:00`,
			before: `${nextMonthDays.year()}-${dayjs([nextMonthDays.year(), nextMonthDays.month() + 1]).format('MM')}-${lastDate}T23:59:59`,
			category_name: 'party',
			status: 'publish',
			per_page: 31
		}
	}
)

const getDate = date => {
	return dayjs(date).format('YYYYMMDD')
}

const getDateString = date => {
	return dayjs(date).format('YYYY/MM/DD')
}

const onClickPrev = ()=> {
	changeMonth('previous')
}

const onClickNext = ()=> {
	changeMonth('next')
}

const changeMonth = tagetMonth => {
	const days = tagetMonth === 'previous' ? dayjs([year.value, month.value]).subtract(1, 'month') : dayjs([year.value, month.value]).add(1, 'month')
	month.value = days.month()+1
	year.value = days.year()
	router.push({
		path: '/schedule/',
		query: {
			ym: `${year.value}${dayjs([year.value, month.value]).format('MM')}`
		},
	})
}

watch(() => route.query.ym, () => location.reload())
</script>

<style scoped>
img {
	width: 50%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}
</style>