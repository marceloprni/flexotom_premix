const {Model, DataTypes} = require("sequelize");

class Acessos extends Model {
    static init(connection) {
        super.init({
            IdLoteBarcode: DataTypes.STRING,
            Batelada: DataTypes.INTEGER,
            IdOrdem: DataTypes.STRING,
            IdProduto: DataTypes.STRING,
            Sequencia: DataTypes.INTEGER,
            Status: DataTypes.STRING,
        },{
            sequelize: connection,
            tableName: 'premixLote',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        })
    }


}

module.exports = Acessos;