const tokens = require('./tokens/SHeLTeR-alias.json')

const getColorTokens = (tokens) => {
	return Object.keys(tokens).reduce((prev, current) => {
		const tokenValue = tokens[current]
		const key = current.replace('color-', '')
		const lowerCamelCaseKey = key[0].toLowerCase() + key.slice(1)

		prev[lowerCamelCaseKey] = `var(--${current}, ${tokenValue.value})`
		return prev
	}, {})
}

const shelterColors = getColorTokens(tokens)

const colors = {
	...shelterColors,
	transparent: 'transparent',
	current: 'currentColor',
	inherit: 'inherit'
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./*.vue',
		'./components/**/*.vue',
		'./layouts/**/*.vue',
		'./pages/**/*.vue'
	],
	theme: {
		// extend: {
		// 	colors: {
		// 		background: tokens.background.value,
		// 		text: {
		// 			primary: tokens.text.primary.value,
		// 			accent: tokens.text.accent.value
		// 		},
		// 		surface: {
		// 			nuetral: {
		// 				primary: tokens.surface.nuetral.primary.value,
		// 				secondary: tokens.surface.nuetral.secondary.value,
		// 				overlay: tokens.surface.nuetral.overlay.value
		// 			},
		// 			accent: tokens.surface.accent.value
		// 		},
		// 		border: {
		// 			primary: tokens.border.primary.value,
		// 			accent: tokens.border.accent.value
		// 		}
		// 	}
		// }
		colors
	},
	plugins: []
}
