const { Customer } = require('../models');
const Joi = require('joi');

const customerValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

const updateCustomerValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(30),
  lastName: Joi.string().min(3).max(30),
  email: Joi.string().email(),
});

const createCustomer = async (req, res) => {
  try {
    const { error } = customerValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Failure',
        message: error.details[0].message,
      });
    }
    const { firstName, lastName, email } = req.body;
    const isCustomerExist = await Customer.findOne({
      where: {
        email,
      },
    });

    if (!isCustomerExist) {
      const newCustomer = await Customer.create({
        firstName,
        lastName,
        email,
      });

      return res.status(201).json({
        status: 'Success',
        message: 'Successfully created a customer',
        data: {
          customer: newCustomer,
        },
      });
    } else {
      return res.status(409).json({
        status: 'failure',
        message: 'The email provided is already registered',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Failure',
      message: 'internal error',
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Customer not found',
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Successfully retrieved customer',
      data: {
        customer,
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

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();

    res.status(200).json({
      status: 'Success',
      message: 'Successfully retrieved all customers',
      data: {
        customers,
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

const updateCustomer = async (req, res) => {
  try {
    const { error } = updateCustomerValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Failure',
        message: error.details[0].message,
      });
    }
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Customer not found',
      });
    }

    customer.firstName =
      firstName !== undefined ? firstName : customer.firstName;
    customer.lastName = lastName !== undefined ? lastName : customer.lastName;
    customer.email = email !== undefined ? email : customer.email;

    await customer.save();

    res.status(200).json({
      status: 'Success',
      message: 'Successfully updated customer',
      data: {
        customer,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'Failure',
      message: 'Internal error',
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({
        status: 'Failure',
        message: 'Customer not found',
      });
    }

    await customer.destroy();

    res.status(204).json({
      status: 'Success',
      message: 'Successfully deleted customer',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'Failure',
      message: 'Internal error',
    });
  }
};

module.exports = {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};
