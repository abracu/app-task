const Proyectos = require('../models/proyectos');
const Tareas = require('../models/tareas');

exports.agregarTarea = async(request, response, next) => {

    // Obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({ where: { url: request.params.url } });

    // Leer el valor del input
    const { tarea } = request.body;

    // Estado inicial del proyecto y ID del proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertar en la Base de Datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId })

    if (!resultado) {
        return next();
    }

    // Redireccionar
    response.redirect(`/proyectos/${request.params.url}`);
}

exports.cambiarEstadoTarea = async(request, response, next) => {
    const { id } = request.params;
    const tarea = await Tareas.findOne({ where: { id } });

    // Cambiar estado
    let estado = 0;
    if (tarea.estado === estado) {
        estado = 1;
    }

    tarea.estado = estado;

    const resultado = await tarea.save();

    if (!resultado) return next();

    response.status(200).send('Actualizado');
}

exports.eliminarTarea = async(request, response, next) => {
    const { id } = request.params;

    // Eliminar la tarea
    const resultado = await Tareas.destroy({ where: { id } });

    if (!resultado) return next();

    response.status(200).send('Tarea Eliminada Correctamente');

}