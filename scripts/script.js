// 42 Países clasificados (Anfitriones y Clasificados Directos confirmados)
// NOTA: Se usan los códigos ISO 3166-1 alpha-2. Para Inglaterra/Escocia, usamos 'gb' como código base.
const paisesMundial = [
    // Anfitriones (3)
    'ca', 'mx', 'us', 
    // CONMEBOL (6)
    'ar', 'br', 'co', 'ec', 'py', 'uy', 
    // UEFA (12 - Ejemplos de clasificados directos)
    'fr', 'de', 'es', 'pt', 'nl', 'be', 'at', 'hr', 'ch', 'no', 'gb', 'se', // 'gb' para Inglaterra, 'se' (Suecia) como ejemplo
    // CAF (9)
    'ma', 'tn', 'eg', 'dz', 'gh', 'cv', 'za', 'ci', 'sn', 
    // AFC (8)
    'jp', 'ir', 'uz', 'kr', 'jo', 'au', 'qa', 'sa', 
    // CONCACAF (3 - Adicionales a anfitriones)
    'pa', 'cw', 'ht', 
    // OFC (1)
    'nz',
];

const contenedorBanderas = document.querySelector('.banderas-grid');

function cargarBanderas() {
    paisesMundial.forEach(codigoPais => {
        // La URL de FlagCDN para obtener la imagen PNG de la bandera (tamaño 160px de ancho)
        // Usamos el código ISO del país y el formato .png
        const urlBandera = `https://flagcdn.com/w160/${codigoPais}.png`; 
        
        // Define el destino del enlace, usando el código ISO como nombre de archivo HTML
        const paginaDetalle = `pages/${codigoPais}.html`; 

        const elementoEnlace = document.createElement('a');
        elementoEnlace.href = paginaDetalle;
        elementoEnlace.className = 'bandera-item';
        
        // Crear la imagen
        const imagenBandera = document.createElement('img');
        imagenBandera.src = urlBandera;
        imagenBandera.alt = `Bandera de ${codigoPais.toUpperCase()}`;
        
        // Crear el texto del país (Muestra el código en mayúsculas)
        const nombrePais = document.createElement('span');
        nombrePais.textContent = codigoPais.toUpperCase(); 

        elementoEnlace.appendChild(imagenBandera);
        elementoEnlace.appendChild(nombrePais);
        
        contenedorBanderas.appendChild(elementoEnlace);
    });
}



// Ejecuta la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarBanderas);
