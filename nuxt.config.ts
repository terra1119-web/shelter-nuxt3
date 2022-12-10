// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_WP_API_URL
		}
	},
	postcss: {
		plugins: { tailwindcss: {} }
	},
	css: ['~/assets/css/tailwind.css'],
	modules: ['@nuxtjs/tailwindcss']
})
