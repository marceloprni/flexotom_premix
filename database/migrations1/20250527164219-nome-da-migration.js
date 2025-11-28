'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('FlexotomPremix1', {
      id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true
      },
      IdLoteBarcode: {
          type: Sequelize.STRING(250),
          allowNull: false
      },
      Batelada: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      IdOrdem: {
          type: Sequelize.STRING,
          allowNull: false
      },
      IdProduto: {
          type: Sequelize.STRING(250),
          allowNull: false
      },
      Sequencia: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      Status: {
          type: Sequelize.STRING(100),
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
