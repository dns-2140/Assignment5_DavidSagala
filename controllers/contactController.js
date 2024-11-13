const { Contact, Customer } = require('../models');
const Joi = require('joi');

// Define Joi schema for contact validation
const contactValidationSchema = Joi.object({
  phoneNumber: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  phoneNumber: Joi.string().required(),
});

const getAllContacts = async (req, res) => {
  try {
    const { customer_id: customerId } = req.params;

    // Find the customer and include contacts
    const customer = await Customer.findByPk(customerId, {
      include: [{ model: Contact }],
    });

    if (!customer) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Customer not found',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Contacts retrieved successfully',
      data: customer.Contacts, // Access the contacts of the customer
    });
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return res.status(500).json({
      status: 'Failure',
      message: 'An error occurred while retrieving contacts',
    });
  }
};

const createContact = async (req, res) => {
  try {
    // Validate request body
    const { error } = contactValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Failure',
        message: error.details[0].message,
      });
    }

    const { customer_id: customerId } = req.params;
    const { phoneNumber } = req.body;

    // Check if customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Customer not found',
      });
    }

    // Create new contact for the customer
    const newContact = await Contact.create({
      customerId,
      phoneNumber,
    });

    return res.status(201).json({
      status: 'Success',
      message: 'Contact created successfully',
      data: {
        contact: newContact,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'Failure',
      message: 'Internal server error',
    });
  }
};

const updateContact = async (req, res) => {
  // Validate the request data
  const { phoneNumber } = req.body; // Example field to update; adjust as needed
  const { error } = updateContactSchema.validate({ phoneNumber });
  if (error) {
    return res.status(400).json({
      status: 'Failure',
      message: error.details[0].message, // Return the validation error message
    });
  }
  try {
    const { contact_id: contactId } = req.params;

    // Find the contact by ID only
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Contact not found',
      });
    }

    // Update the contact's information
    contact.phoneNumber = phoneNumber || contact.phoneNumber;
    await contact.save();

    return res.status(200).json({
      status: 'Success',
      message: 'Contact updated successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return res.status(500).json({
      status: 'Failure',
      message: 'An error occurred while updating the contact',
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { contact_id: contactId } = req.params;

    // Find the contact by ID only
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Contact not found',
      });
    }

    // Delete the contact
    await contact.destroy();

    return res.status(204).json({
      status: 'Success',
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({
      status: 'Failure',
      message: 'An error occurred while deleting the contact',
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
