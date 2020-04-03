import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';

import { OktaAuthModule } from '@okta/okta-angular';
import { OktasuccessComponent } from './oktasuccess/oktasuccess.component';
const config = {
  issuer: 'https://dev-436159.okta.com/oauth2/default',
  redirectUri: 'https://gen1-005a509fad61a7fc2d634a80f877bbc09eeab4899249fe39b9b67ad.turing.doselect.com/implicit/callback',
  clientId: '0oa48e416cnf0PmJ34x6'
};


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    OktasuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule ,
     OktaAuthModule.initAuth(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
