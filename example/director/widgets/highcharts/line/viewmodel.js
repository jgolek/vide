/**
 * Line Chart
 *
 *@param {String} title
 *@param {String} ytitle
 *@param {[]} series with {name: String, data: [[x,y]]}
 *
 */
function LineChart(model){
  var self = this;
  self.model = model;

  self.init = function(element){

    console.log(model.series);

    var series = [];

    var jugendlicher = model.series[0]
    var mitarbeiter = model.series[1]

    var chart = new Highcharts.Chart( {
        chart: {
            renderTo: element,
            type: 'line',
            marginRight: 130,
            marginBottom: 25
        },
        title: {
            text: model.title,
            x: -20 //center
        },
        xAxis: {
          //type: 'datetime',
          //dateTimeLabelFormats: { // don't display the dummy year
          //    month: '%e. %b',
          //    year: '%b'
          //}
        },
        yAxis: {
            title: {
                text: model.ytitle
            },
            plotLines: [{
                value: 0,
                width: 1
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: -10,
            y: 100,
            borderWidth: 0
        },
    } );


    chart.addSeries(jugendlicher);
    mitarbeiter.color = chart.series[0].color;
    chart.addSeries(mitarbeiter);
    console.log(chart.series[0]);

  }
}