import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
	config.autoAddCss = false
	library.add(faSquareFacebook, faBars)
	nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
