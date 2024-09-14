const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/auth');
const employeeController = require('../Controller/employeeController'); // Assuming you have this controller

// Routes for employee operations
router.get('/', authMiddleware, employeeController.getAllEmployees);
router.get('/:id', authMiddleware, employeeController.getEmployeeById);
router.post('/', authMiddleware, employeeController.createEmployee);
router.put('/:id', authMiddleware, employeeController.updateEmployee);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

module.exports = router;
