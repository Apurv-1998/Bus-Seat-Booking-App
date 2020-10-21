import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload } from '../common/login-payload';
import { SignupPayload } from '../common/signup-payload';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl: string = "http://localhost:8080/SeatBooking/api";

  constructor(private httpClient: HttpClient) { }

  signupUser(payload: SignupPayload): Observable<any> {

    const searchUrl: string = `${this.baseUrl}/users/createUser`;

    return this.httpClient.post(searchUrl,payload);

  }

  loginUser(payload: LoginPayload): Observable<any>{

    const baseUrl = `${this.baseUrl}/users/login`;

    return this.httpClient.post(baseUrl,payload);

  }
}
