const express = require('express');
const router = express.Router();
const CatalogoController = require('../controllers/CatalogoController');

// Rotas 
router.get('/', CatalogoController.listar);         // GET /api/catalogo
router.get('/:id', CatalogoController.buscarPorId);    // GET /api/catalogo/:id
router.post('/', CatalogoController.criar);         // POST /api/catalogo
router.put('/:id', CatalogoController.atualizar);      // PUT /api/catalogo/:id
router.delete('/:id', CatalogoController.remover);     // DELETE /api/catalogo/:id

module.exports = router;