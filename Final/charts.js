// data = d3.csvParse(await FileAttachment("Project COVID Data Clean.csv").text(), d3.autoType)

d3.csv('Data.csv', function(data){
    console.log(data)

    //var date_format = d3.timeParse("%Y-%m-%d")
    
    data.forEach(function(d,i){
        //d.date = Date(d.date);
        var year = parseInt(d.date.split("/")[2]) + 2000
        var month = parseInt(d.date.split("/")[0]) - 1
        var day = parseInt(d.date.split("/")[1])
        //console.log(Date(year,month,day))

        d.date = new Date(year, month, day);
        d.confirmed = +d.confirmed;
        d.recovered = +d.recovered;
        d.deaths = +d.deaths;
    })

    // console.log(data)

    var first_daily_sum = d3.nest()
        .key(function(d) {return d.date})
        .rollup(function(v) {return {
            sum_confirmed: d3.sum(v, function(d) {return d.confirmed}),
            sum_recovered: d3.sum(v, function(d) {return d.recovered}),
            sum_deaths: d3.sum(v, function(d) {return d.deaths})
        }; })
        .entries(data);

    var country_sum = d3.nest()
        .key(function(d) {return d.country})
        .rollup(function(v) {return {
            sum_confirmed: d3.sum(v, function(d) {return d.confirmed}),
            sum_recovered: d3.sum(v, function(d) {return d.recovered}),
            sum_deaths: d3.sum(v, function(d) {return d.deaths})
        }; })
        .entries(data);
    console.log(country_sum);

    var daily_sum = first_daily_sum.sort(function(a,b){return b.date-a.date});
    //console.log(daily_sum);

    var daily_confirmed = [];
    var daily_deaths =[];
    var daily_recovered=[];

    var dates = [];

    for(i = 0; i < daily_sum.length; i++){
        // console.log(daily_sum[i].value.sum_confirmed)
        dates.push(daily_sum[i].key)
        daily_confirmed.push(daily_sum[i].value.sum_confirmed)
        daily_deaths.push(daily_sum[i].value.sum_deaths)
        daily_recovered.push(daily_sum[i].value.sum_recovered)
    }

    var countries =[];
    var country_confirmed=[];
    var country_deaths=[];
    var country_mortality =[];

    for(i = 0; i < country_sum.length; i++){
        // console.log(daily_sum[i].value.sum_confirmed)
        countries.push(country_sum[i].key)
        var confirmed = country_sum[i].value.sum_confirmed
        var deaths = country_sum[i].value.sum_deaths
        country_confirmed.push(confirmed)
        country_deaths.push(deaths)
        country_mortality.push(deaths/confirmed)
    }
    //console.log(dates)
    var daily_confirmed_plot = dates.map((e,i)=>[e,daily_confirmed[i]])
    //console.log(newArray)

    var daily_deaths_plot=dates.map((e,i)=>[e,daily_deaths[i]])
    var daily_recovered_plot=dates.map((e,i)=>[e,daily_recovered[i]])
    
    // var data = [{
    //     values: country_confirmed,
    //     labels: countries,
    //     type: 'pie',
    //   }];
    var data = [{
        type: 'bar',
        x: country_mortality.sort(),
        y: countries,
        orientation: 'h',
      }];

    var layout = {
        title: 'Mortality Rata by Country',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      };
      
    // var layout = {
    //     title: 'Number of Graphs Made this Week',
    //     font:{
    //       family: 'Raleway, sans-serif'
    //     },
    //     showlegend: false,
    //     xaxis: {
    //       tickangle: -45
    //     },
    //     yaxis: {
    //       zeroline: false,
    //       gridwidth: 2
    //     },
    //     bargap :0.05
    //   };
      //Plotly.newPlot('plot', data);
      Plotly.plot('plot', {data: data,layout: layout});
    // new Chart(document.getElementById("doughnut-chart"), {
    //     type: 'doughnut',
    //     data: {
    //         labels: countries,
    //         datasets: [{
    //             data: country_recovered 
    //         }],
    //         //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]
    //     },
    //     // data: {
    //     //   labels: countries,
    //     //   datasets: [
    //     //     {
    //     //       label: "Recovered",
    //     //       //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
    //     //       data: country_recovered
    //     //     }
    //     //   ]
    //     // },
    //     options: {
    //       title: {
    //         display: true,
    //         text: 'Recovered by Country'
    //       },
    //       plugins: { 
    //         colorschemes: {
    //           scheme: 'brewer.Greens9:'
    //         }
    //       }	
    //     }
    // });
    Highcharts.chart('container', {

        title: {
            text: 'Confirmed vs. Deaths vs. Recovered'
        },
    
        // subtitle: {
        //     text: 'Source: thesolarfoundation.com'
        // },
        chart: {
            backgroundColor: '#BEBEBE',
            plotBackgroundColor: '#BEBEBE'
          },

        yAxis: {
            title: {
                text: 'Number of Cases'
            }
        },
    
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function() {
                    return Highcharts.dateFormat('%a %d %b', this.value);
                }
            },
            // type: 'datetime',
            // dateTimeLabelFormats: { // don't display the dummy year
            //     month: '%b',
            //     day:'%d',
            //     year: '%Y'
            //},
            title: {
                text: 'Date'
            },
            categories: dates
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        // plotOptions: {
        //     series: {
               
        //      }
        // },
        //colors: ['#FF4500', '#00800', '#FFFFFF'],

        series: [{
            name: 'Confirmed',
            color: '#FF4500',
            data: daily_confirmed_plot
        }, {
            name: 'Recovered',
            color: '#009900',
            data: daily_recovered_plot
        }, {
            name: 'Deaths',
            color: '#00800',
            data: daily_deaths_plot
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    backgroundColor: 'transparent',
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
});


// Line chart
// var trace1 = {
//     x: [dates],
//     y: [cases],
//     type: "line"
//   };

// var layout = {
//     title: "Confirmed vs. Deaths vs. Recovered",
//     xaxis: { title: "Status"},
//     yaxis: { title: "Cases"}
//   };
  
//   Plotly.newPlot("plot", data, layout);

  //  Broken Pie Chart
// var trace1 = {
//   x: [country],
//   y: [cases],
//   type: "pie"
// };

// var data = [trace1];

// var layout = {
//   title: " Cases by country",
// };

// Plotly.newPlot("plot", data, layout)