import {Component, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from '../services/api/courses.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    constructor(private coursesService: CoursesService) {
    }

    displayedColumns: string[] = ['course', 'name', 'instructor', 'time', 'location'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public name: string;
    private courseList: any;
    private filterList: any;
    private graduateCheckbox: boolean;
    private undergraduateCheckbox: boolean;
    private term: string;
    private instructorList = [];

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(this.dataSource);
    }

    ngOnInit(): void {
        this.initializeValues();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getCourses();
    }

    private initializeValues() {
        this.term = 'fall19';
        this.graduateCheckbox = false;
        this.undergraduateCheckbox = false;
    }

    private getCourses() {
        this.coursesService.getCourses().then((res: any) => {
            this.courseList = res.data;
            console.log(this.courseList);
            this.dataSource.data = this.courseList;
        }).then(() => {
            this.customFilter();
        }).catch(err => {
            console.log(err);
        });
    }


    customFilter() {
        this.filterList = this.courseList;
        this.filterList = this.filterList.filter((course) => {
            if (this.graduateCheckbox && !this.undergraduateCheckbox) {
                return course.courseNumber >= 500 && course.term.toLowerCase() === this.term.toLowerCase();
            } else if (this.undergraduateCheckbox && !this.graduateCheckbox) {
                return course.courseNumber < 500 && course.term.toLowerCase() === this.term.toLowerCase();
            } else {
                return course.term.toLowerCase() === this.term.toLowerCase();
            }
        });
        this.filterList = this.filterList.filter((course) => {
            console.log(course.instructor);
            for (const i of this.instructorList) {
                if (i === course.instructor) {
                    return true;
                }
            }
        });
        this.dataSource.data = this.filterList;
    }
}
