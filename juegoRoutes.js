const express = require('express');
const router = express.Router();
const juegoControllers = require('../controller/juegoController');

router.post('/', juegoController.crearJuego);
router.get('/', juegoControllers.obtenerJuego);
router.get('/:id', juegoController.obtenerJuegoPorId);
router.put('/:id', juegoController.actualizarJuego);
router.delete('/:id', juegoControllers.eliminarJuego);

module.exports = router;