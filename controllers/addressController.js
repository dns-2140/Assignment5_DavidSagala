const Joi = require('joi');
const { Address, Customer } = require('../models');

const createAddressValidationSchema = Joi.object({
  street: Joi.string().min(3).max(255).required().messages({
    'any.required': 'Street is required',
    'string.base': 'Street must be a string',
    'string.min': 'Street must be at least 3 characters long',
    'string.max': 'Street must not exceed 255 characters',
  }),
  city: Joi.string().min(2).max(100).required().messages({
    'any.required': 'City is required',
    'string.base': 'City must be a string',
    'string.min': 'City must be at least 2 characters long',
    'string.max': 'City must not exceed 100 characters',
  }),
  state: Joi.string().min(2).max(100).required().messages({
    'any.required': 'State is required',
    'string.base': 'State must be a string',
    'string.min': 'State must be at least 2 characters long',
    'string.max': 'State must not exceed 100 characters',
  }),
  zipCode: Joi.string().min(5).max(10).required().messages({
    'any.required': 'Zip Code is required',
    'string.base': 'Zip Code must be a string',
    'string.min': 'Zip Code must be at least 5 characters long',
    'string.max': 'Zip Code must not exceed 10 characters',
  }),
});

const updateAddressValidationSchema = Joi.object({
  street: Joi.string().min(3).max(100).optional(),
  city: Joi.string().min(2).max(50).optional(),
  state: Joi.string().min(2).max(50).optional(),
  zipCode: Joi.string().min(5).max(10).optional(),
});

const getAllAddresses = async (req, res) => {
  try {
    const { customer_id: customerId } = req.params;

    // Find the customer and include addresses
    const customer = await Customer.findByPk(customerId, {
      include: [{ model: Address }],
    });

    if (!customer) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Customer not found',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Addresses retrieved successfully',
      data: customer.Addresses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'Failure',
      message: 'An error occurred while retrieving addresses',
    });
  }
};

// Create an address for a customer
const createAddress = async (req, res) => {
  try {
    const { error } = createAddressValidationSchema.validate(req.body);
    if (error) {
      // If validation fails, return a 400 error with the validation message
      return res.status(400).json({
        status: 'Failure',
        message: error.details[0].message, // Send the first validation error message
      });
    }
    const { customer_id: customerId } = req.params;
    const { street, city, state, zipCode, addressType } = req.body;

    // Check if the customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Customer not found',
      });
    }

    // Create the new address for the customer
    const newAddress = await Address.create({
      street,
      city,
      state,
      zipCode,
      addressType,
      customerId, // Associate the address with the customer
    });

    return res.status(201).json({
      status: 'Success',
      message: 'Address successfully created',
      data: {
        address: newAddress,
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

const updateAddress = async (req, res) => {
  try {
    const { error } = updateAddressValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Failure',
        message: error.details[0].message,
      });
    }

    const { address_id: addressId } = req.params;

    // Find the address by addressId
    const address = await Address.findByPk(addressId);
    if (!address) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Address not found',
      });
    }

    // Build an object with only the provided fields
    const fieldsToUpdate = {};
    if (req.body.street) fieldsToUpdate.street = req.body.street;
    if (req.body.city) fieldsToUpdate.city = req.body.city;
    if (req.body.state) fieldsToUpdate.state = req.body.state;
    if (req.body.zipCode) fieldsToUpdate.zipCode = req.body.zipCode;

    // Update address with only the specified fields
    await address.update(fieldsToUpdate);

    return res.status(200).json({
      status: 'Success',
      message: 'Address updated successfully',
      data: address,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'Failure',
      message: 'An error occurred while updating the address',
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { address_id: addressId } = req.params;

    // Find the address by addressId
    const address = await Address.findByPk(addressId);
    if (!address) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Address not found',
      });
    }

    // Delete address
    await address.destroy();

    return res.status(204).json({
      status: 'Success',
      message: 'Address deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'Failure',
      message: 'An error occurred while deleting the address',
    });
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
};
