import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EmployeeManager';
  displayedColumns: string[] = ['id','emp_Name', 'emp_Dep', 'emp_Salary', 'gender', 'join_Date', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){


  }
  ngOnInit(): void {
    this.getAllEmployees();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllEmployees();
      }
    })
  }
  getAllEmployees(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:()=>{
        alert('Error while fething the records');
      }
    })
  }

  editEmployee(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllEmployees();
      }
    })
    
  }

  deleteEmployee(id: number){
    this.api.deleteEmployee(id)
    .subscribe({
      next: (res)=>{
        alert('Employee Deleted Successfully')
      },
      error:()=>{
        alert('Error while Deleting the records');
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
}
