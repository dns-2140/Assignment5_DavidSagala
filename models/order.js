'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE', // This ensures that if the associated customer is deleted, their orders are also deleted
      });
    }
  }
  Order.init(
    {
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers', // table name in database
          key: 'id',
        },
      },
      orderNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'canceled'),
        defaultValue: 'pending',
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
