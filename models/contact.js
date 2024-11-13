'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE',
      });
    }
  }
  Contact.init(
    {
      phoneNumber: DataTypes.STRING,
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers', // Reference to the Customer model
          key: 'id', // The primary key in the Customer model
        },
        onDelete: 'CASCADE', // If a Customer is deleted, also delete related Contacts
      },
    },
    {
      sequelize,
      modelName: 'Contact',
      timestamps: true,
    }
  );
  return Contact;
};
