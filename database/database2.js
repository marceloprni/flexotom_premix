const Sequelize = require('sequelize');
const database = require('../config/databaseConfigDb1');

const connection2 = new Sequelize(database);

const Lote = require('../models2/Lote/Lote');

// Conexão com a tabela
Lote.init(connection2);


module.exports = {
    connection2
}