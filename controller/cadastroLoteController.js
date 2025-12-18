const cadastroLoteService = require('../services/cadastroLoteService');
const { NaoAutorizadoErro, ModeloInvalidoErro } = require('../erros/typeErros');

class cadastroLoteController {

    async dadosLote(req, res) {
        try {
            
            let dadosLote = await cadastroLoteService.dadosParaPage();
            res.status(200).json(dadosLote)

        } catch (err) {
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }


    async gerarTabela(req, res) {
        try {
            const { ID } = req.params;

            console.log('ID recebido no controller:');
            console.log(ID);

            if ( !ID ) {
                throw new ModeloInvalidoErro(400,"Seleciona uma ordem de produção.");
            }


            let dadosLote = await cadastroLoteService.gerarTabela(ID);
            

            if(dadosLote.OrdemProducao.length === 0) {
                throw new ModeloInvalidoErro(400,"Não tem lote criado para essa ordem.");
            } else {
                 res.status(200).json(dadosLote)
            }

        } catch (err) {
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }

    async criarLote(req, res) {
        try {
            const { 
            id, Codigo, Descricao, Linha, Receita, QuantidadePrevista,TamanhoBatch } = req.body;

            if ( !id || !Codigo || !Descricao || !Linha || !Receita || !QuantidadePrevista || !TamanhoBatch ) {
                throw new ModeloInvalidoErro(400, "Todos os campos são obrigatórios.");
            }

            // colocar await
           const salve = await cadastroLoteService.criarLote(
            id,
            Codigo,
            Descricao,
            Linha,
            Receita,
            QuantidadePrevista,
            TamanhoBatch
           )

           console.log('salve no controller:');
           console.log(salve)

            if(salve) {
                res.status(201).json({ message:  salve.value});
            }
            

        } catch (err) {
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }

}

module.exports = cadastroLoteController;