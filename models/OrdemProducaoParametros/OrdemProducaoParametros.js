const {Model, DataTypes} = require("sequelize");

class OrdemProducaoParametros extends Model {
    static init(connection) {
        super.init({
            OrdemProducao: DataTypes.INTEGER,
            ParametroId: DataTypes.INTEGER,
            ArmazenamentoId: DataTypes.INTEGER,
            Valor: DataTypes.DECIMAL,
            DataCriacao: DataTypes.DATE,
            Status: DataTypes.STRING,
            InsumoId: DataTypes.INTEGER
        },{
            sequelize: connection,
            tableName: 'OrdemProducaoParametros',
            timestamps: false,
            underscored: false
        })
    }

    static associate(models) {
        this.belongsTo(models.Insumos, { foreignKey: 'InsumoId'});
        this.belongsTo(models.Armazenamentos, { foreignKey: 'ArmazenamentoId'});
        this.belongsTo(models.Parametros, { foreignKey: 'ParametroId'});
    }

}

module.exports = OrdemProducaoParametros;