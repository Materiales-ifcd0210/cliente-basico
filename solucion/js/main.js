// ============================================================================
// main.js — SOLUCIÓN
// ============================================================================
//
// El arranque solo conecta eventos. Las peticiones van a api.js
// y el dibujado a ui.js.
//

document.addEventListener('DOMContentLoaded', function () {
  // --- Referencias a los elementos del HTML ---------------------------
  const btnGet = document.getElementById('btn-get');
  const inputId = document.getElementById('input-id');
  const salidaGet = document.getElementById('salida-get');

  const formPost = document.getElementById('form-post');
  const inputTitle = document.getElementById('input-title');
  const inputBody = document.getElementById('input-body');
  const inputUser = document.getElementById('input-user');
  const salidaPost = document.getElementById('salida-post');

  // --- TODO 1: Petición GET ------------------------------------------
  btnGet.addEventListener('click', function () {
    const id = Number(inputId.value);

    ui.mostrarEnviando(salidaGet, 'Pidiendo el post ' + id + '…');

    fetchClient.getPost(id)
      .then(function (post) {
        ui.mostrarPost(salidaGet, post);
      })
      .catch(function (error) {
        ui.mostrarError(salidaGet, error);
      });
  });

  // --- TODO 2: Petición POST -----------------------------------------
  formPost.addEventListener('submit', function (event) {
    // Imprescindible: sin esto el navegador recarga la página
    // y perdemos todo lo hecho con fetch.
    event.preventDefault();

    const datos = {
      title: inputTitle.value,
      body: inputBody.value,
      userId: Number(inputUser.value)
    };

    ui.mostrarEnviando(salidaPost, 'Enviando el post…');

    fetchClient.createPost(datos)
      .then(function (post) {
        ui.mostrarCreado(salidaPost, post);
      })
      .catch(function (error) {
        ui.mostrarError(salidaPost, error);
      });
  });
});
