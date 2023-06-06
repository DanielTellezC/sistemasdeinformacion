const express = require("express");
const morgan = require("morgan");
const engine = require('ejs-mate');
const path = require("path");



//Requerimientos o inicializaciones
const app = express();

require('./database');

//Configuraciones
app.set('views', path.join(__dirname,'views'));
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('port', process.env.PORT || 3000);

//Midleware

//Carpeta pública para visualizar los estilos
app.use(express.static(__dirname+'/public'));

//Rutas
app.use('/', require('./routes/post.routes'));

// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto',app.get('port'));
});