import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FaqPage } from './faq.page';
import {MaterialModule} from '../material.module';
import {MatExpansionModule} from '@angular/material/expansion';

const routes: Routes = [
  {
    path: '',
    component: FaqPage
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
  declarations: [FaqPage]
})
export class FaqPageModule {}
