'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure that street is not null
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure that city is not null
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure that state is not null
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure that zipCode is not null
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Ensure that customerId is not null
        references: {
          model: 'Customers', // Reference the Customer model
          key: 'id', // The key in the Customer model
        },
        onDelete: 'CASCADE', // Cascade delete: if the customer is deleted, their addresses will be deleted as well
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
    await queryInterface.dropTable('Addresses');
  },
};
