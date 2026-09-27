// ============================================================================
// api.js — SOLUCIÓN
// ============================================================================
//
// Pista clave: fetch() NO falla cuando el servidor responde 404 o 500.
// Por eso se comprueba res.ok ANTES de pasar a .json().
//

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const fetchClient = {
  /**
   * Descarga un post por su id.
   *
   * @param  {number} id
   * @returns {Promise<object>}
   */
  getPost(id) {
    return fetch(BASE_URL + '/posts/' + id)
      .then(function (res) {
        if (!res.ok) {
          throw new Error('El servidor respondió ' + res.status);
        }
        return res.json();
      });
  },

  /**
   * Envía un post nuevo.
   *
   * @param  {object} datos  { title, body, userId }
   * @returns {Promise<object>}
   */
  createPost(datos) {
    return fetch(BASE_URL + '/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('El servidor respondió ' + res.status);
        }
        return res.json();
      });
  }
};

window.fetchClient = fetchClient;
