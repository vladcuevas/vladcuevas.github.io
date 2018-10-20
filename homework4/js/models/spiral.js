export class Spiral {
  constructor () {
    this.radians = 0.0174532925
    this.chartWidth = 750
    this.chartHeight = this.chartWidth
    this.chartRadius = this.chartWidth / 2
    this.margin = { 'top': 40, 'bottom': 40, 'left': 40, 'right': 40 }

    // All options that are accessible to caller
    // Default values
    this.radius = 250
    this.holeRadiusProportion = 0.3 // proportion of radius
    this.arcsPerCoil = 12 // assuming months per year
    this.coilPadding = 0 // no padding
    this.arcLabel = '' // no labels
    this.coilLabel = '' // no labels
    this.startAngle = 0

    this.arcAngle = 360 / this.arcsPerCoil
    this.labelRadius = this.radius + 20
  }

  x (angle, radius) {
    // change to clockwise
    let a = 360 - angle
    // start from 12 o'clock
    a = a + 180 - this.startAngle
    return radius * Math.sin(a * this.radians)
  }

  y (angle, radius) {
    // change to clockwise
    let a = 360 - angle
    // start from 12 o'clock
    a = a + 180 - this.startAngle
    return radius * Math.cos(a * this.radians)
  }
}
