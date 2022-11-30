<template>
<div>
	<h2>Schedule</h2>
	<ul>
		<li v-for="(schedule, index) in schedules" :key="getDate(schedule.date)">
			<NuxtLink
				:to="`/schedule/${getDate(schedule.date)}/`"
			>
				<div v-if="schedule._embedded['wp:featuredmedia']">
					<img
						:src="schedule._embedded['wp:featuredmedia'][0].source_url"
						alt=""
					/>
				</div>
				{{ schedule.title.rendered }}
				{{ getDateString(schedule.date) }}
			</NuxtLink>
		</li>
	</ul>

	<nav>
		<ul>
			<li v-if="previousData.length">
				<button @click.prevent="onClickPrev">prev</button>
			</li>
			<li v-if="nextData.length">
				<button @click.prevent="onClickNext">next</button>
			</li>
		</ul>
	</nav>
</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const route = useRoute()
const router = useRouter()

const { ym } = route.query
const yearQuery = ym ? +ym.slice(0, 4) : dayjs().year()
const monthQuery = ym ? +ym.slice(4, 6) - 1 : dayjs().month()
const year = ref(yearQuery)
const month = ref(monthQuery)
const lastDate = ref(dayjs(new Date(year.value, month.value)).endOf('month').date())

const previousMonthDays = ref(dayjs(new Date(year.value, month.value)).subtract(1, 'month'))
const previousLastDate = ref(dayjs(new Date(previousMonthDays.value.year(), previousMonthDays.value.month())).endOf('month').date())

const nextMonthDays = ref(dayjs(new Date(year.value, month.value)).add(1, 'month'))
const nextLastDate = ref(dayjs(new Date(nextMonthDays.value.year(), nextMonthDays.value.month())).endOf('month').date())

const [
	{ data: schedules, refresh },
	{ data: previousData, refresh: refreshPreviousData },
	{ data: nextData, refresh: refreshNextData }
] = await Promise.all([
	useFetch<any>(`/posts`,
		{
			baseURL: apiBase,
			params: {
				_embed: true,
				after: `${year.value}-${dayjs(new Date(year.value, month.value)).format('MM')}-01T00:00:00`,
				before: `${year.value}-${dayjs(new Date(year.value, month.value)).format('MM')}-${lastDate.value}T23:59:59`,
				order: 'asc',
				category_name: 'party',
				status: 'publish',
				per_page: 31
			},
			onRequest (ctx) {
				ctx.options.params = {
					_embed: true,
					after: `${year.value}-${dayjs(new Date(year.value, month.value)).format('MM')}-01T00:00:00`,
					before: `${year.value}-${dayjs(new Date(year.value, month.value)).format('MM')}-${lastDate.value}T23:59:59`,
					order: 'asc',
					category_name: 'party',
					status: 'publish',
					per_page: 31
				}
			}
		}
	),
	useFetch<any>(`/posts`,
		{
			baseURL: apiBase,
			params: {
				after: `${previousMonthDays.value.year()}-${dayjs(new Date(previousMonthDays.value.year(), previousMonthDays.value.month())).format('MM')}-01T00:00:00`,
				before: `${previousMonthDays.value.year()}-${dayjs(new Date(previousMonthDays.value.year(), previousMonthDays.value.month())).format('MM')}-${previousLastDate.value}T23:59:59`,
				category_name: 'party',
				status: 'publish',
				per_page: 31
			},
			onRequest (ctx) {
				ctx.options.params = {
					after: `${previousMonthDays.value.year()}-${dayjs(new Date(previousMonthDays.value.year(), previousMonthDays.value.month())).format('MM')}-01T00:00:00`,
					before: `${previousMonthDays.value.year()}-${dayjs(new Date(previousMonthDays.value.year(), previousMonthDays.value.month())).format('MM')}-${previousLastDate.value}T23:59:59`,
					category_name: 'party',
					status: 'publish',
					per_page: 31
				}
			}
		}
	),
	useFetch<any>(`/posts`,
		{
			baseURL: apiBase,
			params: {
				after: `${nextMonthDays.value.year()}-${dayjs(new Date(nextMonthDays.value.year(), nextMonthDays.value.month())).format('MM')}-01T00:00:00`,
				before: `${nextMonthDays.value.year()}-${dayjs(new Date(nextMonthDays.value.year(), nextMonthDays.value.month())).format('MM')}-${nextLastDate.value}T23:59:59`,
				category_name: 'party',
				status: 'publish',
				per_page: 31
			},
			onRequest (ctx) {
				ctx.options.params = {
					after: `${nextMonthDays.value.year()}-${dayjs(new Date(nextMonthDays.value.year(), nextMonthDays.value.month())).format('MM')}-01T00:00:00`,
					before: `${nextMonthDays.value.year()}-${dayjs(new Date(nextMonthDays.value.year(), nextMonthDays.value.month())).format('MM')}-${nextLastDate.value}T23:59:59`,
					category_name: 'party',
					status: 'publish',
					per_page: 31
				}
			}
		}
	)
])

const getDate = (date: Date) => {
	return dayjs(date).format('YYYYMMDD')
}

const getDateString = (date: Date) => {
	return dayjs(date).format('YYYY/MM/DD')
}

const onClickPrev = () => {
	changeMonth('previous')
}

const onClickNext = () => {
	changeMonth('next')
}

const changeMonth = (tagetMonth: string) => {
	const days = (tagetMonth === 'previous') ? dayjs(new Date(year.value, month.value)).subtract(1, 'month') : dayjs(new Date(year.value, month.value)).add(1, 'month')
	month.value = days.month()
	year.value = days.year()
	lastDate.value = dayjs(new Date(year.value, month.value)).endOf('month').date()

	previousMonthDays.value = dayjs(new Date(year.value, month.value)).subtract(1, 'month')
	previousLastDate.value = dayjs(new Date(previousMonthDays.value.year(), previousMonthDays.value.month())).endOf('month').date()

	nextMonthDays.value = dayjs(new Date(year.value, month.value)).add(1, 'month')
	nextLastDate.value = dayjs(new Date(nextMonthDays.value.year(), nextMonthDays.value.month())).endOf('month').date()

	router.push({
		path: '/schedule/',
		query: {
			ym: `${year.value}${dayjs(new Date(year.value, month.value)).format('MM')}`
		},
	})
}

watch(() => month.value, () => {
	refresh()
	refreshPreviousData()
	refreshNextData()
})
</script>

<style scoped>
img {
	width: 50%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}
</style>