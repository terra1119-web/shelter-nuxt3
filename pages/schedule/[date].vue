<template>
	<div v-for="(schedule, index) in schedules" :key="index">
		<div v-if="schedule._embedded['wp:featuredmedia']">
			<img
				:src="schedule._embedded['wp:featuredmedia'][0].source_url"
				:alt="`${schedule.title.rendered} : ${getDate(
					schedule.date,
					'YYYY/MM/DD ddd'
				)}`"
				class="w-full"
			/>
		</div>

		<header class="mt-4 px-4">
			<TheTitle tag-name="h1" type="secondary">{{
				schedule.title.rendered
			}}</TheTitle>
		</header>

		<div class="text-center px-4 text-2xl">
			<time
				:datetime="getDate(schedule.date, 'YYYY/MM/DD ddd')"
				class="block mt-4"
			>
				{{ getDate(schedule.date, 'YYYY/MM/DD ddd') }}
			</time>

			<p
				v-if="schedule.acf.party_genre"
				class="mt-4"
				v-html="schedule.acf.party_genre"
			/>
			<p
				v-if="schedule.acf.party_open"
				class="mt-4"
				v-html="schedule.acf.party_open"
			/>
			<p
				v-if="schedule.acf.party_charge"
				class="mt-4"
				v-html="schedule.acf.party_charge"
			/>
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

		<div
			v-if="schedule.acf.party_freetxt"
			class="mt-4 px-4 text-xl schedule__freetxt"
			v-html="schedule.acf.party_freetxt"
		/>

		<ul>
			<li v-for="media in mediaData" :key="media.title" class="mt-4 px-4">
				<fegure>
					<img :src="media.image" :alt="media.title" class="w-full" />
				</fegure>
				<p>{{ media.title }}</p>
				<div v-html="media.description" />
			</li>
		</ul>

		<ul class="mt-8 px-4 flex justify-between">
			<li v-if="schedule.previous">
				<Button
					icon-left="fa-solid fa-chevron-left"
					@click="onClick(schedule.previous.date)"
				>
					{{ getDate(schedule.previous.date, 'YYYY/MM/DD') }}
				</Button>
			</li>
			<li v-if="schedule.next">
				<Button
					icon-right="fa-solid fa-chevron-right"
					@click="onClick(schedule.next.date)"
				>
					{{ getDate(schedule.next.date, 'YYYY/MM/DD') }}
				</Button>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	const router = useRouter()
	const schedules = await useSinglePost()

	const partyProfileField: any[] = schedules.value[0].acf.party_profile_field
	const mediaData: any = partyProfileField
		? await Promise.all(
				partyProfileField.map(async (profile: any) => {
					const image: any = await useMedia(profile.pofile_image)
					const descriptionRegExp =
						// eslint-disable-next-line
						/^<p class\=\"attachment\">.*<\/p>/

					const description =
						image.value.description.rendered.replace(
							descriptionRegExp,
							''
						)

					const obj = {
						image: image.value.source_url,
						title: image.value.title.rendered,
						description,
					}
					return obj
				})
		  )
		: []

	const getDate = (date: string, format: string) => {
		return useDateString({
			date,
			format,
		})
	}

	const onClick = (date: string) => {
		router.push(
			`/schedule/${useDateString({
				date,
				format: 'YYYYMMDD',
			})}/`
		)
	}
</script>

<style>
	.schedule__freetxt iframe {
		@apply w-full;
	}
</style>
