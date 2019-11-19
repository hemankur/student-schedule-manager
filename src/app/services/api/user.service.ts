import {Injectable} from '@angular/core';
import {SERVER_URL} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    /**
     * Get the user details for everyone from the server
     */
    getUserPreferences(username) {
        return this.http.get(SERVER_URL + '/api/users/preferences/' + username).toPromise();
    }

    /**
     * Update user preferences in the database
     * @param userData contains username and userPreferences
     */
    postUserPreferences(userData) {
        return this.http.post(SERVER_URL + '/api/users/preferences', userData).toPromise();
    }

    /**
     * User login service
     * @param userData contains username and password
     */
    userLogin(userData) {
        return this.http.post(SERVER_URL + '/api/user/login/', userData).toPromise();
    }

    /**
     * GET request to fetch the courses a user is taking
     * @param username
     */
    getUserCourses(username) {
        return this.http.get(SERVER_URL + '/api/users/' + username).toPromise();
    }

    getUserData(username) {
        return this.http.get(SERVER_URL + '/api/users/data/' + username).toPromise();
    }

    updateAddress(username, data) {
        return this.http.patch(SERVER_URL + '/api/users/address/', {username: username, data: data}).toPromise();
    }

    updateEmail(username, email) {
        return this.http.patch(SERVER_URL + '/api/users/email/', {username: username, data: email}).toPromise();
    }

    updateEmergency(username, data) {
        return this.http.patch(SERVER_URL + '/api/users/emergency/', {username: username, data: data}).toPromise();
    }
}
