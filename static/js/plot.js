var mapData;

$(function() {
    collectMapData();
    const structuredData = structurePlotData();
    Plotly.newPlot('mapDiv', structuredData["data"], structuredData["layout"]);
    plotClickEvent();
});

/**
* Conclui estruturação de dados para plotly.
*/
function structurePlotData() {
    // REF: https://plotly.com/javascript/scatter-plots-on-maps/
    const DATA = [{
        type: 'scattergeo',
        mode: 'markers+text',
        text: mapData["text"],
        lon: mapData["lon"],
        lat: mapData["lat"],
        marker: {
            size: 8,
            line: {
                width: 1
            }
        },
        textposition: 'bottom right',
    }];
    const LAYOUT = {
        font: {
            family: 'Droid Serif, serif',
            size: 8
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

/**
* Evento ao clicar em um ponto no mapa.
*/
function plotClickEvent() {
    // https://plotly.com/javascript/click-events/
    var myPlot = document.getElementById('mapDiv')
    myPlot.on('plotly_click', function(data){
        var pts = 'x = ' + data.points[0].lon +'\ny = ' + data.points[0].lat.toPrecision(4) + '\n\n';
        alert('Closest point clicked:\n\n' + pts);
    });
};

/**
* Coleta dados do mapa da API.
*/
function collectMapData() {
    $.ajax({
        type: 'GET',
        url: `api/map/`,
        async: false,
        success: function(data) {
            mapData = structureData(data);
        }
    });
};

/**
* Estrutura os dados da API para utilizar no plotly.
*/
function structureData(data) {
    var text = [];
    var lon = [];
    var lat = [];
    for (let i=0; i<data.length; i++) {
        text.push(`${data[i]["name"]} - #${data[i]["id"]}`);
        lon.push(Number(data[i]["longitude"]));
        lat.push(Number(data[i]["latitude"]));
    };
    return {
        'text': text,
        'lon': lon,
        'lat': lat,
    }
};