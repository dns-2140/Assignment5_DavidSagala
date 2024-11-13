'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.Customer, { foreignKey: 'customerId' });
    }
  }
  Address.init(
    {
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers', // Reference the Customer model
          key: 'id', // The key in the Customer model
        },
        onDelete: 'CASCADE', // Cascade delete: if the customer is deleted, their addresses will be deleted as well
      },
    },
    {
      sequelize,
      modelName: 'Address',
    }
  );
  return Address;
};
