import dayjs from 'dayjs'

export const useSinglePost = async (
	{ postType }: { postType: string } = { postType: 'posts' }
) => {
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase
	const route = useRoute()
	const paramsDateString: string = route.params.date as string
	const year: number = dayjs(paramsDateString).year()
	const month: number = dayjs(paramsDateString).month() + 1
	const date: number = dayjs(paramsDateString).date()
	const afterDateString: string = dayjs(`${year}/${month}/${date}`).format(
		'YYYY-MM-DDTHH:mm:ss'
	)
	const beforeDateString = `${dayjs(`${year}/${month}/${date}`).format(
		'YYYY-MM-DD'
	)}T23:59:59`

	const { data } = await useFetch<any>(`/${postType}`, {
		baseURL: apiBase,
		params: {
			_embed: true,
			orderby: 'date',
			order: 'asc',
			before: beforeDateString,
			after: afterDateString,
		},
	})

	return data
}
