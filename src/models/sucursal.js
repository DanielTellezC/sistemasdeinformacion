const mongoose = require("mongoose");

const { Schema } = mongoose;

const sucursalSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    ciudad:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    direccion: {
        type: String,
        require: true,
        unique: false,
        trim: true
    },

},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("sucursales", sucursalSchema);