import {Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmplAddEditComponent} from "./empl-add-edit/empl-add-edit.component";
import {EmployeeService} from "./services/employee.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CoreService} from "./services/core.service";

interface Api {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employee-dashboard-mastercard-ui';
  displayedColumns: string[] = ['id', 'fname', 'lname', 'emailId', 'department', 'salary', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedValue: any;
  apis: Api[] = [
    {value: 'fetchAllEmployee', viewValue: 'Fetch All Employees'},
    {value: 'fetchAllEmployeeInOrganization', viewValue: 'Fetch All Employees currently in Organization'},
    {value: 'fetchEmployeeJoinedLastQuarter', viewValue: 'Fetch Employees joined Last Quarter'},
    {value: 'fetchEmployeeLeftLastQuarter', viewValue: 'Fetch Employees left Last Quarter'},
    {value: 'fetchAllLeftEmployees', viewValue: 'Fetch Employees who left till date'},
    {
      value: 'employeesalaryGreaterThanManager',
      viewValue: 'Fetch Employees whose salary is greater than their manager'
    },

  ]

  constructor(private dialog: MatDialog,
              private empService: EmployeeService,
              private coreService: CoreService
  ) {
  }

  openAddEditEmployeeForm() {
    const dialogRef = this.dialog.open(EmplAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.empService.getEmployeesList().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getEmployeesJoinedLastQuarter() {
    this.empService.getEmployeesJoinedLastQuarter().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getEmployeesLeftLastQuarter() {
    this.empService.getEmployeesLeftLastQuarter().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  private getCurrentEmployees() {
    this.empService.getCurrentEmployees().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  private getLeftEmployees() {
    this.empService.getLeftEmployees().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  private getEmployeesWhoseSalaryIsGreaterthanManager() {
    this.empService.getEmployeesWhoseSalaryIsGreaterthanManager().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Employee Soft Deleted');
        this.dataSource = new MatTableDataSource(res);
        this.getCurrentEmployees();
        },
      error: console.log,
    })
  }

  inputChange() {
    if (this.selectedValue == "fetchAllEmployee") {
      this.getEmployeeList();
    }
    else if (this.selectedValue == "fetchAllEmployeeInOrganization") {
      this.getCurrentEmployees();
    }
    else if (this.selectedValue == "fetchEmployeeJoinedLastQuarter") {
      this.getEmployeesJoinedLastQuarter();
    }
    else if (this.selectedValue == "fetchEmployeeLeftLastQuarter") {
      this.getEmployeesLeftLastQuarter();
    }
    else if (this.selectedValue == "fetchAllLeftEmployees") {
      this.getLeftEmployees();
    }
    else if (this.selectedValue == "employeesalaryGreaterThanManager") {
      this.getEmployeesWhoseSalaryIsGreaterthanManager();
    }

  }


}
