<template>
	<div class="pb-8 md:pb-10 md:max-w-5xl md:px-8 md:mx-auto">
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
					:key="`${useDateString({
						date: `${year}${month + 1}`,
						format: 'YYYYMMMM',
					})}-schedule-${year}-${month + 1}-${day.date}-${index}`"
					class="md:min-h-[112px] border-r border-b border-border-secondary break-all"
					:class="[
						!day.isNowMonth || !day.title ? 'hidden md:block' : '',
						day.isToday ? 'bg-surface-neutral-highlight' : '',
					]"
				>
					<template
						v-if="
							day.isNowMonth &&
							day.title !== '' &&
							day.dateUrl !== ''
						"
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
								<span class="pl-2 md:hidden">{{
									day.days
								}}</span>
							</p>
							<h2
								class="mt-2 text-xl font-bold"
								v-html="day.title"
							/>
							<span
								class="block md:hidden absolute top-[calc(50%-8px)] right-6"
							>
								<FontAwesomeIcon
									icon="fa-solid fa-chevron-right"
								/>
							</span>
						</NuxtLink>
					</template>
					<template v-else>
						<div
							:class="[
								'block',
								'h-full',
								'py-4',
								'pl-6',
								'pr-14',
								'md:pl-4',
								'md:pr-4',
								'relative',
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
								<span class="pl-2 md:hidden">{{
									day.days
								}}</span>
							</p>
						</div>
					</template>
				</li>
			</ul>
		</section>

		<nav>
			<ul class="flex justify-between mt-6 px-6 md:px-0">
				<li v-if="previousData">
					<Button
						icon-left="fa-solid fa-chevron-left"
						:disabled="pending"
						@click="onClickPrev"
					>
						{{
							useDateString({
								date:
									previousMonthDays.year().toString() +
									(previousMonthDays.month() + 1).toString(),
								format: 'MMMM',
							})
						}}
					</Button>
				</li>
				<li v-if="nextData" class="ml-auto">
					<Button
						icon-right="fa-solid fa-chevron-right"
						:disabled="pending"
						@click="onClickNext"
					>
						{{
							useDateString({
								date:
									nextMonthDays.year().toString() +
									(nextMonthDays.month() + 1).toString(),
								format: 'MMMM',
							})
						}}
					</Button>
				</li>
			</ul>
		</nav>

		<ul class="hidden">
			<li v-for="previous in previousSchedules" :key="previous.id">
				<NuxtLink
					:to="`/schedule/${useDateString({
						date: previous.date,
						format: 'YYYYMMDD',
					})}/`"
				>
					{{ previous.title.rendered }}
				</NuxtLink>
			</li>
		</ul>

		<ul class="hidden">
			<li v-for="next in nextSchedules" :key="next.id">
				<NuxtLink
					:to="`/schedule/${useDateString({
						date: next.date,
						format: 'YYYYMMDD',
					})}/`"
				>
					{{ next.title.rendered }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import dayjs from 'dayjs'

	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase
	const route = useRoute()

	useHead({
		title: `SCHEDULE | SHeLTeR`,
	})

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
		{ data: schedules, refresh, pending },
		{ data: previousSchedules },
		{ data: nextSchedules },
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
				per_page: 100,
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
					per_page: 100,
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
				per_page: 100,
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
				per_page: 100,
			},
		}),
	])

	const previousData: any = ref(schedules.value[0].previous)
	const nextData: any = ref(schedules.value[schedules.value.length - 1].next)

	const onClickPrev = () => {
		changeMonth('previous')
	}

	const onClickNext = () => {
		changeMonth('next')
	}

	const changeMonth = async (tagetMonth: string) => {
		const days =
			tagetMonth === 'previous'
				? dayjs(new Date(year.value, month.value)).subtract(1, 'month')
				: dayjs(new Date(year.value, month.value)).add(1, 'month')
		month.value = days.month()
		year.value = days.year()
		lastDate.value = dayjs(new Date(year.value, month.value))
			.endOf('month')
			.date()

		currentDate.value = dayjs(new Date(year.value, month.value))
		calendars.value = getCalendar()

		await navigateTo({
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

		const calendar = []
		for (let week = 0; week < weekNumber; week++) {
			const weekRow: any[] = []
			for (let day = 0; day < 7; day++) {
				const targetDate = startDate.get('date')
				const targetMonth = startDate.get('month')
				const targetDays = dayjs(
					new Date(year.value, targetMonth, targetDate)
				).format('ddd')
				const nowScheduleDay = schedules.value.find(
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
					title: nowScheduleDay?.title.rendered || '',
					dateUrl: nowScheduleDay?.date
						? useDateString({
								date: nowScheduleDay.date,
								format: 'YYYYMMDD',
						  })
						: '',
					isNowMonth: month.value === targetMonth,
					isToday:
						year.value === dayjs().year() &&
						targetMonth === dayjs().month() &&
						targetDate === dayjs().date(),
					isSaturday: day === 6,
					isHoliday:
						// day === 0 ||
						// useHoliday({
						// 	date: `${year.value}-${
						// 		targetMonth + 1
						// 	}-${targetDate}`,
						// }),
						day === 0,
				})
				startDate = startDate.add(1, 'day')
			}
			calendar.push(weekRow)
		}
		const flatCalendars = calendar.flat()
		return flatCalendars
	}

	const calendars = ref(getCalendar())

	watch(
		() => month.value,
		async () => {
			window.scrollTo(0, 0)
			await refresh()
			calendars.value = getCalendar()
			previousData.value = schedules.value[0].previous
			nextData.value = schedules.value[schedules.value.length - 1].next
			previousMonthDays.value = dayjs(
				new Date(year.value, month.value)
			).subtract(1, 'month')
			nextMonthDays.value = dayjs(new Date(year.value, month.value)).add(
				1,
				'month'
			)
		}
	)
</script>
