import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { SignupPayload } from 'src/app/common/signup-payload';
import { UserRest } from 'src/app/common/user-rest';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  /**
   * 1) Create a payload
   * 2) Create a form
   * 3) Store the form-data in payload
   * 4) send the payload to the user service
   * 5) take the response and fill-up the desired values
   */


  signupForm: FormGroup;
  payload: SignupPayload;
  response: UserRest;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService,
              private userSerivce: UserServiceService) { 

    //Defining the payload

    this.payload = {
      'firstName':'',
      'lastName':'',
      'email':'',
      'mobileNumber':'',
      'dob': null,
      'password':''
    };


  }

  ngOnInit(): void {

    //Initialize the form builder
    this.signupForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
      dob: ['',Validators.required],
      mobileNumber: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    });

  }

  onSubmit(){

    //Copying the form-data to the payload

    this.payload.firstName = this.signupForm.get('firstName').value;
    this.payload.lastName = this.signupForm.get('lastName').value;
    this.payload.email = this.signupForm.get('email').value;
    this.payload.password = this.signupForm.get('password').value;
    this.payload.dob = this.signupForm.get('dob').value;
    this.payload.mobileNumber = this.signupForm.get('mobileNumber').value;

    //Passing this payload to the service

    this.userSerivce.signupUser(this.payload).subscribe(
      data => {
        console.log("Data Received "+JSON.stringify(data));
        this.response = data;
        this.router.navigate(['/login']);
        this.toaster.success("Login Successful");
      },
      error => {
        this.router.navigateByUrl('');
        this.toaster.error("Try Again!!!");
      }
    );

  }

  discard() {
    this.router.navigateByUrl('');
    this.toaster.show("Discarded The Info!!!")
  }

}
