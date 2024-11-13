const router = require('express').Router();
const {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

router.post('/:customer_id/contacts', createContact);
router.get('/:customer_id/contacts', getAllContacts);
router.put('/:contact_id', updateContact);
router.delete('/:contact_id', deleteContact);

module.exports = router;
