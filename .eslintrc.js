module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@nuxtjs/eslint-config-typescript',
		'@vue/prettier',
	],
	overrides: [],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'vue/no-v-model-argument': 0,
		'vue/no-multiple-template-root': 0,
		'vue/no-v-html': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'vue/script-setup-uses-vars': 'error',
		'@typescript-eslint/no-unused-vars': ['error'],
		'vue/multi-word-component-names': 'off',
	},
}
