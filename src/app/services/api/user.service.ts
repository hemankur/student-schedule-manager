import { Injectable } from '@angular/core';
import {SERVER_URL} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
    /**
   * Get the user details for everyone from the server
   */
  getUsers() {
    return this.http.get(SERVER_URL + '/api/users/').toPromise();
  }

}
