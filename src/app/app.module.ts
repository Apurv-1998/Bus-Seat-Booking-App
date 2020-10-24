import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { RouteComponent } from './components/route/route.component';
import { BusComponent } from './components/bus/bus.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { BusDetailsComponent } from './components/bus-details/bus-details.component';


  const routes: Routes = [

    {path: "busDetails/:busNumber", component: BusDetailsComponent},
    {path: "verifyMobile/:userId", component: OtpVerificationComponent},
    {path: 'booking/:userId', component: RouteComponent},
    {path: 'userDetails/:userId', component: UserDetailsComponent},
    {path: "signup", component: SignupComponent},
    {path: "login", component: LoginComponent}
    
  ]


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    LoginComponent,
    UserDetailsComponent,
    RouteComponent,
    BusComponent,
    OtpVerificationComponent,
    BusDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
