import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../services/crudservice.service';
import { Employee } from '../models/employee.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-employee-profile',
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
    employee: Employee = {
        id: 0,
        name: '',
        employee_code: '',
        salary: 0
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private crudService: CrudService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.crudService.getEmployeeById(id!).pipe(
            catchError(error => {
                console.error('Failed to load employee', error);
                return of(null);
            })
        ).subscribe(employee => {
            if (employee) {
                this.employee = employee;
            } else {
                // Handle the case where the employee is not found
                this.router.navigate(['/userdata']);
            }
        });
    }

    goBack() {
        this.router.navigate(['/userdata']);
    }
}
