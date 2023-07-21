const { conectar, desconectar } = require('./db');

// Función asincrónica para realizar la consulta SELECT
async function selectVideos() {
    return new Promise((resolve, reject) => {
     const conexion= conectar();
  
      conexion.all('SELECT * FROM videos', (err, rows) => {
        console.log('selectVideos',err,rows);
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
  
      desconectar(conexion);
    });
  }

  function crearTablaVideos() {
    return new Promise((resolve, reject) => {
      const conexion= conectar();
      conexion.run(`
        CREATE TABLE IF NOT EXISTS Videos (
          ID INTEGER PRIMARY KEY,
          Titulo TEXT,
          Autor TEXT,
          Fecha Creacion TEXT
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

  async function crearVideo(id, titulo, autor, fecha) {
    return new Promise((resolve, reject) => {
        const conexion= conectar();
  
      conexion.run('INSERT INTO videos (ID, Titulo, Autor, Fecha ) VALUES (?, ?)', [id, titulo, autor, fecha], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
  
      desconectar(conexion);
    });
  }

  async function comprobarVideoExistente(id) {
    return new Promise((resolve, reject) => {
        const conexion= conectar();
  
      conexion.get('SELECT * FROM videos WHERE ID = ?', [id], (err, row) => {
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
    selectVideos,
    crearTablaVideos,
    crearVideo,
    comprobarVideoExistente
  }