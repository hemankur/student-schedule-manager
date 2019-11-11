import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserService} from '../services/api/user.service';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    private username: string;
    private password: string;

    constructor(private navCtrl: NavController, private userService: UserService, private storage: Storage) {
    }

    ngOnInit() {

    }

    login() {

        const userData = {
            username: this.username,
            password: this.password,
        };
        console.log(userData);
        this.userService.userLogin(userData)
            .then((data: any) => {
                console.log(data);
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
                }
            })
            .catch(err => {
                console.log(err);
            });
        // ok comment
    }
}
