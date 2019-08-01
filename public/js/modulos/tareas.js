import Swal from 'sweetalert2';
import axios from "axios";

// Delegations
const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    tareas.addEventListener('click', e => {
        //Cambiar el estado a una tarea
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // Request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(function(respuesta) {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo');
                    }
                })
        }
        if (e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement,
                idTarea = tareaHTML.dataset.tarea;


            Swal.fire({
                title: 'Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!!!',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/tareas/${idTarea}`;

                    axios.delete(url, { params: { idTarea } })
                        .then(function(respuesta) {
                            if (respuesta.status === 200) {
                                // Eliminar el nodo
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                // Opcional
                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                )
                            }
                        })
                }
            })
        }
    });
}

export default tareas;