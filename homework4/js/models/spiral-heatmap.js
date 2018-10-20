import { Spiral } from './spiral.js'
// SVG dimensions
const spiral = new Spiral()

// A spiral heatmap
// The following options are available
// radius: radius of the overall plot, not including any labels. Default 250
// holeRadiusProportion: the proportion (0 to 1) of the radius (see above) that is left as a hole. Default 0.
// arcsPerCoil: a 'coil' is one revolution of the spiral.  This sets how many arcs (or arcs) you want per coil. Typically this would
//                  be set according to the periodicity of the data. For example, 12 for months per year, 24 for hours per day, etc
// coilPadding: the proportion (0 to 1) of the coil width that is used for padding between coils. Useful for making the spiral very noticeable
// arcLabel: the field name to use for the labels around the circumference
// coilLabel: the field name to use for the labels at the beginning of each coil

// constants

export class SpiralHeatmap {
  constructor () {
    this.arcs
    this.yearLabel
    this.arcLabelsG
  }

  static updatePathData (data) {
    let holeRadius = spiral.radius * spiral.holeRadiusProportion
    spiral.arcAngle = 360 / spiral.arcsPerCoil
    let dataLength = data.length
    let coils = Math.ceil(dataLength / spiral.arcsPerCoil) // number of coils, based on data.length / arcsPerCoil
    let coilWidth = spiral.chartRadius * (1 - spiral.holeRadiusProportion) / (coils + 1) // remaining chartRadius (after holeRadius removed), divided by coils + 1. I add 1 as the end of the coil moves out by 1 each time

    data.forEach(function (d, i) {
      let coil = Math.floor(i / spiral.arcsPerCoil)
      let position = i - coil * spiral.arcsPerCoil
      let startAngle = position * spiral.arcAngle
      let endAngle = (position + 1) * spiral.arcAngle
      let startInnerRadius = holeRadius + i / spiral.arcsPerCoil * coilWidth
      let startOuterRadius = holeRadius + i / spiral.arcsPerCoil * coilWidth + coilWidth *
                (1 - spiral.coilPadding)
      let endInnerRadius = holeRadius + (i + 1) / spiral.arcsPerCoil * coilWidth
      let endOuterRadius =
                holeRadius +
                (i + 1) / spiral.arcsPerCoil * coilWidth +
                coilWidth * (1 - spiral.coilPadding)

      // vertices of each arc
      d.x1 = spiral.x(startAngle, startInnerRadius)
      d.y1 = spiral.y(startAngle, startInnerRadius)
      d.x2 = spiral.x(endAngle, endInnerRadius)
      d.y2 = spiral.y(endAngle, endInnerRadius)
      d.x3 = spiral.x(endAngle, endOuterRadius)
      d.y3 = spiral.y(endAngle, endOuterRadius)
      d.x4 = spiral.x(startAngle, startOuterRadius)
      d.y4 = spiral.y(startAngle, startOuterRadius)

      // CURVE CONTROL POINTS
      let midAngle = startAngle + spiral.arcAngle / 2
      let midInnerRadius =
                holeRadius + (i + 0.5) / spiral.arcsPerCoil * coilWidth
      let midOuterRadius =
                holeRadius +
                (i + 0.5) / spiral.arcsPerCoil * coilWidth +
                coilWidth * (1 - spiral.coilPadding)

      // MID POINTS, WHERE THE CURVE WILL PASS THRU
      d.mid1x = spiral.x(midAngle, midInnerRadius)
      d.mid1y = spiral.y(midAngle, midInnerRadius)
      d.mid2x = spiral.x(midAngle, midOuterRadius)
      d.mid2y = spiral.y(midAngle, midOuterRadius)

      d.controlPoint1x = (d.mid1x - 0.25 * d.x1 - 0.25 * d.x2) / 0.5
      d.controlPoint1y = (d.mid1y - 0.25 * d.y1 - 0.25 * d.y2) / 0.5
      d.controlPoint2x = (d.mid2x - 0.25 * d.x3 - 0.25 * d.x4) / 0.5
      d.controlPoint2y = (d.mid2y - 0.25 * d.y3 - 0.25 * d.y4) / 0.5

      d.arcNumber = position
      d.coilNumber = coil
    })

    return data
  }

  spiralHeatmap () {
    function chart (selection) {
      selection.each(function (data) {
        var arcLabelsArray = []

        for (var i = 0; i < spiral.arcsPerCoil; i++) {
          arcLabelsArray.push(i)
        }

        // Create/update the x/y coordinates for the vertices and control points for the paths
        // Stores the x/y coordinates on the data
        SpiralHeatmap.updatePathData(data)

        let thisSelection = d3
          .select(this)
          .append('g')
          .attr('class', 'spiral-heatmap')

        this.arcLabelsG = thisSelection
          .selectAll('.arc-label')
          .data(arcLabelsArray)
          .enter()
          .append('g')
          .attr('class', 'arc-label')

        this.arcLabelsG
          .append('text')
          .text((d) => data[d][spiral.arcLabel])
          .attr('x', (d, i) => {
            let labelAngle = i * spiral.arcAngle + spiral.arcAngle / 2
            return spiral.x(labelAngle, spiral.labelRadius)
          })
          .attr('y', (d, i) => {
            let labelAngle = i * spiral.arcAngle + spiral.arcAngle / 2
            return spiral.y(labelAngle, spiral.labelRadius)
          })
          .style('text-anchor', (d, i) => i < arcLabelsArray.length / 2 ? 'start' : 'end')

        this.arcLabelsG
          .append('line')
          .attr('x2', (d, i) => {
            let lineAngle = i * spiral.arcAngle
            let lineRadius = spiral.chartRadius + 10
            return spiral.x(lineAngle, lineRadius)
          })
          .attr('y2', (d, i) => {
            let lineAngle = i * spiral.arcAngle
            let lineRadius = spiral.chartRadius + 10
            return spiral.y(lineAngle, lineRadius)
          })

        this.arcs = thisSelection
          .selectAll('.arc')
          .data(data)
          .enter()
          .append('g')
          .attr('class', 'arc')

        this.arcs.append('path').attr('d', (d, i) => {
          // start at vertice 1
          let start = 'M ' + d.x1 + ' ' + d.y1
          // inner curve to vertice 2
          let side1 =
                            ' Q ' +
                            d.controlPoint1x +
                            ' ' +
                            d.controlPoint1y +
                            ' ' +
                            d.x2 +
                            ' ' +
                            d.y2
          // straight line to vertice 3
          let side2 = 'L ' + d.x3 + ' ' + d.y3
          // outer curve vertice 4
          let side3 =
                            ' Q ' +
                            d.controlPoint2x +
                            ' ' +
                            d.controlPoint2y +
                            ' ' +
                            d.x4 +
                            ' ' +
                            d.y4
          // combine into string, with closure (Z) to vertice 1
          return start + ' ' + side1 + ' ' + side2 + ' ' + side3 + ' Z'
        })
          .attr('id', (d, i) => '' + i)
      })
    }

    chart.radius = function (value) {
      if (!arguments.length) return spiral.radius
      spiral.radius = value
      return chart
    }

    chart.holeRadiusProportion = function (value) {
      if (!arguments.length) return spiral.holeRadiusProportion
      spiral.holeRadiusProportion = value
      return chart
    }

    chart.arcsPerCoil = function (value) {
      if (!arguments.length) return spiral.arcsPerCoil
      spiral.arcsPerCoil = value
      return chart
    }

    chart.coilPadding = function (value) {
      if (!arguments.length) return spiral.coilPadding
      spiral.coilPadding = value
      return chart
    }

    chart.arcLabel = function (value) {
      if (!arguments.length) return spiral.arcLabel
      spiral.arcLabel = value
      return chart
    }

    chart.coilLabel = function (value) {
      if (!arguments.length) return spiral.coilLabel
      spiral.coilLabel = value
      return chart
    }

    chart.startAngle = function (value) {
      if (!arguments.length) return spiral.startAngle
      spiral.startAngle = value
      return chart
    }

    return chart
  }
}
