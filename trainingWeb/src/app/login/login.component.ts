import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../service/login.service';
import {User} from "../models/User.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  loginForm:FormGroup;
    isLoggedIn :boolean = false;


  constructor(private fb: FormBuilder,public loginService : LoginService) {
         this.user= new User();
  }

  ngOnInit(): void {
      
      this.loginForm = this.fb.group({
         emailId : new FormControl('mohitsh@hcl.com', [Validators.required]),
         password :new FormControl('123456', [Validators.required])
      });
  }

    get f(){
        return this.loginForm.controls;
    }
    
    onSubmit (){
        this.user.username = this.loginForm.value.emailId;
        this.user.password = this.loginForm.value.password;
         this.loginService.login(this.user).subscribe(res => {
          this.isLoggedIn = true;
         });;
    }

}
