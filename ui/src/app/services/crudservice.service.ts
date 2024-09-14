import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class CrudService {
    private baseUrl = 'http://localhost:3003/employees';

    constructor(private http: HttpClient) {}

    getAllEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.baseUrl}`);
    }

    getEmployeeById(id: string): Observable<Employee> {
        return this.http.get<Employee>(`${this.baseUrl}/${id}`);
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.baseUrl}`, employee);
    }

    updateEmployee(id: string, employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
    }

    deleteEmployee(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
