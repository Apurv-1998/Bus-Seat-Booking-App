import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutePayload } from 'src/app/common/route-payload';
import { BusRest } from  'src/app/common/bus-rest';
import { BusService } from 'src/app/services/bus.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  routeForm: FormGroup;
  payload: RoutePayload;
  response: BusRest[];
  userId: string;
  hasUserId: boolean;

  constructor(private busService: BusService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 

    this.payload = {
      source: '',
      destination: ''
    };

  }

  ngOnInit(): void {

    //activated route
    this.activatedRoute.paramMap.subscribe(
      () => this.checkUserId()
    );
    
    //Initializing form
    this.routeForm = this.formBuilder.group({
      source: ['',Validators.required],
      destination: ['',Validators.required]
    });
  }

  checkUserId(){

    this.hasUserId = this.activatedRoute.snapshot.paramMap.has('userId');

    if(this.hasUserId)
      this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    
    else
      this.router.navigateByUrl('/login');

  }

  onSubmit(){

    this.payload.source = this.routeForm.get('source').value;
    this.payload.destination = this.routeForm.get('destination').value;

    this.busService.getBusDetails(this.payload).subscribe(
      data => {
        console.log("Bus Data Received -> "+JSON.stringify(data));
        this.response = data;
      }
    );

  }

}
