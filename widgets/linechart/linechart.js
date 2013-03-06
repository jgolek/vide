ko.bindingHandlers.call = {
    init : function(element, valueAccessor, allBindingsAccessor, value) {
        var fn = valueAccessor()['init'];
        var data = valueAccessor()['data'];
        fn($(element)[0], data, $(element));
    },
    update : function(element, valueAccessor, allBindingsAccessor, value) {
        var fn = valueAccessor()['update'];
        if(fn){
            var data = valueAccessor()['data'];
            fn($(element)[0], data);  
        }
    }
};



function LineChart(model){
  var self = this;
  self.model = model;

  self.render = function(element, data){

    var series = [];

    var jugendlicher = {
      name: "Gesamt",
      data: [
          [Date.UTC(2012, 12,  2), 11   ],
          [Date.UTC(2012, 12,  12), 16  ],
          [Date.UTC(2013,  1,  2), 10  ],
          [Date.UTC(2013,  1,  12), 12   ],
          [Date.UTC(2013,  2,  2), 15  ],
          [Date.UTC(2013,  2,  12), 17  ]
      ]
    };
    series.push(jugendlicher);


    var mitarbeiter = {
      name: model.mitarbeiter || "Gesamt (Mitarbeiter)",
      data: [
          [Date.UTC(2012, 12,  2), 9   ],
          [Date.UTC(2012, 12,  12), 10  ],
          [Date.UTC(2013,  1,  2), 12  ],
          [Date.UTC(2013,  1,  12), 15   ],
          [Date.UTC(2013,  2,  2), 13  ],
          [Date.UTC(2013,  2,  12), 19  ]
      ],
      dashStyle: 'Dash'
    };
    series.push(mitarbeiter);

    var chart = new Highcharts.Chart( {
        chart: {
            renderTo: 'chart',
            type: 'line',
            marginRight: 130,
            marginBottom: 25
        },
        title: {
            text: model.title || "Entwicklungsverlauf von " + model.jugendlicher,
            x: -20 //center
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b'
          }
        },
        yAxis: {
            title: {
                text: 'Punkte'
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