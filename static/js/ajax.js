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
* Cria um novo alvo no mapa.
*/
function createDataPoint() {
    $.ajax({
        type: 'POST',
        url: `api/map/`,
        async: false,
        data: {
            'csrfmiddlewaretoken': document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            'name': document.getElementById('newTargetName').value,
            'longitude': document.getElementById('newLatitude').value,
            'latitude': document.getElementById('newLongitude').value,
            'expiration_date': document.getElementById('newDate').value,
        },
        success: function(data) {
            loadPlot(true);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log('ERROR')
            console.log(jqXhr)
        },
    });
};