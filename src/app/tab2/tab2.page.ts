import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/api/user.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  constructor (private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getUsers()
        .then(res => {
          console.log(res);
        }).catch(err => {
      console.log(err);
    });
  }
}
