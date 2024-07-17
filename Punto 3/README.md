### Para fetchPosts

const fetchPosts = () => { ... };:
 Define una función de flecha que realiza una solicitud a la API.

fetch('https://jsonplaceholder.typicode.com/posts'):
 Hace una solicitud fetch para obtener los datos de la API.

.then(response => { ... }):
 Maneja la promesa devuelta por fetch. La función de flecha procesa la respuesta.

if (!response.ok) { throw new Error('Network response was not ok ' + response.statusText); }:
 Verifica si la respuesta es exitosa (response.ok). Si no lo es, lanza un error con un mensaje.

Concepto Aplicado: Control de Flujo:
 Utiliza un condicional para verificar el estado de la respuesta.

return response.json();:
 Convierte la respuesta en JSON, lo que también devuelve una promesa.

.then(posts => { displayPosts(posts); }):
 Una vez que se obtiene el JSON, pasa los datos a la función displayPosts.

.catch(error => { displayError(error); }):
 Captura cualquier error que ocurra durante la solicitud o procesamiento y llama a displayError para mostrar el error.

Conceptos Aplicados:
 Promesas: Maneja operaciones asíncronas y errores usando .then y .catch. JSON: Convierte la respuesta de la API a un objeto JavaScript.

### Para displayPosts

const displayPosts = (posts) => { ... };:
 Define una función de flecha que muestra los posts en la página.

const postList = document.getElementById('post-list');:
 Obtiene el elemento del DOM donde se mostrarán los posts.

postList.innerHTML = '';:
 Limpia cualquier contenido anterior en la lista.

posts.forEach(post => { ... });:
 Recorre el array de posts y crea un elemento de lista para cada uno.

const listItem = document.createElement('li');:
 Crea un nuevo elemento <li>.

listItem.textContent = Title: ${post.title};:
 Establece el contenido del elemento como el título del post.

postList.appendChild(listItem);:
 Añade el nuevo elemento de lista a la lista en el DOM.

Conceptos Aplicados:
 Manipulación del DOM: Modifica el contenido del DOM para mostrar los datos. Control de Flujo: Utiliza forEach para recorrer los posts.

### Para displayError

const displayError = (error) => { ... };:
 Define una función de flecha que muestra un mensaje de error.

const errorMessage = document.getElementById('error-message');:
 Obtiene el elemento del DOM donde se mostrará el mensaje de error.

errorMessage.textContent = Error: ${error.message};:
 Establece el contenido del elemento como el mensaje de error capturado.

Concepto Aplicado: Depuración:
 Muestra mensajes de error para ayudar a identificar problemas durante la solicitud de la API.