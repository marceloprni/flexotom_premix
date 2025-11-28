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

    async criarLote(req, res) {
        try {
            const { Lote, materiaPrimaId, materiaPrimaDescricao } = req.body;

            if ( !Lote || !materiaPrimaId || !materiaPrimaDescricao) {
                throw new ModeloInvalidoErro("Todos os campos são obrigatórios.");
            }

           const salve = await cadastroLoteService.criarLote(Lote, materiaPrimaId, materiaPrimaDescricao)


            if(salve) {
                res.status(201).json({ message: "Lote criado com sucesso!" });
            }
            

        } catch (err) {
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }

    async deletaLoteUnico(req, res) {
        try {
        const deleteLoteId  = req.params.deleteLote;

        if ( !deleteLoteId ) {
                throw new ModeloInvalidoErro("campo Id Vazio.");
        }

        const deleteLote = cadastroLoteService.deletarLote(deleteLoteId)

         if(deleteLote) {
                res.status(201).json({ message: "Deletado com sucesso!" });
            }
        } catch (err) {
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }
}

module.exports = cadastroLoteController;