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


}

module.exports = vincularLoteController;