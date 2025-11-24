const { 
    getListInsumos, 
    getListInsumosByID, 
    createInsumo, 
    atualizarInsumoPorId, 
    deletarInsumoPorId,
    atualizarEstoqueDeInsumo 
} = require('../services/InsumoService');

async function getListInsumosController(req, res) {
    try {
        const result = await getListInsumos();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function getListInsumosByIdController(req, res) {
    try {
        
        const { id } = req.params;
        const result = await getListInsumosByID(id);
        
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function createInsumoController(req, res) {
    try {
        const data = req.body;
        const novoInsumo = await createInsumo(data); 

        return res.status(201).json(novoInsumo);
    } catch (error) {
        return res.status(500).json({ error: "Erro no banco de dados: " + error.message });
    }
}

async function atualizarInsumoPorIdController(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
        const atualizacao = await atualizarInsumoPorId(id, data);

        if (!atualizacao) {
            return res.status(404).json({ error: "Insumo não encontrado" });
        }

        return res.status(200).json(atualizacao);
    } catch (error) {
        return res.status(500).json({ error: "Não foi possível atualizar: " + error.message });
    }
}

async function atualizarEstoqueDeInsumoController(req, res) {
    try {
        const { id } = req.params;
        

        const { estoqueAtual, quantidadeEmEstoque } = req.body;
        
        // Usa o que vier (prioridade para estoqueAtual)
        const novaQtd = estoqueAtual !== undefined ? estoqueAtual : quantidadeEmEstoque;

        const resultado = await atualizarEstoqueDeInsumo(id, novaQtd);

        
        if (!resultado) {
            return res.status(404).json({ error: "Insumo não encontrado" });
        }

        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar estoque: " + error.message });
    }
}

async function deletarInsumoPorIdController(req, res) {
    try {
        const { id } = req.params;
        const resultado = await deletarInsumoPorId(id);

        
        if (!resultado) {
            return res.status(404).json({ error: "Insumo não encontrado" });
        }

        return res.status(200).json({ message: "Insumo deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao apagar insumo: " + error.message });
    }
}


module.exports = {
    getListInsumosByIdController,
    getListInsumosController,
    createInsumoController,
    atualizarInsumoPorIdController,
    atualizarEstoqueDeInsumoController,
    deletarInsumoPorIdController
};