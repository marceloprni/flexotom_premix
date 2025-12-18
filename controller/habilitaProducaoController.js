const habilitaProducaoService = require('../services/habilitaProducao');
const { NaoAutorizadoErro, ModeloInvalidoErro } = require('../erros/typeErros');

class habilitaProducaoController {

    async habilitaProduto(req, res) {   
        try {
            const { status, ordeArgamassa, idOrdemArgamassaId, ordemPremix, idPremix, idPremixLote } = req.body;

            console.log('values recebidos no controller:');
            console.log(status, ordeArgamassa, idOrdemArgamassaId, ordemPremix, idPremix );

            if ( !status || !ordeArgamassa || !idOrdemArgamassaId || !ordemPremix || !idPremix || !idPremixLote) {
                throw new ModeloInvalidoErro(400,"Dados incompletos.");
            }

            let dadosLote = await habilitaProducaoService.habilitaProducao(status, ordeArgamassa, idOrdemArgamassaId, ordemPremix, idPremix, idPremixLote);
            res.status(200).json(dadosLote)

        } catch (err) {
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }

    async verifyDados(req, res) {   
        try {
            const { ID } = req.params;   

            if ( !ID ) {
                throw new ModeloInvalidoErro(400,"Seleciona uma ordem de produção.");
            }

            let dadosLote = await habilitaProducaoService.dadosParaPage(ID);
            res.status(200).json(dadosLote)

        } catch (err) {
            res.status(400).send({ erro: err.message, privilegio1: req.session.user.privilegio, acionaWarmin: false });
        }
    }

}

module.exports = habilitaProducaoController;