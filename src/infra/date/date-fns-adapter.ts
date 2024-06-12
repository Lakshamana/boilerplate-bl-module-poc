import { DifferenceInDaysContract } from '@/application/contracts/date'

import {
  differenceInCalendarDays,
  isValid,
  differenceInDays,
  formatISO,
  addDays,
  parseISO
} from 'date-fns'

export class DateFnsAdapter implements DifferenceInDaysContract {
  differenceInDays (params: DifferenceInDaysContract.Params): DifferenceInDaysContract.Result {
    const { dateLeft, dateRight } = params
    return differenceInCalendarDays(dateLeft, dateRight)
  }

  async verifyFormat (isDate: string |Date): Promise<Date | false> {
    if (!(await this.isValidDate(isDate))) return false
    return (typeof isDate === 'string')
      ? parseISO(isDate)
      : isDate
  }

  async isValidDate (date: Date | string): Promise<boolean> {
    return isValid(date)
  }

  async formatISO (date: Date, type: string): Promise<string | false> {
    const isDate = await this.verifyFormat(date)

    if (!isDate) return isDate
    // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
    if (type === 'localTimeUTC') return formatISO(isDate)
    //= > '2019-09-18T19:00:52Z'

    // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):

    if (type === 'basic') return formatISO(isDate, { format: 'basic' })
    //= > '20190918T190052'
    // Represent 18 September 2019 in ISO 8601 format, date only:
    return formatISO(isDate, { representation: 'date' })
    //= > '2019-09-18'
  }

  async differenceDatesInDays (dateStart: Date, dateEnd: Date): Promise<number> {
    const isDate = await this.verifyFormat(dateStart)
    console.log(isDate)
    return differenceInDays(
      dateStart,
      dateEnd
    )
  }

  async addDays (data: string | Date): Promise<void> {
    // Add 10 days to 1 September 2014:
    const teste2 = parseISO('2014-02-11T11:30:30')

    const ISO8601 = '2019-09-18T19:00:52Z'
    const CONVERTER = new Date('2019-09-18T19:00:52Z')
    console.log('Converter: ', CONVERTER, ISO8601)

    const teste = addDays(teste2, 10)

    //  if (!ISO8601.toISOString) { const result = toDate(teste2) }
    console.log('CONVERSAO DE DATA: ', teste)
  }
}
