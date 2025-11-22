import express from 'express';
import {getListInsumosController, getListInsumosByIdController, createInsumoController, atualizarEstoqueDeInsumoController, atualizarInsumoPorIdController, deletarInsumoPorIdController } from 'src/controllers/InsumoControlles.js'
import { atualizarInsumoPorId } from '../services/InsumoService';

const router = express.Router();

router.get('/getInsumos', getListInsumosController)
router.get('/getListInsumoById', getListInsumosByIdController)
router.post('/createInsumo', createInsumoController)
router.put('/atualizarInsumo:{id}', atualizarInsumoPorId)
router.patch('/atualizarEstoque/:id', atualizarEstoqueDeInsumoController)
router.delete('/deletarInsumo', deletarInsumoPorIdController)