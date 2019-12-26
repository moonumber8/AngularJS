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
  mDetailArray:any[] = [];
  item_id: any;
  s_email: any;
  s_phone_nunber: any;
  searchInput: any;
  edit_email: any;
  data: any[];
  constructor(
    private http:HttpClient,
    private modalService : BsModalService
  ){}
  modalRef:BsModalRef;
 
  @ViewChild('template', {static: true}) modal:TemplateRef<any>;; 


  onSubmit_data(data: { email: any; phone_number: any; }){
 
    this.http.post<any>('http://localhost:3000/api', data).subscribe(result=>{
  
      this.getData();
    });
    
  }


  func_search(val: { key: string; target: { value: string; }; }){
    if(val.key === "Enter"){
      this.http.get<any>('http://localhost:3000/search/'+ val.target.value).subscribe(result=>{
        this.mDataArray = result.data;   
      });
    }
  }

  getData(){
    this.http.get<any>('http://localhost:3000/list_data').subscribe(result=>{
      this.mDataArray = result.data
    });
  }

  edit_data(edit_data: { email: any; phone_number: any; },item_id: any){
    let obj_data = { 
      email:edit_data.email, 
      phone_number:edit_data.phone_number,
      item_id:item_id
    }; 
    this.http.put<any>('http://localhost:3000/edit_data', obj_data).subscribe(result=>{
      this.getData();
    });
  } 

  del_data(item_id: any){

    this.http.delete('http://localhost:3000/delete/'+ item_id).subscribe(result=>{
      this.getData();
    });
  }

  onClick(data: any,item_id: any){
     this.http.get<any>('http://localhost:3000/show_detail/'+ item_id).subscribe(result=>{
        this.mDetailArray = result.data;
    });
    this.item_id = item_id;
    this.modalRef = this.modalService.show(this.modal);
   
  }


  ngOnInit(): void {
    
  }
  
}
