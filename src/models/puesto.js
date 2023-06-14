const mongoose = require("mongoose");

const { Schema } = mongoose;

const puestoSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        unique: false,
        trim: true
    },

});

module.exports = mongoose.model("puestos", puestoSchema);