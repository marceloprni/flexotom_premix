const visualizarLoteService = require('../services/visualizarLoteService');
const { NaoAutorizadoErro, ModeloInvalidoErro } = require('../erros/typeErros');

class vincularLoteController {

    async dadosLoteVisualizar(req, res) {
        try {
            
            let dadosLote = await visualizarLoteService.dadosParaPage();
            res.status(200).json(dadosLote)

        } catch (err) {
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }

    async dadosTimer(req, res) {
        try {
            const { dataInicio, dataFim } = req.params;
            if ( !dataInicio || !dataFim ) {
                throw new ModeloInvalidoErro(400,"Informar data de início e data de fim.");
            }
            
            let dadosTimer = await visualizarLoteService.dadosTimer(dataInicio, dataFim);
            res.status(200).json(dadosTimer)
        } catch (err) {
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }

    async dadosMateriaPrima(req, res) {
        try {
            const { materiaPrima } = req.params;
            if ( !materiaPrima ) {
                throw new ModeloInvalidoErro(400,"Informar a matéria prima.");
            }
            let dadosMateriaPrima = await visualizarLoteService.dadosMateriaPrima(materiaPrima);
            res.status(200).json(dadosMateriaPrima)
        } catch (err) { 
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }

    async dadosLote(req, res) {
        try {
            const { lote } = req.params;
            if ( !lote ) {
                throw new ModeloInvalidoErro(400,"Informar o lote.");
            }
            let dadosLote = await visualizarLoteService.dadosLote(lote);
            res.status(200).json(dadosLote)
        } catch (err) { 
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }
}

module.exports = vincularLoteController;