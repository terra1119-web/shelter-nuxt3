const tokens = require('./tokens/SHeLTeR-alias.json')

const filterByColor = (tokens) => {
	const filtered = {}

	Object.keys(tokens).forEach((key) => {
		if (key.includes('color-') && tokens[key]?.type === 'color') {
			const replaceKey = key.replace('color-', '')
			filtered[replaceKey] = tokens[key].value
		} else if (key.includes('color-') && !tokens[key].type) {
			Object.keys(tokens[key]).forEach((props) => {
				const replaceKey = key.replace('color-', '')
				filtered[`${replaceKey}-${props}`] = tokens[key][props].value
			})
		}
	})

	return filtered
}

const colotTokens = filterByColor(tokens)

const colors = {
	...colotTokens,
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
		extend: {
			colors
		}
	},
	plugins: []
}
