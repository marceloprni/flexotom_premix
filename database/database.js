const Sequelize = require('sequelize');
const database = require('../config/databaseConfig');

const connection = new Sequelize(database);

const Acessos = require('../models/Acessos/Acessos');
const ArmazenamentoEstoqueHistoricos = require('../models/ArmazenamentoEstoqueHistoricos/ArmazenamentoEstoqueHistoricos');
const ArmazenamentoParametros = require('../models/ArmazenamentoParametros/ArmazenamentoParametros');
const Armazenamentos = require('../models/Armazenamentos/Armazenamentos');
const Insumos = require('../models/Insumos/Insumos');
const Linhas = require('../models/Linhas/Linhas');
const Menus = require('../models/Menus/Menus');
const OrdemProducaoConsumos = require('../models/OrdemProducaoConsumos/OrdemProducaoConsumos');
const OrdemProducaoEtapas = require('../models/OrdemProducaoEtapas/OrdemProducaoEtapas');
const OrdemProducaoInsumos = require('../models/OrdemProducaoInsumos/OrdemProducaoInsumos');
const OrdemProducaoParametros = require('../models/OrdemProducaoParametros/OrdemProducaoParametros');
const OrdemProducaos = require('../models/OrdemProducaos/OrdemProducaos');
const Parametros = require('../models/Parametros/Parametros');
const ReceitaInsumoParametro = require('../models/ReceitaInsumoParametro/ReceitaInsumoParametro');
const ReceitaInsumos = require('../models/ReceitaInsumos/ReceitaInsumos');
const ReceitaParametros = require('../models/ReceitaParametros/ReceitaParametros');
const Receitas = require('../models/Receitas/Receitas');
const TagComms = require('../models/TagComms/TagComms');
const Tags = require('../models/Tags/Tags');
const Usuarios = require('../models/Usuarios/Usuarios');

const models = {
  Linhas,
  ReceitaParametros,
  ReceitaInsumos,
  OrdemProducaoConsumos,
  Menus,
  OrdemProducaos,
  OrdemProducaoEtapas,
  Acessos,
  ArmazenamentoEstoqueHistoricos,
  ArmazenamentoParametros,
  Armazenamentos,
  Insumos,
  OrdemProducaoInsumos,
  OrdemProducaoParametros,
  Parametros,
  ReceitaInsumoParametro,
  Receitas,
  TagComms,
  Tags,
  Usuarios,
};

// Inicializar models
Object.values(models).forEach(model => {
  if (typeof model.init === 'function') {
    model.init(connection);
  }
});

// Associar após carregar todos
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});





module.exports = {
  connection,
  models
};
