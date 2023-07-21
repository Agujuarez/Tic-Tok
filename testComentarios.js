const { selectComentarios, crearTablaComentarios, crearComentario, comprobarComentarioExistente } = require ('./comentarios')

async function test() {
    try {
      await crearTablaComentarios();
      console.log('Tabla "Videos" creada exitosamente.');
    } catch (err) {
      console.error('Error al crear la tabla "Videos":', err);
      return null
    }

    try {
        if (await ! comprobarComentarioExistente(1)) {
            await crearComentario(1, 'Esta buena');
        }
        if (await ! comprobarComentarioExistente(2)) {
            await crearComentario(2, 'Recomendada');
        }
        if (await ! comprobarComentarioExistente(3)) {
            await crearComentario(3, 'excelente');
        }
        console.log('Comentario creado exitosamente.');
    } catch (err) {
        console.error('Error al crear Comentario:', err);
        return null
    }


    try {
        const comentarios = await selectComentarios() 
        console.log('estos son los comentarios:', comentarios)
    } catch (err) {
        console.error('Error en tabla de "comentarios":', err);
        return null
    }
  }
  
test();