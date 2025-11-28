const {Model, DataTypes} = require("sequelize");

class Receitas extends Model {
    static init(connection) {
        super.init({
            Descricao: DataTypes.STRING,
            Codigo: DataTypes.STRING,
            DataCriacao: DataTypes.DATE,
            DataAlteracao: DataTypes.DATE,
            UsuarioAlteracaoId: DataTypes.INTEGER,
            Status: DataTypes.STRING,
            Tipo: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'Receitas',
            timestamps: false,
            underscored: false
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuarios, { foreignKey: 'UsuarioAlteracaoId'});
        this.hasMany(models.ReceitaInsumoParametro, { foreignKey: 'ReceitaId'});
    }

}

module.exports = Receitas;