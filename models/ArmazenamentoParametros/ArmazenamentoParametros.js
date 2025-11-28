const {Model, DataTypes} = require("sequelize");

class ArmazenamentoParametros extends Model {
    static init(connection) {
        super.init(
          { 
            ParametroId: DataTypes.INTEGER,
            Valor: DataTypes.DECIMAL,
            DataAlteracao: DataTypes.DATE,
            UsuarioAlteracao: DataTypes.INTEGER,
            Status: DataTypes.STRING,
            ArmazenamentoId: DataTypes.INTEGER
          },
          {
            sequelize: connection,
            tableName: "ArmazenamentoParametros",
            timestamps: false,
            underscored: false,
          }
        );
    }

    static associate(models) {
        this.belongsTo(models.Armazenamentos, { foreignKey: 'ArmazenamentoId'});
        this.belongsTo(models.Parametros, { foreignKey: 'ParametroId'});
    }

}

module.exports = ArmazenamentoParametros;