import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
// import {HttpParams} from "@angular/common/http";
var _URL = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class GraphsService {

  constructor(private http: HttpClient) {

   }
   getGraphData(){
     return this.http.get( "/api/graph");
   }

   getData(page,search,p){
     let params=new HttpParams();
     params=params.append('page',page.toString());
     p.map(re => {
       params=params.append(re.key,re.value)
     })
     if(search){
      params=params.append('search',search);
     }
     console.log(params);
     
     return this.http.get("/api/all",{params:params})
   }
   getOptions(){
     return this.http.get('/api/options')
   }
}
