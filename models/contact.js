'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE',
      });
    }
  }

  Contact.init(
    {
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures that phoneNumber cannot be null
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete if Customer is deleted
      },
    },
    {
      sequelize,
      modelName: 'Contact',
    }
  );

  return Contact;
};
