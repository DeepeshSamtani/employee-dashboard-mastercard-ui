export class Employee {
  id: number;
  fname: string;
  lname: string;
  department: string;
  designation: string;
  emailId: string;
  manager: string;
  dateOfJoining: string;
  salary: number;

  constructor(id: number, fname: string, lname: string, emailId:string,department: string, designation: string, manager: string, dateOfJoining: string, salary: number) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.department = department;
    this.designation = designation;
    this.manager = manager;
    this.dateOfJoining = dateOfJoining;
    this.salary = salary;
    this.emailId=emailId;
  }
}
