/* global d3 */

import { SvgOps } from './models/svgOps.js'
import { Mooc } from '../data/mooc.js'

// Header for the HTML body that D3 uses
let wh = 900
let width = wh
let dy = width / 6
let dx = 30
let diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
let margin = ({ top: 10, right: 120, bottom: 10, left: 200 })
let svgo = new SvgOps()
svgo.appendSVG()

let svg = svgo.svg
  .attr('height', dx)
  .attr('viewBox', [-margin.left, -margin.top, width, dx])
  .style('font', '10px sans-serif')
  .style('user-select', 'none')
  .style('padding', '10px')
  .style('font', '10px sans-serif')

let chart = (data) => {
// group 1
  let theR = d3.scaleSqrt()
    .domain([9728, 447752])
    .range([4, 15])

  let minCompleted = 13895
  let maxCompleted = 113841

  let theRcompleted = d3.scaleSqrt()
    .domain([minCompleted, maxCompleted])
    .range([4, 15])

  let tree = d3.tree().nodeSize([dx, dy])

  const root = d3.hierarchy(data)

  root.x0 = dy / 2
  root.y0 = 0
  root.descendants().forEach((d, i) => {
    d.id = i
    d._children = d.children
    if (d.depth && d.data.name.length !== 7) d.children = null
  })

  const gLink = svg.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)

  const gNode = svg.append('g')
    .attr('cursor', 'pointer')

  function update (source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250
    const nodes = root.descendants().reverse()
    const links = root.links()

    // Compute the new tree layout.
    tree(root)

    let left = root
    let right = root
    root.eachBefore(node => {
      if (node.x < left.x) left = node
      if (node.x > right.x) right = node
    })

    const height = right.x - left.x + margin.top + margin.bottom

    const transition = svg.transition()
      .duration(duration)
      .attr('height', height)
      .attr('viewBox', [-margin.left, left.x - margin.top, width, height])
      .tween('resize', window.ResizeObserver ? null : () => () => svg.dispatch('toggle'))

    // Update the nodes…
    const node = gNode.selectAll('g')
      .data(nodes, d => d.id)

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append('g')
      .attr('transform', d => `translate(${source.y0},${source.x0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .on('click', d => {
        d.children = d.children ? null : d._children
        update(d)
      })

    nodeEnter.append('circle')
      .attr('r', d => {
        if (d.data.size !== undefined && d.data.size !== 1) {
          return theR(d.data.size)
        }
        if (d._children !== undefined && d._children[0] !== undefined && d._children[0].data['name'] === 'completed') {
          return theRcompleted(d._children[0].data['size'])
        } else {
          return 4
        }
      })
      .attr('fill', d => {
        {
          if (d._children !== undefined && d._children[0] !== undefined && d._children[0].data['name'] === 'completed') {
            if (d._children[0].data['size'] / maxCompleted >= .50)
              return '#00B200'
            else
              return d._children ? '#555' : '#999'
          } else {
            return d._children ? '#555' : '#999'
          }
        }
      })

    nodeEnter.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d._children ? -6 : 6)
      .attr('text-anchor', d => d._children ? 'end' : 'start')
      .text(d => d.data.name.substring(0, 15).concat(' ', '...'))
      .clone(true).lower()
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .attr('stroke', 'white')

    nodeEnter.append('title').text(d => d.data.name)

    // Transition nodes to their new position.
    // const nodeUpdate =
    node.merge(nodeEnter).transition(transition)
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1)

    // Transition exiting nodes to the parent's new position.
    // const nodeExit =
    node.exit().transition(transition).remove()
      .attr('transform', d => `translate(${source.y},${source.x})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)

    // Update the links…
    const link = gLink.selectAll('path')
      .data(links, d => d.target.id)

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append('path')
      .attr('d', d => {
        const o = { x: source.x0, y: source.y0 }
        return diagonal({ source: o, target: o })
      })

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
      .attr('d', diagonal)

    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
      .attr('d', d => {
        const o = { x: source.x, y: source.y }
        return diagonal({ source: o, target: o })
      })

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  update(root)
}

let rawDS = Mooc();

(async function read () {
  let data = await rawDS

  chart(data)
})()
