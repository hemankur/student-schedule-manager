import {Component, OnInit, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {UserService} from '../services/api/user.service';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-personal',
    templateUrl: './personal.page.html',
    styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

    constructor(private userService: UserService, private storage: Storage) {
    }

    @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
    userData: any;
    backupUserData: any;
    private editMode = false;

    ngOnInit() {
        this.storage.get('userData').then((userData: any) => {
            this.userService.getUserData(userData.username)
                .then((res: any) => {
                    this.userData = res.data;
                    this.backupUserData = res.data;
                    console.log(res.data);
                });
        }).catch(err => console.log(err));
    }

    toggleEdit() {
        this.editMode = !this.editMode;
        console.log(this.userData);
    }

    saveChanges() {
        this.userService.updateUserData(this.userData)
            .then(() => {
                this.editMode = !this.editMode;
            }).catch(err => console.log(err));
    }

    onClickCancel() {
        this.userData = this.backupUserData;
        this.editMode = !this.editMode;
    }
}
