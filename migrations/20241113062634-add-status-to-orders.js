module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'status', {
      type: Sequelize.ENUM('pending', 'shipped', 'delivered', 'canceled'),
      defaultValue: 'pending',
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'status');
  },
};
