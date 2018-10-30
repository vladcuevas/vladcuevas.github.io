/* global d3, forceInABox */
import { Reader } from './models/reader.js'
import { Tooltip } from './models/tooltip.js'
import { BarChart } from './models/barChart.js'
let reader = new Reader('data/nodeslinks.json')
let tt = new Tooltip()

let useGroupInABox = false

let drawTemplate = false

let template = 'force'

d3.select('#checkGroupInABox').property('checked', useGroupInABox)
d3.select('#checkShowTreemap').property('checked', drawTemplate)
d3.select('#selectTemplate').property('value', template)

let width = 700

let height = 500

let color = d3.scaleOrdinal(d3.schemeCategory10)

let force = d3.forceSimulation()
  .force('charge', d3.forceManyBody())
  .force('x', d3.forceX(width / 2).strength(0.05))
  .force('y', d3.forceY(height / 2).strength(0.05))

let svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  // .style('position', 'relative')
  // .style('left', '50%')
  // .style('-webkit-transform','translateX(-50%)')
  // .style('-ms-transform','translateX(-50%)')
  // .style('transform','translateX(-50%)')

let g = svg.append('g')
  .attr('class', 'everything')

// add zoom capabilities
var zoomHandler = d3.zoom()
  .on('zoom', zoomActions)

zoomHandler(g)

// Zoom functions
function zoomActions () {
  g.attr('transform', d3.event.transform)
}

let rawDS = reader.JSON();

(async function read () {
  const graph = await rawDS

  let min = 3
  let max = 15

  // group 1
  let rGender = d3.scaleSqrt()
    .domain([19375, 122217])
    .range([min, max])
  // group 2
  let rDepartment = d3.scaleSqrt()
    .domain([71, 23210])
    .range([min, max])
  // group 3
  let rAge = d3.scaleSqrt()
    .domain([97, 85290])
    .range([min, max])
  // group 3
  let rZone = d3.scaleSqrt()
    .domain([18219, 123372])
    .range([min, max])

  let groupingForce = forceInABox()
    .strength(0.2) // Strength to foci
    .template(template) // Either treemap or force
    .groupBy('group') // Node attribute to group
    .links(graph.links) // The graph links. Must be called after setting the grouping attribute
    .enableGrouping(useGroupInABox)
    .nodeSize(4)
    .linkStrengthIntraCluster(0.01)
    .size([width, height]) // Size of the chart
    .checkLinksByID(true)
  force
    .nodes(graph.nodes)
    .force('group', groupingForce)
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink(graph.links)
      .distance(10)
      .strength(groupingForce.getLinkStrength)
    )

  let link = g.selectAll('.link')
    .data(graph.links)
    .enter().append('line')
    .attr('class', 'link')
    .style('stroke-width', d => Math.sqrt(d.value))

  let node = g.selectAll('.node')
    .data(graph.nodes)
    .enter().append('circle')
    .attr('class', 'node')
    .attr('r', d => {
      if (d.group === 1) return rGender(d.count)
      if (d.group === 2) return rDepartment(d.count)
      if (d.group === 3) return rAge(d.count)
      if (d.group === 4) return rZone(d.count)
    })
    .style('fill', d => color(d.group))
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))

  node.append('title')
    .text(function (d) { return d.name })

  force.on('tick', function () {
    link.attr('x1', function (d) { return d.source.x })
      .attr('y1', function (d) { return d.source.y })
      .attr('x2', function (d) { return d.target.x })
      .attr('y2', function (d) { return d.target.y })

    node.attr('cx', function (d) { return d.x })
      .attr('cy', function (d) { return d.y })
  })

  d3.select('#checkGroupInABox').on('change', onCheckGroupInABox)

  d3.select('#selectTemplate').on('change', function () {
    template = d3.select('#selectTemplate').property('value')
    force.stop()
    force.force('group').template(template)
    force.alphaTarget(0.5).restart()
  })

  d3.select('#checkShowTreemap').on('change', function () {
    drawTemplate = d3.select('#checkShowTreemap').property('checked')
    if (drawTemplate) {
      force.force('group').drawTemplate(g)
    } else {
      force.force('group').deleteTemplate(g)
    }
  })

  let nodesByName = d3.nest()
    .key(function (d) { return d.groupName })
    .key(function (d) { return d.group })
    .entries(graph.nodes)

  let legendRectSize = 15

  let legend = svg.selectAll('.legend')
    .data(nodesByName)
    .enter()
    .append('g')
    .attrs({
      class: (d) => 'legend' + d.key.replace(/\s/gi, ''),
      transform: (d, i) => {
        // Just a calculation for x & y position
        return 'translate(' + ((i * (width / nodesByName.length)) + 10) + ',' + 10 + ')'
      }
    })

  legend.append('rect')
    .attrs({
      class: 'dotLegend',
      width: legendRectSize,
      height: legendRectSize,
      rx: 10,
      ry: 10
    })
    .style('fill', d => color(+d.values[0].key))

  legend.append('text')
    .attrs({
      x: 17,
      y: 13,
      class: 'dotText'
    })
    .text(function (d) {
      return d.key
    }).styles({
      fill: d => color(+d.values[0].key),
      'font-size': '14px',
      'text-shadow': '1px 1px 2px #CACACA'
    })

  function showTT (d, theThis) {
    let bChart = new BarChart()
    let bChartHeight = 150
    let bChartWidth = 150

    if (theThis.style.opacity === '1') {
      // let locale = 'es-pa'

      tt.div.html('')
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
        .style('background-color', '#F7F5F5')
        .style('height', bChartHeight)

      bChart.graph('.tooltip', bChartHeight, bChartWidth, d.values[0].values, color(+d.values[0].key))

      tt.div.transition()
        .duration(200)
        .style('opacity', 1)
    }
  }

  legend.selectAll('.dotText').filter(function () { return this.className.baseVal }).style('opacity', '1')
    .on('mouseover', function (d) {
      showTT(d, this)
    })

  legend.selectAll('.dotLegend').filter(function () { return this.className.baseVal }).style('opacity', '1')
    .on('mouseover', function (d) {
      showTT(d, this)
    })

  legend.filter(function () { return this.className.baseVal })
    .on('mouseout', function () {
      tt.div.transition()
        .duration(900)
        .style('opacity', 0)
    })

  setTimeout(function () {
    d3.select('#checkGroupInABox').property('checked', true)
    onCheckGroupInABox()
  }, 2000)
})()

function dragstarted (d) {
  if (!d3.event.active) force.alphaTarget(0.3).restart()
  d.fx = d.x
  d.fy = d.y
}

function dragged (d) {
  d.fx = d3.event.x
  d.fy = d3.event.y
}

function dragended (d) {
  if (!d3.event.active) force.alphaTarget(0)
  d.fx = null
  d.fy = null
}

function onCheckGroupInABox () {
  force.stop()
  useGroupInABox = d3.select('#checkGroupInABox').property('checked')
  force.force('group').enableGrouping(useGroupInABox)

  force.alphaTarget(0.5).restart()
}
