const md5 = require('md5');
const SECRET = 'nutella';

function gerarHashDaSenha(senha){
    return md5(`@${senha}:${SECRET}@`);
}

function criarToken(usuario){
    let emailBase64 = Buffer.from(usuario.email).toString('base64');
    let data = new Date();
    let token = md5(`${emailBase64}.${SECRET}.${data.getTime()}`);
    return token;
}



module.exports = {
    gerarHashDaSenha,
    criarToken
}
