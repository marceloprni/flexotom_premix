const Sequelize = require('sequelize');
const database = require('../config/databaseConfigDb');

const connection1 = new Sequelize(database);

const Lote = require('../models1/Lote/Lote');

// Conexão com a tabela
Lote.init(connection1);


module.exports = {
    connection1
}