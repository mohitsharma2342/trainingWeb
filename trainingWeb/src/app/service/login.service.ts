import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {User} from "../models/User.model";
@Injectable({
  providedIn: 'root'
})

export class LoginService {
    
    // Base url
    baseurl = 'http://gen2-005a509fad61a7fc2d634a80f877bbc09eeab4899249fe39b9b67ad.turing.doselect.com/authenticate';

   constructor(private http: HttpClient) { }
    
    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
    
  // POST
  login(data):Observable<String>{
    
    data = "username="+data.username +"&"+"password="+data.password;  
    return  this.http.post<String>(this.baseurl, data, this.httpOptions);
  }  
    
}