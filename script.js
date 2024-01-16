/** URL BASE DE API */
const apiUrl = 'https://rickandmortyapi.com/api';


axios.get(apiUrl)
    .then(response => {/** RESPUESTA EXITOSA DE API */
        console.log('Datos de la API:', response.data);
    })
    .catch(error => { /** RESPUESTA ERRONEA DE API */
        console.error('Error al consumir la API:', error);
    });