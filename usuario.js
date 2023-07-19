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

  async function main() {
    try {
      await crearTablaUsuarios();
      console.log('Tabla "usuarios" creada exitosamente.');
    } catch (err) {
      console.error('Error al crear la tabla "usuarios":', err);
      return null
    }

    try {
        if (await ! comprobarUsuarioExistente(1)) {
            await crearUsuario(1, 'Juan');
        }
        if (await ! comprobarUsuarioExistente(2)) {
            await crearUsuario(2, 'Carlos');
        }
        if (await ! comprobarUsuarioExistente(3)) {
            await crearUsuario(3, 'Manuel');
        }
        console.log('Usuario creado exitosamente.');
    } catch (err) {
        console.error('Error al crear usuario:', err);
        return null
    }


    try {
        const usuarios = await selectUsuarios() 
        console.log('estos son los usuarios:', usuarios)
    } catch (err) {
        console.error('Error en tabla de "usuarios":', err);
        return null
    }
  }
  
  main(); 
  
module.exports = [
  selectUsuarios,
  crearTablaUsuarios,
  crearUsuario,
  comprobarUsuarioExistente
]