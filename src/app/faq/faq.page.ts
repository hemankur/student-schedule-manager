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
        question: 'How do I change the calender view?',
        answer: 'To change the view mode of the calender, click on the top buttons saying "Day", "Week" or "Month"'
    }, {
        question: 'How can I apply advanced filters on the course page?',
        answer: 'To apply advanced filters on the course page, click on the "Filters" tab on the top of the page ' +
            'and select the filters you want. To apply the changes, click the apply button on the bottom of the page.'
    }, {
        question: 'Can I revert the filters I selected?',
        answer: 'Yes. To revert the filters, click on the "Revert" button inside the advanced filters tab.'
    }, {
        question: 'Is there a dark mode for the app?',
        answer: 'Yes! You can access the dark mode inside the 3rd tab. "Settings"'
    }, {
        question: 'How do I change the default term?',
        answer: 'To change the default term, go to the "Settings" tab and click "default term".'
    }, {
        question: 'How can I update my Personal Information?',
        answer: 'To update your personal information, go to the "Settings" tab and select "Personal Information"'
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
