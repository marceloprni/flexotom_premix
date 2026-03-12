const Lote = require("../models1/Lote/Lote");
const OrdemProducao = require("../models/OrdemProducaos/OrdemProducaos");
const Receitas = require("../models/Receitas/Receitas");
const gerarUUID = require("../utils/geradorUUID");
const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const { Op, Sequelize, QueryTypes} = require("sequelize");


async function dadosParaPage() {

    // RETIRADO { Status: 'A' }, { Status: 'P' }
    let ordemProducao = await OrdemProducao.findAll({
          attributes: ['id', 'Codigo', 'QuantidadePrevista', 'Linha', 'BatchsProduzidos', 'TamanhoBatch','Descricao', 'Receita', 'Lote'],
          order: [
              ['id', 'ASC']
          ],
          where: {
              Linha: 2,
              [Op.or]: [{ Status: 'F' } ],
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

    const ordemProducao = await OrdemProducao.findOne({
        attributes: ['Receita'],
        where: {
            id: id
        }
    });

    // CHAMA O CODIGO DA RECEITA
    const receita = await Receitas.findOne({
        attributes: ['Codigo'],
        where: {
            id: ordemProducao.Receita
        }
    });

    console.log('lote existente:');
    console.log(id, 
            Codigo, 
            Descricao, 
            Linha, 
            Receita, 
            QuantidadePrevista, 
            TamanhoBatch);
    
    if(loteExistente == null || loteExistente == undefined) {
        
        // CODIGO RECEITA
        const receitaCodigo = String(receita.Codigo);

        const geradorId = gerarUUID(id,
            Codigo,
            Descricao,
            Linha,
            Receita,
            QuantidadePrevista,
            TamanhoBatch,
            receitaCodigo);
        ;
        



        const loteCraido = geradorId.map(async lote => {
           
            await Lote.create({
                IdLoteBarcode: lote.idLoteBarcodePremix,
                Batelada: lote.BateladaPremix,
                IdOrdem: lote.idOrdemPremix,
                IdProduto: lote.idProdutoPremix,
                Sequencia: lote.SequenciaPremix,
                Status: lote.StatusPremix,
                idReceita: lote.idReceitaPremix
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

    let { count, rows } = await Lote.findAndCountAll({
        order: [
            ['id', 'ASC']
        ],
        where: {
            IdOrdem: id,
        },
    });

    let ordemProducao = await Lote.findAll({
          order: [
              ['id', 'ASC']
          ],
          where: {
              [Op.and]: [{ IdOrdem: id }, { Status: 0 } ],
          },
    });

    if(!ordemProducao ) {
        return {
          OrdemProducao: [],
          ordemComProduto: count
        };
    } else {
        return {
            OrdemProducao: ordemProducao,
            ordemComProduto: count
        };
    }

}

module.exports =  {
    dadosParaPage,
    criarLote,
    gerarTabela
}