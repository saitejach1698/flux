const db = require('../database/dbManager');

const getAllEmployees = async () => {
    const rows = await db.query('primary','SELECT * FROM employees');
    return rows;
};

const getEmployeeById = async (id) => {
    const rows = await db.query('primary','SELECT * FROM employees WHERE id = ?', [id]);
    return rows[0];
};

const createEmployee = async (employee,username) => {
    const {name, employee_code, emp_dept, salary } = employee;
    const result = await db.query('primary','INSERT INTO employees (name, employee_code, emp_dept, salary, created_by, last_updated_by) VALUES ( ?, ?, ?, ?, ?, ?)', [ name, employee_code, emp_dept, salary, username, username]);
    return { id: result.insertId, ...employee };
};

const updateEmployee = async (id, employee,username) => {
    const { name, employee_code, emp_dept, salary } = employee;
    await db.query('primary','UPDATE employees SET name = ?, employee_code = ?, emp_dept = ?, salary = ?, last_updated_by = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, employee_code, emp_dept, salary, username, id]);
    return { id, ...employee };
};

const deleteEmployee = async (id) => {
    await db.query('primary','DELETE FROM employees WHERE id = ?', [id]);
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
