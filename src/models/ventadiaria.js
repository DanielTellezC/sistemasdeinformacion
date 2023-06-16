const mongoose = require("mongoose");

const { Schema } = mongoose;

const ventadiariaSchema = new Schema({
    costo:{
        type: Intl,
        require: true,
        unique: false,
        trim: true
    },
    cuenta:[{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('ventasdiarias', ventadiariaSchema);