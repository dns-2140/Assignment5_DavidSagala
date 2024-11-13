'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.Address, { foreignKey: 'customerId' });
      Customer.hasMany(models.Contact, { foreignKey: 'customerId' });
      Customer.hasMany(models.Order, { foreignKey: 'customerId' });
    }
  }
  Customer.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false, // Ensuring that firstName cannot be null
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false, // Ensuring that lastName cannot be null
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Ensuring that email cannot be null
        unique: true, // Optionally ensuring unique email addresses
        validate: {
          isEmail: true, // Ensures valid email format
        },
      },
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );
  return Customer;
};
