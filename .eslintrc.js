module.exports = {
	root: true,
	env: {
		'browser': true,
		'es2021': true,
		'node': true
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@nuxtjs/eslint-config-typescript',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint'
	],
	overrides: [],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'vue',
		'@typescript-eslint'
	],
	'rules': {
		'vue/no-v-model-argument': 0
		// 'generator-star-spacing': 'off',
		// // allow debugger during development
		// 'indent': ['error', 'tab', { 'SwitchCase': 1 }],
		// 'no-tabs': 0,
		// 'no-irregular-whitespace': ['error', { 'skipRegExps': true }]
	}
}
