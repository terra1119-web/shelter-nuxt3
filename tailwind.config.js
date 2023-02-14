import tokens from './tokens/SHeLTeR-alias.json'

const extractTokenItems = (tokens, targetKey, targetValue) => {
	const result = {}

	for (const [key, value] of Object.entries(tokens)) {
		if (value[targetKey] === targetValue) {
			result[key] = value.value
		} else if (typeof value === 'object' && value !== null) {
			const nestedResult = extractTokenItems(
				value,
				targetKey,
				targetValue
			)
			if (Object.keys(nestedResult).length !== 0) {
				result[key] = nestedResult
			}
		}
	}

	return result
}

const colotTokens = extractTokenItems(tokens, 'type', 'color')

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
		},
		fontFamily: {
			sans: [
				tokens['family-primary'].en.value,
				tokens['family-primary'].ja.value,
				'sans-serif'
			]
		}
	},
	plugins: []
}
