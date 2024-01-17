/** URL BASE DE API */
const apiUrl = 'https://rickandmortyapi.com/api/location';
const redirectUrl = ''
var searchlist = [];
var cardsPorFila = 4;

function getLocations(){

    axios.get(apiUrl)
        .then(response => {/** RESPUESTA EXITOSA DE API */
            // console.log('Datos de la API:', response);
            if(!response.status == 200){
                return alert('Ha ocurrido un error con la API, intentalo más tarde.')
            } else {
                var locations = [];
                locations = response.data.results /** IMPRIME LOCATIONS, TOCA GENERAR LAS CARDS */
                console.log(locations)
                if(locations.length > 0){
                    searchlist = locations;
                    var contenedorCards = document.getElementById('itemcards');
                    for (var i = 0; i < locations.length; i += cardsPorFila) {
                    var fila = document.createElement('div');
                    fila.className = 'row mb-4';
                    for (var j = i; j < i + cardsPorFila && j < locations.length; j++) {
                        var card = document.createElement('div');
                        card.className = 'col-md-3';

                        card.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${locations[j].name}</h5>
                                <p class="card-text">${locations[j].dimension}</p>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#miModal" onclick="abrirModal('${locations[j].name}', '${locations[j].dimension}')">Ver Detalles</button>
                            </div>
                        </div>
                        `;
                        fila.appendChild(card);
                    }
                    contenedorCards.appendChild(fila);
                    }
                } else {
                    var message = '<li>No se ha podido recuperar la lista de locaciones.</li>';
    
                    document.getElementById("itemcards").innerHTML = message;
                }
            }
        })
        .catch(error => { /** RESPUESTA ERRONEA DE API */
            console.error('Error al consumir la API:', error);
        });
}

function finddata(){
    var valorInput = document.getElementById('buscador').value;
    getLocations()
    console.log(valorInput.trim())
    if(valorInput.trim()){
        console.log("hay data, continua: ",valorInput);
        searchlist = searchlist.filter(x=>x.name == valorInput);
        console.log(searchlist)
        if(searchlist.length > 0){
            var contenedorCards = document.getElementById('itemcards');

            for (var i = 0; i < searchlist.length; i += cardsPorFila) {
            var fila = document.createElement('div');
            fila.className = 'row mb-4';

            for (var j = i; j < i + cardsPorFila && j < searchlist.length; j++) {
                var card = document.createElement('div');
                card.className = 'col-md-3';

                card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${searchlist[j].name}</h5>
                    <p class="card-text">${searchlist[j].dimension}</p>
                    </div>
                </div>
                `;
                fila.appendChild(card);
            }
            contenedorCards.appendChild(fila);
            }
            // ``
            document.getElementById("itemcards").innerHTML = locationsfinal;
        } else {
            getLocations()

            if(searchlist.length == 0){
                var message = '<li>No se ha podido recuperar la lista de locaciones.</li>';
                
                document.getElementById("itemcards").innerHTML = message;
            }
        }
    } else {
            var message = '<li>No se ha podido recuperar la lista de locaciones.</li>';
            
            document.getElementById("itemcards").innerHTML = message;
    }
}

/** AÚN NO PROBADO - BORRADOR */
function abrirModal(titulo, contenido) {
    var modalContenido = document.getElementById('modalContenido');
    modalContenido.innerHTML = `
      <h5>${titulo}</h5>
      <p>${contenido}</p>
    `;
}

getLocations()