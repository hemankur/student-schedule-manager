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

    private registered: boolean;

    ngOnInit() {
        this.storage.get('courseDetails').then(course => {
            console.log(course);
            this.storage.get('userData').then(userData => {
                this.coursesService.getRegistrationStatus(userData.username, course.courseID)
                    .then((res: any) => {
                        console.log(res.value);
                        this.registered = !!res.value;
                    });

            });
        });
    }

    register() {
        this.storage.get('userData').then(userData => {
            this.storage.get('courseDetails').then(course => {
                this.coursesService.register({sid: userData.username, courseID: course.courseID})
                    .then((res: any) => {
                        console.log(res);
                        if (!res.error) {
                            this.registered = true;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        }).catch(err => {
            console.log(err);
        });
    }

    unregister() {
        this.storage.get('userData').then(userData => {
            this.storage.get('courseDetails').then(course => {
                this.coursesService.unregister({sid: userData.username, courseID: course.courseID})
                    .then((res: any) => {
                        console.log(res);
                        if (!res.error) {
                            this.registered = false;
                        }
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
