'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('lote', 'Status',{
      type: Sequelize.DataTypes.STRING(30),
      allowNull: false
      })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('lote', 'Status');
  }
};
