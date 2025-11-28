const {Model, DataTypes} = require("sequelize");

class ArmazenamentoEstoqueHistoricos extends Model {
    static init(connection) {
        super.init(
          {
            Codigo: DataTypes.STRING,
            InsumoId: DataTypes.INTEGER,
            ArmazenamentoId: DataTypes.INTEGER,
            QuantidadeInsumo: DataTypes.STRING,
            DataCriacao: DataTypes.DATE,
            UsuarioCriacao: DataTypes.INTEGER,
            Status: DataTypes.STRING,
            Lote: DataTypes.STRING,
          },
          {
            sequelize: connection,
            tableName: "ArmazenamentoEstoqueHistoricos",
            timestamps: false,
            underscored: false,
          }
        );
    }

    static associate(models) {
        this.belongsTo(models.Insumos, { foreignKey: 'InsumoId'});
        this.belongsTo(models.Armazenamentos, { foreignKey: 'ArmazenamentoId'});
    }

}

module.exports = ArmazenamentoEstoqueHistoricos;