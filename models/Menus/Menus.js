const {Model, DataTypes} = require("sequelize");

class Menus extends Model {
    static init(connection) {
        super.init({
            Nome: DataTypes.STRING,
            Descricao: DataTypes.STRING,
            Link: DataTypes.STRING,
            DataCriacao: DataTypes.DATE,
            DataAlteracao: DataTypes.DATE,
            Status: DataTypes.STRING,
            MatIcon: DataTypes.STRING,
            Ordem: DataTypes.INTEGER,
            LinkExterno: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'Menus',
            timestamps: false,
            underscored: false
        })
    }

}

module.exports = Menus;