const colors = require('colors');
const Tarea = require('./tarea');

/**
 * _listado :
 *      { 'uid-1234567': { id : 12, desc: tarea1, completadoEn: 92391} },
 *      { 'uid-1234567': { id : 12, desc: tarea1, completadoEn: 92391} },
 *      { 'uid-1234567': { id : 12, desc: tarea1, completadoEn: 92391} }
 */
class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        const lista = [];
        Object.keys (this._listado).forEach (( key )=> {
            const tarea = this._listado[key];
            lista.push (tarea);
        });
        return lista
    }

    crearTarea( desc = '') {
        
        const tarea = new Tarea( desc );
        this._listado[ tarea.id ] = tarea;
        console.log( `tarea ${desc} creada` );
    }

    cargarTareasByArray (tareasArray = []) {
        tareasArray.forEach ( tareaElement => {
            this._listado[ tareaElement.id ] = tareaElement;
        });
    }
    
    listarTareasCompleto () {
        console.log('');
        this.listadoArr.forEach ( ( tarea, i ) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn != null ? `${colors.green('Completada')} en ${completadoEn}` : 'Pendiente'.red;

            console.log (`${idx} ${desc} :: ${estado}`);

        });
    }

    listarTareasPendientesCompletadas ( completadas = true ) {
        console.log('');
        
        let contador = 0;
        this.listadoArr.forEach ( ( tarea, i ) => {            
            const { desc, completadoEn } = tarea;
            if ( completadas && completadoEn != null) {
                contador++;
                console.log (`${colors.green(contador)} ${desc} :: ${ 'Completada en'.green } :: ${completadoEn} `);
            } if (completadas == false && completadoEn == null) {
                contador++;
                console.log (`${colors.green(contador)} ${desc} :: ${ 'Pendiente'.red } `);
            }
            
        });
    }

    borrarTarea( tareaId ) {
        delete this._listado[tareaId];
    }

    marcarCompletadas( tareasId = [] ) {
        
        tareasId.forEach ( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
                
        });
        
        this.listadoArr.forEach( tarea => {

            if( !tareasId.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }

        });    
    
    }

}

module.exports = Tareas;
