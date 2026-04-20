const {Model, DataTypes} = require("sequelize");

class Acessos extends Model {
    static init(connection) {
        super.init({
            Lote: DataTypes.STRING,
            MateriaPrimaIdInsumo: DataTypes.INTEGER,
            MateriaPrimaInsumo: DataTypes.STRING,
            Barcode: DataTypes.STRING,
            Status: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'lote',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        })
    }


}

module.exports = Acessos;