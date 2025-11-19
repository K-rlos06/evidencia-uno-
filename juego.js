const mongoose =requiere ('mongoose');

const juegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre del juego es obligatorio'],
        trim: true,
        unique: true
    },

    plataforma: {
        type: String,
        required:[true, 'la plataforma es obligatoria']
    },

    portadaURL: {
        type: String,
        require: false
    },

    estado: {
        enum: ['pendiente','jugando', 'completo'],
        default:'pendiente'
    },

    horasjugadas: {
        type: Number,
        dafault: 0,
        min: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(juegoSchema, juegoSchame);