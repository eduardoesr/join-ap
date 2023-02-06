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
            'longitude': document.getElementById('newLongitude').value,
            'latitude': document.getElementById('newLatitude').value,
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
    const MODAL = document.getElementById('newTargetModal');
    const BS_MODAL = bootstrap.Modal.getInstance(MODAL);
    BS_MODAL.hide();
};

/**
* Alterar um alvo no mapa.
*/
function updateDataPoint() {
    var targetId = document.getElementById('deleteTargetNumber').innerHTML;
    $.ajax({
        type: 'PATCH',
        url: `api/map/${targetId}/`,
        async: false,
        headers: {
            "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
        },
        data: {
            'name': document.getElementById('updateTargetName').value,
            'longitude': document.getElementById('updateLongitude').value,
            'latitude': document.getElementById('updateLatitude').value,
            'expiration_date': document.getElementById('updateDate').value,
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

/**
* Apaga um alvo do mapa.
*/
function deleteDataPoint() {
    var targetId = document.getElementById('deleteTargetNumber').innerHTML;
    $.ajax({
        type: 'DELETE',
        url: `api/map/${targetId}/`,
        async: false,
        headers: {
            "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
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