const {Model, DataTypes} = require("sequelize");

class OrdemProducaoConsumos extends Model {
    static init(connection) {
        super.init({
            Insumos: DataTypes.INTEGER,
            Armazenamento: DataTypes.INTEGER,
            OrdemProducao: DataTypes.INTEGER,
            Batch: DataTypes.INTEGER,
            QuantidadeTeorica: DataTypes.DECIMAL,
            QuantidadeReal: DataTypes.DECIMAL,
            ToleranciaPermitida: DataTypes.DECIMAL,
            DataCriacao: DataTypes.DATE,
            TempoDosagem: DataTypes.INTEGER,
            Lote: DataTypes.STRING,
        },{
            sequelize: connection,
            tableName: 'OrdemProducaoConsumos',
            timestamps: false,
            underscored: false
        })
    }

}

module.exports = OrdemProducaoConsumos;