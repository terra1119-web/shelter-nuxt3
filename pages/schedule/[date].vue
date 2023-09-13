<template>
	<div v-for="(schedule, index) in schedules" :key="index">
		<div
			class="bg-none w-full md:blur-xl md:opacity-30 md:absolute md:top-0 md:left-0 md:min-h-full"
			:style="[
				{
					'background-image': `url(${
						schedule._embedded['wp:featuredmedia'].length
							? schedule._embedded['wp:featuredmedia'][0]
									.source_url
							: ''
					})`,
					'background-repeat': 'no-repeat',
					'background-size': 'contain',
				},
			]"
		/>

		<div class="relative pb-8 md:pb-12 max-w-5xl md:mx-auto z-[10]">
			<figure
				v-if="schedule._embedded['wp:featuredmedia'].length"
				class="mt-6 md:mt-10"
			>
				<img
					:src="schedule._embedded['wp:featuredmedia'][0].source_url"
					:alt="`${schedule.title.rendered} : ${useDateString({
						date: schedule.date,
						format: 'YYYY/MM/DD ddd',
					})}`"
					class="w-full"
				/>
			</figure>

			<header class="mt-6 md:mt-10 px-6">
				<TheTitle tag-name="h1" type="secondary">
					<span
						class="schedule_shadow"
						v-html="schedule.title.rendered"
					/>
				</TheTitle>
			</header>

			<div class="text-center px-6 break-all">
				<time
					:datetime="
						useDateString({
							date: schedule.date,
							format: 'YYYY/MM/DD ddd',
						})
					"
					class="block mt-6 md:mt-10 text-2xl md:text-3xl leading-9 md:leading-[48px] schedule_shadow"
				>
					{{
						useDateString({
							date: schedule.date,
							format: 'YYYY/MM/DD ddd',
						})
					}}
				</time>

				<p
					v-if="schedule.acf.party_genre"
					class="mt-6 md:mt-10 text-2xl md:text-3xl leading-9 md:leading-[48px] schedule_shadow"
					v-html="schedule.acf.party_genre"
				/>
				<p
					v-if="schedule.acf.party_open"
					class="mt-6 md:mt-10 text-2xl md:text-3xl leading-9 md:leading-[48px] schedule_shadow"
					v-html="schedule.acf.party_open"
				/>
				<p
					v-if="schedule.acf.party_charge"
					class="text-2xl md:text-3xl leading-9 md:leading-[48px] schedule_shadow"
					v-html="schedule.acf.party_charge"
				/>
				<p
					v-if="schedule.acf.party_guest"
					class="mt-6 md:mt-10 text-2xl md:text-3xl leading-9 md:leading-[48px] schedule_shadow"
					v-html="schedule.acf.party_guest"
				/>
				<p
					v-if="schedule.acf.party_dj"
					class="mt-6 md:mt-10 text-2xl md:text-3xl leading-9 md:leading-[48px] schedule_shadow"
					v-html="schedule.acf.party_dj"
				/>
			</div>

			<div
				v-if="schedule.acf.party_freetxt"
				class="mt-8 md:mt-12 px-6 text-base md:text-xl md:leading-8 schedule_shadow schedule__freetxt"
				v-html="schedule.acf.party_freetxt"
			/>

			<ul>
				<li
					v-for="media in mediaData"
					:key="media.title"
					class="mt-8 md:mt-12 px-6 md:grid md:gap-6 grid-cols-2"
				>
					<figure class="block md:w-[480px]">
						<img
							:src="media.image"
							:alt="media.title"
							class="w-full"
						/>
					</figure>
					<div>
						<p
							class="text-xl leading-8 md:text-2xl md:leading-9 font-bold mt-6 md:mt-0 schedule_shadow"
						>
							{{ media.title }}
						</p>
						<div
							class="mt-6 text-base schedule_shadow"
							v-html="media.description"
						></div>
					</div>
				</li>
			</ul>

			<ul class="mt-8 md:mt-12 px-6 flex justify-between">
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
				<li v-if="schedule.next" class="ml-auto">
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
	</div>
</template>

<script setup lang="ts">
	const router = useRouter()
	const route = useRoute()
	const schedules = await useSinglePost()

	useHead({
		title: `${schedules.value[0].title.rendered} - ${useDateString({
			date: schedules.value[0].date,
			format: 'YYYY/MM/DD',
		})} | SHeLTeR`,
		meta: [
			{
				property: 'og:title',
				content: `${
					schedules.value[0].title.rendered
				} - ${useDateString({
					date: schedules.value[0].date,
					format: 'YYYY/MM/DD',
				})} | SHeLTeR`,
			},
			{
				property: 'og:image',
				content: `${
					schedules.value[0]._embedded['wp:featuredmedia']
						? schedules.value[0]._embedded['wp:featuredmedia'][0]
								.source_url
						: '/images/noimage.gif'
				}`,
			},
			{
				property: 'og:url',
				content: `https://www.at-shelter.com${route.path}`,
			},
		],
	})

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

	.schedule_shadow {
		@apply drop-shadow-[0_0_24px_rgba(0,0,0,0.5)];
	}
</style>
