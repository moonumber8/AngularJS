import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
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
  constructor(private http:HttpClient){
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
      this.mDataArray = result.data
    });
  }

  edit_data(a){
    console.log(typeof(a));
  }
  

  ngOnInit(): void {
    
  }
  
}
