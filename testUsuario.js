const { crearTablaUsuarios, crearUsuario, comprobarUsuarioExistente, selectUsuarios } = require('./usuario');

async function test() {
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
  
test(); 