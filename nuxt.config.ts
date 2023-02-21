// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_WP_API_URL,
		},
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
			'Roboto Condensed': true,
			Roboto: {
				wght: [100, 400],
			},
		},
	},
	plugins: ['@/plugins/fontawesome.ts'],
	build: {
		transpile: ['@fortawesome/vue-fontawesome'],
	},
})
