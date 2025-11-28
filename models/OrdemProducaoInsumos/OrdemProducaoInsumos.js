const {Model, DataTypes} = require("sequelize");

class OrdemProducaoInsumos extends Model {
    static init(connection) {
        super.init({
            Insumo: DataTypes.INTEGER,
            Quantidade: DataTypes.DECIMAL,
            DataCriacao: DataTypes.DATE,
            UsuarioAlteracaoId: DataTypes.INTEGER,
            Status: DataTypes.STRING,
            OrdemProducao: DataTypes.INTEGER,
            Armazenamento: DataTypes.INTEGER,
            ToleranciaPermitida: DataTypes.DECIMAL,
            TipoInsumo: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'OrdemProducaoInsumos',
            timestamps: false,
            underscored: false
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuarios, { foreignKey: 'UsuarioAlteracaoId'});
    }
}

module.exports = OrdemProducaoInsumos;