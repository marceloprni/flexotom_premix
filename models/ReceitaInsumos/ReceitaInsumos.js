const {Model, DataTypes} = require("sequelize");

class ReceitaInsumos extends Model {
    static init(connection) {
        super.init({
            Receita: DataTypes.INTEGER,
            Insumo: DataTypes.INTEGER,
            Quantidade: DataTypes.DECIMAL,
            DataCriacao: DataTypes.DATE,
            Status: DataTypes.STRING,
            OrdemDosagem: DataTypes.INTEGER
        },{
            sequelize: connection,
            tableName: 'ReceitaInsumos',
            timestamps: false,
            underscored: false
        })
    }

}

module.exports = ReceitaInsumos;