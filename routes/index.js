const express = require('express');
const router = express.Router();

//importar express validator
const { body } = require('express-validator');

// Importar el controlador
const indexController = require('../controllers/index');


module.exports = function() {

    // Rutas para el home
    router.get('/', indexController.indexHome);
    router.get('/nuevo-proyecto', indexController.getProyecto);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        indexController.saveProyecto
    );
    //Listar proyecto
    router.get('/proyectos/:url', indexController.proyectoPorUrl);

    // Actualizar proyecto
    router.get('/proyecto/editar/:id', indexController.proyectoEditar);

    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        indexController.updateProyecto
    );
    // Eliminar proyecto
    router.delete('/proyectos/:url', indexController.eliminarProyecto);

    return router;
}