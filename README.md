# Assignment 5 - API DOCUMENTATION

## Overview

This is a robust and scalable backend API built with **Node.js**, **Express.js**, and **Sequelize ORM**. The project incorporates several modern development tools and libraries to ensure a high level of performance, maintainability, and security. Additionally, the app utilizes Swagger for auto-generating interactive API documentation, allowing developers to explore and test the API endpoints with ease.

This application is specifically designed to help manage key aspects of a business, including:

Customers: Efficient management of customer data, including customer creation, updates, and deletion. This enables businesses to maintain a clean and updated customer database.

Orders: Handling of customer orders, providing endpoints for creating, updating, and retrieving order details. It supports a system for tracking the status and history of each order.

Addresses: Storing and managing customer addresses, allowing for seamless integration with order processing. It ensures that the correct address is linked to each order and customer.

Contacts: Managing customer contact information, enabling businesses to easily maintain communication channels, including phone numbers and email addresses.

### Main Packages Used:

- **Node.js**: A JavaScript runtime that enables server-side scripting.
- **Express.js**: A minimalist web framework for Node.js, used to build the server and define routes.
- **Sequelize ORM**: A promise-based ORM that simplifies interaction with relational databases like MySQL.
- **dotenv**: Manages environment variables securely.
- **Joi**: Schema validation library to ensure data integrity and prevent malicious inputs.
- **MySQL2**: A MySQL client for Node.js, providing seamless database communication.
- **Swagger**: API documentation using `swagger-autogen`, `swagger-jsdoc`, and `swagger-ui-express` for auto-generated, interactive documentation.

This project provides a fully functioning backend API that is ready for real-world applications, with built-in security, validation, and auto-generated documentation.
