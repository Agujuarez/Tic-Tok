const { conectar, desconectar } = require('./db');

// Función asincrónica para realizar la consulta SELECT
async function selectComentarios() {
    return new Promise((resolve, reject) => {
     const conexion= conectar();
  
      conexion.all('SELECT * FROM comentarios', (err, rows) => {
        console.log('selectComentarios',err,rows);
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
  
      desconectar(conexion);
    });
  }

  function crearTablaComentarios() {
    return new Promise((resolve, reject) => {
      const conexion= conectar();
      conexion.run(`
        CREATE TABLE IF NOT EXISTS Comentarios (
            ID INTEGER PRIMARY KEY,
            UsuarioID INTEGER,
            VideoID INTEGER,
            Texto TEXT,
            FOREIGN KEY(UsuarioID) REFERENCES usuarios(ID),
            FOREIGN KEY(VideoID) REFERENCES videos(ID)
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

  async function crearComentario(id, nombre) {
    return new Promise((resolve, reject) => {
        const conexion= conectar();
  
      conexion.run('INSERT INTO videos (ID, UsuarioID, VideoID, Texto ) VALUES (?, ?)', [id, UsuarioID, VideoID, Texto], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
  
      desconectar(conexion);
    });
  }

  async function comprobarComentarioExistente(id) {
    return new Promise((resolve, reject) => {
        const conexion= conectar();
  
      conexion.get('SELECT * FROM comentarios WHERE ID = ?', [id], (err, row) => {
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
    selectComentarios,
    crearTablaComentarios,
    crearComentario,
    comprobarComentarioExistente
  }