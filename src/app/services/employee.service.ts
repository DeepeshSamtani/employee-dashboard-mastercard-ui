import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from 'rxjs/operators';
import {Observable, pipe, throwError} from 'rxjs';
import {Employee} from "../model/employee.model";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  addEmployee(data: Employee): Observable<any> {
    return this.http.post(`http://localhost:8080/employee/save`, data).pipe(map((data: any) => {
        return data;
      }),
      catchError(error => {
        return throwError('Something went wrong!')
      })
    );

  }

  getEmployeesList(): Observable<any> {
    return this.http.get('http://localhost:8080/employee/');
  }

  getEmployeesJoinedLastQuarter(): Observable<any> {
    return this.http.get('http://localhost:8080/employee/joined');
  }

  getEmployeesLeftLastQuarter(): Observable<any> {
    return this.http.get('http://localhost:8080/employee/left');
  }

  deleteEmployee(empId: number): Observable<any> {
    const patchData = {id: 1}
    return this.http.patch(`http://localhost:8080/employee/delete/${empId}`,patchData);
  }

  getCurrentEmployees(): Observable<any> {
    return this.http.get('http://localhost:8080/employee/current');

  }

  getLeftEmployees(): Observable<any> {
    return this.http.get('http://localhost:8080/employee/leftAll');

  }

  getEmployeesWhoseSalaryIsGreaterthanManager(): Observable<any> {
    return this.http.get('http://localhost:8080/employee/employeeSalaryGreater');

  }

  fetchEmployee(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/employee/${id}`);
  }

  employeeExists(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/employee/check/${id}`).pipe(map((data: any) => {
        return data;
      }),
      catchError(error => {
        return throwError('Something went wrong!')
      })
    );
  }
}
