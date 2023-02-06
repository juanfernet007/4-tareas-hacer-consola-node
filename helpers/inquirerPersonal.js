const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = {
    type : 'list',
    name : 'opcion',
    message : '¿Que deseas hacer?',
    choices : [
        {
            value: '1',
            name : `${'1.'.green} Crear tarea`
        },
        {
            value: '2',
            name : `${'2.'.green} Listar Tareas`
        },
        {
            value: '3',
            name : `${'3.'.green} Listar Tareas Completadas`
        },
        {
            value: '4',
            name : `${'4.'.green} Listar Tareas Pendientes`
        },
        {
            value: '5',
            name : `${'5.'.green} Completar Tarea(s)`
        },
        {
            value: '6',
            name : `${'6.'.green} Borrar Tarea`
        },
        {
            value: '0',
            name : `${'0.'.green}  Salir`
        }        
    ]

}

const inquirerMenu = async() => {
    
    console.clear();
    console.log('==========================================='.green);
    console.log('     Seleccione una opción!    '.white);
    console.log('===========================================\n'.green);

    const { opcion }  = await inquirer.prompt([preguntas]);    
    
    return opcion;
}

const leerInput = async ( message ) => {

    const question = {
        type : 'input',
        name : 'descripcion',
        message,
        validate( value ) {
            if ( value.length === 0 ){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }

    const {descripcion} = await inquirer.prompt(question);
    return descripcion;
}

const pausar = async () => {

    const question = {
        type : 'input',
        name : 'pausaOpcion',
        message: `Pulsa ${ 'ENTER'.blue } para continuar` 
    }

    console.log('\n');
    await inquirer.prompt(question)
}

const obtenerTareaPorInquirer = async (tareas = []) => {
    //construir los choices (para los questions preguntas)
    const choicesTareas = tareas.map ( (tarea, i) => {
        const idx = `${i + 1}.`.green
        return {
            value : tarea.id,
            name : `${ idx } ${tarea.desc}`            
        }
    });

    choicesTareas.unshift({
        value : '0',
        name: '0. '.green +'Regresar'
    });

    const question = {
        type : 'list',
        name : 'tareaId',
        message : '¿Cuál de las siguientes tareas desea borrar?',
        choices : choicesTareas        
    }
    
    const { tareaId } = await inquirer.prompt( question );

    return tareaId;
}

const confirmarEliminacion = async ( tarea ) => {
    const question = {
       type : 'confirm',
       name : 'eleccion',
       message : `¿ De verdad desea borrar la tarea ${tarea.desc} ?`  
    }

    const { eleccion } = await inquirer.prompt( question );
    return eleccion;
}


const obtenerTareasPorInquirerCheckbox = async (tareas = []) => {

    const choicesTareas = tareas.map ( (tarea, i) => {

        const idx = `${i + 1}.`.green
        return {
            value : tarea.id,
            name : `${ idx } ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false
        }
    });

    const question = {
        type : 'checkbox',
        name : 'ids',
        message : '¿Cuál de las siguientes tareas desea completar?',
        choices : choicesTareas        
    }
    
    const { ids } = await inquirer.prompt( question );

    return ids;
}



module.exports = {
    inquirerMenu,
    pausar,
    leerInput,
    obtenerTareaPorInquirer,
    confirmarEliminacion,
    obtenerTareasPorInquirerCheckbox
}