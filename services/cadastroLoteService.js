const Lote = require("../models1/Lote/Lote");
const OrdemProducao = require("../models/OrdemProducaos/OrdemProducaos");
const gerarUUID = require("../utils/geradorUUID");
const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const { Op, Sequelize, QueryTypes} = require("sequelize");


async function dadosParaPage() {

    let ordemProducao = await OrdemProducao.findAll({
          attributes: ['id', 'Codigo', 'QuantidadePrevista', 'Linha', 'BatchsProduzidos', 'TamanhoBatch','Descricao', 'Receita'],
          order: [
              ['id', 'ASC']
          ],
          where: {
              Linha: 2,
              [Op.or]: [{ Status: 'A' }, { Status: 'P' }],
          },
    });


    if(!ordemProducao ) {
        return {
          ordemProducao: [],
          
        };
    } else {
        return {
            OrdemProducao: ordemProducao
        };
    }


}

async function criarLote(
            idLoteProd,
            Codigo,
            Descricao,
            Linha,
            QuantidadePrevista,
            TamanhoBatch) {
    const statusValue = 'FALSE';
            
    const geradorId = gerarUUID(idLoteProd,
            Codigo,
            Descricao,
            Linha,
            QuantidadePrevista,
            TamanhoBatch);
    

    if (!materiaPrimaId || !materiaPrima) {
        throw new ModeloInvalidoErro("Todos os campos são obrigatórios.");
    }

    //const salve = await Lote.create({
    //    idLoteBarcode: ,
    //    Batelada: ,
    //    idOrdem: ,
    //    idProduto: ,
    //    Sequencia: ,
    //    Status: 
    //});
    
    return salve
}


module.exports =  {
    dadosParaPage,
    criarLote
}