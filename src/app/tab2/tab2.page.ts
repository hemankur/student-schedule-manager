import {Component, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from '../services/api/courses.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    constructor(private coursesService: CoursesService, private navController: NavController, private storage: Storage) {
    }

    displayedColumns: string[] = ['course', 'name', 'instructor', 'time', 'location', 'term', 'active'];
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
    private departmentList = [];

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
        this.term = 'spring20';
        this.graduateCheckbox = false;
        this.undergraduateCheckbox = false;
    }

    private getCourses() {
        this.coursesService.getCourses().then((res: any) => {
            this.courseList = res.data;
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
        if (this.instructorList.length !== 0) {
            this.filterList = this.filterList.filter((course) => {
                for (const i of this.instructorList) {
                    if (i === course.instructor) {
                        return true;
                    }
                }
            });
        }
        console.log(this.instructorList.length);
        if (this.departmentList.length !== 0) {
            this.filterList = this.filterList.filter((course) => {
                for (const dept of this.departmentList) {
                    if (dept.toLowerCase() === course.department.toLowerCase()) {
                        return true;
                    }
                }
            });
        }
        this.dataSource.data = this.filterList;
    }

    onClickCourse(row) {
        this.storage.set('courseDetails', row)
            .then(() => {
                this.navController.navigateForward('course')
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
        console.log(row);
    }

    resetFilters() {
        this.instructorList = [];
        this.departmentList = [];
        this.graduateCheckbox = false;
        this.undergraduateCheckbox = false;
        this.customFilter();
    }
}
