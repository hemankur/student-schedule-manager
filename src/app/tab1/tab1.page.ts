import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent, IEvent, ITimeSelected} from 'ionic2-calendar/calendar';
import {UserService} from '../services/api/user.service';
import {Storage} from '@ionic/storage';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
    eventSource = [];
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };

    @ViewChild(CalendarComponent) myCal: CalendarComponent;
    startTime: any;
    endTime: any;
    viewTitle: string;

    constructor(private userService: UserService, private storage: Storage, private alertCtrl: AlertController) {
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    back() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }

    next() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }

    onCurrentDateChanged($event: Date) {

    }

    reloadSource(startTime: any, endTime: any) {

    }

    async onEventSelected($event: IEvent) {

    }

    onViewTitleChanged(title: string) {
        this.viewTitle = title;
    }

    onTimeSelected($event: ITimeSelected) {

    }

    ngOnInit(): void {
        this.storage.get('userData')
            .then(userData => {
                this.userService.getUserCourses(userData.username)
                    .then((res: any) => {
                        const courses = res.data;
                        for (const course of courses) {
                            let startMonth: number;
                            let startYear: number;
                            let startDate: number;
                            console.log(course);
                            if (course.term === 'Spring20') {
                                startMonth = 0;
                                startYear = 2020;
                            } else if (course.term === 'Fall19') {
                                startMonth = 7;
                                startYear = 2019;
                            }
                            if (course.day === 'M') {
                                startDate = 13;
                            } else if (course.day === 'T') {
                                startDate = 14;
                            } else if (course.day === 'W') {
                                startDate = 15;
                            } else if (course.day === 'R') {
                                startDate = 16;
                            } else if (course.day === 'F') {
                                startDate = 17;
                            }
                            for (let i = 0; i < 15; i++) {
                                const event = {
                                    title: course.courseName,
                                    desc: course.location,
                                    startTime: new Date(startYear,
                                        startMonth,
                                        startDate + (i * 7),
                                        Number(course.time.toString().split(':')[0]),
                                        Number(course.time.toString().split(':')[1]),
                                        0, 0),
                                    endTime: new Date(startYear,
                                        startMonth,
                                        startDate + (i * 7),
                                        Number(course.time.toString().split(':')[0]) + 2,
                                        Number(course.time.toString().split(':')[1]) + 40,
                                        0, 0),
                                    allDay: false
                                };
                                this.eventSource.push(event);
                            }
                            this.myCal.loadEvents();
                        }
                    });
            });

    }

    today() {
        this.calendar.currentDate = new Date();
    }
}
