const {Model, DataTypes} = require("sequelize");

class Armazenamentos extends Model {
    static init(connection) {
        super.init(
          {
            Descricao: DataTypes.STRING,
            InsumoId: DataTypes.INTEGER,
            Linha: DataTypes.INTEGER,
            DataAlteracao: DataTypes.DATE,
            UsuarioAlteracao: DataTypes.DATE,
            Status: DataTypes.STRING,
            idCLP: DataTypes.INTEGER,
            QuantidadeInsumo: DataTypes.DECIMAL,
            OriginalOrder: DataTypes.STRING
          },
          {
            sequelize: connection,
            tableName: "Armazenamentos",
            timestamps: false,
            underscored: false,
          }
        );
    }

    static associate(models) {
        this.belongsTo(models.Insumos, { foreignKey: 'InsumoId'});
        this.hasMany(models.ArmazenamentoParametros, { foreignKey: 'ArmazenamentoId'});
        this.hasMany(models.OrdemProducaoParametros, { foreignKey: 'ArmazenamentoId'});
        this.hasMany(models.ArmazenamentoEstoqueHistoricos, { foreignKey: 'ArmazenamentoId'});
    }

}

module.exports = Armazenamentos;