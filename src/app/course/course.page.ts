import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {CoursesService} from '../services/api/courses.service';

@Component({
    selector: 'app-course',
    templateUrl: './course.page.html',
    styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

    constructor(private storage: Storage, private coursesService: CoursesService) {
    }

    ngOnInit() {
        this.storage.get('courseDetails').then(res => {
            console.log(res);
        });
    }

    register() {
        this.storage.get('userData').then(userData => {
            this.storage.get('courseDetails').then(course => {
                this.coursesService.register({sid: userData.username, courseID: course.courseID})
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        }).catch(err => {
            console.log(err);
        });
    }
}
