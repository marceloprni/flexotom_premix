const {Model, DataTypes} = require("sequelize");

class TagComms extends Model {
    static init(connection) {
        super.init({
            Endereco: DataTypes.STRING,
            TagId: DataTypes.INTEGER,
            vlLeitura: DataTypes.STRING,
            vlEscrita: DataTypes.STRING,
            flLeitura: DataTypes.BOOLEAN,
            flEscrita: DataTypes.BOOLEAN,
            flHabilitado: DataTypes.BOOLEAN,
            vlProcedure: DataTypes.STRING,
            Procedure: DataTypes.STRING,
            Ordem: DataTypes.INTEGER,
            TagTipo: DataTypes.STRING,
            Linha: DataTypes.INTEGER,
            PosicaoArray: DataTypes.INTEGER,
        },{
            sequelize: connection,
            tableName: 'TagComms',
            timestamps: false,
            underscored: false
        })
    }

    static associate(models) {
        this.belongsTo(models.Tags, { foreignKey: 'TagId'});
    }
    
}

module.exports = TagComms;