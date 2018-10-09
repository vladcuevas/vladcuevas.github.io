export class Reader {
    constructor(path) {
        this.path = path;
    }

    csv(year) {

        let rawDS = d3.csv(this.path, function(d) {

            if (+d["Year"] >= year) {
                let parseTime = d3.timeParse("%d-%b-%y");
                let parseTimeYear = d3.timeParse("%Y");
                let formatTime = d3.timeFormat("%B %d, %Y");

                return {
                    Year: +d["Year"],
                    Glob: +d["Glob"],
                    NHem: +d["NHem"],
                    SHem: +d["SHem"],
                    k24N90N: +d["24N-90N"],
                    k24S24N: +d["24S-24N"],
                    k90S24S: +d["90S-24S"],
                    k64N90N: +d["64N-90N"],
                    k44N64N: +d["44N-64N"],
                    k24N44N: +d["24N-44N"],
                    kEQU24N: +d["EQU-24N"],
                    k24SEQU: +d["24S-EQU"],
                    k44S24S: +d["44S-24S"],
                    k64S44S: +d["64S-44S"],
                    k90S64S: +d["90S-64S"]
                };
            }
        });

        return rawDS;
    }
}