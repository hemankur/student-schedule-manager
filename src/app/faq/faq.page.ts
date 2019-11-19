import {Component, OnInit, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {UserService} from '../services/api/user.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})

export class FaqPage implements OnInit {

  constructor() { }

  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;

  ngOnInit() {
  }

}
