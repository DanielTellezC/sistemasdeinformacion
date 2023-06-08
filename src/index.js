const express = require("express");
const morgan = require("morgan");
const engine = require('ejs-mate');
const path = require("path");
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');



//Requerimientos o inicializaciones
const app = express();

require('./passport/local-auth');
require('./database');

//Configuraciones
app.set('views', path.join(__dirname,'views'));
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('port', process.env.PORT || 3000);

//Midleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'pepitopiernaslargas',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMensaje = req.flash('signupMensaje');
    app.locals.signinMensaje = req.flash('signinMensaje');
    app.locals.user = req.user;
    next();
});


//Carpeta pública para visualizar los estilos
app.use(express.static(__dirname+'/public'));

//Rutas
app.use('/', require('./routes/post.routes'));

// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto',app.get('port'));
});