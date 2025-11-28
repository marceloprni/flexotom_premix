const {Model, DataTypes} = require("sequelize");

class OrdemProducaoEtapas extends Model {
    static init(connection) {
        super.init({
            IdEtapa: DataTypes.INTEGER,
            Descricao: DataTypes.STRING,
            Data: DataTypes.DATE,
            OrdemProducao: DataTypes.INTEGER,
        },{
            sequelize: connection,
            tableName: 'OrdemProducaoEtapas',
            timestamps: false,
            underscored: false
        })
    }

}

module.exports = OrdemProducaoEtapas;