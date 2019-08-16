const Usuarios = require('../models/usuarios');

exports.formCrearCuenta = (request, response) => {
    response.render('cuenta', {
        nombrePagina: 'Crear Cuenta en App-Task'
    });
}

exports.crearCuenta = async(request, response) => {
    // Leer los datos
    const { email, password } = request.body;

    // Crear el usuario

    try {
        await Usuarios.create({
            email,
            password
        });
        response.redirect('/iniciar-sesion')
    } catch (error) {
        request.flash('error', error.errors.map(error => error.message));
        response.render('cuenta', {
            mensajes: request.flash(),
            nombrePagina: 'Crear Cuenta en App-Task',
            email,
            password
        });
    }

}