const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Assignment_5',
    description: 'API documentation',
  },
  host: 'localhost:3456',
  schemes: ['http'],
};

const outputFile = './swagger-output2.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app'); // Your main app file
});
