// src/services/InsumoService.js
const Insumo = require('../models/InsumoModel'); 

async function getListInsumos() {
    try {
        const result = await Insumo.find();
        return result;
    } catch (error) {
        throw new Error('Erro ao buscar todos os insumos: ' + error.message);
    }
}

async function getListInsumosByID(id) {
    try {
        const result = await Insumo.findById(id);
        if (!result) throw new Error('Insumo não encontrado');
        return result;
    } catch (error) {
        throw new Error('Erro ao buscar o insumo por ID: ' + error.message);
    }
}

async function createInsumo(data) {
    try {
        const novoInsumo = await Insumo.create(data);
        return novoInsumo;
    } catch (error) {
        
        throw new Error('Erro ao criar insumo: ' + error.message);
    }
}

async function atualizarInsumoPorId(id, data) { 
    try {
        const atualizacao = await Insumo.findByIdAndUpdate(id, data, {
            new: true, // Retorna o dado novo
            runValidators: true 
        });
        
        if (!atualizacao) throw new Error('Insumo não encontrado para atualização');
        
        return atualizacao;
    } catch (error) {
        throw new Error('Erro ao atualizar o insumo: ' + error.message);
    }
}

async function atualizarEstoqueDeInsumo(id, estoqueAtual) {
    try {
        const atualizacaoDoEstoque = await Insumo.findByIdAndUpdate(
            id, 
            { estoqueAtual }, 
            { new: true, runValidators: true }
        );

        if (!atualizacaoDoEstoque) throw new Error('Insumo não encontrado');

        return atualizacaoDoEstoque;
    } catch (error) {
        throw new Error('Erro ao atualizar estoque: ' + error.message);
    }
}

async function deletarInsumoPorId(id) {
    try {

        const deletarInsumo = await Insumo.findByIdAndDelete(id);
        
        if (!deletarInsumo) throw new Error('Insumo não encontrado');
        
        return deletarInsumo;
    } catch (error) {
        throw new Error('Erro ao deletar o insumo: ' + error.message);
    }
}


module.exports = { 
    getListInsumos, 
    getListInsumosByID, 
    createInsumo, 
    atualizarInsumoPorId, 
    atualizarEstoqueDeInsumo,
    deletarInsumoPorId
};