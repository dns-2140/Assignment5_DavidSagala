const { sequelize, Address, Customer } = require('../models');

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('connected to the database');
  })
  .catch((e) => console.log(e));
