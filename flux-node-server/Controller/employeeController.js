const db = require('../Services/employee.service'); // Adjust the path as needed
const logger = require('../Services/logger.service'); // Import the logger

const getAllEmployees = async (req, res) => {
    try {
        const employees = await db.getAllEmployees();
        logger.info(`Response: ${res.statusCode} - Body: ${JSON.stringify(employees)}`);
        res.json(employees);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Failed to retrieve employees' });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await db.getEmployeeById(req.params.id);
        if (employee) {
            logger.info(`Response: ${res.statusCode} - Body: ${JSON.stringify(employee)}`);
            res.json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Failed to retrieve employee' });
    }
};

const createEmployee = async (req, res) => {
    try {
        const newEmployee = await db.createEmployee(req.body,req.username);
        logger.info(`Response: ${res.statusCode} - Body: ${JSON.stringify(newEmployee)}`);
        res.status(201).json(newEmployee);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Failed to add employee' });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await db.updateEmployee(req.params.id, req.body);
        logger.info(`Response: ${res.statusCode} - Body: ${JSON.stringify(updatedEmployee)}`);
        res.json(updatedEmployee);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Failed to update employee' });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        await db.deleteEmployee(req.params.id);
        logger.info(`Response: ${res.statusCode} - Body: Employee deleted`);
        res.status(204).end();
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Failed to delete employee' });
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
