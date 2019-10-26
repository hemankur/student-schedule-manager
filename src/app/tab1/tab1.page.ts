import { Component } from '@angular/core';
import {IEvent, ITimeSelected} from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    eventSource = [];
    calendar = {
        mode: 'week',
        currentDate: new Date()
    };
    startTime: any;
    endTime: any;

    onCurrentDateChanged($event: Date) {

    }

    reloadSource(startTime: any, endTime: any) {

    }

    onEventSelected($event: IEvent) {

    }

    onViewTitleChanged($event: string) {

    }

    onTimeSelected($event: ITimeSelected) {

    }
}
