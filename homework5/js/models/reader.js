/* global d3 */

import { DateOperations } from './dateoperations.js'

export class Reader {
  constructor (path) {
    this.path = path
  }

  csv () {
    let rawDS = d3.csv(this.path, function (d) {
      return {
        year: +d['year'],
        month: +d['month'],
        day: +d['day'],
        cnt: +d['cnt']
      }
    })

    return rawDS
  }

  readStatesCSV () {
    let rawDS = d3.csv(this.path,
      function (d) {
        return {
          State: d['State'],
          'Under 5 Years': +d['Under 5 Years'],
          '5 to 13 Years': +d['5 to 13 Years'],
          '14 to 17 Years': +d['14 to 17 Years'],
          '18 to 24 Years': +d['18 to 24 Years'],
          '25 to 44 Years': +d['25 to 44 Years'],
          '45 to 64 Years': +d['45 to 64 Years'],
          '65 Years and Over': +d['65 Years and Over']
        }
      }
    )
    return rawDS
  }

  plainCSV (f) {
    let rawDS = d3.csv(this.path, f)

    return rawDS
  }

  tsv () {
    let rawDS = d3.tsv(this.path, function (d) {
      let dateops = new DateOperations()
      let f = dateops.DateFormatPol(d['fecha'])
      // console.log('reading')
      return {
        year: +f.getFullYear(),
        month: +f.getMonth() + 1,
        day: +f.getDate(),
        cnt: +d['cnt']
      }
    })

    return rawDS
  }

  longTsv () {
    let rawDS = d3.tsv(this.path, function (d) {
      // console.log('reading')
      let dateops = new DateOperations()
      let f = dateops.DateFormatPol(d['fecha'])
      return {
        date: f,
        value: +d['cnt']
      }
    })

    return rawDS
  }

  plainTSV (f) {
    let rawDS = d3.tsv(this.path, f)
    return rawDS
  }

  _tsv () {
    let rawDS = d3.tsv(this.path, (d) => {
      // console.log('reading')
      let dateops = new DateOperations()
      let f = dateops.DateFormatPol(d['fecha'])
      return {
        date: f,
        value: +d['cnt']
      }
    })

    return rawDS
  }

  JSON () {
    let rawDS = d3.json(this.path)
    return rawDS
  }
}
