var diameter = 960,
    format = d3.format(",d"),
    dataSource;

var body = d3.select("body");

var pack = d3.layout.pack()
    .size([diameter - 4, diameter - 4])
    .children(function(d) {
        return d.values;  // accessor for children
    })
    .padding(4)
    .value(function(d) { return 4; });

var svg = body.append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
      .attr("transform", "translate(2,2)");


  d3.csv("testing.csv", function(error, csvData) {
    if (error) throw error;

    function getData(sort_by) {
    if(!sort_by){
      var jazzdata = { name: "jazzsolos", values: csvData };
      return jazzdata;
    } else {
      var column = sort_by;
      var data = d3.nest()
        .key(function(d) { return d[column]; })
        .entries(csvData);

      var jazzdata = { name: "jazzsolos", values: data };
      return jazzdata;
    };
  };

    var data = getData();

    var nodes = svg.datum(data).selectAll(".node")
        .data(pack.nodes)
       .enter()
        .append("g");

    var titles = nodes.append("title")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .text(function(d) { return d.title; });

    var circles = nodes.append("circle")
        .attr("stroke", "black")
        .attr("class", function(d) { return !d.children ? "leaf" : "non-leaf"; })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; })
        .on("mouseover", function() {
          d3.select(this).classed("active",
              function(d) {
                  return !d.children ? true : false
              });
          })
        .on("mouseout", function(){
          d3.select(this).classed("active", false);
        });

    circles.on("click", function() {
      d3.select(this).transition().attr("r", 100);
    });


    function updateVis() {

            if (dataSource == 0) {
                pack.value(function(d) { return 4; });
                var data1 = pack.nodes(getData("style"));
            }
            if (dataSource == 1) {
                pack.value(function(d) { return 4; });
                var data1 = pack.nodes(getData("performer"));
            }
            if (dataSource == 2) {
                pack.value(function(d) { return 4; });
                var data1 = pack.nodes(getData("instrument"));
            }
            if (dataSource == 3) {
                pack.value(function(d) { return 4; });
                var data1 = pack.nodes(getData("tempoclass"));
            }
            if (dataSource == 4) {
                pack.value(function(d) { return 4; });
                var data1 = pack.nodes(getData("rhythmfeel"));
            }
            if (dataSource == 5) {
                pack.value(function(d) { return 4; });
                var data1 = pack.nodes(getData("key"));
            }
            if (dataSource == 6) {
                pack.value(function(d) { return 4; });
                var data1 = pack.nodes(getData("chorus_count"));
            }
            if (dataSource == 7) {
                pack.value(function(d) { return 4; });
                var data1 = pack.nodes(data);
           };

            titles.attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; })
                .text(function(d) { return d.title; });

            circles.transition()
                .duration(5000)
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", function(d) { return d.r; });
        };


        var buttonData = ["Style", "Performer", "Instrument", "Tempo Class", "Rhythm Feel", "Key", "Chorus Count", "Release"];
        var buttonDiv = d3.select("body").append("svg")
            .attr("width", diameter + 50)
            .attr("height", 50);
        var buttons = buttonDiv.selectAll(".updateButton")
        	.data(buttonData)
           .enter()
        	.append('g')
        	.attr("class", "updateButton")
        	.on("click", function(d, i) {
        		dataSource = i;
        		updateVis();
        	});
        buttons.append("rect")
        	.attr("x", function(d, i) { return (i * 110) + 100; })
            .attr("width", 110)
            .attr("height", 35)
            .attr("ry", 5)
            .style("stroke", "#787878")
            .style("fill", "tan");
        buttons.append("text")
            .attr("x", function(d, i) { return (i * 110) + (100 / 2) + 98; })
            .attr("y", 12)
            .attr("dy", "0.35em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .text(function(d) { return d; });


 });
