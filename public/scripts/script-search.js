
// Barra busqueda en index ( task ...desarrollar funciones logicas)

// Obtener el formulario de búsqueda por su ID
var searchForm = document.getElementById("search-form");

// Obtener el campo de entrada de búsqueda por su ID
var searchInput = document.getElementById("search-input");

// Obtener el elemento donde se mostrarán los resultados
var searchResults = document.getElementById("search-results");

// Agregar un evento de escucha al formulario cuando se envía
searchForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

    // Obtener el valor del campo de búsqueda
    var searchTerm = searchInput.value;

    
    // hacer logica de busqueda, puede  enviar una solicitud al servidor para obtener resultados reales

    // Limpiar el contenido actual de los resultados
    searchResults.innerHTML = "";

    // Verificar si el término de búsqueda no está vacío
    if (searchTerm.trim() !== "") {
        // Crear un elemento de lista para mostrar el término de búsqueda
        var resultItem = document.createElement("li");
        resultItem.textContent = "Resultados de búsqueda para: " + searchTerm;

        // Agregar el elemento de lista a la lista de resultados
        searchResults.appendChild(resultItem);
    } else {
        // Si el término de búsqueda está vacío, mostrar un mensaje de error
        searchResults.textContent = "Por favor, ingresa un término de búsqueda válido.";
    }
});
