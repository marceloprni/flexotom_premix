const {Model, DataTypes} = require("sequelize");

class OrdemProducaos extends Model {
    static init(connection) {
        super.init({
            Codigo: DataTypes.STRING,
            Receita: DataTypes.INTEGER,
            DataCriacao: DataTypes.DATE,
            DataAlteracao: DataTypes.DATE,
            UsuarioCriacao: DataTypes.INTEGER,
            Status: DataTypes.STRING,
            QuantidadePrevista: DataTypes.DECIMAL,
            Descricao: DataTypes.STRING,
            Linha: DataTypes.INTEGER,
            UsuarioAlteracao: DataTypes.INTEGER,
            BatchsProduzidos: DataTypes.INTEGER,
            Prioridade: DataTypes.INTEGER,
            TamanhoBatch: DataTypes.DECIMAL,
            Lote: DataTypes.STRING,
            ReceitaTipo: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'OrdemProducaos',
            timestamps: false,
            underscored: false
        })
    }

}

module.exports = OrdemProducaos;