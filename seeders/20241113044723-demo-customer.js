'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Customers', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'janesmith@example.com',
      },
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michaeljohnson@example.com',
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emilydavis@example.com',
      },
      {
        firstName: 'David',
        lastName: 'Williams',
        email: 'davidwilliams@example.com',
      },
      {
        firstName: 'Sarah',
        lastName: 'Brown',
        email: 'sarahbrown@example.com',
      },
      {
        firstName: 'James',
        lastName: 'Jones',
        email: 'jamesjones@example.com',
      },
      {
        firstName: 'Patricia',
        lastName: 'Garcia',
        email: 'patriciagarcia@example.com',
      },
      {
        firstName: 'Robert',
        lastName: 'Martinez',
        email: 'robertmartinez@example.com',
      },
      {
        firstName: 'Linda',
        lastName: 'Hernandez',
        email: 'lindahernandez@example.com',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {});
  },
};
