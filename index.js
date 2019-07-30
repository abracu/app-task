const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Helpers con algunas funciones
const helpers = require('./helpers');


// Crear la conexion a la Base de Datos
const db = require('./config/db');

// Importar el modelo
require('./models/proyectos');

db.sync()
    .then(() => console.log('Conectado a la BD'))
    .catch(error => console.log('Ocurrio un error', error));

// Creando una app de express
const app = express();

// Donde cargar los archivos staticos
app.use(express.static('./public'));

// Habilitar pug
app.set('view engine', 'pug');

// Agregar la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Pasar vardum a la aplicacion
app.use((request, response, next) => {
    response.locals.vardump = helpers.vardump;
    next();
});

// Habilitar bodyParser para leer datos del formulario (Nativa)
app.use(bodyParser.urlencoded({ extended: true }));

// Rotes 
app.use('/', routes());

app.listen(3000, () => {
    console.log('Corriendo en el puerto ', 3000);
});