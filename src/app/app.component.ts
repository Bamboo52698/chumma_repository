
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import {ElementRef, ViewChild}from '@angular/core';



// Import the Buttons extension if you haven't already
// import 'datatables.net-buttons/js/dataTables.buttons.min.js';
// import 'datatables.net-buttons/js/buttons.html5.min.js'; // For HTML5 export buttons


import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Use 'styleUrls' instead of 'styleUrl'
})
export class AppComponent implements OnInit,OnDestroy {

  messageArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  message: string = ''; 
  dtOption : DataTables.Settings={};
  dtTrigger : Subject<any> = new Subject<any>();
   
  constructor( private alert: ToastrService,private http: HttpClient) { }
  ngOnInit(): void {
  
    this.getmessage(); 
    this.dtOption = {
      pagingType: 'full_numbers',
      searching:true  
      
      

    }
    
  }

  getmessage() {
    this.http.get("http://localhost:8000/api/message/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.messageArray = resultData.data;
  
       });
  }
  
     

  

  onSubmit() {
    console.log("hello")
    // this.isLogin = false; 
    // alert("hi");
    let bodyData = {
      "message": this.message,
    };
    this.http.post("http://localhost:8000/api/message/add/", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      this.getmessage();
      alert("Are you want to submit this")
      this.message='';
    });

  }

 
  setUpdate(data:any)
  {
    this.message=data.message;
    const textareaElement=document.getElementById('editTextArea');
    if (textareaElement){
      textareaElement.scrollIntoView({behavior:'smooth', block: 'center'});
    }
  };

  UpdateRecords(message:string)
  {
    let bodyData=
    {
      "message": this.message,  
     };

     this.http.put("http://localhost:8000/api/message/update/"+ message,bodyData).subscribe((resultData:any)=>
    
    {
      console.log(resultData);
      alert("Are you want to update this?")
      this.getmessage();
    });
  }
  
  onSumbit()
  {
    if(this.message=='')
    {
      this.onSubmit();
    }
    else{
      this.UpdateRecords(this.message);
    }
  }
  setDelete(data:any)
  {
    this.http.delete("http://localhost:8000/api/message/delete"+"/"+ data.message).subscribe((resultData:any)=>
    {
      console.log(resultData);
      alert("Are you want to delete this?")
      this.getmessage();
    });
  }

  ngOnDestroy(): void {
    // $.fn.dataTable.ext.search.pop();
    this.dtTrigger.next(null); 
  }
  }
  

