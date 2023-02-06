$(function() {
    const PLOTDATA = testData();
    Plotly.newPlot('mapDiv', PLOTDATA["data"], PLOTDATA["layout"]);
    plotClickEvent();
});

function testData() {
    // REF: https://plotly.com/javascript/scatter-plots-on-maps/
    const DATA = [{
        type: 'scattergeo',
        mode: 'markers+text',
        text: [
            'Montreal', 'Toronto', 'Vancouver', 'Calgary', 'Edmonton',
            'Ottawa', 'Halifax', 'Victoria', 'Winnepeg', 'Regina'
        ],
        lon: [
            -73.57, -79.24, -123.06, -114.1, -113.28,
            -75.43, -63.57, -123.21, -97.13, -104.6
        ],
        lat: [
            45.5, 43.4, 49.13, 51.1, 53.34, 45.24,
            44.64, 48.25, 49.89, 50.45
        ],
        marker: {
            size: 7,
            line: {
                width: 1
            }
        },
        autocolorscale: true,
        name: 'Canadian cities',
        textposition: [
            'top right', 'top left', 'top center', 'bottom right', 'top right',
            'top left', 'bottom right', 'bottom left', 'top right', 'top right'
        ],
    }];
    const LAYOUT = {
        title: 'Canadian cities',
        font: {
            family: 'Droid Serif, serif',
            size: 6
        },
        titlefont: {
            size: 16
        },
        autosize: true,
        height: 800,
        geo: {
            projection: {
                type: 'equirectangular'
            }
        }
    };
    return {
        'data': DATA,
        'layout': LAYOUT,
    };
};

function plotClickEvent() {
    // https://plotly.com/javascript/click-events/
    var myPlot = document.getElementById('mapDiv')
    myPlot.on('plotly_click', function(data){
        var pts = 'x = ' + data.points[0].lon +'\ny = ' + data.points[0].lat.toPrecision(4) + '\n\n';
        alert('Closest point clicked:\n\n' + pts);
    });
}