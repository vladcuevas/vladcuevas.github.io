/* global d3 */

export class Tooltip {
  constructor (theDate) {
    // Define the div for the tooltip
    this.theDate = theDate
    this.div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
  }
}
