'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('lote', {
      id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true
      },
      Lote: {
          type: Sequelize.STRING(150),
          allowNull: false
      },
      MateriaPrimaIdInsumo: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      MateriaPrimaInsumo: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Barcode: {
          type: Sequelize.STRING(150),
          allowNull: false
      },
      criadoEm: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('GETDATE')
      },
      atualizadoEm: {
          type: Sequelize.DATE,
          defaultValue: null,
          allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('lote')
  }
};
