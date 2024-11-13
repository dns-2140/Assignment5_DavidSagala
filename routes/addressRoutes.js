const {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressController');

const router = require('express').Router();

router.post('/:customer_id/addresses', createAddress);
router.get('/:customer_id/addresses', getAllAddresses);
router.put('/:address_id', updateAddress);
router.delete('/:address_id', deleteAddress);

module.exports = router;
