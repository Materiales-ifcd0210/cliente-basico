// ============================================================================
// ui.js — SOLUCIÓN
// ============================================================================
//
// Cada función recibe el elemento donde escribir y la información a pintar.
// Devolver el elemento permet encadenar llamadas como
//   ui.limpiarSalida(salida, 'Cargando…').classList.add('is-loading')
//

/** Escribe texto provisional mientras esperamos la respuesta. */
function mostrarEnviando(elemento, mensaje) {
  elemento.classList.remove('is-error');
  elemento.classList.add('is-loading');
  elemento.textContent = mensaje;
  return elemento;
}

/** Monta los nodos de la tarjeta de un post (sin tocar el elemento destino). */
function crearTarjeta(post) {
  const id = document.createElement('span');
  id.className = 'post-id';
  id.textContent = '#' + post.id;

  const titulo = document.createElement('p');
  titulo.className = 'post-title';
  titulo.textContent = post.title;

  const cuerpo = document.createElement('p');
  cuerpo.className = 'post-body';
  cuerpo.textContent = post.body;

  const meta = document.createElement('p');
  meta.className = 'post-meta';
  meta.textContent = 'Escrito por el usuario ' + post.userId;

  return [id, titulo, cuerpo, meta];
}

/** Dibuja un post como tarjeta. */
function mostrarPost(elemento, post) {
  elemento.classList.remove('is-loading', 'is-error');
  elemento.innerHTML = '';
  elemento.append(...crearTarjeta(post));
  return elemento;
}

/** Dibuja el post recién creado, resaltando que el servidor lo aceptó. */
function mostrarCreado(elemento, post) {
  elemento.classList.remove('is-loading', 'is-error');
  elemento.innerHTML = '';

  const nota = document.createElement('p');
  nota.className = 'created-note';
  nota.textContent = '✔ Servidor respondió 201: post creado';

  // Ojo: la nota se añade DESPUÉS de limpiar, y la tarjeta se monta con
  // crearTarjeta(). Si aquí se llamara a mostrarPost(), su
  // `elemento.innerHTML = ''` borraría la nota que acabamos de poner.
  elemento.appendChild(nota);
  elemento.append(...crearTarjeta(post));
  return elemento;
}

/** Muestra un error legible y evita que la página se quede en blanco. */
function mostrarError(elemento, error) {
  elemento.classList.remove('is-loading');
  elemento.classList.add('is-error');

  const mensaje = (error && error.message) ? error.message : 'Error desconocido';
  elemento.textContent = '✖ No se pudo completar la petición: ' + mensaje;
  return elemento;
}

/** Vuelve el recuadro a su estado inicial. */
function limpiarSalida(elemento, textoVacio) {
  elemento.classList.remove('is-loading', 'is-error');

  const vacio = document.createElement('p');
  vacio.className = 'output-empty';
  vacio.textContent = textoVacio;

  elemento.innerHTML = '';
  elemento.appendChild(vacio);
  return elemento;
}

window.ui = {
  mostrarEnviando,
  mostrarPost,
  mostrarCreado,
  mostrarError,
  limpiarSalida
};
