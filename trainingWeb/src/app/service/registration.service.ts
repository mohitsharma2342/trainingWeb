import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Registration} from "../models/Registration.model";

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
    
    // Base url
    baseurl = 'https://gen2-005a509fad61a7fc2d634a80f877bbc09eeab4899249fe39b9b67ad.turing.doselect.com/api/registration';

   constructor(private http: HttpClient) { }
    
    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
    
  // POST
  CreateUser(data): Observable<Registration> {
    return this.http.post<Registration>(this.baseurl, JSON.stringify(data), this.httpOptions);
  }  
    
 checkUserExist(emailId):Observable<String> {
     return this.http.get<String>(this.baseurl+"/checkUserExist?emailId="+emailId);
 }
    
}