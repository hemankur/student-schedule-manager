import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
    constructor(private storage: Storage, private navCtrl: NavController) {
    }

    logout() {
        this.storage.set('userData', null)
            .then(() => {
                this.navCtrl.navigateRoot('')
                    .catch(err => console.log(err));
            }).catch(err => console.log(err));
    }

    ngOnInit(): void {
    }

    onClickFAQ() {
        this.navCtrl.navigateForward('faq')
            .catch(err => console.log(err));
    }
}
