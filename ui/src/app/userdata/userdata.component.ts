import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../services/crudservice.service';
import { ToastService } from '../services/toast.service';
import { Employee } from '../models/employee.model';
import { AuthService } from '../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-userdata',
    templateUrl: './userdata.component.html',
    styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
    employees: Employee[] = [];
    filteredEmployees: Employee[] = [];
    employee: Employee = {
        name: '',
        employee_code: '',
        salary: 0
    };
    username: string | undefined;
    searchTerm: string = '';

    constructor(
        private crudService: CrudService,
        private toastService: ToastService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.username = this.authService.getUsername(); // Assuming you have a method to get the username
        this.loadEmployees();
    }

    loadEmployees() {
        this.crudService.getAllEmployees().pipe(
            tap(data => {
                this.employees = data;
                this.filteredEmployees = data;
            }),
            catchError(error => {
                this.toastService.showError('Failed to load employees', 'Error');
                return of([]);
            })
        ).subscribe();
    }

    onSearch() {
        this.filteredEmployees = this.employees.filter(employee =>
            employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            employee.employee_code.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const employeeOperation = this.employee.id
            ? this.crudService.updateEmployee(this.employee.id.toString(), this.employee)
            : this.crudService.addEmployee(this.employee);

        employeeOperation.pipe(
            tap(response => {
                this.loadEmployees();
                this.toastService.showSuccess(`Employee ${this.employee.id ? 'updated' : 'added'} successfully`, 'Success');
                this.employee = { name: '', employee_code: '', salary: 0 }; // Reset form
            }),
            catchError(error => {
                this.toastService.showError(`Failed to ${this.employee.id ? 'update' : 'add'} employee`, 'Error');
                return of(null);
            })
        ).subscribe();
    }

    onEdit(employee: Employee) {
        this.employee = { ...employee };
    }

    onDelete(id: any) {
        this.crudService.deleteEmployee(id.toString()).pipe(
            tap(response => {
                this.loadEmployees();
                this.toastService.showSuccess('Employee deleted successfully', 'Success');
            }),
            catchError(error => {
                this.toastService.showError('Failed to delete employee', 'Error');
                return of(null);
            })
        ).subscribe();
    }
}
