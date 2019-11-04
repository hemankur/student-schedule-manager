import {Component, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from '../services/api/courses.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

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

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(this.dataSource);
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getCourses();
    }

    private getCourses() {
        this.coursesService.getCourses().then((res: any) => {
            console.log(res);
            this.courseList = res.data;
            console.log(this.courseList);
            this.dataSource.data = this.courseList;
        }).catch(err => {
            console.log(err);
        });
    }
}
