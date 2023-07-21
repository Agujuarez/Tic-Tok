const { conectar, desconectar } = require('./db');

// Función asincrónica para realizar la consulta SELECT
async function selectUsuarios() {
    return new Promise((resolve, reject) => {
     const conexion= conectar();
  
      conexion.all('SELECT * FROM usuarios', (err, rows) => {
        console.log('selectUsuarios',err,rows);
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
  
      desconectar(conexion);
    });
  }

  function crearTablaUsuarios() {
    return new Promise((resolve, reject) => {
      const conexion= conectar();
      conexion.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
          ID INTEGER PRIMARY KEY,
          Nombre TEXT
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  
      desconectar(conexion);
    });
  }

  async function crearUsuario(id, nombre) {
    return new Promise((resolve, reject) => {
        const conexion= conectar();
  
      conexion.run('INSERT INTO usuarios (ID, Nombre) VALUES (?, ?)', [id, nombre], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
  
      desconectar(conexion);
    });
  }

  async function comprobarUsuarioExistente(id) {
    return new Promise((resolve, reject) => {
        const conexion= conectar();
  
      conexion.get('SELECT * FROM usuarios WHERE ID = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row !== undefined);
        }
      });
  
      desconectar(conexion);
    });
  }

module.exports = {
  selectUsuarios,
  crearTablaUsuarios,
  crearUsuario,
  comprobarUsuarioExistente
}