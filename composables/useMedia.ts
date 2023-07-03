export const useMedia = async (id: string) => {
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase

	const { data } = await useFetch<any>(`/media/${id}`, {
		baseURL: apiBase,
		key: `${apiBase}/media/${id}`,
	})

	return data
}
