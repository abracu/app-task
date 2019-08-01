const express = require('express');
const router = express.Router();

//importar express validator
const { body } = require('express-validator');

// Importar el controlador
const indexController = require('../controllers/index');
const tareasController = require('../controllers/tareas');


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

    // Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea);

    // Cambiar estado Tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    // Cambiar estado Tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);
    return router;
}