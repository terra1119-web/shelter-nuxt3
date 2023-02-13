const tokens = require('./tokens/SHeLTeR-alias.json')

const extractPropertiesWithValue = (obj, targetKey, targetValue) => {
	const result = {}

	for (const [key, val] of Object.entries(obj)) {
		if (val[targetKey] === targetValue) {
			result[key] = obj[key].value
		} else if (typeof val === 'object' && val !== null) {
			/* eslint-disable @typescript-eslint/no-unused-vars */
			for (const [childKey, childVal] of Object.entries(obj[key])) {
				if (childVal[targetKey] === targetValue) {
					result[key] = extractPropertiesWithValue(
						obj[key],
						targetKey,
						targetValue
					)
				}
			}
		}
	}

	return result
}

const colotTokens = extractPropertiesWithValue(tokens, 'type', 'color')

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
