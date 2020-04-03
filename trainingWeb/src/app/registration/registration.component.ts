import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup, FormBuilder } from '@angular/forms';
import {User} from "../models/User.model";
import {Registration} from "../models/Registration.model";
import {Trainee} from "../models/Trainee.model";
import {Trainer} from "../models/Trainer.model";
import {UserRole} from "../models/UserRole.model";
import { RegistrationService } from '../service/registration.service';
import {Profile} from "../models/Profile.model";
import {Coordinator} from "../models/Coordinator.model";
import { MustMatch } from '../validator/customvalidator.validator';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    
    user:User;
    trainee:Trainee;
    registration:Registration;
    registrationForm:FormGroup;
    userRole : UserRole;
    profile : Profile ;
    coordinator : Coordinator;
    trainer : Trainer ;
    
    traineeField:boolean = false ;
    trainerField:boolean = false ;
    isSelected:boolean = true;
    registrationSuccessMsg: boolean = false;
    isUserExit : boolean = false;
    isAuthenticated: boolean;
    
    userRoless = [
    new UserRole(1, 'Admin'),
    new UserRole(2, 'Trainer'),
    new UserRole(3, 'Trainee'),
    new UserRole(4, 'Coordinator')		 
    ] ;
    constructor(private fb: FormBuilder,public regService:RegistrationService,public oktaAuth: OktaAuthService) {
        
   
        this.user= new User();
        this.registration =new  Registration();
        this.userRole = new UserRole(null,null);
        this.profile = new Profile();
        this.coordinator  = new Coordinator();
        this.trainee = new Trainee();
        this.trainer = new Trainer();
         this.isSelected = false;
        
    }

 async ngOnInit() {
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
        // Subscribe to authentication state changes
         this.oktaAuth.$authenticationState.subscribe(
              (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
         );  
   
     
     
      this.registrationForm = this.fb.group({
          firstName :new FormControl('Mohit', [Validators.required]),
          lastName : new FormControl('Sharma', [Validators.required]),
          password :new FormControl('123456', [Validators.required]),
          address : new FormControl('neeladri', [Validators.required]) ,
          mobNumber : new FormControl('123456789', [Validators.required]),
          emailId : new FormControl('mohitsh@hcl.com', [Validators.required]),
          roleName : new FormControl(null),
          confirmPassword : new FormControl('', [Validators.required]),
          highestQualification : new FormControl(''),
          primarySkill : new FormControl(''),
          certification : new FormControl(''),
          expeprience : new FormControl(''),
          gender : new FormControl('Select Your Gender')
      },{
          validator: MustMatch('password', 'confirmPassword')
      }
      );
      this.registrationForm.patchValue({
      'roleName': "default"
      });
  }

    get f(){
    return this.registrationForm.controls;
    }


    onSubmit (){
        if(!this.isUserExit){
        this.userRole = this.registrationForm.value.roleName;
        this.user.email = this.registrationForm.value.emailId;
        this.user.password = this.registrationForm.value.password;
        this.profile.firstName = this.registrationForm.value.firstName;
        this.profile.lastName = this.registrationForm.value.lastName ;
        this.profile.mobNumber = this.registrationForm.value.mobNumber;
        this.profile.address = this.registrationForm.value.address ;
        this.profile.gender = this.registrationForm.value.gender ;
        this.user.userRoles =  this.userRole;
        if(this.userRole.roleName== "Trainer"){
            this.trainer.profile = this.profile;
            this.trainer.certification =  this.registrationForm.value.certification;
            this.trainer.exprience =  this.registrationForm.value.expeprience;
            this.trainer.user = this.user;
             this.registration.trainer = this.trainer;
        }else if(this.userRole.roleName== "Trainee" ){
            this.trainee.profile = this.profile;
            this.trainee.qualification =  this.registrationForm.value.highestQualification;
            this.trainee.primaySkill =  this.registrationForm.value.primarySkill;
            this.trainee.user = this.user;
             this.registration.trainee = this.trainee;
        }else {
            this.coordinator.profile = this.profile;
            this.coordinator.user = this.user;
            this.registration.coordinator = this.coordinator;
        }
            this.regService.CreateUser(this.registration).subscribe(res => {
              console.log(res);    
              this.registrationSuccessMsg = true;    
            });;
    
        }
       }


    checkUserExist(){
        this.regService.checkUserExist(this.registrationForm.value.emailId).subscribe(res => {
            if(res!=null){
                this.isUserExit = true;
            }else {
                this.isUserExit = false;
            }
         });;
    }


    selectRole(){
       console.log(this.selectRole);
        if(this.registrationForm.value.roleName.roleName== "Trainer"){
              this.trainerField = true;
              this.traineeField = false;
        }else if(this.registrationForm.value.roleName.roleName== "Trainee" ){
               this.traineeField = true;
               this.trainerField = false;
        }else {
            this.coordinator.profile = this.profile;
        }
    }

    loginWithOkta() {
      this.oktaAuth.loginRedirect('/oktaSucces');
   }


}
