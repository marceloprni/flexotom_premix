const {Model, DataTypes} = require("sequelize");

class Usuarios extends Model {
    static init(connection) {
        super.init({
            Descricao: DataTypes.STRING,
            Senha: DataTypes.STRING,
            DataCriacao: DataTypes.DATE,
            DataAlteracao: DataTypes.DATE,
            Status: DataTypes.STRING,
            Login: DataTypes.STRING,
            AcessoId: DataTypes.INTEGER
        },{
            sequelize: connection,
            tableName: 'Usuarios',
            timestamps: false,
            underscored: false
        })
    }

    static associate(models) {
        this.hasMany(models.Insumos, { foreignKey: 'UsuarioAlteracaoId'});
        this.hasMany(models.OrdemProducaoInsumos, { foreignKey: 'UsuarioAlteracaoId'});
        this.hasMany(models.Receitas, { foreignKey: 'UsuarioAlteracaoId'});
        this.belongsTo(models.Acessos, { foreignKey: 'AcessoId'});

    }
}

module.exports = Usuarios;