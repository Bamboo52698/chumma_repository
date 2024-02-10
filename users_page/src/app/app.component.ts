import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataTableDirective} from 'angular-datatables';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  UsersArray : any[] = [];
  isResultLoaded = false;

  UserNameUpdate: any;
  UserEmailUpdate: any;
  UserMobileNoUpdate: any;
  currentUserID : any ;

  idToShow : any;
  isTextboxVisible: boolean = false;

  dtoptions : DataTables.Settings= {} ;
  dtTrigger: Subject<any> = new Subject<any>;

  isEditClicked : boolean = false;

 


  @ViewChild(DataTableDirective, {static: false})
datatableElement: any = DataTableDirective;

  constructor(private http: HttpClient ) 
  {
    this.getUsers();
  }

  ngOnInit(): void {

    this.dtoptions={

      lengthChange:true,
      dom: 'Bfrtip',
      pagingType:"full_numbers",
    
    }
  }
  getUsers()
  { 
    this.http.get("http://localhost:8888/api/user/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.UsersArray = resultData.data;
        this.dtTrigger.next(resultData);
    });
  }

  showTableData(ID: any): void {
    this.isEditClicked = !this.isEditClicked;
    this.idToShow = ID;
  }

  UpdateRecords(useritem : any)
  {
    this.currentUserID = useritem.ID;
    if(this.UserNameUpdate == null){
      this.UserNameUpdate = prompt("UserName must not be Empty");
    }else{
      alert("Are you want to Update these fields");
    let bodyData = 
    {
      "UserName" : this.UserNameUpdate,
      "UserEmail" : this.UserEmailUpdate,
      "UserMobileNo" : this.UserMobileNoUpdate
    }
  ;
    
    this.http.put("http://localhost:8888/api/user/update"+ "/"+ this.currentUserID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Details Updated")
      
    });}
  }


 
  setDelete(useritem: any)
  {
    this.http.delete("http://localhost:8888/api/user/delete/"+ useritem.ID).subscribe((resultData: any)=>
    {
      alert("Are you want to delete these fields");
        console.log(resultData);
    });
  }
}




