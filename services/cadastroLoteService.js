const Lote = require("../models1/Lote/Lote");
const Insumos = require("../models/Insumos/Insumos");
const gerarUUID = require("../utils/geradorUUID");
const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const { Op, Sequelize, QueryTypes} = require("sequelize");


async function dadosParaPage() {

    let lote = await Lote.findAll({
        attributes: ['id', 'Lote', 'MateriaPrimaIdInsumo', 'MateriaPrimaInsumo', 'Barcode'],
        order: [
            ['id', 'DESC']
        ],
        where: {
              Status: 'SV',
        }
    });

  
    let insumos = await Insumos.findAll({
        attributes: ['id', 'Descricao'],
        order: [
            ['Descricao', 'ASC']
        ],
        where: {
            Status: 'A',
        }
    });  

    if(!lote && !insumos) {
        return {
          lote: [],
          Insumos: [],
        };
    } else {
        return {
            loteAtivo: lote,
            insumoAtivo: insumos
        };
    }


}

async function criarLote(LoteIn, materiaPrimaId, materiaPrima) {

    const geradorId = gerarUUID(materiaPrimaId);
    const statusValue = 'SV';

    if (!materiaPrimaId || !materiaPrima) {
        throw new ModeloInvalidoErro("Todos os campos são obrigatórios.");
    }

    const salve = await Lote.create({
        Lote: LoteIn,
        MateriaPrimaIdInsumo: Number(materiaPrimaId),
        MateriaPrimaInsumo: materiaPrima,
        Barcode: geradorId.idBarcode,
        Status: statusValue
    });
    
    return salve
}

async function deletarLote(idMaterial) {

    if (!idMaterial) {
        throw new ModeloInvalidoErro("Sem id para indentificação.");
    }

    const loteDeletado = await Lote.destroy({
            where: {
                Lote: idMaterial,
            },
        });
    
    return loteDeletado
}

module.exports =  {
    dadosParaPage,
    criarLote,
    deletarLote
}