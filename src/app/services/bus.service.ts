import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusRest } from '../common/bus-rest';
import { RoutePayload } from '../common/route-payload';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  baseUrl: string = "http://localhost:8080/SeatBooking/api";

  constructor(private httpClient: HttpClient) { }

  getBusDetails(payload: RoutePayload): Observable<any>{

    const searchUrl = `${this.baseUrl}/buses/searchBuses?source=${payload.source}&dest=${payload.destination}`;

    return this.httpClient.get<BusRest[]>(searchUrl);

  }

}
