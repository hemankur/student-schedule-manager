import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
    term = 'spring20';
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

    onClickPersonalInformation() {
        this.navCtrl.navigateForward('personal')
            .catch(err => console.log(err));
    }

    onDarkModeToggle(ev) {
        document.body.classList.toggle('dark', ev.detail.checked);
    }

    onClickChangeDefaultTerm() {

    }
}
