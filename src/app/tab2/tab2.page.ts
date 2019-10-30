import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/api/user.service';
import {CoursesService} from '../services/api/courses.service';
import {errorComparator} from 'tslint/lib/verify/lintError';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    constructor(private userService: UserService, private coursesService: CoursesService) {

    }

    public name: string;
    private courseList: any;
    private filteredList: any;

    ngOnInit(): void {
        this.getCourses();
        this.initializeCourses();
    }

    filterCourses(event: any) {
        this.initializeCourses();
        const keyword = event.target.value;
        if (keyword && keyword.trim() !== '') {
            this.filteredList = this.filteredList.filter((item) => {
                return (item.courseName.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
            });
        }
    }

    private getCourses() {
        this.coursesService.getCourses().then((res: any) => {
            console.log(res);
            this.courseList = res.data;
            this.filteredList = this.courseList;
        }).catch(err => {
            console.log(err);
        });
    }

    private initializeCourses() {
        this.filteredList = this.courseList;
    }
}
