<template>
	<div v-for="(schedule, index) in schedules" :key="index">
		<div v-if="schedule._embedded['wp:featuredmedia']">
			<img
				:src="schedule._embedded['wp:featuredmedia'][0].source_url"
				alt=""
			/>
		</div>

		<header class="mt-4 px-4">
			<TheTitle tag-name="h1" type="secondary">{{
				schedule.title.rendered
			}}</TheTitle>
		</header>

		<div class="text-center px-4 text-2xl">
			<time
				:datetime="`${useDateString({
					date: schedule.date,
					format: 'YYYY/MM/DD ddd',
				})}`"
				class="block mt-4"
			>
				{{
					useDateString({
						date: schedule.date,
						format: 'YYYY/MM/DD ddd',
					})
				}}
			</time>

			<p v-if="schedule.acf.party_genre" class="mt-4">
				{{ schedule.acf.party_genre }}
			</p>
			<p v-if="schedule.acf.party_open" class="mt-4">
				{{ schedule.acf.party_open }}
			</p>
			<p v-if="schedule.acf.party_charge" class="mt-4">
				{{ schedule.acf.party_charge }}
			</p>
			<p
				v-if="schedule.acf.party_guest"
				class="mt-4"
				v-html="schedule.acf.party_guest"
			/>
			<p
				v-if="schedule.acf.party_dj"
				class="mt-4"
				v-html="schedule.acf.party_dj"
			/>
		</div>

		<ul class="mt-8 px-4 flex justify-between">
			<li v-if="schedule.previous">
				<Button
					icon-left="fa-solid fa-chevron-left"
					@click="onClick(schedule.previous.date)"
				>
					{{
						useDateString({
							date: schedule.previous.date,
							format: 'YYYY/MM/DD',
						})
					}}
				</Button>
			</li>
			<li v-if="schedule.next">
				<Button
					icon-right="fa-solid fa-chevron-right"
					@click="onClick(schedule.next.date)"
				>
					{{
						useDateString({
							date: schedule.next.date,
							format: 'YYYY/MM/DD',
						})
					}}
				</Button>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	const router = useRouter()
	const schedules = await useSinglePost()

	const onClick = (date: string) => {
		router.push(
			`/schedule/${useDateString({
				date,
				format: 'YYYYMMDD',
			})}/`
		)
	}
</script>

<style scoped>
	img {
		width: 100%;
	}
</style>
