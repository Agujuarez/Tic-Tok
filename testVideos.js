const { selectVideos, crearTablaVideos, crearVideo, comprobarVideoExistente } = require('./videos')

async function test() {
    try {
      await crearTablaVideos();
      console.log('Tabla "Videos" creada exitosamente.');
    } catch (err) {
      console.error('Error al crear la tabla "Videos":', err);
      return null
    }

    try {
        if (await ! comprobarVideoExistente(1)) {
            await crearVideo(1, 'Rambo');
        }
        if (await ! comprobarVideoExistente(2)) {
            await crearVideo(2, 'Star Wars');
        }
        if (await ! comprobarVideoExistente(3)) {
            await crearVideo(3, 'Roky');
        }
        console.log('Video creado exitosamente.');
    } catch (err) {
        console.error('Error al crear Video:', err);
        return null
    }


    try {
        const videos = await selectVideos() 
        console.log('estos son los videos:', videos)
    } catch (err) {
        console.error('Error en tabla de "videos":', err);
        return null
    }
  }
  
test();