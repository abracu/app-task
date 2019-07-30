const Proyectos = require('../models/proyectos');

exports.indexHome = async(require, response) => {
    const proyectos = await Proyectos.findAll();
    response.render('index', {
        nombrePagina: "Proyectos",
        proyectos
    });
}

exports.getProyecto = async(require, response) => {
    const proyectos = await Proyectos.findAll();
    response.render('proyecto', {
        nombrePagina: "Nuevo Proyectos",
        proyectos
    });
}

exports.saveProyecto = async(require, response) => {
    const proyectos = await Proyectos.findAll();
    // console.log(require.body);
    const { nombre, url } = require.body;
    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' });
    }
    // Si hay errores
    if (errores.length > 0) {
        response.render('proyecto', {
            nombrePagina: 'Nuevo proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores denemos insertar a BD
        await Proyectos.create({ nombre, url });
        response.redirect('/');
    }
}

exports.proyectoPorUrl = async(require, response, next) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: require.params.url
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    if (!proyecto) return next();

    console.log(proyecto);

    response.render('tareas', {
        nombrePagina: "Tareas del Proyecto",
        proyecto,
        proyectos
    });
}

exports.proyectoEditar = async(require, response) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: require.params.id
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    response.render('proyecto', {
        nombrePagina: "Editar Proyecto",
        proyectos,
        proyecto
    });

}

exports.updateProyecto = async(require, response) => {
    const proyectos = await Proyectos.findAll();
    // console.log(require.body);
    const { nombre, url } = require.body;
    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' });
    }
    // Si hay errores
    if (errores.length > 0) {
        response.render('proyecto', {
            nombrePagina: 'Nuevo proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores denemos insertar a BD
        await Proyectos.update({ nombre }, { where: { id: require.params.id } });
        response.redirect('/');
    }
}

exports.eliminarProyecto = async(require, response, next) => {

    const { urlProyecto } = require.query;

    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

    if (!resultado) {
        return next();
    }
    response.status(200).send('Proyecto eliminado correctamente');
}