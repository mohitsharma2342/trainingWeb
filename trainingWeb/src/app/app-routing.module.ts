import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { OktasuccessComponent } from './oktasuccess/oktasuccess.component';

import { OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
      { path: '',component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'oktaSucces', component: OktasuccessComponent },
      {path: 'implicit/callback',component: OktaCallbackComponent}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
