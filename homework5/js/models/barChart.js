/* global d3 */

export class BarChart {
  constructor () {
    this.height
  }

  graph (theClass, w, h, data, c) {
    this.height = h

    let margin = ({ top: 20, right: 0, bottom: 5, left: 50 })

    const dataSorted = data.sort((a, b) => d3.descending(a.count, b.count))

    let x = d3.scaleBand().rangeRound([0, w]).padding(0.1)
    let y = d3.scaleLinear().rangeRound([h, 0])

    x.domain(dataSorted.map(function (d) { return d.name.substring(0, 1) }))
    y.domain([0, d3.max(dataSorted, function (d) { return +d.count })])

    const svg = d3.select(theClass)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
      .style('font', '10px sans-serif')

    svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(' + (w - 100) + ',' + h + ')')
      .call(d3.axisBottom(x))

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format('.2s')))
      .attr('transform', 'translate(35,0)')
      .call(g => g.select('.domain').remove())

    let bars = svg.selectAll('.bar')
      .data(dataSorted)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) { return x(d.name.substring(0, 1)) })
      .attr('y', function (d) { return y(d.count) })
      .attr('width', x.bandwidth())
      .attr('height', function (d) { return h - y(d.count) })
      .style('fill', c)

    bars.attr('transform', 'translate(' + (w - 100) + ',' + 0 + ')')

    return svg.node()
  }
}
