// ** script busqueda de autos lupita **

document.addEventListener('DOMContentLoaded', function () {
    const autoSelect = document.getElementById('autoSelect');
  
    // Función para cargar la lista de automóviles desde el servidor 
    function cargarAutomoviles() {
      fetch('/autos/disponibles') // Reemplaza con la ruta correcta para obtener la lista de autos 
        .then((response) => response.json())
        .then((data) => {
          // Limpia las opciones existentes
          autoSelect.innerHTML = '<option value="">Selecciona un automóvil</option>';
  
          // Agrega las opciones de automóvil desde los datos obtenidos
          data.forEach((auto) => {
            const option = document.createElement('option');
            option.value = auto.id; // Asigna un valor único para cada automóvil
            option.textContent = `${auto.marca} ${auto.modelo} - ${auto.matricula}`;
            autoSelect.appendChild(option);
          });
        })
        .catch((error) => {
          console.error('Error al cargar la lista de automóviles:', error);
        });
    }
  
    // Llama a la función para cargar la lista de automóviles cuando la página se carga
    cargarAutomoviles();
  });
  