// 42 Países clasificados (Anfitriones y Clasificados Directos confirmados)
// NOTA: Se usan los códigos ISO 3166-1 alpha-2. Para Inglaterra/Escocia, usamos 'gb' como código base.
const nombresPaises = {
    // Anfitriones
    'ca': 'Canadá', 'mx': 'México', 'us': 'Estados Unidos', 
    // CONMEBOL
    'ar': 'Argentina', 'br': 'Brasil', 'co': 'Colombia', 'ec': 'Ecuador', 'py': 'Paraguay', 'uy': 'Uruguay', 
    // UEFA
    'fr': 'Francia', 'de': 'Alemania', 'es': 'España', 'pt': 'Portugal', 'nl': 'Países Bajos', 'be': 'Bélgica', 
    'at': 'Austria', 'hr': 'Croacia', 'ch': 'Suiza', 'no': 'Noruega', 'gb': 'Inglaterra', 'se': 'Suecia',
    // CAF
    'ma': 'Marruecos', 'tn': 'Túnez', 'eg': 'Egipto', 'dz': 'Argelia', 'gh': 'Ghana', 'cv': 'Cabo Verde', 
    'za': 'Sudáfrica', 'ci': 'Costa de Marfil', 'sn': 'Senegal', 
    // AFC
    'jp': 'Japón', 'ir': 'Irán', 'uz': 'Uzbekistán', 'kr': 'Corea del Sur', 'jo': 'Jordania', 'au': 'Australia', 
    'qa': 'Catar', 'sa': 'Arabia Saudita', 
    // CONCACAF
    'pa': 'Panamá', 'cw': 'Curazao', 'ht': 'Haití', 
    // OFC
    'nz': 'Nueva Zelanda',
};
const paisesMundial = Object.keys(nombresPaises); // Usa las claves del diccionario como la lista de códigos.
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
                //imagenBandera.alt = `Bandera de ${codigoPais.toUpperCase()}`;
        imagenBandera.alt = `Bandera de ${nombresPaises[codigoPais]}`;
        
        // Crear el texto del país (Muestra el código en mayúsculas)
        const nombrePais = document.createElement('span');
                //nombrePais.textContent = codigoPais.toUpperCase(); 
        nombrePais.textContent = nombresPaises[codigoPais];

        elementoEnlace.appendChild(imagenBandera);
        elementoEnlace.appendChild(nombrePais);
        
        contenedorBanderas.appendChild(elementoEnlace);
    });
}

// --- Función para actualizar los puntos desde el JSON ---
function actualizarPuntos() {
    fetch('grupos.json') // Ruta corregida para ser relativa a index.html
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo grupos.json');
            }
            return response.json();
        })
        .then(data => {
            for (const [key, equipos] of Object.entries(data)) {
                // key será "GRUPO_A", "GRUPO_B", etc.
                const groupId = key.replace('_', '-').toLowerCase(); // Convierte a "grupo-a"
                const tabla = document.getElementById(groupId);

                if (tabla) {
                    const tbody = tabla.querySelector('tbody');
                    // IMPORTANTE: Limpiamos las filas que están en el HTML estático
                    tbody.innerHTML = ''; 

                    // Llenamos la tabla usando el orden fijo del JSON (sin sort)
                    equipos.forEach(equipo => {
                        const row = tbody.insertRow();
                        row.insertCell().textContent = equipo.equipo;
                        row.insertCell().textContent = equipo.puntos;
                    });
                }
            }
        })
        .catch(error => console.error('Error al procesar los datos de los grupos:', error));
}


// --- Ejecuta las funciones al cargar la página ---


document.addEventListener('DOMContentLoaded', () => {
    cargarBanderas();
    actualizarPuntos(); // ¡Llamamos a la nueva función aquí!
});