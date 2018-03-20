import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserDataService {
  readonly userDataURL: string = 'https://ipinfo.io/json';
  constructor(private http: HttpClient) { 
  }
   
  getUserData() {
    return this.http.get(this.userDataURL);
  }


}
