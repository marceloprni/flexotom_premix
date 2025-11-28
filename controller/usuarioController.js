const usuarioService = require('../services/usuarioService');
const { NaoAutorizadoErro, ModeloInvalidoErro } = require('../erros/typeErros');

class UsuarioController {
    async login(req, res) {
        const {usuario, senha} = req.body;

        try {
            if(!senha || !usuario) {
                throw new NaoAutorizadoErro(401, 'Usuário ou senha inválidos');
            }
            let usuarioValido = await usuarioService.validarUsuarios(usuario, senha);

            if(usuarioValido.nome) {
                    req.session.user = {
                    nome: usuarioValido.nome,
                    privilegio: usuarioValido.privilegio
                    }
            } 
            
            const privilegio = req.session.user;
            res.render(usuarioValido.rota, { 
                privilegio1: privilegio.privilegio
                });

        } catch (err) {
            res.render('users/login', { erro: err.message, privilegio1: 0, acionaWarmin: true });
        }
    }

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = UsuarioController;