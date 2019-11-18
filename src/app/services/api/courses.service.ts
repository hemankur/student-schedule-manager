import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_URL} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private http: HttpClient) {
    }

    getCourses() {
        return this.http.get(SERVER_URL + '/api/courses/').toPromise();
    }

    register(userData) {
        return this.http.post(SERVER_URL + '/api/courses/register/', userData).toPromise();
    }

    unregister(userData) {
        return this.http.patch(SERVER_URL + '/api/courses/unregister/', userData).toPromise();
    }

    getRegistrationStatus(username, courseID) {
        return this.http.get(SERVER_URL + '/api/courses/' + username + '/' + courseID).toPromise();
    }
}
