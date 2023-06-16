const mongoose = require("mongoose");

const { Schema } = mongoose;

const ventaSchema = new Schema({
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
    entregado: {
        type: Boolean,
        require: true, 
        unique: false
    },
    costo: {
        type: Intl,
        require: true,
        unique: false
    },
    cuenta:[{
        type: Schema.Types.ObjectId,
        ref: 'sucursales'
    }]
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('ventas', ventaSchema);