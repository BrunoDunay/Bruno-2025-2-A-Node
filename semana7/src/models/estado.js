const mongoose = require('mongoose');

const estadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        maxLength: 250,
        required: true,
        unique: true,
    },
})

const Estado = mongoose.model('Estado', estadoSchema);

module.exports = Estado;