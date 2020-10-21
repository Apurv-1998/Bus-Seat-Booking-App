import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user-service.service';
import { LoginPayload } from 'src/app/common/login-payload'; 
import { UserRest } from 'src/app/common/user-rest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  payload: LoginPayload;
  userId: string;
  response: UserRest;
  isVerified: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserServiceService,
              private toaster: ToastrService) { 

    this.payload = {
      'firstName':'',
      'lastName':'',
      'email':'',
      'password':''
    };

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    });

  }


  onSubmit(){

    this.payload.firstName = this.loginForm.get('firstName').value;
    this.payload.lastName = this.loginForm.get('lastName').value;
    this.payload.email = this.loginForm.get('email').value;
    this.payload.password = this.loginForm.get('password').value;

    this.userService.loginUser(this.payload).subscribe(
      data => {
        console.log("Response Received ",JSON.stringify(data));
        this.response = data;
        this.userId = this.response.userId;
        this.isVerified = this.response.verified.toString();
        this.router.navigate(['/userDetails/'+this.userId]);
        this.toaster.success("Login Successful");
        localStorage.setItem("VERIFIED_USER",this.isVerified);
      },
      error=>{
        this.toaster.error("Invalid credentials!!!");
        this.router.navigateByUrl('');
      }
    );

  }

}
