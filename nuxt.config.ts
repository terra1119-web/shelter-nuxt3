// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_WP_API_URL,
		},
	},
	routeRules: {
		'/schedule/': { ssr: false },
	},
	postcss: {
		plugins: { tailwindcss: {} },
	},
	css: [
		'~/assets/css/tailwind.css',
		'@fortawesome/fontawesome-svg-core/styles.css',
	],
	modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
	googleFonts: {
		families: {
			'Roboto+Condensed': {
				wght: [100, 300, 400],
			},
			Roboto: {
				wght: [100, 400],
			},
		},
	},
	plugins: ['@/plugins/fontawesome.ts'],
	build: {
		transpile: ['@fortawesome/vue-fontawesome'],
	},
	app: {
		head: {
			charset: 'utf-8',
			viewport:
				'width=device-width, user-scalable=no, minimum-scale=1, maximum-scale=1',
			title: 'SHeLTeR | 純度の高い音質と美味しいお酒を提供している八王子のDJバー',
			link: [
				{
					rel: 'icon',
					href: '/images/favicon.ico',
					sizes: 'any',
				},
				{
					rel: 'apple-touch-icon',
					href: '/images/appletouchicon.png',
				},
			],
			meta: [
				{
					name: 'description',
					content:
						'SHeLTeRは東京の西端、八王子で30年以上にに渡り営業している、純度の高い音質と美味しいお酒を提供しているDJバーです。ディスコ、クラブ、サロン、スタジオ、ラボ、など、様々な名称や既存のイメージに囚われない、常に革新的かつ居心地の良い自由な空間を目指しています。',
				},
				{
					name: 'format-detection',
					content: 'telephone=no,address=no,email=no',
				},
				{
					property: 'og:locale',
					content: 'ja_JP',
				},
				{
					property: 'og:site_name',
					content:
						'SHeLTeR | 純度の高い音質と美味しいお酒を提供している八王子のDJバー',
				},
				{
					property: 'og:title',
					content:
						'SHeLTeR | 純度の高い音質と美味しいお酒を提供している八王子のDJバー',
				},
				{
					property: 'og:description',
					content:
						'SHeLTeRは東京の西端、八王子で30年以上にに渡り営業している、純度の高い音質と美味しいお酒を提供しているDJバーです。ディスコ、クラブ、サロン、スタジオ、ラボ、など、様々な名称や既存のイメージに囚われない、常に革新的かつ居心地の良い自由な空間を目指しています。',
				},
				{
					property: 'og:url',
					content: 'https://www.at-shelter.com/',
				},
			],
		},
	},
})
