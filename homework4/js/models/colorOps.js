export class ColorOps {
  constructor () {
    this.color = d3.scaleSequential(d3.interpolatePiYG).domain([-0.05, 0.05])
  }

  fn () {
    return 0
  }
}
