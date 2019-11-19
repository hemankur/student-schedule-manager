import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonalPage } from './personal.page';
import {MaterialModule} from '../material.module';
import {MatExpansionModule} from '@angular/material/expansion';


const routes: Routes = [
  {
    path: '',
    component: PersonalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatExpansionModule
  ],
  declarations: [PersonalPage]
})
export class PersonalPageModule {}
