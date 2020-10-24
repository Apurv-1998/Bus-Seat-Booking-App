import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OtpPayload } from 'src/app/common/otp-payload';
import { UserServiceService } from 'src/app/services/user-service.service';
import { OtpRest } from 'src/app/common/otp-rest';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {

  otpForm: FormGroup;
  payload:OtpPayload;
  response: OtpRest;
  userId: string;
  isOTPSent: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserServiceService) { 

    this.payload = {
      'mobileNumber': '',
      'otp':''
    };
              
  }

  ngOnInit(): void {

    //Getting the userId
    this.activatedRoute.paramMap.subscribe(
      () => this.getUserId()
    );
    
    //Filling up the form
    this.otpForm = this.formBuilder.group({
      countryCode: ['',Validators.required],
      mobileNumber: ['',Validators.required],
      otp: ['',Validators.required]
    });

  }

  getUserId(){

    const hasUserId: boolean = this.activatedRoute.snapshot.paramMap.has('userId');

    if(hasUserId)
      this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    else
      this.router.navigateByUrl('');

  }

  checkLocalStorage(): boolean{

    this.isOTPSent = localStorage.getItem("OTP_SENT");

    return this.isOTPSent === "true";

  }

  onSubmit(){

    //Polluting the payload with the form-data
    this.payload.mobileNumber = this.otpForm.get('countryCode').value.concat(this.otpForm.get('mobileNumber').value);
    this.payload.otp = null;

    console.log("Mobile Number -> "+this.payload.mobileNumber);
    console.log("JSON -> "+JSON.stringify(this.payload));

    //Sending this payload to backend and then setting up the local-storage
    this.userService.sendOTP(this.payload,this.userId).subscribe(
      data => {
        console.log("OTP Data Received "+data);
        this.response = data;
        localStorage.setItem("OTP_SENT","true");
        this.router.navigate(['/verifyMobile/'+this.userId]);
      },
      error=>{
        console.log("error");
      }
    );

  }

  verifyOtp(){
    
    this.payload.otp = this.otpForm.get('otp').value;

    this.userService.verifyOTP(this.payload,this.userId).subscribe(
      data => {
        console.log("OTP Verification -> "+JSON.stringify(data));
        this.response = data;
        this.router.navigate(['/userDetails/'+this.userId]);
        localStorage.setItem("MOBILE_VERIFIED","true");
      }
    );

  }

}
