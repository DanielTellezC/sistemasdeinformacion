const mongoose = require("mongoose");

const { Schema } = mongoose;

const guiaSchema = new Schema({
    clienteenvia:{
        type: String,
        require: true,
        unique: false,
        trim: true 
    },
    clienterecibe:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    lugardeenvio:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    lugardestino:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    numeroguia:{
        type: Intl,
        require: true,
        unique: false,
        trim: true
    },
    codigobarras:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    estado:{
        type: String,
        require: true,
        unique: false,
        trim: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('guias', guiaSchema)