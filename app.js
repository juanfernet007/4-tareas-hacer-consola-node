require('colors');
const { inquirerMenu, pausar, leerInput, obtenerTareaPorInquirer, confirmarEliminacion, obtenerTareasPorInquirerCheckbox } = require('./helpers/inquirerPersonal');
const { guardarBD, leerBD } = require('./helpers/interaccionBD');
const Tareas = require('./modules/tareas');
const Tarea = require('./modules/tarea');

const main = async ()=> {       
   
    let opt = '';
    const tareas = new Tareas();

    const tareasBDArr = leerBD();
    
    if( tareasBDArr ){        
        tareas.cargarTareasByArray( tareasBDArr );     
    }

    do {
        
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1': //crear tarea
                const desc = await leerInput( 'Descripción de la tarea:' );
                tareas.crearTarea(desc);                
                break;
            case '2': //listar todas las tareas
                 tareas.listarTareasCompleto();   
                break;    
            case '3': //listar tareas completadas
                tareas.listarTareasPendientesCompletadas(true);
                break;
            case '4': //listar tareas pendientes
                tareas.listarTareasPendientesCompletadas(false);
                break;
            case '5': //completar tarea
                const idsTareas = await obtenerTareasPorInquirerCheckbox(tareas.listadoArr);
                // console.log(idsTareas);
                tareas.marcarCompletadas(idsTareas);
                break;
            case '6': //borrar tarea
                const id = await obtenerTareaPorInquirer(tareas.listadoArr);
                if( id != '0'){
                    const confirma = await confirmarEliminacion(tareas._listado[id]);
                    
                    if(confirma){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente!')
                    }
                }

                break;
        }

        guardarBD( tareas.listadoArr );
        
        await pausar();


    } while (opt !== '0');

}

main();