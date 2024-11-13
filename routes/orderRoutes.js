const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const router = require('express').Router();

router.post(
  '/:customer_id/orders',
  // #swagger.tags = ['Order']
  // #swagger.description = 'Endpoint to create an order.'
  createOrder
);
router.get(
  '/:customer_id/orders',
  // #swagger.tags = ['Order']
  // #swagger.description = 'Endpoint to get all orders of a customer.'
  getAllOrders
);
router.put(
  '/:order_id',
  // #swagger.tags = ['Order']
  // #swagger.description = 'Endpoint to update an order of a customer.'
  updateOrder
);
router.delete(
  '/:order_id',
  // #swagger.tags = ['Order']
  // #swagger.description = 'Endpoint to delete an order of a customer.'
  deleteOrder
);

module.exports = router;
