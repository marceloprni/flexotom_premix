const Usuarios = require("../models/Usuarios/Usuarios");
const geradorToken = require("../utils/geradorToken");
const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const { Op, Sequelize, QueryTypes} = require("sequelize");


async function validarUsuarios(usuario, senha) {

    //usuario = usuario.toString().toLowerCase();
    let user = await Usuarios.findOne({where: {Login: usuario}});


    //senha = geradorToken.gerarHashDaSenha(senha);

    if(!user || (user.Senha !== senha)){
        throw new NaoAutorizadoErro(401, "Usuário ou senha inválidos");
    } else {
        let rota = "pageSelection/pageSelection";
        return {
            id: user.Id,
            rota: rota,
            nome: user.Descricao,
            usuario: user.Login,
            privilegio: user.AcessoId
        }
    }
}

module.exports =  {
    validarUsuarios
}