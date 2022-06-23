import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  genderList = ["Male", "Female"];
  employeeForm !: FormGroup;
  actionBtn: String = "Save";
  addOrUpdate: String = "Add"
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      emp_Name: ['', Validators.required],
      emp_Dep: ['', Validators.required],
      join_Date: ['', Validators.required],
      emp_Salary: ['', Validators.required],
      gender: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (this.editData) {
      this.addOrUpdate = "Update"
      this.actionBtn = "Update"
      this.employeeForm.controls['emp_Name'].setValue(this.editData.emp_Name);
      this.employeeForm.controls['emp_Dep'].setValue(this.editData.emp_Dep);
      this.employeeForm.controls['join_Date'].setValue(this.editData.join_Date);
      this.employeeForm.controls['emp_Salary'].setValue(this.editData.emp_Salary);
      this.employeeForm.controls['gender'].setValue(this.editData.gender);
      this.employeeForm.controls['description'].setValue(this.editData.description);
    }
  }
  addEmployee() {
    if (!this.editData) {
      if (this.employeeForm.valid) {
        this.api.postEmployee(this.employeeForm.value)
          .subscribe({
            next: (res) => {
              alert("Employee added successfully");
              this.employeeForm.reset();
              this.dialogref.close('save');
            },
            error: () => {
              alert("Error while adding the Employee")
            }
          })
      } 
      }else {
        this.updateEmployee()
    }
  }
  updateEmployee(){
    this.api.patchEmployee(this.employeeForm.value, this.editData._id)
    .subscribe({
      next: (res)=>{
        alert('Employee Updated Successfully');
        this.employeeForm.reset();
        this.dialogref.close('update')
      },
      error:()=>{
        alert('Error while updating the record');
      }
    })
  }
}
