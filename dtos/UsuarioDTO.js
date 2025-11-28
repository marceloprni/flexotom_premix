const { ModeloInvalidoErro } = require("../erros/typeErros");

class UsuarioDTO {
    constructor(obj) {
        obj = obj || {};
        this.id = obj.id 
        this.nome = obj.nome
        this.senha = obj.senha
        this.usuario = obj.usuario
        this.privilegio = obj.privilegio
    }

    modeloValidoCadastro(){
        let validacao = !!(this.nome && this.senha && this.usuario && this.privilegio);

        if(!validacao){
            throw new ModeloInvalidoErro(400, "Os campos nome, e-mail, senha e idPerfil são obrigatórios");
        }
    }

    modeloValidoAtualizacao(){
        let validacao = !!(this.usuario && this.senha);

        if(!validacao){
            throw new ModeloInvalidoErro(400, "Os campos usuario ou senha são obrigatórios");
        }
    }
}

module.exports = UsuarioDTO;

