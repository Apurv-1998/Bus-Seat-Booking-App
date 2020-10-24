import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRest } from 'src/app/common/user-rest';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId: string;
  response: UserRest;
  hasUserId: boolean;
  isMobileVerified: string;

  constructor(private userService: UserServiceService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      () => this.listUserDetails()
    );

  }

  listUserDetails(){

    this.hasUserId = this.activatedRoute.snapshot.paramMap.has('userId');

    if(this.hasUserId)
      this.showDetails();
    
    else
      this.router.navigateByUrl('');

  }


  showDetails(){

    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');

    //Subscribing to the service

    this.userService.getUserDetails(this.userId).subscribe(
      data => {
        console.log("UserDetails Received -> ",JSON.stringify(data));
        this.response = data;
      }
    );

  }

  book(id: string){
    this.router.navigate(['/booking/'+id]);
  }

  checkLocalStorage(): boolean{

    this.isMobileVerified = localStorage.getItem("MOBILE_VERIFIED");

    return this.isMobileVerified === "true";

  }

  routeToOTPVerification(userId: string){

    localStorage.setItem("OTP_SENT","false");
    this.router.navigate(['/verifyMobile/'+userId]);
  }

}
