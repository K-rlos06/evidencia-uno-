const mongoose = requiere('mongoose');
const { Schema } = mongoose;

const ResenaSchena = new mongoose.Schema({
    juegos: {
        type: Schema, Types,objectId,
        ref: 'juego',
        required: true
    },

    puntuacion:{
        type: Number,
        required: true,
        min: 1,
        max: 100
    },

    texto:{
        type: String,
        required: [true, 'el texto de la reseña es obligatorio']
    },

    autor: {
        type: String,
        default: 'usuario GameTracker'
    },

    tiemstampos: true
});

module.exports = mongoose.model('Resena', ResenaSchena);