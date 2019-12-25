import { Component, Output, EventEmitter, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'my-app';
  count = 0;
  mDataArray:any[] = [];
  array_list_name:any;
  searchInput: any;
  constructor(
    private http:HttpClient,
    private modalService : BsModalService
  ){}
  modalRef:BsModalRef;
 
  @ViewChild('template', {static: true}) modal:TemplateRef<any>;; 

  onClick(){
    this.modalRef = this.modalService.show(this.modal);
  }

  onSubmit_data(data: { email: any; phone_number: any; }){
 
    this.http.post<any>('http://localhost:3000/api', data).subscribe(result=>{
  
      this.getData();
    });
    
  }


  func_search(val){
    if(val.key === "Enter"){
      this.http.get<any>('http://localhost:3000/search/'+ val.target.value).subscribe(result=>{
        this.mDataArray = result.data;   
      });
    }
  }

  getData(){
    this.http.get<any>('http://localhost:3000/list_data').subscribe(result=>{
      console.log(result);
      this.mDataArray = result.data
    });
  }

  edit_data(edit_data){
    this.http.post<any>('http://localhost:3000/api', edit_data).subscribe(result=>{
      this.mDataArray = result.data
    });
  } 

  ngOnInit(): void {
    
  }
  
}
