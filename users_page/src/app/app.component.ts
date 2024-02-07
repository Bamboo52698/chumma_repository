import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  UsersArray : any[] = [];
  usArray : any[] = ["nme","hh","uu","uu","uu","rr","oo"];
  isResultLoaded = false;
  isUpdateFormActive = false;
  dtoptions : DataTables.Settings= {} ;
  dtTrigger: Subject<any> = new Subject<any>;

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


}




