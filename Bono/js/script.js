import { Reader } from "./models/reader.js";

let count = 10;

let precise = (x, y) => Number.parseFloat(x).toPrecision(y);

let margin = { top: 50, right: 35, bottom: 50, left: 50 },
    w = 768 - (margin.left + margin.right),
    h = 500 - (margin.top + margin.bottom);

let reader = new Reader("data/ZonAnn.Ts+dSST.csv");
let rawDS = reader.csv(1950);

var tempScale = "F";
var firstLoad = true;

(async function read() {
    let data = await rawDS;

    let render = () => {

        tempScale = (isF) ? "F" : "C";

        data.forEach(dr => {
            data.columns.forEach(dc => {
                if (dc.search(/\-/) !== -1) {
                    dc = dc.replace(/\-/, "");
                    dc = "k"+dc;
                }

                if (dc !== "Year") {
                    if (firstLoad) {
                        if (isF)
                            dr[dc] = +precise(dr[dc] * 100, 4);
                        else
                            dr[dc] = +precise(((dr[dc] * 100) - 32) * (5 / 9), 4);
                    } else {
                        if (isF)
                            dr[dc] = +precise((dr[dc] * 1.8) + 32, 4);
                        else
                            dr[dc] = +precise(((dr[dc]) - 32) * (5 / 9), 4);
                    }
                }
            });
        });

        firstLoad = false;

        let Glob = getMean('Glob', count, data);
        let NHem = getMean('NHem', count, data);
        let SHem = getMean('SHem', count, data);

        let x = d3.scaleLinear()
            .range([0, w]);

        //x = x.domain(d3.extent(data, d => d.Year));
        x.domain(d3.extent(data, d => d.Year));

        let y = d3.scaleLinear()
            .range([h, 0]);

        y.domain(d3.extent(data, d => d.Glob));

        // y.domain(d3.extent(data, d => {
        //         return Math.max(d.Glob, d.NHem, d.SHem);
        //     }));

        // let y = d3.scaleLinear()
        //     .rangeRound([height, 0]);

        let xAxis = d3.axisBottom(x);
        // .scale(x) was replaced here
        //<REMOVED-Botton>

        //ticks was removed here, check ticks for d3 v5;

        let yAxis = d3.axisLeft(y)
            // .scale(y) was replaced here
            //<REMOVED-Left>

            //ticks was removed here, check ticks for d3 v5
            .tickFormat(d => d + "° " + tempScale);

        let xGrid = d3.axisBottom(x)
            // .scale(x) was replaced here
            //<REMOVED-Botton>

            //ticks was removed here, check ticks for d3 v5
            .tickSize(-h, 0, 0)
            .tickFormat("");

        let yGrid = d3.axisLeft(y)
            // .scale(y) was replaced here
            //<REMOVED-Left>

            //ticks was removed here, check ticks for d3 v5
            .tickSize(-w, 0, 0)
            .tickFormat("");

        let svg = d3.select("#chart").append('svg')
            .attrs({
                width: w + margin.left + margin.right,
                height: h + margin.top + margin.bottom
            })
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        svg.append('g')
            .attrs({
                class: "x axis",
                transform: 'translate(0,' + h + ')'
            })
            .call(xAxis);

        svg.append('g')
            .attrs({
                class: "y axis"
            }).call(yAxis);

        svg.append('g')
            .attrs({
                class: "grid",
                transform: 'translate(0,' + h + ')'
            })
            .call(xGrid);

        svg.append('g')
            .attrs({
                class: "y-grid"
            }).call(yGrid);

        let area = d3.area()
            .curve(d3.curveCardinal)
            .x(function(d) {
                return x(d.Year);
            })
            .y0(h)
            .y1(function(d) {
                return y(d.val);
            });

        let div_line1 = d3.select("body").append("div")
            .attr("class", "line1_tt")
            .style("opacity", 0);

        let div_line2 = d3.select("body").append("div")
            .attr("class", "line2_tt")
            .style("opacity", 0);

        let div_line3 = d3.select("body").append("div")
            .attr("class", "line3_tt")
            .style("opacity", 0);

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        createGradient(svg, '#fff', color(1), 'line111');
        createGradient(svg, '#fff', color(2), 'line211');
        createGradient(svg, '#fff', color(3), 'line311');

        let area_g = svg
            .append("g");

        plotLine(data, NHem, "line3", 'dot3', 'NHem', svg, x, y, area_g, area);
        plotLine(data, SHem, "line2", 'dot2', 'SHem', svg, x, y, area_g, area);
        plotLine(data, Glob, "line1", 'dot1', 'Glob', svg, x, y, area_g, area);

        // let color = d3.scaleOrdinal()
        //     .range(['#69c242', '#64bbe3', '#ffcc00']);

        color = d3.scaleOrdinal(d3.schemeCategory10);

        let legendRectSize = 10;
        let legendSpacing = 7;
        let legendHeight = legendRectSize + legendSpacing;

        let theClasses = [];
        let className = "",
            cirClass = "";

        let legend = svg.selectAll('.legend')
            .data(["Global Mean", "Southern Hemisphere", "Northern Hemisphere"])
            .enter()
            .append('g')
            .attrs({
                class: (d, i) => 'legend' + d.replace(/\s/gi, ''),
                transform: (d, i) => {
                    //Just a calculation for x & y position
                    return 'translate(' + ((i * 230) + 20) + ',' + -30 + ')';
                }
            })
            .on("mouseover", function(d, i, e) {
                //console.log(d);
                theClasses = (d === "Global Mean") ? ["line1", "dot1"] :
                    (d === "Northern Hemisphere") ? ["line3", "dot3"] : ["line2", "dot2"];

                [className, cirClass] = theClasses;
                // console.log("over", className, cirClass, theClasses, d)

                const mean_data = (d === "Global Mean") ? Glob : (d === "Northern Hemisphere") ? NHem : SHem;

                if (!e) e = window.event;

                d3.select(e.target).attr("r", 7);

                d3.select('.line1').style("opacity", ".1");
                d3.select('.line2').style("opacity", ".1");
                d3.select('.line3').style("opacity", ".1");
                d3.select('.' + className).style("opacity", "1");
                d3.select('.' + className).style("stroke-width", "2px");

                d3.selectAll('.dot1').style("opacity", 0.1);
                d3.selectAll('.dot2').style("opacity", 0.1);
                d3.selectAll('.dot3').style("opacity", 0.1);
                d3.selectAll('.' + cirClass).style("opacity", 1);

                d3.select('.' + className + "0").style("opacity", 1);

                area_g.append('path')
                    .datum(mean_data)
                    .attrs({
                        class: className + '11',
                        d: area,
                        fill: 'url(#' + className + '11)'
                    })
                    .styles({
                        opacity: .5
                    });
            })
            .on("mouseout", function(d, i, event) {
                theClasses = (d === "Global Mean") ? ["line1", "dot1"] :
                    (d === "Northern Hemisphere") ? ["line3", "dot3"] : ["line2", "dot2"];

                [className, cirClass] = theClasses;
                //console.log("out", className, cirClass, theClasses, d)

                $(event.target).attr("r", 4);

                d3.select('.line1').style("opacity", ".6");
                d3.select('.line2').style("opacity", ".6");
                d3.select('.line3').style("opacity", ".6");
                d3.select('.' + className).style("stroke-width", "1.5px");

                d3.selectAll('.dot1').style("opacity", 1);
                d3.selectAll('.dot2').style("opacity", 1);
                d3.selectAll('.dot3').style("opacity", 1);

                d3.select('.' + className + "0").style("opacity", 0);

                area_g.select('.' + className + '11').remove();
            });

        legend.append('rect')
            .attrs({
                class: "dotLegend",
                width: legendRectSize,
                height: legendRectSize,
                rx: 10,
                ry: 10
            })
            //Color for the legends
            .styles({
                fill: color,
                stroke: color
            });

        legend.append('text')
            .attrs({
                x: 15,
                y: 9
            })
            .text(function(d) {
                return d;
            }).styles({
                fill: '#000000',
                'font-size': '12px'
            });
    }

    let isF;

    if (isF === undefined) {
        isF = true;
        render();
    }

    const removeStuff = () => {
        //d3.selectAll("svg").transition().duration(500).style("opacity", 0).remove();
        d3.selectAll("svg").remove();
    }

    let changeIt = () => {
        //get rid of everything and re-draw

        let form_val = whichRadio();

        removeStuff();
        if (form_val == "Farenheit") {
            isF = true;
            render();
        } else if (form_val == "Celsius") {
            isF = false;
            render();
        }
    }

    let dataDim = d3.select("#dimensions");
    dataDim.on("change", changeIt);
})();

let createGradient = (svg, color1, color2, id) => {

    let defs = svg.append("defs");

    let gradient = defs.append("linearGradient")
        .attr("id", id)
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "0%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", color1)
        .attr("stop-opacity", 1);

    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", color2)
        .attr("stop-opacity", 1);
};

let getMean = (dataPoint, count, data) => {

    let mean = [];

    for (let i = 0, k = 0; i < data.length; i = i + count, k++) {
        let total = 0;
        for (let j = 0; j < count; ++j) {

            if (data[i + j] != undefined && data[i + j][dataPoint] != "NA") {
                total += data[i + j][dataPoint];
            } else {

            }
        }
        if (data[i] != undefined && data[i][dataPoint] != "NA") {
            if (i < data.length)
                mean[k] = { val: total / count, "Year": data[i + count / 2].Year };
            else {
                // This can be generalized even further
                mean[k] = { val: total / (count / 2), "Year": data[i + 2].Year };
            }
        }
    }
    return mean;
}

let whichRadio = () => {
    let form = document.getElementById("dimensions")
    let form_val;
    for (let i = 0; i < form.length; i++) {
        if (form[i].checked) {
            form_val = form[i].id;
        }
    }
    return form_val;
}

let plotLine = (data, mean_data, className, cirClass, attr, ...graphItem) => {

    let [svg, x, y, area_g, area] = graphItem;

    let line = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.val);
        });

    svg.append('path')
        .datum(mean_data)
        .attrs({
            class: className,
            d: line
        });

    let lineAllData = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d[attr]);
        });

    svg.append('path')
        .datum(data)
        .attrs({
            class: className + "0",
            d: lineAllData
        });

    svg.selectAll(".dot")
        .data(mean_data)
        .enter().append("circle")
        .attr("class", cirClass)
        .attr("cy", d => y(d.val)) //set y
        .attr("cx", (d, i) => x(d.Year)) //set x
        .attr("r", 4)
        .on("mouseover", function(d, i, e) {

            if (!e) e = window.event;

            let div = d3.select('.' + className + '_tt');

            div.transition()
                .duration(200)
                .style("opacity", .9);

            div.html("<b>Year : </b>" + d.Year + "<br/>" + "<b>Temp : </b>" + precise(d.val, 4) + tempScale)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 50) + "px");

            d3.select(e.target).attr("r", 7);

            d3.select('.line1').style("opacity", ".1");
            d3.select('.line2').style("opacity", ".1");
            d3.select('.line3').style("opacity", ".1");
            d3.select('.' + className).style("opacity", "1");
            d3.select('.' + className).style("stroke-width", "2px");

            d3.selectAll('.dot1').style("opacity", 0.1);
            d3.selectAll('.dot2').style("opacity", 0.1);
            d3.selectAll('.dot3').style("opacity", 0.1);
            d3.selectAll('.' + cirClass).style("opacity", 1);

            d3.select('.' + className + "0").style("opacity", 1);

            area_g.append('path')
                .datum(mean_data)
                .attrs({
                    class: className + '11',
                    d: area,
                    fill: 'url(#' + className + '11)'
                })
                .styles({
                    opacity: .5
                });

        })
        .on("mouseout", function(event) {

            let div = d3.select('.' + className + '_tt');
            div.transition()
                .duration(200)
                .style("opacity", 0);

            $(event.target).attr("r", 4);

            d3.select('.line1').style("opacity", ".6");
            d3.select('.line2').style("opacity", ".6");
            d3.select('.line3').style("opacity", ".6");
            d3.select('.' + className).style("stroke-width", "1.5px");

            d3.selectAll('.dot1').style("opacity", 1);
            d3.selectAll('.dot2').style("opacity", 1);
            d3.selectAll('.dot3').style("opacity", 1);

            d3.select('.' + className + "0").style("opacity", 0);

            area_g.select('.' + className + '11').remove();

        });
}