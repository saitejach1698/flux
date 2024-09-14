export interface Employee {
    id?: number;
    firstName?: string;
    lastName?: string;
    name: string;
    employee_code: string;
    emp_dept?: 'SALES' | 'FINANCE' | 'OPERATIONS';
    salary: number;
    created_by?: string;
    last_updated_by?: string;
    created_at?: string;
    updated_at?: string;
}
