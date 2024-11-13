const router = require('express').Router();
const {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

router.post(
  '/',
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to create a customer'

  createCustomer
);

router.get(
  '/:id',
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to get a customer by its ID'
  getCustomerById
);

router.get(
  '/',
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to get all customers'
  getAllCustomers
);
router.put(
  '/:id',
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to update a customer'
  updateCustomer
);
router.delete(
  '/:id',
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to delete a customer'
  deleteCustomer
);

module.exports = router;
