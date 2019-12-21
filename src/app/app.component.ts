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
  constructor(private http:HttpClient){
  }

  onSubmit_data(data: { email: any; password: any; }){
 
    this.http.post<any>('http://localhost:3000/api', data).subscribe(result=>{
      console.log(JSON.stringify(result))
    });
    
  }
  ngOnInit(): void {
    
  }
  funOnClickCount(){
    this.count = this.count + 1;
  }



}
