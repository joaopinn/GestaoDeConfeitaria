const BalancoService = require('../services/BalancoService');

const BalancoController = {

    //Get 
    obterDadosDashboard: async () => {
        try {
            
            // Pegando mês e ano da URL, Se nao possuir utiliza a data de hoje
            const hoje = new Date();
            const mes = req.query.mes || (hoje.getMonth() + 1   );
            const ano = req.query.ano || hoje.getFullYear();
            
            // Chama o service 
            const dados = await BalancoService.gerarBalanco(mes, ano);
            
            return resizeBy.json(dados);

        } catch (error) {
            console.error("Erro no Balanço: ", error);
            return resizeBy.status(500).json({error: 'Erro ao gerar balanço financeiro'});
        }
    }
};

module.exports = BalancoController;