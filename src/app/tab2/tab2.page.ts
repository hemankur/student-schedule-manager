import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/api/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  constructor (private userService: UserService) {

  }

  public name: string;
  public id: number;
  public email: string;

  ngOnInit(): void {
    this.userService.getUsers()
        .then((res: any) => {
          this.name = res.data[0].displayName;
          this.email = res.data[0].email;
          this.id = res.data[0].userID;
          console.log(res.data[0]);
        }).catch(err => {
      console.log(err);
    });
  }
}
