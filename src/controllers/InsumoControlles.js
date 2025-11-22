import { getListInsumos, getListInsumosByID, createInsumo, atualizarInsumoPorId, deletarInsumoPorId } from 'src/services/InsumoService.js'
import { atualizarEstoqueDeInsumo } from '../services/InsumoService';

async function getListInsumosController(req, res) {
    try {
        const result = await getListInsumos();
        return res.status(200).json(result) 
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

async function getListInsumosByIdController(req, res) {
    try {
        const result = await getListInsumosByID();
        return res.status(200).json(result) 
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

async function createInsumoController (req, res){
     try {
        const data = req.body;
        const criarInsumo = await createInsumo(data);

        return res.status(201).json(criarInsumo);
    } catch (error) {
        res.status(500).json({ error: "Erro no banco de dados"})
    }
}

async function atualizarInsumoPorIdController(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
        const atualizacao = await atualizarInsumoPorId( id, data);

        if(!atualizacao){
            res.status(404).json({ error: "Insumo não encontrado"})
        }

        return res.status(200).json(atualizacao);

    } catch (error) {
        res.status(500).json({ error: "Não foi possível atualizar por conta do banco"})
    }
}

async function atualizarEstoqueDeInsumoController (req, res){
    try {
        const { id } = req.params;
        const { quantidadeEmEstoque } = req.body; 
        const atualizaoDoEstoque = await atualizarEstoqueDeInsumo( id, quantidadeEmEstoque);

        if(!atualizacao){
            res.status(404).json({ error: "Insumo não encontrado"})
        }

        return res.status(200).json(atualizaoDoEstoque);

    } catch (error) {
        res.status(500).json({ error: "Não foi possível atualizar o estoque por conta do banco"})
    }
}

async function deletarInsumoPorIdController ( req, res ){
    try {
        const { id } = req.params
        const deletarInsumo = await deletarInsumoPorId(id);

        if (!deletado) {
            return res.status(404).json({ error: "Insumo não encontrado" });
        }

        return res.status(200).json({ message: "Insumo deletado com sucesso"})
    } catch (error) {
        res.status(500).json({ error: "Erro ao apagar ao insumo por conta do banco"})
    }
}

export {
    getListInsumosByIdController,
    getListInsumosController,
    createInsumoController,
    atualizarInsumoPorIdController,
    atualizarEstoqueDeInsumoController,
    deletarInsumoPorIdController
}