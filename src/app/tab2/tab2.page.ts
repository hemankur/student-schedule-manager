import {Component, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from '../services/api/courses.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {UserService} from '../services/api/user.service';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    private itemPerPage: number;

    constructor(private coursesService: CoursesService, private navController: NavController,
                private storage: Storage, private userService: UserService) {
    }

    displayedColumns: string[] = ['course', 'name', 'instructor', 'time', 'location', 'term', 'active'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;

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
    }

    ngOnInit(): void {
        this.initializeValues();
        this.getCourses();
        this.getPreferences();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    private initializeValues() {
        this.term = 'spring20';
        this.graduateCheckbox = false;
        this.undergraduateCheckbox = false;
        this.departmentList = [];
        this.instructorList = [];
        this.itemPerPage = 10;
    }

    private getCourses() {
        this.coursesService.getCourses().then((res: any) => {
            this.courseList = res.data;
            this.dataSource.data = this.courseList;
        }).then(() => {
            this.customFilter()
                .catch(err => console.log(err));
        }).catch(err => {
            console.log(err);
        });
    }


    async customFilter() {
        this.filterList = await this.courseList;
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
        this.term = 'spring20';
        this.customFilter();
    }

    private updatePreferences() {
        this.storage.get('userData').then(userData => {
            const userPreferences = {
                preferences: {
                    graduateCheckbox: this.graduateCheckbox,
                    undergraduateCheckbox: this.undergraduateCheckbox,
                    departmentList: this.departmentList,
                    instructorList: this.instructorList,
                    itemsPerPage: this.itemPerPage,
                    term: this.term
                },
                username: userData.username,
            };
            this.userService.postUserPreferences(userPreferences)
                .catch(err => console.log(err));
        });
    }

    private getPreferences() {
        this.storage.get('userData').then(userData => {
            this.userService.getUserPreferences(userData.username)
                .then((res: any) => {
                    const preferences = JSON.parse(res.data[0].preferences);
                    this.graduateCheckbox = preferences.graduateCheckbox;
                    this.undergraduateCheckbox = preferences.undergraduateCheckbox;
                    this.instructorList = preferences.instructorList;
                    this.departmentList = preferences.departmentList;
                    this.term = preferences.term;
                    this.itemPerPage = preferences.itemsPerPage;
                }).then(() => this.customFilter())
                .catch(err => console.log(err));
        });
    }

    closePanel() {
        this.panel.close();
    }
}
