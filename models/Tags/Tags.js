const {Model, DataTypes} = require("sequelize");

class Tags extends Model {
    static init(connection) {
        super.init({
            Descricao: DataTypes.STRING,
            Endereco: DataTypes.STRING,
            isArray: DataTypes.BOOLEAN,
            TamanhoArray: DataTypes.INTEGER
        },{
            sequelize: connection,
            tableName: 'Tags',
            timestamps: false,
            underscored: false
        })
    }

     static associate(models) {
        this.hasOne(models.Parametros, { foreignKey: 'TagId'});
        this.hasMany(models.TagComms, { foreignKey: 'TagId'});
    }

}

module.exports = Tags;