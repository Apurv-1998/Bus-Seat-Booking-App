import { Component, Input, OnInit } from '@angular/core';
import { BusRest } from 'src/app/common/bus-rest';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {

  @Input() receivedBusResponse: BusRest[];
  @Input() UserId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
