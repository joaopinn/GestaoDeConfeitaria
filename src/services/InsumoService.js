import { json } from "express";
import InsumoModel from "../models/InsumoModel";

const Produto = InsumoModel;

async function getListInsumos() {
    try {
        const result = await Produto.find();
        return result;
    } catch (error) {
        throw new Error('Erro ao buscar todos os insumos: ' + error.message)
    }
}

async function getListInsumosByID(id) {
    try {
        const result = await Produto.findById(id);
        return result;
    } catch (error) {
        throw new Error('Erro ao buscar o insumo por ID: ' + error.message)
    }
}

async function createInsumo(data){
    try {
        const novoInsumo = Produto.create(data);
        return novoInsumo;
    } catch (error) {
        res.status(400),json({ error: "Erro ao criar o produto"})
    }
}

async function atualizarInsumoPorId (data, id){
    try {
        const atualizacao = Produto.findByIdAndUpdate(id, data, {
            new: true,
            trueValidators: true
        })
        return atualizacao
    } catch (error) {
        res.status(400).json({ error: "Error ao atualizar o insumo"})
    }
}

async function atualizarEstoqueDeInsumo(id, estoqueAtual) {

    try {
        const atualizacaoDoEstoque = Produto.findByIdAndUpdate(id, {estoqueAtual}, {
            new: true,
            trueValidators: true
        })

        return atualizacaoDoEstoque;
    } catch (error) {
        resstatus(400).json({ error: "Erro ao atualizar a quantidade de estoque"})
    }
    
}

async function deletarInsumoPorId ( id ){
    try {
        const deletarInsumo = Produto.findByIdAndDelete(id);
        return deletarInsumo;
    } catch (error) {
        res.status(400);json({ error: "Erro ao deletar o insumo"})
    }
}

export { 
    getListInsumos, 
    getListInsumosByID, 
    createInsumo, 
    atualizarInsumoPorId, 
    atualizarEstoqueDeInsumo,
    deletarInsumoPorId
}