const express = require('express');
const app = express();
const multer = require('multer'); // Dependencia para manejar la subida de archivos
const jwt = require('jsonwebtoken');
const cors = require('cors');
const secretKey = '1234'

// Función para generar el token
function generarToken(datosUsuario) {
  const token = jwt.sign(datosUsuario, secretKey);
  return token
}

const corsOptions = {
  origin: 'http://localhost:3001', // Especifica el origen permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Especifica los métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Especifica los encabezados permitidos
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('peticion Get');
})

app.post('/generar-token', (req, res) => {
  // Supongamos que tienes un objeto con los datos del usuario
  const datosUsuario = {
    nombre: req.user.nombre,
    password: req.user.password
  }

  const token = generarToken(datosUsuario);
  res.send(token);
})

// Configuración de Multer para la subida de videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán los videos subidos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo: timestamp-originalname
  }
});
const upload = multer({ storage: storage });

// Ruta para subir videos
app.post('/upload', upload.single('video'), (req, res) => {
  // Aquí puedes agregar la lógica para procesar el video subido
  // req.file contiene la información del video subido (nombre, ruta, etc.)
  res.send('¡El video ha sido subido con éxito!');
});

// Ruta para descargar videos
app.get('/download/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = __dirname + '/uploads/' + fileName;

  res.download(filePath, (err) => {
    if (err) {
      // Manejo de errores
      res.status(404).send('No se pudo descargar el archivo');
    }
  });
});

app.listen(3000, () => {
  console.log('La aplicación está funcionando en el puerto 3000');
});
