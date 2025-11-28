const {Model, DataTypes} = require("sequelize");

class Acessos extends Model {
    static init(connection) {
        super.init({
            Nome: DataTypes.STRING,
            Descricao: DataTypes.STRING,
            DataCriacao: DataTypes.DATE,
            DataAlteracao: DataTypes.DATE,
            Status: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'Acessos',
            timestamps: false,
            underscored: false
        })
    }

    static associate(models) {
        this.hasOne(models.Usuarios, { foreignKey: 'AcessoId'});
    }

}

module.exports = Acessos;