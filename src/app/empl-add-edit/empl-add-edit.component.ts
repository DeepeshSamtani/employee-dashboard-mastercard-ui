import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../services/core.service";
import {Observable, pipe} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Employee} from "../model/employee.model";

@Component({
  selector: 'app-empl-add-edit',
  templateUrl: './empl-add-edit.component.html',
  styleUrls: ['./empl-add-edit.component.scss']
})
export class EmplAddEditComponent {

  empForm: FormGroup;

  constructor(private fb: FormBuilder,
              private empService: EmployeeService,
              private dialogRef: MatDialogRef<EmplAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private coreService: CoreService) {
    this.empForm = this.fb.group({
      id: '',
      fname: '',
      lname: '',
      emailId: '',
      dateOfJoining: '',
      manager: '' || null,
      gender: '',
      salary: '',
      designation: '',
      department: ''
    })
  }

  departmentControl = new FormControl('');
  designationControl = new FormControl('');
  department: string[] = ['Corporate Bank', 'Investment Bank', 'Private Bank', 'Asset Management', 'Capital Release'];
  designation: string[] = ['Analyst', 'Associate', 'AVP', 'VP', 'Director'];
  filteredDepOptions: Observable<string[]> | undefined;
  filteredDesOptions: Observable<string[]> | undefined;
  exampleHeader: any;
  private employee: Employee | undefined;

  ngOnInit() {
    this.filteredDepOptions = this.departmentControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.filterForDepartment(value || '')),
    );
  }

  private filterForDepartment(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.department.filter(dep => dep.toLowerCase().includes(filterValue));
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      const manager = this.empForm.value['manager'];

      if (manager == null) {
        this.empService.addEmployee(this.empForm.value).subscribe((res) => {
          this.dialogRef.close(true);
        })
      } else {
        let promise = new Promise((resolve, reject) => {
          this.empService.employeeExists(manager).toPromise().then((response) => {
            if (response) {
              console.log(this.empForm.value);
              this.empService.addEmployee(this.empForm.value).subscribe((res) => {
                this.dialogRef.close(true);
              })
            } else {
              alert("Manager with mentioned email Id not found");
            }
          })
        });
      }


    }
  }
}
