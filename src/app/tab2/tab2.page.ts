import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/api/user.service';
import {CoursesService} from '../services/api/courses.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    constructor(private userService: UserService, private coursesService: CoursesService) {
    }
    /*displayedColumns: string[] = ['first_name', 'last_name', 'twitter'];
    dataSource = new MatTableDataSource<any>([
        {
            first_name: 'Max',
            last_name: 'Lynch',
            twitter: 'maxlynch'
        },
        {
            first_name: 'Matt',
            last_name: 'Netkow',
            twitter: 'dotNetkow'
        },
        {
            first_name: 'Ben',
            last_name: 'Sperry',
            twitter: 'benjsperry'
        }
    ]);*/
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource<any>([
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
    ]);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public name: string;
    private courseList: any;
    private filteredList: any;

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
