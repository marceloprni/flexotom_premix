const {Model, DataTypes} = require("sequelize");

class Linhas extends Model {
    static init(connection) {
        super.init({
            Nome: DataTypes.STRING,
            Descricao: DataTypes.STRING,
            DataCriacao: DataTypes.DATE,
            Status: DataTypes.STRING,
            TamanhoBatchMax: DataTypes.DECIMAL,
        },{
            sequelize: connection,
            tableName: 'Linhas',
            timestamps: false,
            underscored: false
        })
    }

}

module.exports = Linhas;