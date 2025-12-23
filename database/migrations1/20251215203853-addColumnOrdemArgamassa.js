'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'FlexotomPremix1',         // nome da tabela
      'ordemArgamassa',          // nome da coluna
      {
        type: Sequelize.STRING,  // tipo STRING
        allowNull: true          // permite nulo (ou false se for obrigatória)
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'FlexotomPremix1',         // nome da tabela
      'ordemArgamassa'           // nome da coluna a excluir
    );
  }
};
