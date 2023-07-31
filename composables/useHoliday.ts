import * as holidayJp from '@holiday-jp/holiday_jp'

export const useHoliday = ({ date }: { date: string }): boolean => {
	return holidayJp.isHoliday(new Date(date))
}
