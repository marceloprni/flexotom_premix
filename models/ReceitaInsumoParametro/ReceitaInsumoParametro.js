const {Model, DataTypes} = require("sequelize");

class ReceitaInsumoParametro extends Model {
    static init(connection) {
        super.init({
            ReceitaId: DataTypes.INTEGER,
            ParametroId: DataTypes.INTEGER,
            InsumoId: DataTypes.INTEGER,
            Valor: DataTypes.DECIMAL,
            DataAlteracao: DataTypes.DATE,
            Status: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'ReceitaInsumoParametro',
            timestamps: false,
            underscored: false
        })
    }

    static associate(models) {
        this.belongsTo(models.Insumos, { foreignKey: 'InsumoId'});
        this.belongsTo(models.Parametros, { foreignKey: 'ParametroId'});
        this.belongsTo(models.Receitas, { foreignKey: 'ReceitaId'});
    }
    
}

module.exports = ReceitaInsumoParametro;