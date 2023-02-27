import { useWindowScroll } from '@vueuse/core'

export const useScroll = () => {
	const { x, y } = useWindowScroll()

	const state = reactive<{
		isUp: boolean
		isDown: boolean
	}>({
		isUp: false,
		isDown: false,
	})

	watch(y, (newY, oldY) => {
		state.isUp = newY < oldY
		state.isDown = newY > oldY || y.value === 0
	})

	return {
		x,
		y,
		...toRefs(state),
	}
}
