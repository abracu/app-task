const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexion a la Base de Datos
const db = require('./config/db');

// Importar el modelo
require('./models/proyectos');
require('./models/tareas');
require('./models/usuarios');

db.sync()
    .then(() => console.log('Conectado a la BD'))
    .catch(error => console.log('Ocurrio un error', error));

// Creando una app de express
const app = express();

// Donde cargar los archivos staticos
app.use(express.static('./public'));

// Habilitar pug
app.set('view engine', 'pug');

// Agregamos validator a toda la aplicacion
// app.use(expressValidator());

// Agregar la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Flash messager
app.use(flash());

app.use(cookieParser());

// Sesiones nos permiten navegar entre distinta paginas sin volver a autenticarnos
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

// Pasar vardum a la aplicacion
app.use((request, response, next) => {
    response.locals.vardump = helpers.vardump;
    response.locals.mensajes = request.flash();
    next();
});

// Habilitar bodyParser para leer datos del formulario (Nativa)
app.use(bodyParser.urlencoded({ extended: true }));

// Rotes 
app.use('/', routes());

app.listen(3000, () => {
    console.log('Corriendo en el puerto ', 3000);
});