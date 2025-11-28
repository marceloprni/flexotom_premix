const {Model, DataTypes} = require("sequelize");

class Insumos extends Model {
    static init(connection) {
        super.init({
            Descricao: DataTypes.STRING,
            Codigo: DataTypes.STRING,
            DataCriacao: DataTypes.DATE,
            DataAlteracao: DataTypes.DATE,
            UsuarioAlteracaoId: DataTypes.INTEGER,
            Status: DataTypes.STRING,
            TipoInsumo: DataTypes.STRING,
            ToleranciaPermitida: DataTypes.DECIMAL,
            Lote: DataTypes.STRING,
        },{
            sequelize: connection,
            tableName: 'Insumos',
            timestamps: false,
            underscored: false
        })
    }


    static associate(models) {
        this.belongsTo(models.Usuarios, { foreignKey: 'UsuarioAlteracaoId'});
        this.hasOne(models.Armazenamentos, { foreignKey: 'InsumoId'});
        this.hasOne(models.ArmazenamentoEstoqueHistoricos, { foreignKey: 'InsumoId'});
        this.hasMany(models.OrdemProducaoParametros, { foreignKey: 'InsumoId'});
        this.hasMany(models.ReceitaInsumoParametro, { foreignKey: 'InsumoId'});
    }

}

module.exports = Insumos;