const mongoose = require('mongoose');

const municipioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxLength: 250,
        required: true,
    },
    estadoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estado',
        required: true,
    }
})

const Municipio = mongoose.model('Municipio', municipioSchema);

module.exports = Municipio;