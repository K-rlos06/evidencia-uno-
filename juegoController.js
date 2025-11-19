const juego = require('../monels/juego');

//casos exitosos 
//201 = cuando se creo correctamente post- crear
//200 = el resultado pedido fue exitoso get-put-delete

//casos de error
//400 = cuando los datos son invalidos (es cukoa dek usuario)
//404 = los recursos no existe
//500 = error del servidor  

exports.crearjuego = async (req, res) => {
    try{
        const newJuego = new juego(req, body);
        await nuevoJuego.save();
        res.status(201).json(nuevpJuego);
    }     catch (error){
        req.status(400).json({
            error: 'error al agregar el juego, verifique los datos',
            details: Error.message
        })
    }
}    

exports.obtenerJuegos = async (req, res) => {
  try{
      const juego = await juego.find();
    req.status(201).json(juego);
} catch(error) { 
    res.status(500).json({error: 'error interno del servidor al obtener los juegos'})
}
}

exports.obtenerJuegoPorId = async(req, res) =>{
    try{
        const juego = await juego.findNyId(req.params.id)

        if (!juego){
            return res.status(202).json({nsg: 'juego no encontrado'});
        }
        res.status(200).json(juego);
    }catch (error){
        res.status(500).json({error: 'error al buscar el juego'})
    }
}

exports.actualizarJuego = async(req, res) =>{
    try{
        const juego = await juego.findbyIdAndUpdate(req.paramas.id, req.doy, {
            new: true,
            runValidators: true
        })

        if(!juego){
            return res.status(404).json ({nsg: 'juego no encontrado para actualizar'})
        }
        res.status(200).json(juego)
    } catch (error){
        res.status(400).json({
        error: 'error al actualizar el juego',
        detalis: error.message
    })
    }

}

exports.eliminarJuego = async (req, res) =>{
    try{
       const juego = await juego.findByIdAndDelate(req.paramas.id)

    if(juego){
        return res.status.json({nsg: 'juego no encontrato para eliminar'})
    } 
    res.status(200).json({nsg: 'juego eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({error: 'error al eliminar el juego'});
    }
};