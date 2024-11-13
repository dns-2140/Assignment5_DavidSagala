'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers', // Reference to the 'Customers' table
          key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete: if the customer is deleted, their orders will be deleted
      },
      orderNumber: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      orderDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
