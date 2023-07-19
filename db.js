const sqlite3 = require('sqlite3').verbose();

function conectar(){
    // Conectar a la base de datos SQLite
    const conexion= new sqlite3.Database('ticktok.db');
    return conexion
} 

function desconectar(conexion){
    conexion.close();
    return null
}


module.exports = {
  conectar,
  desconectar
}