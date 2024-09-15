    document.getElementById('simuladorForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Evita el envío tradicional del formulario

    // Crear objeto FormData para enviar los datos del formulario
    const formData = new FormData(this);

    // Enviar la solicitud AJAX
    fetch('/procesarCuota', {
        method: 'POST',
    body: new URLSearchParams(formData),  // Convertir FormData a formato URL-encoded
    headers: {
        'Accept': 'application/json',  // Espera una respuesta en JSON
    'Content-Type': 'application/x-www-form-urlencoded'  // Indica el tipo de los datos enviados
        }
      })
      .then(response => response.json())  // Procesar la respuesta en JSON
      .then(data => {
        // Actualizar el contenido del textarea con la respuesta
        document.getElementById('laRespuesta').value = data.salida;
      })
      .catch(error => console.error('Error:', error));  // Manejar errores
    });
