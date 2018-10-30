/* global d3 */

export class DateOperations {
  constructor () {
    this.dateParse = d3.timeParse('%d/%m/%Y')
    this.dateFormat = d3.timeFormat('%d%m') // returns date string ddmm, eg 2902
    this.dayOfYear = d3.timeFormat('%j')
    this.colDateFormat = d3.timeParse('%d/%m/%Y')
    this.DateFormatPol = d3.timeParse('%Y-%m-%d')
    this.cntRata = 1
    this.formatDate = d3.timeFormat('%x')
    this.formatMonth = d3.timeFormat('%b')
    this.format = d3.format('+.2%')

    this.arcLabels = [
      { 'month': 'Ene', 'start': 0, 'days': 1 },
      { 'month': 'Feb', 'start': 1, 'days': 1 },
      { 'month': 'Mar', 'start': 2, 'days': 1 },
      { 'month': 'Abr', 'start': 3, 'days': 1 },
      { 'month': 'May', 'start': 4, 'days': 1 },
      { 'month': 'Jun', 'start': 5, 'days': 1 },
      { 'month': 'Jul', 'start': 6, 'days': 1 },
      { 'month': 'Ago', 'start': 7, 'days': 1 },
      { 'month': 'Sep', 'start': 8, 'days': 1 },
      { 'month': 'Oct', 'start': 9, 'days': 1 },
      { 'month': 'Nov', 'start': 10, 'days': 1 },
      { 'month': 'Dic', 'start': 11, 'days': 1 }
    ]
  }

  // formatDay (d) {
  //   return 'SMTWTFS'[d.getDay()]
  // }

  // pathMonth (t) {
  //   const n = weekday === 'weekday' ? 5 : 7
  //   const d = Math.max(0, Math.min(n, countDay(t)))
  //   const w = timeWeek.count(d3.timeYear(t), t)
  //   return `${d === 0 ? `M${w * cellSize},0`
  //     : d === n ? `M${(w + 1) * cellSize},0`
  //       : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`}V${n * cellSize}`
  // }

  // Returns a new array, which a data point per day, except for 29th Feb.
  // Where a day is missing in the original data, use the preceding day.
  createDataPerDay (data) {
    let theDate = new Date(+data[0].year, +data[0].month - 1, +data[0].day)

    let day = theDate
    let ii = data.length - 1
    let lastDay = new Date(+data[ii].year, +data[ii].month - 1, +data[ii].day)
    let newData = []

    let i = 0

    for (day.getTime(); day.getTime() <= lastDay.getTime(); day.setMonth(day.getMonth() + 1)) {
      let datum = {}
      datum.date = new Date(day)
      let compareDate = new Date(+data[i].year, +data[i].month - 1, +data[i].day)

      if (compareDate.getTime() === theDate.getTime()) {
        datum.cnt = +data[i].cnt * this.cntRata
        datum.source = 'original'
        datum.year = theDate.getFullYear()
        datum.month = theDate.getMonth()
        datum.day = theDate.getDate()
        // datum.dayOfYear = +this.dayOfYear(theDate.date)
        i = i + 1
      } else {
        datum.cnt = +data[i - 1].cnt * this.cntRata
        datum.source = 'avg'
        datum.year = theDate.getFullYear()
        datum.month = theDate.getMonth()
        datum.day = theDate.getDate()
        // datum.dayOfYear = +this.dayOfYear(theDate.getDate())
      }

      newData.push(datum)
    }

    return newData
  }
}
