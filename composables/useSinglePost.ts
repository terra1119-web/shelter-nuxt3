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
	const dateString: string = dayjs(`${year}/${month}/${date}`).toISOString()

	const { data, refresh } = await useFetch<any>(`/${postType}`, {
		baseURL: apiBase,
		key: `${apiBase}/${postType}/${dateString}`,
		params: {
			_embed: true,
			order: 'asc',
			per_page: 1,
			after: dateString,
		},
	})

	return { data, refresh }
}
