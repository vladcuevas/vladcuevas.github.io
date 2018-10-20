export class SvgOps {
  constructor (_) {
    this.svg = d3.select(_)
    this.marg = { right: 50, left: 50 }
    this.width = +this.svg.attr('width') - this.marg.left - this.marg.right
    this.height = +this.svg.attr('height')
  }
}
