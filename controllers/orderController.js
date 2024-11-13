const { Order, Customer } = require('../models');
const Joi = require('joi');

const orderValidationSchema = Joi.object({
  orderNumber: Joi.string().required(),
  totalAmount: Joi.number().precision(2).required(),
  status: Joi.string()
    .valid('pending', 'shipped', 'delivered', 'canceled')
    .default('pending'),
  orderDate: Joi.date().optional(),
});

const updateOrderValidationSchema = Joi.object({
  status: Joi.string().valid('pending', 'shipped', 'delivered', 'canceled'),
  totalAmount: Joi.number().min(0),
});

const createOrder = async (req, res) => {
  try {
    // Validate request body against the schema
    const { error } = orderValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Failure',
        message: error.details[0].message,
      });
    }

    const { orderNumber, totalAmount, status, orderDate } = req.body;
    const { customer_id: customerId } = req.params; // Get customerId from route params

    // Check if the customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Customer not found',
      });
    }

    // Create the order
    const newOrder = await Order.create({
      customerId, // This customerId comes from req.params
      orderNumber,
      totalAmount,
      status,
      orderDate,
    });

    // Return a success response
    return res.status(201).json({
      status: 'Success',
      message: 'Order created successfully',
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Failure',
      message: 'Internal server error',
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { customer_id: customerId } = req.params;

    // Find the customer and include the associated orders
    const customer = await Customer.findByPk(customerId, {
      include: [{ model: Order }], // Include all related orders for the customer
    });

    if (!customer) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Customer not found',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Orders retrieved successfully',
      data: customer.Orders, // The associated orders will be in `customer.Orders`
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({
      status: 'Failure',
      message: 'An error occurred while retrieving orders',
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    // Validate the request body
    const { error } = updateOrderValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Failure',
        message: error.details[0].message,
      });
    }

    // Get the orderId from the route parameter
    const { order_id: orderId } = req.params;

    // Find the order by orderId
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Order not found',
      });
    }

    // Update the order with the validated data
    const { status, totalAmount } = req.body;
    await order.update({
      status: status || order.status, // Only update if provided
      totalAmount: totalAmount !== undefined ? totalAmount : order.totalAmount, // Only update if provided
    });

    res.status(200).json({
      status: 'Success',
      message: 'Order successfully updated',
      data: {
        order,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Failure',
      message: 'Internal error',
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    // Get the orderId from the route parameter
    const { order_id: orderId } = req.params;

    // Find the order by orderId
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Order not found',
      });
    }

    // Delete the order
    await order.destroy();

    res.status(204).json({
      status: 'Success',
      message: 'Order successfully deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Failure',
      message: 'Internal error',
    });
  }
};

module.exports = { createOrder, getAllOrders, updateOrder, deleteOrder };
