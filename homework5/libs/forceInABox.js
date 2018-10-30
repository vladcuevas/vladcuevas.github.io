/* global d3 */

function forceInABox () {
  function index (d) {
    return d.index
  }

  let id = index

  let nodes

  let links
  // needed for the force version

  let tree

  let size = [100, 100]

  let nodeSize = 1
  // The expected node size used for computing the cluster node

  let forceCharge = -2

  let foci = {}

  // oldStart = force.start,

  let linkStrengthIntraCluster = 0.1

  let linkStrengthInterCluster = 0.01

  // oldGravity = force.gravity(),

  let templateNodes = []

  let offset = [0, 0]

  let templateForce

  let templateNodesSel

  let groupBy = function (d) { return d.cluster }

  let template = 'treemap'

  let enableGrouping = true

  let strength = 0.1

  let checkLinksByID = false
  // showingTemplate = false;

  function force (alpha) {
    if (!enableGrouping) {
      return force
    }
    if (template === 'force') {
      // Do the tick of the template force and get the new focis
      templateForce.tick()
      getFocisFromTemplate()
    }

    for (let i = 0, n = nodes.length, node, k = alpha * strength; i < n; ++i) {
      node = nodes[i]
      node.vx += (foci[groupBy(node)].x - node.x) * k
      node.vy += (foci[groupBy(node)].y - node.y) * k
    }
  }

  function initialize () {
    if (!nodes) return

    if (template === 'treemap') {
      initializeWithTreemap()
    } else {
      initializeWithForce()
    }
  }

  force.initialize = function (_) {
    nodes = _
    initialize()
  }

  function getLinkKey (l) {
    let sourceID = groupBy(l.source)

    let targetID = groupBy(l.target)

    return sourceID <= targetID
      ? sourceID + '~' + targetID
      : targetID + '~' + sourceID
  }

  function computeClustersNodeCounts (nodes) {
    let clustersCounts = d3.map()

    nodes.forEach(function (d) {
      if (!clustersCounts.has(groupBy(d))) {
        clustersCounts.set(groupBy(d), 0)
      }
    })

    nodes.forEach(function (d) {
      clustersCounts.set(groupBy(d), clustersCounts.get(groupBy(d)) + 1)
    })

    return clustersCounts
  }

  // Returns
  function computeClustersLinkCounts (links) {
    let dClusterLinks = d3.map()

    let clusterLinks = []
    links.forEach(function (l) {
      let key = getLinkKey(l); let count
      if (dClusterLinks.has(key)) {
        count = dClusterLinks.get(key)
      } else {
        count = 0
      }
      count += 1
      dClusterLinks.set(key, count)
    })

    dClusterLinks.entries().forEach(function (d) {
      let source, target
      source = d.key.split('~')[0]
      target = d.key.split('~')[1]
      if (source !== undefined && target !== undefined) {
        clusterLinks.push({
          'source': source,
          'target': target,
          'count': d.value
        })
      }
    })
    return clusterLinks
  }

  // Returns the metagraph of the clusters
  function getGroupsGraph () {
    let gnodes = []

    let glinks = []

    let dNodes = d3.map()

    let clustersList

    let c; let i; let size

    let clustersCounts

    let clustersLinks

    clustersCounts = computeClustersNodeCounts(nodes)
    clustersLinks = computeClustersLinkCounts(links)

    // map.keys() is really slow, it's crucial to have it outside the loop
    clustersList = clustersCounts.keys()
    for (i = 0; i < clustersList.length; i += 1) {
      c = clustersList[i]
      size = clustersCounts.get(c)
      gnodes.push({ id: c, size: size })
      dNodes.set(c, i)
    }

    clustersLinks.forEach(function (l) {
      let source = dNodes.get(l.source)
      let target = dNodes.get(l.target)
      if (source !== undefined && target !== undefined) {
        glinks.push({
          'source': source,
          'target': target,
          'count': l.count
        })
      } else {
        // console.log("Force in a box error, couldn't find the link source or target on the list of nodes")
      }
    })

    return { nodes: gnodes, links: glinks }
  }

  function getGroupsTree () {
    let children = []

    let totalSize = 0

    let clustersList

    let c; let i; let size; let clustersCounts

    clustersCounts = computeClustersNodeCounts(force.nodes())

    // map.keys() is really slow, it's crucial to have it outside the loop
    clustersList = clustersCounts.keys()
    for (i = 0; i < clustersList.length; i += 1) {
      c = clustersList[i]
      size = clustersCounts.get(c)
      children.push({ id: c, size: size })
      totalSize += size
    }
    return { id: 'clustersTree', children: children }
  }

  function getFocisFromTemplate () {
    // compute foci
    foci.none = { x: 0, y: 0 }
    templateNodes.forEach(function (d) {
      if (template === 'treemap') {
        foci[d.data.id] = {
          x: (d.x0 + (d.x1 - d.x0) / 2) - offset[0],
          y: (d.y0 + (d.y1 - d.y0) / 2) - offset[1]
        }
      } else {
        foci[d.id] = { x: d.x - offset[0], y: d.y - offset[1] }
      }
    })
  }
  function initializeWithTreemap () {
    let treemap = d3.treemap()
      .size(force.size())

    tree = d3.hierarchy(getGroupsTree())
      // .sort(function (p, q) { return d3.ascending(p.size, q.size); })
      // .count()
      .sum(function (d) { return d.size })
      .sort(function (a, b) {
        return b.height - a.height || b.value - a.value
      })

    templateNodes = treemap(tree).leaves()

    getFocisFromTemplate()
  }

  function checkLinksAsObjects () {
    // Check if links come in the format of indexes instead of objects
    let linkCount = 0
    if (nodes.length === 0) return

    links.forEach(function (link) {
      let source, target
      if (!nodes) return
      source = link.source
      target = link.target
      if (checkLinksByID === true) {
        if (typeof link.source !== 'object') nodes.forEach(node => { if (node.name === link.source) source = node })
        if (typeof link.target !== 'object') nodes.forEach(node => { if (node.name === link.target) target = node })
      } else {
        if (typeof link.source !== 'object') source = nodes[link.source]
        if (typeof link.target !== 'object') target = nodes[link.target]
      }
      if (source === undefined || target === undefined) {
        // console.log(link)
        throw Error('Error setting links, couldn\'t find nodes for a link (see it on the console)')
      }
      link.source = source; link.target = target
      link.index = linkCount++
    })
  }

  function initializeWithForce () {
    let net

    if (nodes && nodes.length > 0) {
      if (groupBy(nodes[0]) === undefined) {
        throw Error('Couldn\'t find the grouping attribute for the nodes. Make sure to set it up with forceInABox.groupBy(\'attr\') before calling .links()')
      }
    }

    checkLinksAsObjects()

    net = getGroupsGraph()
    templateForce = d3.forceSimulation(net.nodes)
      .force('x', d3.forceX(size[0] / 2).strength(0.5))
      .force('y', d3.forceY(size[1] / 2).strength(0.5))
      .force('collide', d3.forceCollide(function (d) { return d.size * nodeSize }))
      .force('charge', d3.forceManyBody().strength(function (d) { return forceCharge * d.size }))
      .force('links', d3.forceLink(!net.nodes ? net.links : []))

    templateNodes = templateForce.nodes()

    getFocisFromTemplate()
  }

  function drawTreemap (container) {
    container.selectAll('.cell').remove()
    container.selectAll('cell')
      .data(templateNodes)
      .enter().append('svg:rect')
      .attr('class', 'cell')
      .attr('x', function (d) { return d.x0 })
      .attr('y', function (d) { return d.y0 })
      .attr('width', function (d) { return d.x1 - d.x0 })
      .attr('height', function (d) { return d.y1 - d.y0 })
  }

  function drawGraph (container) {
    container.selectAll('.cell').remove()
    templateNodesSel = container.selectAll('cell')
      .data(templateNodes)
    templateNodesSel
      .enter().append('svg:circle')
      .attr('class', 'cell')
      .attr('cx', function (d) { return d.x })
      .attr('cy', function (d) { return d.y })
      .attr('r', function (d) { return d.size * nodeSize })
  }

  force.drawTemplate = function (container) {
    // showingTemplate = true;
    if (template === 'treemap') {
      drawTreemap(container)
    } else {
      drawGraph(container)
    }
    return force
  }

  // Backwards compatibility
  force.drawTreemap = force.drawTemplate

  force.deleteTemplate = function (container) {
    // showingTemplate = false;
    container.selectAll('.cell').remove()

    return force
  }

  force.template = function (x) {
    if (!arguments.length) return template
    template = x
    initialize()
    return force
  }

  force.groupBy = function (x) {
    if (!arguments.length) return groupBy
    if (typeof x === 'string') {
      groupBy = function (d) { return d[x] }
      return force
    }
    groupBy = x
    return force
  }

  force.enableGrouping = function (x) {
    if (!arguments.length) return enableGrouping
    enableGrouping = x
    // update();
    return force
  }

  force.strength = function (x) {
    if (!arguments.length) return strength
    strength = x
    return force
  }

  force.checkLinksByID = function (x) {
    if (!arguments.length) return checkLinksByID
    checkLinksByID = x
    return force
  }

  force.getLinkStrength = function (e) {
    if (enableGrouping) {
      if (groupBy(e.source) === groupBy(e.target)) {
        if (typeof (linkStrengthIntraCluster) === 'function') {
          return linkStrengthIntraCluster(e)
        } else {
          return linkStrengthIntraCluster
        }
      } else {
        if (typeof (linkStrengthInterCluster) === 'function') {
          return linkStrengthInterCluster(e)
        } else {
          return linkStrengthInterCluster
        }
      }
    } else {
      // Not grouping return the intracluster
      if (typeof (linkStrengthIntraCluster) === 'function') {
        return linkStrengthIntraCluster(e)
      } else {
        return linkStrengthIntraCluster
      }
    }
  }

  force.id = function (_) {
    return arguments.length ? (id = _, force) : id
  }

  force.size = function (_) {
    return arguments.length ? (size = _, force) : size
  }

  force.linkStrengthInterCluster = function (_) {
    return arguments.length ? (linkStrengthInterCluster = _, force) : linkStrengthInterCluster
  }

  force.linkStrengthIntraCluster = function (_) {
    return arguments.length ? (linkStrengthIntraCluster = _, force) : linkStrengthIntraCluster
  }

  force.nodes = function (_) {
    return arguments.length ? (nodes = _, force) : nodes
  }

  force.links = function (_) {
    if (!arguments.length) { return links }
    if (_ === null) links = []
    else links = _
    return force
  }

  force.nodeSize = function (_) {
    return arguments.length ? (nodeSize = _, force) : nodeSize
  }

  force.forceCharge = function (_) {
    return arguments.length ? (forceCharge = _, force) : forceCharge
  }

  force.offset = function (_) {
    return arguments.length ? (offset = _, force) : offset
  }

  return force
}

// module.exports = forceInABox;
