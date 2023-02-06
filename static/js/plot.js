var mapData;
var searchDict = {};
var targetData;

$(function() {
    loadPlot();
});

/**
* Executa rotina para carregar os dados do mapa.
*/
function loadPlot(reload=false) {
    if (reload) document.getElementById('mapDiv').innerHTML = "";
    collectMapData();
    const structuredData = structurePlotData();
    Plotly.newPlot('mapDiv', structuredData["data"], structuredData["layout"]);
    plotClickEvent();
};

/**
* Conclui estruturação de dados para plotly.
* Ref: https://plotly.com/javascript/scatter-plots-on-maps/
*/
function structurePlotData() {
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
        height: 600,
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
* Ref: https://plotly.com/javascript/click-events/
*/
function plotClickEvent() {
    var myPlot = document.getElementById('mapDiv')
    myPlot.on('plotly_click', function(data){
        // var pts = 'x = ' + data.points[0].lon +'\ny = ' + data.points[0].lat.toPrecision(4) + '\n\n';
        // alert('Closest point clicked:\n\n' + pts);
        updateModal(data);
    });
};

function updateModal(data) {
    targetData = searchDict[`${data.points[0].text}${data.points[0].lon.toFixed(4)}${data.points[0].lat.toFixed(4)}`];
    // Modal atualizar
    document.getElementById('updateTargetModalLabel').innerHTML = `Alterar alvo #${targetData['id']}`;
    document.getElementById('updateTargetName').value = targetData['name'];
    document.getElementById('updateLatitude').value = targetData['latitude'];
    document.getElementById('updateLongitude').value = targetData['longitude'];
    document.getElementById('updateDate').value = targetData['expiration_date'].split('T')[0];
    // Modal apagar
    document.getElementById('deleteTargetModalLabel').innerHTML = `Apagar alvo #${targetData['id']}`;;
    document.getElementById('deleteTargetNumber').innerHTML = targetData['id'];
    // Abrir modal
    const MODAL = document.getElementById("updateTargetModal");
    const BS_MODAL = new bootstrap.Modal(MODAL);
    BS_MODAL.show();
};

/**
* Estrutura os dados da API para utilizar no plotly.
*/
function structureData(data) {
    var text = [];
    var lon = [];
    var lat = [];
    for (let i=0; i<data.length; i++) {
        text.push(data[i]["name"]);
        lon.push(Number(data[i]["longitude"]));
        lat.push(Number(data[i]["latitude"]));
        searchDict[`${data[i]["name"]}${data[i]["longitude"]}${data[i]["latitude"]}`] = data[i];
    };
    return {
        'text': text,
        'lon': lon,
        'lat': lat,
    }
};