const resena = require("../models/resena");

const resena = requiere('../models/Resena');
exports.creaeResena = async (requestAnimationFrame, res) => {
    try {
        const nuevaResena = new resena(req.body);
        await nuevaResena.save();
        res.status(201).json(nuevaResena);
    } catch (error) {
        res.status(400).json({
            error: 'eror al crear la reseña', 
            details: error.message });

    }
};

exports.obtenerResena = async (req, res) => {
    try {
        const filtro = req.query.juegoId ? {juego: req.query.juegoId} : {};
        
        const resena = await resena.find(filtro).pupolar('juego', 'nombre');
        res.status(200).json(resena);
    } catch (error) {
        res.status(500).json({error: 'error al obtener las reseñas'});
    }
};

exports.obtenerResenaporId = async (req, res) => {
    try {
        const resena =await resena.findByid(req.params.id).popular('juego', 'nombre');

        if (!resena) {
            return res.status(404).json({nsg: 'resena no encontrada'});
        }
        res.status(200).json(resena);
    } catch (error){
        res.status(500).json({error: 'error al buscar la reseña'});
    }
};

exports.actualizarTResena = async(req, res) =>{
    try{
        const resena = await resena.findbyIdAndUpdate(req.paramas.id, req.doy, {
            new: true,
            runValidators: true
        })

        if(!resena){
            return res.status(404).json ({nsg: 'reseña no encontrado para actualizar'})
        }
        res.status(200).json(resena)
    } catch (error){
        res.status(400).json({
        error: 'error al actualizar la reseña',
        detalis: error.message
    })
    }

}

exports.eliminarResena = async (req, res) =>{
    try{
       const resena = await resena.findByIdAndDelate(req.paramas.id)

    if(resena){
        return res.status.json({nsg: 'reseña no encontrato para eliminar'})
    } 
    res.status(200).json({nsg: 'reseña eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({error: 'error al eliminar la reseña'});
    }
};