Highcharts.chart('container', {
    chart: {
        type: 'spline'
    },
    data: {
        // enablePolling: true,
        csvURL: window.location.origin + 'Project COVID Data Clean.csv'
    },
    title: {
        text: 'COVID-19 Cases Globally '
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            date: '%e. %b',
            month: '%b'
        },
        title: {
            text: 'Date'
        }
    },
    yAxis: {
        title: {
            text: 'Number of Cases'
        },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
    },
    plotOptions: {
        series: {
            marker: {
                enabled: true
            }
        }
    },

    colors: ['#FF4500', '#00800', '#FFFFFF'],

    // Define the data points. 
    // that in JavaScript, months start at 0 for January, 1 for February etc.
    series: [{
        name: "Confirmed",
        data: [
            [Date.UTC(1971, 6,  4), 0]
        ]
    }, {
        name: "Revocered",
        data: [
            [Date.UTC(1971, 5,  7), 0]
        ]
    }, {
        name: "Deaths",
        data: [
            [Date.UTC(1970, 9, 15), 0]
        ]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                    series: {
                        marker: {
                            radius: 2.5
                        }
                    }
                }
            }
        }]
    }
});
