<template>
	<div class="pb-8 md:max-w-5xl md:px-8 md:mx-auto">
		<section>
			<header class="mt-6 px-6">
				<TheTitle tag-name="h1" type="primary">
					{{
						useDateString({
							date: `${year}${month + 1}`,
							format: 'YYYY MMMM',
						})
					}}
				</TheTitle>
			</header>

			<ul
				class="w-full bg-surface-nuetral-primary border-l border-t border-border-secondary grid mt-6 md:grid-cols-7"
			>
				<li
					class="hidden md:block p-4 text-center text-xl font-bold border-r border-b border-border-secondary text-text-accent"
				>
					Sun
				</li>
				<li
					class="hidden md:block p-4 text-center text-xl font-bold border-r border-b border-border-secondary"
				>
					Mon
				</li>
				<li
					class="hidden md:block p-4 text-center text-xl font-bold border-r border-b border-border-secondary"
				>
					Tue
				</li>
				<li
					class="hidden md:block p-4 text-center text-xl font-bold border-r border-b border-border-secondary"
				>
					Wed
				</li>
				<li
					class="hidden md:block p-4 text-center text-xl font-bold border-r border-b border-border-secondary"
				>
					Thu
				</li>
				<li
					class="hidden md:block p-4 text-center text-xl font-bold border-r border-b border-border-secondary"
				>
					Fri
				</li>
				<li
					class="hidden md:block p-4 text-center text-xl font-bold border-r border-b border-border-secondary text-text-info"
				>
					Sat
				</li>
				<li
					v-for="(day, index) in calendars"
					:key="index"
					class="md:min-h-[112px] border-r border-b border-border-secondary break-all"
					:class="[
						!day.isNowMonth || !day.title ? 'hidden md:block' : '',
						day.isToday ? 'bg-surface-neutral-highlight' : '',
					]"
				>
					<NuxtLink
						:to="`/schedule/${day.dateUrl}/`"
						:class="[
							'block',
							'h-full',
							'py-4',
							'pl-6',
							'pr-14',
							'md:pl-4',
							'md:pr-4',
							'relative',
							!day.title ? 'pointer-events-none' : '',
						]"
					>
						<p
							class="text-xl font-bold"
							:class="[
								day.isHoliday
									? 'text-text-accent'
									: day.isSaturday
									? 'text-text-info'
									: '',
							]"
						>
							{{ day.date }}
							<span class="pl-2 md:hidden">{{ day.days }}</span>
						</p>
						<h2 class="mt-2 text-xl font-bold" v-html="day.title" />
						<span
							class="block md:hidden absolute top-[calc(50%-8px)] right-6"
						>
							<FontAwesomeIcon icon="fa-solid fa-chevron-right" />
						</span>
					</NuxtLink>
				</li>
			</ul>
		</section>

		<nav>
			<ul class="flex justify-between mt-6 px-6 md:px-0">
				<li v-if="previousData.length">
					<Button
						icon-left="fa-solid fa-chevron-left"
						@click="onClickPrev"
					>
						{{
							useDateString({
								date: (
									previousMonthDays.month() + 1
								).toString(),
								format: 'MMMM',
							})
						}}
					</Button>
				</li>
				<li v-if="nextData.length" class="ml-auto">
					<Button
						icon-right="fa-solid fa-chevron-right"
						@click="onClickNext"
					>
						{{
							useDateString({
								date: (nextMonthDays.month() + 1).toString(),
								format: 'MMMM',
							})
						}}
					</Button>
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
	const lastDate = ref(
		dayjs(new Date(year.value, month.value)).endOf('month').date()
	)

	const previousMonthDays = ref(
		dayjs(new Date(year.value, month.value)).subtract(1, 'month')
	)
	const previousLastDate = ref(
		dayjs(
			new Date(
				previousMonthDays.value.year(),
				previousMonthDays.value.month()
			)
		)
			.endOf('month')
			.date()
	)

	const nextMonthDays = ref(
		dayjs(new Date(year.value, month.value)).add(1, 'month')
	)
	const nextLastDate = ref(
		dayjs(new Date(nextMonthDays.value.year(), nextMonthDays.value.month()))
			.endOf('month')
			.date()
	)

	const currentDate = ref(dayjs(new Date(year.value, month.value)))

	const [
		{ data: schedules, refresh },
		{ data: previousData, refresh: refreshPreviousData },
		{ data: nextData, refresh: refreshNextData },
	] = await Promise.all([
		useFetch<any>(`/posts`, {
			baseURL: apiBase,
			params: {
				_embed: true,
				after: `${year.value}-${dayjs(
					new Date(year.value, month.value)
				).format('MM')}-01T00:00:00`,
				before: `${year.value}-${dayjs(
					new Date(year.value, month.value)
				).format('MM')}-${lastDate.value}T23:59:59`,
				order: 'asc',
				category_name: 'party',
				status: 'publish',
				per_page: 31,
			},
			onRequest(ctx: any) {
				ctx.options.params = {
					_embed: true,
					after: `${year.value}-${dayjs(
						new Date(year.value, month.value)
					).format('MM')}-01T00:00:00`,
					before: `${year.value}-${dayjs(
						new Date(year.value, month.value)
					).format('MM')}-${lastDate.value}T23:59:59`,
					order: 'asc',
					category_name: 'party',
					status: 'publish',
					per_page: 31,
				}
			},
		}),
		useFetch<any>(`/posts`, {
			baseURL: apiBase,
			params: {
				after: `${previousMonthDays.value.year()}-${dayjs(
					new Date(
						previousMonthDays.value.year(),
						previousMonthDays.value.month()
					)
				).format('MM')}-01T00:00:00`,
				before: `${previousMonthDays.value.year()}-${dayjs(
					new Date(
						previousMonthDays.value.year(),
						previousMonthDays.value.month()
					)
				).format('MM')}-${previousLastDate.value}T23:59:59`,
				category_name: 'party',
				status: 'publish',
				per_page: 31,
			},
			onRequest(ctx: any) {
				ctx.options.params = {
					after: `${previousMonthDays.value.year()}-${dayjs(
						new Date(
							previousMonthDays.value.year(),
							previousMonthDays.value.month()
						)
					).format('MM')}-01T00:00:00`,
					before: `${previousMonthDays.value.year()}-${dayjs(
						new Date(
							previousMonthDays.value.year(),
							previousMonthDays.value.month()
						)
					).format('MM')}-${previousLastDate.value}T23:59:59`,
					category_name: 'party',
					status: 'publish',
					per_page: 31,
				}
			},
		}),
		useFetch<any>(`/posts`, {
			baseURL: apiBase,
			params: {
				after: `${nextMonthDays.value.year()}-${dayjs(
					new Date(
						nextMonthDays.value.year(),
						nextMonthDays.value.month()
					)
				).format('MM')}-01T00:00:00`,
				before: `${nextMonthDays.value.year()}-${dayjs(
					new Date(
						nextMonthDays.value.year(),
						nextMonthDays.value.month()
					)
				).format('MM')}-${nextLastDate.value}T23:59:59`,
				category_name: 'party',
				status: 'publish',
				per_page: 31,
			},
			onRequest(ctx: any) {
				ctx.options.params = {
					after: `${nextMonthDays.value.year()}-${dayjs(
						new Date(
							nextMonthDays.value.year(),
							nextMonthDays.value.month()
						)
					).format('MM')}-01T00:00:00`,
					before: `${nextMonthDays.value.year()}-${dayjs(
						new Date(
							nextMonthDays.value.year(),
							nextMonthDays.value.month()
						)
					).format('MM')}-${nextLastDate.value}T23:59:59`,
					category_name: 'party',
					status: 'publish',
					per_page: 31,
				}
			},
		}),
	])

	const onClickPrev = () => {
		changeMonth('previous')
	}

	const onClickNext = () => {
		changeMonth('next')
	}

	const changeMonth = (tagetMonth: string) => {
		const days =
			tagetMonth === 'previous'
				? dayjs(new Date(year.value, month.value)).subtract(1, 'month')
				: dayjs(new Date(year.value, month.value)).add(1, 'month')
		month.value = days.month()
		year.value = days.year()
		lastDate.value = dayjs(new Date(year.value, month.value))
			.endOf('month')
			.date()

		previousMonthDays.value = dayjs(
			new Date(year.value, month.value)
		).subtract(1, 'month')
		previousLastDate.value = dayjs(
			new Date(
				previousMonthDays.value.year(),
				previousMonthDays.value.month()
			)
		)
			.endOf('month')
			.date()

		nextMonthDays.value = dayjs(new Date(year.value, month.value)).add(
			1,
			'month'
		)
		nextLastDate.value = dayjs(
			new Date(nextMonthDays.value.year(), nextMonthDays.value.month())
		)
			.endOf('month')
			.date()

		currentDate.value = dayjs(new Date(year.value, month.value))
		calendars.value = getCalendar()

		router.push({
			path: '/schedule/',
			query: {
				ym: `${year.value}${dayjs(
					new Date(year.value, month.value)
				).format('MM')}`,
			},
		})
	}

	const getStartDate = (currentDate: dayjs.Dayjs) => {
		const date = dayjs(currentDate).startOf('month')
		const weekNum = date.day()
		return date.subtract(weekNum, 'day')
	}

	const getEndDate = (currentDate: dayjs.Dayjs) => {
		const date = dayjs(currentDate).endOf('month')
		const weekNum = date.day()
		return date.add(6 - weekNum, 'day')
	}

	const getCalendar = () => {
		let startDate = getStartDate(currentDate.value)
		const endDate = getEndDate(currentDate.value)
		const weekNumber = Math.ceil(endDate.diff(startDate, 'day') / 7)

		const calendars = []
		for (let week = 0; week < weekNumber; week++) {
			const weekRow: any[] = []
			for (let day = 0; day < 7; day++) {
				const targetDate = startDate.get('date')
				const targetMonth = startDate.get('month')
				const targetDays = dayjs(
					new Date(year.value, targetMonth, targetDate)
				).format('ddd')
				const nowScheduleDay = schedules.value.filter(
					(scheduleDay: any) => {
						return (
							targetDate === dayjs(scheduleDay.date).date() &&
							targetMonth === dayjs(scheduleDay.date).month()
						)
					}
				)
				weekRow.push({
					date: targetDate,
					days: targetDays,
					title: nowScheduleDay[0]?.title.rendered,
					dateUrl: useDateString({
						date: nowScheduleDay[0]?.date,
						format: 'YYYYMMDD',
					}),
					isNowMonth: month.value === targetMonth,
					isToday:
						targetMonth === dayjs().month() &&
						targetDate === dayjs().date(),
					isSaturday: day === 6,
					isHoliday:
						day === 0 ||
						useHoliday({
							date: `${year.value}-${
								targetMonth + 1
							}-${targetDate}`,
						}),
				})
				startDate = startDate.add(1, 'day')
			}
			calendars.push(weekRow)
		}
		const flatCalendars = calendars.flat()
		return flatCalendars
	}

	const calendars = ref(getCalendar())

	watch(
		() => month.value,
		async () => {
			window.scrollTo(0, 0)
			await refresh()
			calendars.value = getCalendar()
			await refreshPreviousData()
			await refreshNextData()
		}
	)

	watch(
		() => route.query.ym,
		() => {
			if (!route.query.ym) {
				window.scrollTo(0, 0)
				location.reload()
			}
		}
	)
</script>
