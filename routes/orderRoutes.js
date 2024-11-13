const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const router = require('express').Router();

router.post('/:customer_id/orders', createOrder);
router.get('/:customer_id/orders', getAllOrders);
router.put('/:order_id', updateOrder);
router.delete('/:order_id', deleteOrder);

module.exports = router;
