const fs = require('fs');
const archivoRuta = './bd/data.json';

const guardarBD = (data) => {    
    fs.writeFileSync(archivoRuta, JSON.stringify(data));
}

const leerBD = () => {
    const data = fs.readFileSync(archivoRuta, {encoding: 'utf8'});
    return JSON.parse(data);
}

module.exports = {
    guardarBD,
    leerBD
}