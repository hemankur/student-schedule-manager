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
}
