import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/api/user.service';
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

    constructor(private userService: UserService, private coursesService: CoursesService) {}

    displayedColumns: string[] = ['id', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource<any>([
        {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
    ]);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public name: string;
    private courseList: any;
    private filteredList: any;

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(this.dataSource);
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getCourses();
        this.initializeCourses();
    }
    private getCourses() {
        this.coursesService.getCourses().then((res: any) => {
            console.log(res);
            this.courseList = res.data;
            console.log(this.courseList);
            this.dataSource.data = this.courseList;
            this.filteredList = this.courseList;
        }).catch(err => {
            console.log(err);
        });
    }

    private initializeCourses() {
        this.filteredList = this.courseList;
    }
}
