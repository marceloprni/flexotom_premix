const Lote = require("../models2/Lote/Lote");
const Insumos = require("../models/Insumos/Insumos");
const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const { Op, Sequelize, QueryTypes} = require("sequelize");


async function dadosParaPage() {
    let lote = await Lote.findAll({
        attributes: ['id', 'Lote', 'MateriaPrimaIdInsumo', 'MateriaPrimaInsumo', 'Barcode', 'Status'],
        order: [
            ['id', 'DESC']
        ]
    });

    if(!lote) {
        return {
          lote: [],
        };
    } else {
        return {
            loteAtivo: lote,
        };
    }
}

async function dadosTimer(dataInicio, dataFim) {
    let dadosTimer = await Lote.findAll({
        attributes: ['id', 'Lote', 'MateriaPrimaIdInsumo', 'MateriaPrimaInsumo', 'Barcode', 'Status'],
        where: {    
            criadoEm: {
                [Op.gte]: `${dataInicio} 00:00:00`,
                [Op.lt]: `${dataFim} 23:59:59.999`
            }
        },
        order: [
            ['id', 'ASC']
        ]
    });
    return dadosTimer;
}

async function dadosMateriaPrima(materiaPrima) {
    let dadosMateriaPrima = await Lote.findAll({
        attributes: ['id', 'Lote', 'MateriaPrimaIdInsumo', 'MateriaPrimaInsumo', 'Barcode', 'Status'],
        where: {
            MateriaPrimaInsumo: {
                [Op.like]: `%${materiaPrima}%`
            }
        },
        order: [
            ['id', 'ASC']   
        ]
    });
    return dadosMateriaPrima;
}

async function dadosLote(lote) {
    let dadosLote = await Lote.findAll({
        attributes: ['id', 'Lote', 'MateriaPrimaIdInsumo', 'MateriaPrimaInsumo', 'Barcode', 'Status'],
        where: {
            Lote: {
                [Op.like]: `%${lote}%`
            }
        },  
        order: [
            ['id', 'ASC']
        ]
    });
    return dadosLote;
}


module.exports =  {
    dadosParaPage,
    dadosTimer,
    dadosMateriaPrima,
    dadosLote
}