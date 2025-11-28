const Lote = require("../models1/Lote/Lote");
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


module.exports =  {
    dadosParaPage,
}