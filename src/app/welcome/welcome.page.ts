import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {UserService} from '../services/api/user.service';
import {Storage} from '@ionic/storage';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    private username: string;
    private password: string;
    private showError: boolean;

    constructor(private navCtrl: NavController, private userService: UserService,
                private storage: Storage, private toastController: ToastController) {
    }

    ngOnInit() {
        this.storage.get('userData')
            .then(userData => {
                if (userData !== null) {
                    console.log(userData);
                    this.navCtrl.navigateForward('tabs/tab1')
                        .catch(err => console.log(err));
                }
            });

    }

    ionViewDidEnter() {
        this.showError = false;
    }

    login() {

        const userData = {
            username: this.username,
            password: this.password,
        };
        console.log(userData);
        this.userService.userLogin(userData)
            .then((data: any) => {
                if (data.message === 'success') {
                    this.storage.set('userData', userData)
                        .then(() => {
                            this.navCtrl.navigateForward('tabs/tab1')
                                .catch(err => {
                                    console.log(err);
                                });
                        }).catch(err => {
                        console.log(err);
                    });
                } else {
                    this.showError = true;
                }
            }).catch(err => {
            this.showError = true;
            if (err.error.error) {
                this.presentToast(err.error.error, err.error.message);
            } else {
                this.presentToast('Server Offline.', 'Sorry for the inconvenience. Please try later.');
            }
        });
    }

    async presentToast(header, message) {
        const toast = await this.toastController.create({
            header: header,
            message: message,
            position: 'bottom',
            duration: 2200
        });
        toast.present();
    }
}
