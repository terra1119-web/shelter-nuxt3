/* eslint-disable import/named */
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import {
	faBars,
	faChevronRight,
	faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
	config.autoAddCss = false
	library.add(
		faFacebookF,
		faBars,
		faEnvelope,
		faChevronRight,
		faChevronLeft,
		faInstagram
	)
	nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
