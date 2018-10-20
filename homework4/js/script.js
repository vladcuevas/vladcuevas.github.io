import { Spiral } from './models/spiral.js'
import { SpiralHeatmap } from './models/spiral-heatmap.js'
import { Reader } from './models/reader.js'
import { DateOperations } from './models/dateoperations.js'
import { NumberOps } from './models/numberOps.js'
import { SvgOps } from './models/svgOps.js'
import { Tooltip } from './models/tooltip.js'
import { CalOps } from './models/calOps.js'

// SVG dimensions
let spiral = new Spiral()

let sh = new SpiralHeatmap()

let reader = new Reader('data/delitos-sexuales.tsv')
let fReader = new Reader('data/delitos-sexuales-d.tsv')

let dateops = new DateOperations()

let nuop = new NumberOps()

let svgops = new SvgOps('#slider')

let tt = new Tooltip()

let animated = true

let chartData,
    chart

// Colour scale
let colour = d3.scaleSequential(d3.interpolateReds)

let bntPauseImg = 'img/pa.png'

let bntPlayImg = 'img/pl.png'

let
    domainInit = new Date(2010, 0, 1)

let domainEnd = new Date(2018, 8, 31)

let playPause = () => {
    animated = !animated
    playPauseButton.attr('xlink:href', animated ? bntPauseImg : bntPlayImg)
}

let playPauseButton = svgops.svg.append('svg:image')
    .attr('x', 0)
    .attr('y', 10)
    .attr('width', 32)
    .attr('height', 32)
    .attr('xlink:href', bntPauseImg)
    .on('click', playPause)

// Load the data, nest, sort and draw charts
let rawDS = reader.tsv()
let frawDS = fReader._tsv();

(async function read() {
    const data = await rawDS
    const fdata = await frawDS

    let calops = new CalOps()

    colour.domain(d3.extent(data, function(d) { return d.cnt }))

    chartData = dateops.createDataPerDay(data)

    spiral.startAngle = (((data[0].month - 1) / 12) * 360)

    // set the options for the spiral heatmap
    let heatmap = sh.spiralHeatmap()
        .radius(spiral.chartRadius)
        .holeRadiusProportion(0.05)
        .arcsPerCoil(12)
        .startAngle(spiral.startAngle)
        .coilPadding(0.05)

    // CREATE SVG AND A G PLACED IN THE CENTRE OF THE SVG
    const div = d3.select('#chart').append('div')

    const svg = div.append('svg')
        .attr('width', spiral.chartWidth + spiral.margin.left + spiral.margin.right)
        .attr('height', spiral.chartHeight + spiral.margin.top + spiral.margin.bottom)

    const g = svg.append('g')
        .attr('transform', 'translate(' +
            (spiral.margin.left + spiral.chartRadius) +
            ',' +
            (spiral.margin.top + spiral.chartRadius) + ')')

    g.datum(chartData)
        .call(heatmap)

    chart = g.selectAll('.arc')

    sh.arcs = chart.selectAll('path')
        .style('fill', (d, i) => colour(d.cnt))
        .style('opacity', '0')

    d3.selectAll('.arc-label').remove()

    sh.arcLabelsG = g.selectAll('.arc-label')
        .data(dateops.arcLabels)
        .enter()
        .append('g')
        .attr('class', 'arc-label')

    let dayAngle = 360 / 12

    sh.arcLabelsG
        .append('text')
        .text((d) => d.month)
        .attr('x', (d) => {
            let labelAngle = (d.start * dayAngle) + (30 / 2)
            let labelRadius = spiral.chartRadius + 20
            return spiral.x(labelAngle, labelRadius)
        })
        .attr('y', (d) => {
            let labelAngle = (d.start * dayAngle) + (30 / 2)
            let labelRadius = spiral.chartRadius + 20
            return spiral.y(labelAngle, labelRadius)
        })
        .style('text-anchor', function(d, i) {
            return i < dateops.arcLabels.length / 2 ? 'start' : 'end'
        })

    sh.arcLabelsG
        .append('line')
        .attr('class', 'arcLabelLine')
        .attr('x2', (d, i) => {
            let lineAngle = d.start * dayAngle
            let lineRadius = spiral.chartRadius + 40
            return spiral.x(lineAngle, lineRadius)
        })
        .attr('y2', (d, i) => {
            let lineAngle = d.start * dayAngle
            let lineRadius = spiral.chartRadius + 40
            return spiral.y(lineAngle, lineRadius)
        })

    sh.yearLabel = g.append('text')
        .text(chartData[0].date.getFullYear())
        .style('text-anchor', 'middle')
        .style('font-size', '20pt')
        .style('font-weight', 'bold')
        .attr('dy', 5)

    // DRAW LEGEND

    const legendWidth = 715
    const legendHeight = 20
    const legendPadding = 40

    const units = 'casos'

    var legendSVG = d3.select('#legend')
        .append('svg')
        .attr('width', legendWidth + legendPadding + legendPadding)
        .attr('height', legendHeight + legendPadding + legendPadding)

    var defs = legendSVG.append('defs')

    var legendGradient = defs.append('linearGradient')
        .attr('id', 'linear-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')

    let noOfSamples = 20
    let dataRange = colour.domain()[1] - colour.domain()[0]
    let stepSize = dataRange / noOfSamples

    for (let i = 0; i < noOfSamples; i++) {
        legendGradient.append('stop')
            .attr('offset', (i / (noOfSamples - 1)))
            .attr('stop-color', colour(colour.domain()[0] + (i * stepSize)))
    }

    var legendG = legendSVG.append('g')
        .attr('class', 'legendLinear')
        .attr('transform', 'translate(' + legendPadding + ',' + legendPadding + ')')

    legendG.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#linear-gradient)')

    legendG.append('text')
        .text('' + colour.domain()[0] + ' ' + units + '')
        .attr('x', 0)
        .attr('y', legendHeight - 35)
        .style('font-size', '16px')
        .style('font-weight', 'bold')

    legendG.append('text')
        .text('' + colour.domain()[1] + ' ' + units + '')
        .attr('x', legendWidth)
        .attr('y', legendHeight - 35)
        .style('text-anchor', 'end')
        .style('font-size', '16px')
        .style('font-weight', 'bold')

    let handle

    let x = d3.scaleTime()
        .domain([domainInit, domainEnd])
        .range([0, svgops.width])
        .clamp(true)
    let slider = svgops.svg.append('g')
        .attr('class', 'slider')
        .attr('transform', 'translate(' + svgops.marg.left + ',' + svgops.height / 2 + ')')
    slider.append('line')
        .attr('class', 'track')
        .attr('x1', x.range()[0])
        .attr('x2', x.range()[1])
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)) })
        .attr('class', 'track-inset')
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)) })
        .attr('class', 'track-overlay')
        .call(d3.drag()
            .on('start.interrupt', () => slider.interrupt())
            .on('start drag', function() {
                if (animated) playPause()
                handle.transition()
                    .ease(d3.easeCubic)
                    .duration(2 * Math.abs(d3.event.x - handle.attr('cx')))
                    .attr('cx', Math.min(svgops.width, Math.max(0, d3.event.x)))
                    .tween('attr.fill', function() {
                        var node = this
                        return (t) => hue(x.invert(node.getAttribute('cx')))
                    })
            }))
    slider.insert('g', '.track-overlay')
        .attr('class', 'ticks')
        .attr('transform', 'translate(0,' + 18 + ')')
        .selectAll('text')
        .data(x.ticks(10))
        .enter().append('text')
        .attr('x', x)
        .attr('text-anchor', 'middle')
        .text((d) => d.getFullYear())
    handle = slider.insert('circle', '.track-overlay')
        .attr('class', 'handle')
        .attr('r', 9)
        .attr('cx', 0)

    d3.interval((elapsed) => {
        if (animated) {
            // console.log(handle.attr("cx"))
            handle.attr('cx', Math.min(+handle.attr('cx') + 1, svgops.width))
            hue(x.invert(handle.attr('cx')))
        }
    }, 30)

    let hue = (h) => {
        let year = h.getFullYear()
        let month = h.getMonth()
        // searchLoop:
        for (let index = 0; index < chartData.length; index++) {
            if (year === chartData[index].year) {
                if (month === chartData[index].month) {
                    chart.selectAll('path').filter(function(d) { return +this.id <= index }).style('opacity', '1')
                        .on('mouseover', function(d) {
                            if (this.style.opacity === '1') {
                                let locale = 'es-pa'
                                let monthName = d.date.toLocaleString(locale, { month: 'long' })

                                tt.div.html(nuop.formatNumber(d.cnt / dateops.cntRata) + ' casos en <br> ' +
                                        (monthName) + ' de ' + d.date.getFullYear() + '<br/>')
                                    .style('left', (d3.event.pageX) + 'px')
                                    .style('top', (d3.event.pageY - 28) + 'px')
                                    .style('background-color', '#F7F5F5')
                                    .style('text-align', 'center')
                                    .style('font-size', '12pt')
                                    .style('font-weight', 'bold')
                                    .style("width", "150px")
                                    .style("height", calops.height)

                                calops.calendar('.tooltip', d.date, fdata)

                                tt.div.transition()
                                    .duration(200)
                                    .style('opacity', 1)
                            }
                        })
                    chart.selectAll('path').filter(function(d) { return +this.id > index })
                        .style('opacity', '0')
                        .on('mouseout', function(d) {
                            tt.div.transition()
                                .duration(900)
                                .style('opacity', 0)
                        })
                    break
                }
            } else {
                index += 11
            }
            sh.yearLabel.text(year)
        }
    }
})()