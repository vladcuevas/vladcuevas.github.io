export class CalOps {
  constructor () {
    this.format = d3.format('~s')

    this.formatDate = d3.timeFormat('%x')

    this.formatMonth = d3.timeFormat('%b')

    this.color = d3.scaleSequential(d3.interpolateReds)

    this.weekday = 'monday' // can be weekday, sunday or monday

    this.cellSize = 17

    this.width = 150

    this.height = this.cellSize * (this.weekday === 'weekday' ? 7 : 9)

    this.timeWeek = this.weekday === 'sunday' ? d3.timeSunday : d3.timeMonday

    this.countDay = this.weekday === 'sunday' ? d => d.getDay() : d => (d.getDay() + 6) % 7
  }

  formatDayEng (d) { return 'SMTWTFS'[d.getDay()] }
  formatDaySp (d) { return 'DLMMJVS'[d.getDay()] }

  pathMonth (t) {
    let countDay = this.weekday === 'sunday' ? d => d.getDay() : d => (d.getDay() + 6) % 7
    let timeWeek = this.weekday === 'sunday' ? d3.timeSunday : d3.timeMonday

    const n = this.weekday === 'weekday' ? 5 : 7
    const d = Math.max(0, Math.min(n, countDay(t)))
    const w = timeWeek.count(d3.timeYear(t), t)
    return `${d === 0 ? `M${w * this.cellSize},0`
      : d === n ? `M${(w + 1) * this.cellSize},0`
        : `M${(w + 1) * this.cellSize},0V${d * this.cellSize}H${w * this.cellSize}`}V${n * this.cellSize}`
  }

  calendar (theClass, theDate, data) {
    console.log()

    let calops = new CalOps()

    let fdata = data.filter((d) => d.date.getFullYear() === theDate.getFullYear() && d.date.getMonth() === theDate.getMonth())

    calops.color.domain(d3.extent(fdata, function (d) { return d.value }))

    const years = d3.nest()
      .key(d => d.date.getFullYear())
      .entries(fdata)
      .reverse()

    const svg = d3.select(theClass)
      .append('svg')
      .attr('width', calops.width)
      .attr('height', calops.height * years.length)
      .style('font', '10px sans-serif')
      .style('width', '100%')
      .style('height', 'auto')

    const year = svg.selectAll('g')
      .data(years)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(40,${(calops.height) * i + calops.cellSize * 1.5})`)

    year.append('text')
      .attr('x', -5)
      .attr('y', -5)
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'end')
      .text(d => d.key)

    year.append('g')
      .attr('text-anchor', 'end')
      .selectAll('text')
      .data((calops.weekday === 'weekday' ? d3.range(2, 7) : d3.range(7))
        .map(i => new Date(2018, 0, i)))
      .enter().append('text')
      .attr('x', -5)
      .attr('y', d => (calops.countDay(d) + 0.5) * calops.cellSize)
      .attr('dy', '0.31em')
      .text(calops.formatDaySp)

    year.append('g')
      .selectAll('rect')
      .data(d => d.values)
      .enter().append('rect')
      .attr('width', calops.cellSize - 1)
      .attr('height', calops.cellSize - 1)
      .attr('x', d => calops.timeWeek.count(d3.timeMonth(d.date), d.date) * calops.cellSize + 0.5)
      .attr('y', d => calops.countDay(d.date) * calops.cellSize + 0.5)
      .attr('fill', d => calops.color(d.value))
      .append('title')
      .text(d => `${calops.formatDate(d.date)}: ${calops.format(d.value)}`)

    const month = year.append('g')
      .selectAll('g')
      .data(d => d3.timeMonths(d3.timeMonth(d.values[0].date), d.values[d.values.length - 1].date))
      .enter().append('g')

    month.filter((d, i) => i).append('path')
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('d', (d) => calops.pathMonth(d))

    month.append('text')
      .attr('x', d => calops.timeWeek.count(d3.timeYear(d), calops.timeWeek.ceil(d)) * calops.cellSize + 2)
      .attr('y', -5)
      .text(calops.formatMonth)

    return svg.node()
  }
}
