import dayjs from 'dayjs'

export const useDateString = ({
	date,
	format
}: {
	date: string
	format: string
}): string => {
	return dayjs(date).format(format)
}
