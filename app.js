const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const swaggerJsdoc = require('swagger-jsdoc');
const customerRoutes = require('./routes/customerRoutes');
const addressRoutes = require('./routes/addressRoutes');
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

//customer routes
app.use('/customers', customerRoutes);
//address routes
app.use('/customers', addressRoutes);
app.use('/addresses', addressRoutes);
//contact routes
app.use('/customers', contactRoutes);
app.use('/contacts', contactRoutes);
//order routes
app.use('/customers', orderRoutes);
app.use('/orders', orderRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = 3456;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
