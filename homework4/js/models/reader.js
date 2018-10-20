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

  tsv () {
    let rawDS = d3.tsv(this.path, function (d) {
      let dateops = new DateOperations()
      let f = dateops.DateFormatPol(d['fecha'])
      console.log('reading')
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
      console.log('reading')
      let dateops = new DateOperations()
      let f = dateops.DateFormatPol(d['fecha'])
      return {
        date: f,
        value: +d['cnt']
      }
    })

    return rawDS
  }

  _tsv () {
    let rawDS = d3.tsv(this.path, (d) => {
      console.log('reading')
      let dateops = new DateOperations()
      let f = dateops.DateFormatPol(d['fecha'])
      return {
        date: f,
        value: +d['cnt']
      }
    })

    return rawDS
  }
}
