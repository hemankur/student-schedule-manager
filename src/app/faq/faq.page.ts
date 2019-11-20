import {Component, OnInit, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {IonSearchbar} from '@ionic/angular';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.page.html',
    styleUrls: ['./faq.page.scss'],
})

export class FaqPage implements OnInit {

    constructor() {
    }

    private faqData = [{
        question: 'Question 1',
        answer: 'Answer 1'
    }, {
        question: 'Question 2',
        answer: 'I don\'t know'
    }, {
      question: 'Question 3',
      answer: 'Make something up!'
    }, {
      question: 'Question 4',
      answer: '4 Works too!'
    }];

    private filterData = this.faqData;
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
    @ViewChild(MatSort) sort: MatSort;


    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.data = this.faqData;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.filterData = this.faqData.filter((faq) => {
            return faq.question.toLowerCase().includes(filterValue.toLowerCase()) ||
                faq.answer.toLowerCase().includes(filterValue.toLowerCase());
        });
    }
}
