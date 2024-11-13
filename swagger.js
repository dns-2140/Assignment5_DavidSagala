const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const doc = {
  info: {
    title: 'Assignment_5',
    description: 'API documentation',
  },
  host: 'localhost:3456',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './routes/customerRoutes.js',
  './routes/addressRoutes.js',
  './routes/contactRoutes.js',
  './routes/orderRoutes.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app'); // Your main app file
});
