const mongoose = require("mongoose");

const { Schema } = mongoose;

const inventarioSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    descripcion: {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    cantidad: {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    sucursal: {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    fecha: {
        type: Date,
        require: true,
        unique: false,
        trim: true
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

module.exports = mongoose.model("inventarios", inventarioSchema);