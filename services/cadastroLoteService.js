const Lote = require("../models1/Lote/Lote");
const OrdemProducao = require("../models/OrdemProducaos/OrdemProducaos");
const gerarUUID = require("../utils/geradorUUID");
const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const { Op, Sequelize, QueryTypes} = require("sequelize");


async function dadosParaPage() {

    let ordemProducao = await OrdemProducao.findAll({
          attributes: ['id', 'Codigo', 'QuantidadePrevista', 'Linha', 'BatchsProduzidos', 'TamanhoBatch','Descricao', 'Receita', 'Lote'],
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
            id, 
            Codigo, 
            Descricao, 
            Linha, 
            Receita, 
            QuantidadePrevista, 
            TamanhoBatch) {

    const loteExistente = await Lote.findOne({
        attributes: ['IdOrdem'],
        where: {
            IdOrdem: id
        }
    });  


    if(loteExistente == null || loteExistente == undefined) {

        const geradorId = gerarUUID(id,
            Codigo,
            Descricao,
            Linha,
            Receita,
            QuantidadePrevista,
            TamanhoBatch);

    
        const loteCraido = geradorId.map(async lote => {
            console.log('lote criado');
            await Lote.create({
                IdLoteBarcode: lote.idLoteBarcode,
                Batelada: lote.Batelada,
                IdOrdem: lote.idOrdem,
                IdProduto: lote.idProduto,
                Sequencia: lote.Sequencia,
                Status: lote.Status
            }); 
        
        }); 
        
        if (loteCraido) {
            return  {
                value:"Lote criado com sucesso!"
            }
        }
        
    } else {
        return {
                value: "Já existe lote com essa ordem."
            } 
    }
    
        
    
}

async function gerarTabela(id) {

    let ordemProducao = await Lote.findAll({
          order: [
              ['id', 'ASC']
          ],
          where: {
              [Op.and]: [{ IdOrdem: id }, { Status: 0 }],
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

module.exports =  {
    dadosParaPage,
    criarLote,
    gerarTabela
}