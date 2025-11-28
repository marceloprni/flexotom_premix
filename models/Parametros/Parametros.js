const {Model, DataTypes} = require("sequelize");

class Parametros extends Model {
    static init(connection) {
        super.init({
            Descricao: DataTypes.STRING,
            TagId: DataTypes.INTEGER,
            ValorPadrao: DataTypes.DECIMAL,
            Tipo: DataTypes.STRING,
            Status: DataTypes.STRING,
            Nome: DataTypes.STRING,
            isParametroReceita: DataTypes.BOOLEAN,
            idCLP: DataTypes.INTEGER
        },{
            sequelize: connection,
            tableName: 'Parametros',
            timestamps: false,
            underscored: false
        })
    }

    static associate(models) {
        this.belongsTo(models.Tags, { foreignKey: 'TagId'});
        this.hasOne(models.ArmazenamentoParametros, { foreignKey: 'ParametroId'});
        this.hasMany(models.OrdemProducaoParametros, { foreignKey: 'ParametroId'});
        this.hasMany(models.ReceitaInsumoParametro, { foreignKey: 'ParametroId'});
    }

}

module.exports = Parametros;