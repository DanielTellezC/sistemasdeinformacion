const mongoose = require('mongoose');
const { mongodb } = require('./keys');
console.log("Esta es la ur de la conexion de mongo:    ", mongodb.URL);

mongoose.connect(mongodb.URL,{})
    .then(db => console.log('base de datos conectada'))
    .catch(err => console.error(err));