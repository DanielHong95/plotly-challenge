function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url = `/metadata/${sample}`;

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(sampledata) {
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata")
    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sampledata).forEach(function ([key,value]){
      var row = sample_metadata.append("p");
      row.text(`${key}: ${value}`);
    });
  });
    d3.json(url).then(function(sampledata) {
      console.log(sampledata.WFREQ);
      level = sampledata.WFREQ


      var degrees = ((level)*20-180)*-1;
      alert(degrees);
      radius = .5;
      var radians = degrees * Math.PI / 180;
      var x = radius * Math.cos(radians);
      var y = radius * Math.sin(radians);
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
    d3.json(url).then(function(plotdata) {
    // @TODO: Build a Bubble Chart using the sample data
    var xval = plotdata.otu_ids;
      var yval = plotdata.sample_values;
      var msize = plotdata.sample_values;
      var mcolor = plotdata.otu_ids;
      var tval = plotdata.otu_labels;

      var trace1 ={
        x:xval,
        y:yval,
        text:tval,
        mode:'markers',
        marker:{
          color:mcolor,
          size:msize,
          colorscale:"Rainbow"
        }
      };
      var bubbledata = [trace1];

      var bubblelayout = {
        title: 'OTU ID',
        height: 600,
        width: 800,
      };

      Plotly.newPlot('bubble', bubbledata, bubblelayout);
    // @TODO: Build a Pie Chart
    var data = [{
        values: yval.slice(0,10),
        labels: mcolor.slice (0,10),
        type: "pie"
      }];

      var layout = {
         height: 600,
         width: 800
       };
      var layout = {
       margin: {t:0,l:0}
      };
      Plotly.plot("pie", data, layout);
    });
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
