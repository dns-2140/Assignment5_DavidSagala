const router = require('express').Router();
const {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

router.post(
  '/:customer_id/contacts',
  // #swagger.tags = ['Contact']
  // #swagger.description = 'Endpoint to create a contact of a customer.'
  createContact
);
router.get(
  '/:customer_id/contacts',
  // #swagger.tags = ['Contact']
  // #swagger.description = 'Endpoint to get all contacts of a customer.'
  getAllContacts
);
router.put(
  '/:contact_id',
  // #swagger.tags = ['Contact']
  // #swagger.description = 'Endpoint to update a contact of a customer.'
  updateContact
);
router.delete(
  '/:contact_id',
  // #swagger.tags = ['Contact']
  // #swagger.description = 'Endpoint to delete a contact of a customer.'
  deleteContact
);

module.exports = router;
