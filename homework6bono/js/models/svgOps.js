/* global d3 */

export class SvgOps {
  constructor (
    arg = {},
    _ = arg._ === undefined ? 'body' : arg._,
    append = arg.append === undefined ? 'svg' : arg.append,
    margin = arg.margin === undefined ? { top: 20, right: 20, bottom: 30, left: 40 } : arg.margin,
    w = arg.w === undefined ? (960 - margin.left - margin.right) : arg.w,
    h = arg.h === undefined ? 500 - margin.top - margin.bottom : arg.h
  ) {
    this.margin = margin
    this.w = w
    this.h = h
    this.svg = d3.select(_)
    this.append = append
    this.allmargin = +margin.left + margin.right + margin.top + margin.bottom
    this.radio = +this.w + this.margin.left + this.margin.right
    // this.radioAndMargin = (+this.radio / 2) - (+this.allmargin / 2)
  }

  appendToSVG () {
    this.svg = this.svg.append(this.append).merge(this.svg)
      .attr('width', this.w + this.margin.left + this.margin.right)
      .attr('height', this.h + this.margin.top + this.margin.bottom)
      .append('g')
  }

  appendPlainSVG () {
    this.svg = this.svg.append(this.append).merge(this.svg)
  }

  appendSVGWStyle () {
    this.svg = this.svg.append(this.append).merge(this.svg)
      .style('width', '100%')
      .style('height', 'auto')
      .style('padding', '10px')
      .style('box-sizing', 'border-box')
      .style('font', '10px sans-serif')
  }

  appendSVG () {
    this.svg = this.svg.append(this.append).merge(this.svg)
      .attr('width', this.w + this.margin.left + this.margin.right)
      .attr('height', this.h + this.margin.top + this.margin.bottom)
  }

  transformSVG () {
    this.svg = this.svg.attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
  }

  transformSVGRadial () {
    this.svg = this.svg.attr('transform', 'translate(' + (this.radio / 2) + ',' + this.radio / 2 + ')')
  }

  appendG () {
    this.svg = this.svg.append('g').merge(this.svg)
  }

  overflow () {
    this.svg = this.svg.style('overflow', 'auto')
  }
}
