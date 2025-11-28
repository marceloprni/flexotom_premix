const {Model, DataTypes} = require("sequelize");

class ReceitaParametros extends Model {
    static init(connection) {
        super.init({
            Receita: DataTypes.INTEGER,
            Parametro: DataTypes.INTEGER,
            Valor: DataTypes.STRING,
            DataAlteracao: DataTypes.DATE,
            Status: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'ReceitaParametros',
            timestamps: false,
            underscored: false
        })
    }

}

module.exports = ReceitaParametros;