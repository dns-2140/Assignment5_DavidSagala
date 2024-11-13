const {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressController');

const router = require('express').Router();

router.post(
  '/:customer_id/addresses',
  // #swagger.tags = ['Address']
  // #swagger.description = 'Endpoint to create an address.'

  createAddress
);
router.get(
  '/:customer_id/addresses',
  // #swagger.tags = ['Address']
  // #swagger.description = 'Endpoint to get all addresses of a customer'
  getAllAddresses
);
router.put(
  '/:address_id',
  // #swagger.tags = ['Address']
  // #swagger.description = 'Endpoint to to update an address.'
  updateAddress
);
router.delete(
  '/:address_id',
  // #swagger.tags = ['Address']
  // #swagger.description = 'Endpoint to to delete an address.'
  deleteAddress
);

module.exports = router;
